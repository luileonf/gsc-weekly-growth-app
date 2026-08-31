(function applyAgendaDesign() {
  const CALENDAR_YEAR = 2026;

  const style = document.createElement("style");
  style.textContent = `
    .current-week-panel {
      position: relative;
      overflow: hidden;
      border-color: rgba(255, 190, 64, 0.24);
      background:
        radial-gradient(circle at 18% 0%, rgba(255, 202, 85, 0.14), transparent 34%),
        linear-gradient(135deg, rgba(7, 9, 9, 0.98), rgba(23, 18, 15, 0.96));
      box-shadow: 0 22px 60px rgba(0, 0, 0, 0.34);
    }

    .current-week-heading {
      min-height: 104px;
      padding: 18px 22px;
      border-bottom: 1px solid rgba(255, 190, 64, 0.16);
    }

    .current-week-heading > div:first-child {
      position: relative;
      display: grid;
      grid-template-columns: 82px auto;
      align-items: center;
      column-gap: 18px;
    }

    .current-week-heading > div:first-child::before {
      content: "▣";
      width: 74px;
      height: 74px;
      display: grid;
      place-items: center;
      grid-row: 1 / 3;
      border: 1px solid rgba(255, 190, 64, 0.5);
      border-radius: 20px;
      color: var(--amber);
      background:
        linear-gradient(145deg, rgba(255, 211, 106, 0.14), rgba(0, 0, 0, 0.34)),
        rgba(8, 8, 8, 0.7);
      box-shadow: inset 0 0 22px rgba(255, 190, 64, 0.08);
      font-size: 32px;
    }

    .current-week-heading .eyebrow {
      margin: 0;
      align-self: end;
      color: var(--amber);
      font-size: 13px;
    }

    .current-week-heading h2 {
      position: relative;
      margin: 0;
      padding-bottom: 11px;
      color: var(--ink);
      font-size: 24px;
      line-height: 1;
    }

    .current-week-heading h2::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 88px;
      height: 3px;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--amber), transparent);
    }

    .agenda-controls {
      gap: 12px;
    }

    .current-week-heading span {
      color: rgba(251, 247, 240, 0.88);
      font-size: 14px;
    }

    .agenda-week-row {
      gap: 12px;
    }

    .agenda-week-chip {
      min-width: 74px;
      min-height: 42px;
      border-color: rgba(255, 255, 255, 0.13);
      background: rgba(0, 0, 0, 0.24);
      font-size: 15px;
    }

    .agenda-week-chip.is-active {
      box-shadow: 0 14px 34px rgba(255, 150, 38, 0.26);
    }

    .schedule-grid {
      grid-template-columns: repeat(auto-fit, minmax(430px, 1fr));
      gap: 16px;
      padding: 16px 22px 22px;
    }

    .schedule-day {
      position: relative;
      min-height: 310px;
      overflow: hidden;
      padding: 18px 26px 20px;
      border: 1px solid rgba(255, 190, 64, 0.2);
      border-radius: 8px;
      background:
        linear-gradient(135deg, rgba(255, 211, 106, 0.08), transparent 28%),
        linear-gradient(145deg, rgba(69, 52, 41, 0.9), rgba(21, 16, 13, 0.94));
    }

    .schedule-day::after {
      content: "";
      position: absolute;
      inset: 0 0 auto auto;
      width: 190px;
      height: 86px;
      opacity: 0.16;
      background: repeating-linear-gradient(135deg, var(--amber) 0 8px, transparent 8px 18px);
      pointer-events: none;
    }

    .schedule-day::before {
      content: "⚽";
      position: absolute;
      right: 16%;
      bottom: 18px;
      color: rgba(255, 211, 106, 0.05);
      font-size: 180px;
      line-height: 1;
      pointer-events: none;
    }

    .schedule-day-header {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 58px 1fr;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .schedule-day-icon {
      width: 54px;
      height: 54px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 190, 64, 0.58);
      border-radius: 13px;
      color: var(--amber);
      background: rgba(7, 7, 7, 0.55);
      font-size: 25px;
    }

    .schedule-day h3 {
      position: relative;
      margin: 0;
      padding-bottom: 12px;
      text-align: left;
      text-transform: uppercase;
      font-size: 22px;
      line-height: 1.05;
    }

    .schedule-day h3::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 58px;
      height: 3px;
      border-radius: 999px;
      background: var(--amber);
    }

    .schedule-items {
      position: relative;
      z-index: 1;
      gap: 10px;
    }

    .schedule-item {
      position: relative;
      display: grid;
      grid-template-columns: 92px 1fr;
      gap: 0 20px;
      padding: 18px 22px 16px;
      border: 1px solid rgba(255, 190, 64, 0.16);
      border-left: 3px solid #35d246;
      border-radius: 8px;
      background:
        linear-gradient(135deg, rgba(255, 211, 106, 0.05), transparent 42%),
        rgba(17, 13, 11, 0.72);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
    }

    .schedule-item:last-child {
      border-bottom: 1px solid rgba(255, 190, 64, 0.16);
    }

    .competition-badge {
      grid-row: 1 / 4;
      align-self: center;
      width: 68px;
      height: 68px;
      display: grid;
      place-items: center;
      border: 2px solid rgba(255, 200, 74, 0.78);
      border-radius: 50%;
      color: var(--amber);
      background:
        radial-gradient(circle at 34% 24%, rgba(255, 211, 106, 0.2), transparent 36%),
        #11100e;
      box-shadow:
        inset 0 0 18px rgba(255, 211, 106, 0.1),
        0 8px 18px rgba(0, 0, 0, 0.32);
      font-size: 28px;
      font-weight: 950;
      letter-spacing: 0;
    }

    .competition-badge[data-kind="gba"] {
      font-size: 16px;
    }

    .schedule-title {
      justify-content: flex-start;
      min-height: auto;
      padding: 0;
      background: transparent;
      font-size: 17px;
      line-height: 1.15;
      text-align: left;
    }

    .schedule-title span {
      flex: 0 0 auto;
      width: 14px;
      height: 14px;
      box-shadow: 0 0 0 4px rgba(70, 211, 62, 0.11);
    }

    .schedule-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 24px;
      margin-top: 14px;
      padding-bottom: 13px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .schedule-item p {
      min-width: 0;
      font-size: 13px;
    }

    .schedule-item small {
      display: inline-block;
      margin-right: 8px;
      color: rgba(251, 247, 240, 0.63);
      font-size: 10px;
    }

    .schedule-item strong {
      font-size: 14px;
    }

    .schedule-meta {
      grid-column: 2;
      margin-top: 12px;
      gap: 20px;
      font-size: 15px;
    }

    .schedule-meta span:first-child::before {
      content: "◷";
      font-size: 18px;
    }

    .schedule-meta span:last-child::before {
      content: "⌖";
      font-size: 17px;
    }

    @media (max-width: 760px) {
      .current-week-heading {
        padding: 16px;
      }

      .current-week-heading > div:first-child {
        grid-template-columns: 58px auto;
      }

      .current-week-heading > div:first-child::before {
        width: 50px;
        height: 50px;
        border-radius: 14px;
        font-size: 23px;
      }

      .current-week-heading h2 {
        font-size: 20px;
      }

      .schedule-grid {
        grid-template-columns: 1fr;
        padding: 12px;
      }

      .schedule-day {
        min-height: auto;
        padding: 14px;
      }

      .schedule-day-header {
        grid-template-columns: 48px 1fr;
      }

      .schedule-day-icon {
        width: 44px;
        height: 44px;
      }

      .schedule-day h3 {
        font-size: 19px;
      }

      .schedule-item {
        grid-template-columns: 62px 1fr;
        gap: 0 13px;
        padding: 14px;
      }

      .competition-badge {
        width: 52px;
        height: 52px;
        font-size: 22px;
      }

      .competition-badge[data-kind="gba"] {
        font-size: 13px;
      }

      .schedule-details {
        grid-template-columns: 1fr;
      }

      .schedule-meta {
        grid-column: 1 / -1;
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

  function getCompetitionBadge(record) {
    const text = normalizeForMatch([record.coverage, record.program, record.type].join(" "));
    if (text.includes("gba")) {
      return { label: "GBA", kind: "gba" };
    }
    if (text.includes("academ") || text.includes("academy")) {
      return { label: "▰", kind: "academy" };
    }
    if (text.includes("jag") || text.includes("cantera") || text.includes("futbol")) {
      return { label: "●", kind: "football" };
    }
    if (text.includes("copa") || text.includes("torneo") || text.includes("division")) {
      return { label: "♕", kind: "cup" };
    }
    return { label: "★", kind: "general" };
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
    return `
      <section class="schedule-item">
        <div class="competition-badge" data-kind="${escapeHtml(badge.kind)}">${escapeHtml(badge.label)}</div>
        <div class="schedule-title"><span></span>${escapeHtml(record.coverage)}</div>
        <div class="schedule-details">
          <p><small>Encargado:</small> <strong>${escapeHtml(record.person)}</strong></p>
          <p><small>Programa:</small> <strong>${escapeHtml(record.program || "Sin programa")}</strong></p>
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
    document.querySelector("#currentWeekLabel").textContent =
      `${getAgendaMonthLabel(monthIndex)} · ${formatSheetWeekTitle(selectedWeek) || "Sin semana"} · ${weeklyRecords.length} filas`;
    document.querySelector("#currentWeekRows").innerHTML = weeklyRecords.length
      ? Object.entries(groupBy(weeklyRecords, (record) => record.date))
          .map(
            ([date, items]) => `
              <article class="schedule-day">
                <div class="schedule-day-header">
                  <div class="schedule-day-icon">▣</div>
                  <h3>${escapeHtml(formatScheduleDay(date))}</h3>
                </div>
                <div class="schedule-items">
                  ${items.map(renderPremiumScheduleItem).join("")}
                </div>
              </article>
            `,
          )
          .join("")
      : `<div class="schedule-empty">Sin coberturas registradas para esta semana.</div>`;
  };

  render();
})();
