(function applyAgendaDesign() {
  const CALENDAR_YEAR = 2026;

  const style = document.createElement("style");
  style.textContent = `
    .current-week-panel {
      overflow: hidden;
      border: 1px solid rgba(255, 73, 35, 0.28);
      border-radius: 8px;
      background:
        radial-gradient(circle at 14% 0%, rgba(255, 73, 35, 0.12), transparent 32%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 22%),
        #070807;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
    }

    .current-week-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      min-height: 104px;
      padding: 20px 34px;
      border-bottom: 1px solid rgba(255, 73, 35, 0.22);
      background:
        linear-gradient(90deg, rgba(255, 73, 35, 0.08), transparent 44%),
        rgba(0, 0, 0, 0.18);
    }

    .agenda-brand {
      position: relative;
      display: grid;
      grid-template-columns: 132px minmax(260px, 1fr);
      align-items: center;
      column-gap: 18px;
      min-width: 0;
      padding-right: 30px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }

    .agenda-logo {
      width: 132px;
      max-height: 48px;
      display: block;
      object-fit: contain;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.42));
    }

    .current-week-heading .eyebrow {
      margin: 0 0 4px;
      color: #ff5a32;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.24em;
      text-transform: uppercase;
    }

    .current-week-heading h2 {
      margin: 0;
      color: #f7f4ef;
      font-size: clamp(26px, 3.6vw, 39px);
      line-height: 0.94;
      font-weight: 950;
      letter-spacing: 0;
      text-transform: uppercase;
      text-shadow: 0 8px 30px rgba(0, 0, 0, 0.48);
    }

    .agenda-controls {
      display: grid;
      grid-template-columns: auto minmax(190px, 1fr) auto;
      align-items: center;
      justify-items: stretch;
      gap: 9px 16px;
      min-width: min(640px, 50vw);
    }

    .agenda-controls::before {
      content: "";
      grid-column: 1;
      grid-row: 1 / 3;
      width: 42px;
      height: 42px;
      border-radius: 8px;
      background:
        linear-gradient(#ff4a2f 0 0) 50% 29% / 22px 3px no-repeat,
        linear-gradient(#ff4a2f 0 0) 50% 50% / 22px 3px no-repeat,
        linear-gradient(#ff4a2f 0 0) 50% 71% / 22px 3px no-repeat,
        rgba(255, 73, 35, 0.11);
      box-shadow: inset 0 0 0 1px rgba(255, 73, 35, 0.22);
    }

    #currentWeekLabel {
      grid-column: 2;
      grid-row: 1;
      text-align: left;
    }

    .agenda-refresh {
      grid-column: 3;
      grid-row: 1;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(255, 73, 35, 0.72);
      border-radius: 999px;
      color: #fff;
      background: linear-gradient(135deg, #ff7a1f, #ff2e3f);
      font-size: 21px;
      font-weight: 900;
      box-shadow: 0 10px 24px rgba(255, 54, 44, 0.25);
    }

    .agenda-sync {
      grid-column: 2 / 4;
      grid-row: 3;
      margin: -2px 0 0;
      color: rgba(247, 244, 239, 0.48);
      font-size: 10px;
      font-weight: 750;
      text-align: right;
    }

    .agenda-period-label {
      display: grid;
      gap: 5px;
    }

    .agenda-period-main {
      color: #f7f4ef;
      font-size: 16px;
      font-weight: 950;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    .agenda-period-range {
      color: rgba(247, 244, 239, 0.7);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0;
      text-transform: none;
    }

    .agenda-week-row {
      grid-column: 2 / 4;
      grid-row: 2;
      display: flex;
      justify-content: end;
      gap: 10px;
    }

    .agenda-week-chip {
      min-width: 68px;
      min-height: 40px;
      border: 1px solid rgba(255, 73, 35, 0.64);
      border-radius: 999px;
      padding: 7px 16px;
      color: #f7f4ef;
      background: rgba(2, 2, 2, 0.36);
      font-size: 14px;
      font-weight: 950;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.38);
    }

    .agenda-week-chip.is-active {
      color: #fff;
      border-color: rgba(255, 92, 45, 0.94);
      background: linear-gradient(135deg, #ff7a1f, #ff2e3f);
      box-shadow:
        0 10px 30px rgba(255, 54, 44, 0.34),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .schedule-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
      padding: 22px 34px 18px;
    }

    .schedule-day {
      min-height: 360px;
      padding: 0;
      border: 0;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
    }

    .schedule-day::before,
    .schedule-day::after {
      display: none;
    }

    .schedule-day-header {
      display: grid;
      grid-template-columns: 58px minmax(0, 1fr);
      align-items: center;
      gap: 14px;
      margin-bottom: 10px;
    }

    .schedule-day-icon {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 8px;
      background:
        linear-gradient(#ff4a2f 0 0) 50% 29% / 24px 3px no-repeat,
        linear-gradient(#ff4a2f 0 0) 50% 50% / 24px 3px no-repeat,
        linear-gradient(#ff4a2f 0 0) 50% 71% / 24px 3px no-repeat,
        linear-gradient(135deg, rgba(255, 72, 45, 0.28), rgba(255, 40, 45, 0.08));
      box-shadow: inset 0 0 0 1px rgba(255, 73, 35, 0.16);
      font-size: 0;
    }

    .schedule-day h3 {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 16px;
      margin: 0;
      color: #f7f4ef;
      font-size: clamp(18px, 2vw, 25px);
      line-height: 1;
      font-weight: 950;
      letter-spacing: 0;
      text-transform: uppercase;
      text-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
    }

    .schedule-day h3::after {
      content: "";
      height: 2px;
      background: linear-gradient(90deg, #ff4a2f, transparent);
    }

    .schedule-items {
      display: grid;
      gap: 9px;
    }

    .schedule-item {
      display: grid;
      grid-template-columns: 74px minmax(0, 1fr) minmax(148px, 190px);
      align-items: center;
      gap: 14px;
      min-height: 88px;
      padding: 10px 14px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-left: 4px solid #ff4a2f;
      border-radius: 8px;
      background:
        linear-gradient(135deg, rgba(255, 83, 37, 0.045), transparent 46%),
        rgba(7, 8, 7, 0.84);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.045),
        0 12px 26px rgba(0, 0, 0, 0.22);
    }

    .competition-badge {
      width: 60px;
      height: 60px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 10px;
      color: #ff8a16;
      background:
        radial-gradient(circle at 35% 20%, rgba(255, 90, 42, 0.1), transparent 34%),
        #050606;
      font-size: 22px;
      font-weight: 950;
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.03),
        0 8px 20px rgba(0, 0, 0, 0.26);
    }

    .competition-badge.has-logo {
      padding: 8px;
      overflow: hidden;
    }

    .competition-logo {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
      filter:
        saturate(1.08)
        contrast(1.05)
        drop-shadow(0 6px 10px rgba(0, 0, 0, 0.46));
    }

    .schedule-copy {
      min-width: 0;
    }

    .schedule-title {
      display: block;
      min-height: 0;
      margin-bottom: 8px;
      padding: 0;
      border-radius: 0;
      color: #ff8318;
      background: transparent;
      font-size: clamp(14px, 1.2vw, 18px);
      font-weight: 950;
      line-height: 1.08;
      text-align: left;
      text-transform: uppercase;
    }

    .schedule-details {
      display: grid;
      gap: 4px;
    }

    .schedule-item p {
      margin: 0;
      color: #f7f4ef;
      font-size: 13px;
      line-height: 1.2;
      font-weight: 500;
    }

    .schedule-item small {
      min-width: 76px;
      margin-right: 7px;
      color: rgba(247, 244, 239, 0.66);
      font-size: 10px;
      font-weight: 850;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .schedule-item strong {
      color: #f7f4ef;
      font-size: 13px;
      font-weight: 650;
    }

    .schedule-meta {
      display: grid;
      gap: 9px;
      margin: 0;
      padding-left: 14px;
      border-left: 1px solid rgba(255, 255, 255, 0.14);
      color: #f7f4ef;
      font-size: 13px;
      font-weight: 700;
    }

    .schedule-meta span {
      display: grid;
      grid-template-columns: 18px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .schedule-meta span::before {
      content: "";
      width: 13px;
      height: 13px;
      border: 2px solid #ff4a2f;
      border-radius: 50%;
    }

    .schedule-meta span:first-child::before {
      content: "";
      color: transparent;
      font-size: 0;
    }

    .schedule-meta span:last-child::before {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 3px;
      background: #ff4a2f;
      transform: rotate(45deg);
    }

    .schedule-empty {
      grid-column: 1 / -1;
      padding: 18px;
      border: 1px solid rgba(255, 73, 35, 0.22);
      border-radius: 8px;
      color: rgba(247, 244, 239, 0.7);
      background: rgba(255, 255, 255, 0.035);
      text-align: center;
      font-weight: 800;
    }

    .agenda-footer {
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      margin: 12px -38px -22px;
      padding: 20px;
      border-top: 1px solid rgba(255, 73, 35, 0.28);
      color: rgba(247, 244, 239, 0.86);
      font-size: 12px;
      font-weight: 850;
      letter-spacing: 0.56em;
      text-transform: uppercase;
    }

    .agenda-footer::before {
      content: "GSC";
      display: grid;
      place-items: center;
      width: 26px;
      height: 32px;
      border: 1px solid #ff4a2f;
      clip-path: polygon(50% 0, 93% 16%, 86% 69%, 50% 100%, 14% 69%, 7% 16%);
      color: #ff4a2f;
      font-size: 7px;
      letter-spacing: 0;
    }

    .agenda-footer span {
      color: #ff4a2f;
      letter-spacing: 0.2em;
    }

    @media (max-width: 1040px) {
      .current-week-heading {
        align-items: start;
        flex-direction: column;
      }

      .agenda-brand {
        width: 100%;
        padding-right: 0;
        padding-bottom: 16px;
        border-right: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.16);
      }

      .agenda-controls {
        width: 100%;
        min-width: 0;
      }

      .schedule-grid {
        grid-template-columns: 1fr;
      }

      .schedule-day {
        min-height: 0;
      }
    }

    @media (max-width: 760px) {
      .current-week-heading {
        min-height: 0;
        padding: 18px;
      }

      .agenda-brand {
        grid-template-columns: 104px minmax(0, 1fr);
        column-gap: 14px;
      }

      .agenda-logo {
        width: 104px;
        max-height: 40px;
      }

      .current-week-heading h2 {
        font-size: 28px;
      }

      .agenda-controls {
        grid-template-columns: 40px 1fr auto;
      }

      .agenda-controls::before {
        width: 40px;
        height: 40px;
      }

      .agenda-week-row {
        grid-column: 1 / -1;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 8px;
      }

      .agenda-sync {
        grid-column: 1 / -1;
        text-align: left;
      }

      .agenda-week-chip {
        min-width: 54px;
        min-height: 38px;
        font-size: 14px;
      }

      .schedule-grid {
        padding: 18px;
      }

      .schedule-day-header {
        grid-template-columns: 48px minmax(0, 1fr);
        gap: 12px;
      }

      .schedule-day-icon {
        width: 42px;
        height: 42px;
      }

      .schedule-day h3 {
        gap: 12px;
        font-size: 20px;
      }

      .schedule-item {
        grid-template-columns: 64px minmax(0, 1fr);
        gap: 12px;
        min-height: 0;
        padding: 12px;
      }

      .competition-badge {
        width: 58px;
        height: 58px;
      }

      .schedule-meta {
        grid-column: 1 / -1;
        padding-left: 0;
        padding-top: 10px;
        border-left: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
      }

      .agenda-footer {
        margin: 6px -18px -18px;
        padding: 16px;
        gap: 10px;
        font-size: 10px;
        letter-spacing: 0.24em;
      }
    }
  `;
  document.head.appendChild(style);

  function addDays(date, days) {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate;
  }

  function mondayOf(date) {
    const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = monday.getDay();
    monday.setDate(monday.getDate() + (day === 0 ? -6 : 1 - day));
    return monday;
  }

  function calendarWeeksForMonth(monthIndex, year = CALENDAR_YEAR) {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const weeks = [];
    let cursor = mondayOf(firstDay);
    let index = 1;

    while (cursor <= lastDay) {
      weeks.push({
        value: `${year}-${String(monthIndex + 1).padStart(2, "0")}-S${index}`,
        code: `S${index}`,
        start: new Date(cursor),
        end: addDays(cursor, 6),
      });
      cursor = addDays(cursor, 7);
      index += 1;
    }

    return weeks;
  }

  function formatShortWeekDate(date) {
    return new Intl.DateTimeFormat("es-GT", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  function renderAgendaPeriodLabel(monthIndex, selectedWeek, selectedWeekRange) {
    const weekCode = formatSheetWeekLabel(selectedWeek) || "Semana";
    const rangeLabel = selectedWeekRange
      ? `${formatShortWeekDate(selectedWeekRange.start)} - ${formatShortWeekDate(selectedWeekRange.end)}`
      : "";

    return `
      <span class="agenda-period-label">
        <span class="agenda-period-main">${escapeHtml(getAgendaMonthLabel(monthIndex))} · ${escapeHtml(weekCode)}</span>
        <span class="agenda-period-range">${escapeHtml(rangeLabel)}</span>
      </span>
    `;
  }

  function getCompetitionBadge(record) {
    const program = normalizeForMatch(record.program);
    const text = normalizeForMatch([record.coverage, record.program, record.type].join(" "));
    if (program.includes("copa cima") || text.includes("copa cima")) {
      return { label: "Copa Cima", kind: "copa-cima", logo: "./assets/programs/copa-cima.webp" };
    }
    if (program.includes("tercera") || text.includes("tercera division")) {
      return { label: "Tercera Division", kind: "tercera-division", logo: "./assets/programs/tercera-division.webp" };
    }
    if (program.includes("juventus") || text.includes("juventus academy")) {
      return { label: "Juventus Academy", kind: "juventus-academy", logo: "./assets/programs/juventus-academy.webp" };
    }
    if (program === "gsa" || text.includes("global sports academy") || text.includes("gsa")) {
      return { label: "GSA", kind: "gsa", logo: "./assets/programs/gsa.webp" };
    }
    if (program === "gba" || text.includes("global basketball academy") || text.includes("gba")) {
      return { label: "GBA", kind: "gba", logo: "./assets/programs/gba.webp" };
    }
    if (program.includes("liga estudiantil") || text.includes("liga estudiantil")) {
      return { label: "Liga Estudiantil", kind: "liga-estudiantil", logo: "./assets/programs/liga-estudiantil.webp" };
    }
    return { label: "GSC", kind: "general" };
  }

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

  function renderPremiumScheduleItem(record) {
    const badge = getCompetitionBadge(record);
    const badgeContent = badge.logo
      ? `<img class="competition-logo" src="${escapeHtml(badge.logo)}" alt="${escapeHtml(badge.label)}" />`
      : escapeHtml(badge.label);

    return `
      <section class="schedule-item">
        <div class="competition-badge ${badge.logo ? "has-logo" : ""}" data-kind="${escapeHtml(badge.kind)}">${badgeContent}</div>
        <div class="schedule-copy">
          <div class="schedule-title">${escapeHtml(record.coverage)}</div>
          <div class="schedule-details">
            <p><small>Encargado:</small> <strong>${escapeHtml(record.person)}</strong></p>
            <p><small>Programa:</small> <strong>${escapeHtml(record.program || "Sin programa")}</strong></p>
          </div>
        </div>
        <div class="schedule-meta">
          <span>${escapeHtml(record.time || "Pendiente")}</span>
          <span>${escapeHtml(record.venue || "Sin sede")}</span>
        </div>
      </section>
    `;
  }

  renderCurrentWeek = function renderPremiumAgenda() {
    const monthIndex = getSelectedAgendaMonthIndex();
    const availableWeeks = calendarWeeksForMonth(monthIndex).map((week) => week.value);
    const selectedWeek = resolveSelectedSheetWeek(availableWeeks);
    const selectedWeekRange = getWeekRangeFromValue(selectedWeek);
    const weeklyRecords = getAgendaMonthRecords()
      .filter((record) => record.status !== "Cancelada")
      .filter((record) => selectedWeekRange && isInDateRange(record.date, selectedWeekRange.start, selectedWeekRange.end))
      .sort(compareRecordsBySchedule);

    renderAgendaWeekButtons(availableWeeks, selectedWeek);
    document.querySelector("#currentWeekLabel").innerHTML = renderAgendaPeriodLabel(
      monthIndex,
      selectedWeek,
      selectedWeekRange,
    );
    document.querySelector("#currentWeekRows").innerHTML = weeklyRecords.length
      ? `${Object.entries(groupBy(weeklyRecords, (record) => record.date))
          .map(
            ([date, items]) => `
              <article class="schedule-day">
                <div class="schedule-day-header">
                  <div class="schedule-day-icon">Agenda</div>
                  <h3>${escapeHtml(formatScheduleDay(date))}</h3>
                </div>
                <div class="schedule-items">
                  ${items.map(renderPremiumScheduleItem).join("")}
                </div>
              </article>
            `,
          )
          .join("")}
          <div class="agenda-footer">Planificamos <span>·</span> Organizamos <span>·</span> Competimos</div>`
      : `<div class="schedule-empty">Sin coberturas registradas para esta semana.</div>`;
  };

  render();
})();
