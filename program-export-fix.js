(function applyProgramFilterAndExport() {
  const HIDDEN_PEOPLE_PATTERNS = ["pendiente", "fernando", "samuel"];
  const PROGRAM_FILTER_DEFAULT = "Todos";

  const style = document.createElement("style");
  style.textContent = `
    .program-filter {
      grid-column: 1 / -1;
    }

    .download-agenda-button {
      grid-column: 2 / 4;
      grid-row: 3;
      justify-self: end;
      min-height: 38px;
      border: 1px solid rgba(255, 73, 35, 0.58);
      border-radius: 999px;
      padding: 9px 18px;
      color: #fff;
      background: linear-gradient(135deg, #ff7a1f, #ff2e3f);
      font-size: 12px;
      font-weight: 950;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      box-shadow:
        0 10px 24px rgba(255, 54, 44, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.18);
      cursor: pointer;
    }

    .download-agenda-button:disabled {
      cursor: progress;
      opacity: 0.65;
    }

    .agenda-sync {
      grid-row: 4 !important;
    }

    @media (max-width: 760px) {
      .download-agenda-button {
        grid-column: 1 / -1;
        justify-self: stretch;
      }
    }
  `;
  document.head.appendChild(style);

  function hiddenPersonMatch(person) {
    const normalized = normalizeForMatch(person);
    return HIDDEN_PEOPLE_PATTERNS.some((pattern) => normalized.includes(pattern));
  }

  function personKey(person) {
    const normalized = normalizeForMatch(person);
    if (normalized.includes("luisa")) {
      return "luisa";
    }
    return normalized;
  }

  function visiblePeople() {
    const seen = new Set();
    return TEAM_MEMBERS.filter((person) => {
      if (!person || hiddenPersonMatch(person)) {
        return false;
      }
      const key = personKey(person);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  function getProgramFilterElement() {
    return document.querySelector("#programFilter");
  }

  function selectedProgram() {
    return getProgramFilterElement()?.value || PROGRAM_FILTER_DEFAULT;
  }

  function recordMatchesProgram(record) {
    const program = selectedProgram();
    return program === PROGRAM_FILTER_DEFAULT || record.program === program;
  }

  function getProgramValues() {
    const programs = uniqueSorted(records.map((record) => record.program).filter(Boolean));
    return [PROGRAM_FILTER_DEFAULT, ...programs];
  }

  function renderProgramButtons(values, activeValue) {
    const container = document.querySelector("#programButtons");
    if (!container) {
      return;
    }

    container.innerHTML = values
      .map(
        (value) => `
          <button
            class="filter-chip ${value === activeValue ? "is-active" : ""}"
            type="button"
            data-select="programFilter"
            data-value="${escapeHtml(value)}"
            data-program="${escapeHtml(value)}"
            title="${escapeHtml(value)}"
          >
            ${escapeHtml(value)}
          </button>
        `,
      )
      .join("");
  }

  const originalRenderFilters = renderFilters;
  renderFilters = function renderFiltersWithProgram() {
    const previousProgram = selectedProgram();
    originalRenderFilters();

    const people = visiblePeople();
    const personSelect = document.querySelector("#personFilter");
    const currentPerson = personSelect.value;
    const nextPerson = people.includes(currentPerson) ? currentPerson : people[0] || "";
    fillSelect(personSelect, people, nextPerson);
    renderPersonButtons(personSelect.value);

    const programSelect = getProgramFilterElement();
    const programs = getProgramValues();
    const nextProgram = programs.includes(previousProgram) ? previousProgram : PROGRAM_FILTER_DEFAULT;
    fillSelect(programSelect, programs, nextProgram);
    renderProgramButtons(programs, programSelect.value);
  };

  renderPersonButtons = function renderVisiblePersonButtons(selectedPerson) {
    const people = visiblePeople();
    document.querySelector("#personButtons").innerHTML = people
      .map(
        (person) => `
          <button
            class="person-option ${person === selectedPerson ? "is-active" : ""}"
            type="button"
            data-person="${escapeHtml(person)}"
          >
            ${escapeHtml(TEAM_MEMBER_LABELS[person] || person)}
          </button>
        `,
      )
      .join("");
  };

  const originalGetPeriodFilteredRecords = getPeriodFilteredRecords;
  getPeriodFilteredRecords = function getProgramPeriodRecords() {
    return originalGetPeriodFilteredRecords().filter(recordMatchesProgram);
  };

  const originalGetFilteredRecords = getFilteredRecords;
  getFilteredRecords = function getProgramPersonRecords() {
    return originalGetFilteredRecords()
      .filter(recordMatchesProgram)
      .filter((record) => !hiddenPersonMatch(record.person));
  };

  const originalGetAgendaMonthRecords = getAgendaMonthRecords;
  getAgendaMonthRecords = function getProgramAgendaRecords() {
    return originalGetAgendaMonthRecords().filter(recordMatchesProgram);
  };

  renderPeriodGrid = function renderVisiblePeriodGrid(filtered) {
    const active = filtered.filter((record) => record.status !== "Cancelada" && !hiddenPersonMatch(record.person));
    const teamCards = visiblePeople().map((person) => {
      const items = active.filter((record) => record.person === person);
      const count = sumCounts(items);
      const amount = items.reduce((sum, record) => sum + getCoverageAmount(record), 0);
      const months = uniqueSorted(items.map((item) => getMonthName(item.date))).join(", ") || "Sin mes";
      return { person, count, amount, months };
    });
    const totalCount = sumCounts(active);
    const totalAmount = active.reduce((sum, record) => sum + getCoverageAmount(record), 0);

    document.querySelector("#periodTotalLabel").textContent = `${totalCount} coberturas · ${formatCurrency(totalAmount)}`;
    document.querySelector("#periodGrid").innerHTML = teamCards
      .map(
        (card) => `
          <article class="period-card">
            <span>${escapeHtml(TEAM_MEMBER_LABELS[card.person] || card.person)} · ${escapeHtml(card.months)}</span>
            <strong>${card.count}</strong>
            <p>${formatCurrency(card.amount)}</p>
          </article>
        `,
      )
      .join("");
  };

  function getStartMinutes(timeValue) {
    const source = String(timeValue || "").toLowerCase();
    if (!source.trim()) {
      return Number.POSITIVE_INFINITY;
    }

    const compact = source
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\./g, "")
      .replace(/\bhrs?\b/g, "")
      .replace(/\bhoras?\b/g, "")
      .replace(/\s+/g, "");

    const matches = [...compact.matchAll(/(\d{1,2})(?::(\d{2}))?(am|pm)?/g)];
    if (!matches.length) {
      return Number.POSITIVE_INFINITY;
    }

    const first = matches[0];
    const meridiem = first[3] || matches.find((match) => match[3])?.[3] || "";
    let hour = Number(first[1]);
    const minutes = Number(first[2] || 0);

    if (meridiem === "pm" && hour < 12) {
      hour += 12;
    }
    if (meridiem === "am" && hour === 12) {
      hour = 0;
    }

    return hour * 60 + minutes;
  }

  function compareRecordsBySchedule(a, b) {
    return (
      a.date.localeCompare(b.date) ||
      getStartMinutes(a.time) - getStartMinutes(b.time) ||
      a.person.localeCompare(b.person) ||
      a.coverage.localeCompare(b.coverage)
    );
  }

  function getCompetitionBadge(record) {
    const program = normalizeForMatch(record.program);
    const text = normalizeForMatch([record.coverage, record.program, record.type].join(" "));
    if (program.includes("copa cima") || text.includes("copa cima")) {
      return { label: "Copa Cima", logo: "./assets/programs/copa-cima.webp" };
    }
    if (program.includes("tercera") || text.includes("tercera division")) {
      return { label: "Tercera Division", logo: "./assets/programs/tercera-division.webp" };
    }
    if (program.includes("juventus") || text.includes("juventus academy")) {
      return { label: "Juventus Academy", logo: "./assets/programs/juventus-academy.webp" };
    }
    if (program === "gsa" || text.includes("global sports academy") || text.includes("gsa")) {
      return { label: "GSA", logo: "./assets/programs/gsa.webp" };
    }
    if (program === "gba" || text.includes("global basketball academy") || text.includes("gba")) {
      return { label: "GBA", logo: "./assets/programs/gba.webp" };
    }
    if (program.includes("liga estudiantil") || text.includes("liga estudiantil")) {
      return { label: "Liga Estudiantil", logo: "./assets/programs/liga-estudiantil.webp" };
    }
    return { label: "GSC", logo: "./assets/logo-gsc.png" };
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = src;
    });
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function getWrappedLines(ctx, text, maxWidth, maxLines = 3) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";

    words.forEach((word) => {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width <= maxWidth || !current) {
        current = test;
      } else {
        lines.push(current);
        current = word;
      }
    });

    if (current) {
      lines.push(current);
    }

    if (lines.length > maxLines) {
      const clipped = lines.slice(0, maxLines);
      let last = clipped[maxLines - 1];
      while (last.length > 3 && ctx.measureText(`${last}...`).width > maxWidth) {
        last = last.slice(0, -1);
      }
      clipped[maxLines - 1] = `${last}...`;
      return clipped;
    }

    return lines.length ? lines : [""];
  }

  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const lines = getWrappedLines(ctx, text, maxWidth, maxLines);
    lines.forEach((line, index) => {
      ctx.fillText(line, x, y + index * lineHeight);
    });
    return y + lines.length * lineHeight;
  }

  function drawIconCircle(ctx, x, y, radius, color, square = false) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    if (square) {
      roundRect(ctx, x - radius, y - radius, radius * 2, radius * 2, 4);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function dayGroupHeight(ctx, group, itemWidth) {
    return 64 + group.items.reduce((height, record) => {
      const titleLines = getWrappedLines(ctx, record.coverage, itemWidth - 334, 2).length;
      const programLines = getWrappedLines(ctx, record.program || "Sin programa", itemWidth - 334, 2).length;
      return height + Math.max(112, 74 + titleLines * 21 + programLines * 16) + 10;
    }, 0);
  }

  function drawLogoInside(ctx, image, x, y, size) {
    if (!image) {
      return;
    }

    const ratio = Math.min(size / image.width, size / image.height);
    const width = image.width * ratio;
    const height = image.height * ratio;
    ctx.drawImage(image, x + (size - width) / 2, y + (size - height) / 2, width, height);
  }

  async function buildAgendaImage({ monthIndex, selectedWeek, selectedWeekRange, groups }) {
    const width = 1600;
    const padding = 54;
    const columnGap = 44;
    const columnWidth = (width - padding * 2 - columnGap) / 2;

    const measureCanvas = document.createElement("canvas");
    const measureContext = measureCanvas.getContext("2d");
    measureContext.font = "800 18px Arial";

    const columns = [[], []];
    const heights = [0, 0];
    groups.forEach((group) => {
      const height = dayGroupHeight(measureContext, group, columnWidth);
      const columnIndex = heights[0] <= heights[1] ? 0 : 1;
      columns[columnIndex].push({ ...group, height });
      heights[columnIndex] += height + 22;
    });

    const headerHeight = 140;
    const footerHeight = 64;
    const height = Math.max(820, headerHeight + Math.max(...heights, 0) + footerHeight + 54);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#0c0d0c");
    gradient.addColorStop(0.52, "#020302");
    gradient.addColorStop(1, "#080808");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 74, 47, 0.42)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    ctx.fillStyle = "rgba(255, 74, 47, 0.08)";
    ctx.fillRect(0, 0, width, headerHeight);
    ctx.strokeStyle = "rgba(255, 74, 47, 0.35)";
    ctx.beginPath();
    ctx.moveTo(0, headerHeight);
    ctx.lineTo(width, headerHeight);
    ctx.stroke();

    const logo = await loadImage("./assets/logo-gsc.png");
    drawLogoInside(ctx, logo, 48, 26, 120);

    ctx.fillStyle = "#ff4a2f";
    ctx.font = "800 20px Arial";
    ctx.letterSpacing = "0px";
    ctx.fillText("AGENDA DEL EQUIPO", 190, 56);
    ctx.fillStyle = "#f7f4ef";
    ctx.font = "950 42px Arial";
    ctx.fillText("AGENDA POR SEMANA", 190, 102);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(650, 36);
    ctx.lineTo(650, 108);
    ctx.stroke();

    const rangeText = selectedWeekRange
      ? `${formatShortExportDate(selectedWeekRange.start)} - ${formatShortExportDate(selectedWeekRange.end)}`
      : "";
    const programText = selectedProgram() === PROGRAM_FILTER_DEFAULT ? "Todos los programas" : selectedProgram();
    ctx.fillStyle = "#f7f4ef";
    ctx.font = "900 24px Arial";
    ctx.fillText(`${getAgendaMonthLabel(monthIndex).toUpperCase()} · ${formatSheetWeekLabel(selectedWeek)}`, 704, 60);
    ctx.fillStyle = "rgba(247, 244, 239, 0.72)";
    ctx.font = "600 20px Arial";
    ctx.fillText(rangeText, 704, 92);
    ctx.fillStyle = "#ff8318";
    ctx.font = "850 18px Arial";
    ctx.fillText(programText.toUpperCase(), 1040, 92);

    const loadedLogos = new Map();
    for (const group of groups) {
      for (const record of group.items) {
        const logoPath = getCompetitionBadge(record).logo;
        if (!loadedLogos.has(logoPath)) {
          loadedLogos.set(logoPath, await loadImage(logoPath));
        }
      }
    }

    let maxBottom = headerHeight;
    columns.forEach((column, columnIndex) => {
      const x = padding + columnIndex * (columnWidth + columnGap);
      let y = headerHeight + 38;
      column.forEach((group) => {
        drawDayGroup(ctx, group, x, y, columnWidth, loadedLogos);
        y += group.height + 22;
        maxBottom = Math.max(maxBottom, y);
      });
    });

    ctx.strokeStyle = "rgba(255, 74, 47, 0.35)";
    ctx.beginPath();
    ctx.moveTo(0, height - footerHeight);
    ctx.lineTo(width, height - footerHeight);
    ctx.stroke();
    ctx.fillStyle = "rgba(247, 244, 239, 0.78)";
    ctx.font = "850 15px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PLANIFICAMOS  ·  ORGANIZAMOS  ·  COMPETIMOS", width / 2, height - 26);
    ctx.textAlign = "left";

    return canvas.toDataURL("image/png");
  }

  function drawDayGroup(ctx, group, x, y, width, logoCache) {
    ctx.save();
    ctx.fillStyle = "#f7f4ef";
    ctx.font = "950 28px Arial";
    ctx.fillText(formatScheduleDay(group.date).toUpperCase(), x + 60, y + 28);
    ctx.strokeStyle = "#ff4a2f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 360, y + 22);
    ctx.lineTo(x + width, y + 22);
    ctx.stroke();

    roundRect(ctx, x, y - 10, 42, 42, 8);
    ctx.fillStyle = "rgba(255, 74, 47, 0.16)";
    ctx.fill();
    ctx.fillStyle = "#ff4a2f";
    ctx.fillRect(x + 10, y + 6, 22, 3);
    ctx.fillRect(x + 10, y + 16, 22, 3);
    ctx.fillRect(x + 10, y + 26, 22, 3);

    let itemY = y + 58;
    group.items.forEach((record) => {
      const titleLines = getWrappedLines(ctx, record.coverage, width - 334, 2).length;
      const programLines = getWrappedLines(ctx, record.program || "Sin programa", width - 334, 2).length;
      const itemHeight = Math.max(112, 74 + titleLines * 21 + programLines * 16);
      drawAgendaCard(ctx, record, x, itemY, width, itemHeight, logoCache);
      itemY += itemHeight + 10;
    });
    ctx.restore();
  }

  function drawAgendaCard(ctx, record, x, y, width, height, logoCache) {
    const badge = getCompetitionBadge(record);
    ctx.save();
    roundRect(ctx, x, y, width, height, 8);
    ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.13)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#ff4a2f";
    roundRect(ctx, x, y + 7, 5, height - 14, 3);
    ctx.fill();

    roundRect(ctx, x + 22, y + 18, 78, 78, 9);
    ctx.fillStyle = "#050606";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.stroke();
    drawLogoInside(ctx, logoCache.get(badge.logo), x + 30, y + 26, 62);

    const copyX = x + 126;
    const copyWidth = width - 372;
    ctx.fillStyle = "#ff8318";
    ctx.font = "950 22px Arial";
    let cursor = drawWrappedText(ctx, record.coverage, copyX, y + 39, copyWidth, 25, 2);

    ctx.fillStyle = "rgba(247, 244, 239, 0.72)";
    ctx.font = "850 12px Arial";
    ctx.fillText("ENCARGADO:", copyX, cursor + 14);
    ctx.fillText("PROGRAMA:", copyX, cursor + 39);

    ctx.fillStyle = "#f7f4ef";
    ctx.font = "800 16px Arial";
    ctx.fillText(record.person || "Sin responsable", copyX + 104, cursor + 14);
    drawWrappedText(ctx, record.program || "Sin programa", copyX + 104, cursor + 39, copyWidth - 104, 18, 2);

    const metaX = x + width - 218;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.beginPath();
    ctx.moveTo(metaX - 22, y + 24);
    ctx.lineTo(metaX - 22, y + height - 24);
    ctx.stroke();

    ctx.fillStyle = "#f7f4ef";
    ctx.font = "800 17px Arial";
    drawIconCircle(ctx, metaX, y + 42, 8, "#ff4a2f");
    ctx.fillText(record.time || "Pendiente", metaX + 28, y + 48);
    drawIconCircle(ctx, metaX, y + 76, 7, "#ff4a2f", true);
    drawWrappedText(ctx, record.venue || "Sin sede", metaX + 28, y + 82, 170, 20, 2);

    ctx.restore();
  }

  function formatShortExportDate(date) {
    return new Intl.DateTimeFormat("es-GT", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  function currentWeeklyGroups() {
    const monthIndex = getSelectedAgendaMonthIndex();
    const availableWeeks = getCalendarWeeksForMonth(monthIndex).map((week) => week.value);
    const selectedWeek = resolveSelectedSheetWeek(availableWeeks);
    const selectedWeekRange = getWeekRangeFromValue(selectedWeek);
    const weeklyRecords = getAgendaMonthRecords()
      .filter((record) => record.status !== "Cancelada")
      .filter((record) => selectedWeekRange && isInDateRange(record.date, selectedWeekRange.start, selectedWeekRange.end))
      .sort(compareRecordsBySchedule);

    return {
      monthIndex,
      selectedWeek,
      selectedWeekRange,
      records: weeklyRecords,
      groups: Object.entries(groupBy(weeklyRecords, (record) => record.date)).map(([date, items]) => ({
        date,
        items,
      })),
    };
  }

  async function downloadWeeklyAgenda() {
    const button = document.querySelector("#downloadAgenda");
    const previousText = button.textContent;
    const data = currentWeeklyGroups();

    if (!data.records.length) {
      setSyncFeedback("No hay coberturas para descargar con estos filtros.");
      return;
    }

    button.disabled = true;
    button.textContent = "Preparando imagen";
    setSyncFeedback("Preparando imagen de la agenda semanal...");

    try {
      const imageUrl = await buildAgendaImage(data);
      const link = document.createElement("a");
      const programSlug = normalizeForMatch(selectedProgram()).replace(/\s+/g, "-") || "todos";
      link.href = imageUrl;
      link.download = `agenda-${formatSheetWeekLabel(data.selectedWeek).toLowerCase()}-${programSlug}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSyncFeedback("Agenda semanal descargada.");
    } catch (error) {
      console.error(error);
      setSyncFeedback("No se pudo generar la imagen. Intenta actualizar la app.");
    } finally {
      button.disabled = false;
      button.textContent = previousText;
    }
  }

  function bindEnhancementEvents() {
    getProgramFilterElement()?.addEventListener("change", render);
    document.querySelector("#programButtons")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-program]");
      if (!button) {
        return;
      }
      event.stopPropagation();
      getProgramFilterElement().value = button.dataset.program;
      render();
    });
    document.querySelector("#downloadAgenda")?.addEventListener("click", downloadWeeklyAgenda);
  }

  bindEnhancementEvents();
  render();
})();
