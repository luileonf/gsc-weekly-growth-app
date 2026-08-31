(function applyScheduleSortFix() {
  const CALENDAR_YEAR = 2026;

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

  function getStartMinutes(timeValue) {
    const source = String(timeValue || "").toLowerCase();
    if (!source.trim()) {
      return Number.POSITIVE_INFINITY;
    }

    const normalized = source
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\./g, "")
      .replace(/\s+/g, " ")
      .trim();

    const compact = normalized
      .replace(/\bhrs?\b/g, "")
      .replace(/\bhoras?\b/g, "")
      .replace(/\s+/g, "");

    const matches = [...compact.matchAll(/(\d{1,2})(?::(\d{2}))?(am|pm)?/g)];
    if (!matches.length) {
      return Number.POSITIVE_INFINITY;
    }

    const first = matches[0];
    const nextMeridiem = matches.find((match) => match[3])?.[3] || "";
    const meridiem = first[3] || nextMeridiem;
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

  renderCurrentWeek = function renderSortedCurrentWeek() {
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
                <h3>${escapeHtml(formatScheduleDay(date))}</h3>
                <div class="schedule-items">
                  ${items
                    .map(
                      (record) => `
                        <section class="schedule-item">
                          <div class="schedule-title"><span></span>${escapeHtml(record.coverage)}</div>
                          <p><small>Encargado:</small> <strong>${escapeHtml(record.person)}</strong></p>
                          <p><small>Programa:</small> <strong>${escapeHtml(record.program || "Sin programa")}</strong></p>
                          <div class="schedule-meta">
                            <span>${escapeHtml(record.time || "Sin horario")}</span>
                            <span>${escapeHtml(record.venue || "Sin sede")}</span>
                          </div>
                        </section>
                      `,
                    )
                    .join("")}
                </div>
              </article>
            `,
          )
          .join("")
      : `<div class="schedule-empty">Sin coberturas registradas para esta semana.</div>`;
  };

  renderTable = function renderSortedTable(filtered) {
    const sorted = [...filtered].sort(compareRecordsBySchedule);
    document.querySelector("#recordCountLabel").textContent = `${sorted.length} filas`;
    document.querySelector("#recordsTable").innerHTML = sorted.length
      ? sorted
          .map((record) => {
            const badgeClass =
              record.status === "Cancelada"
                ? "cancelled"
                : record.status === "Pendiente" || record.status === "Planificada"
                  ? "pending"
                  : "";
            return `
              <tr>
                <td>${escapeHtml(formatDate(record.date))}</td>
                <td>${escapeHtml(record.person)}</td>
                <td>${escapeHtml(record.coverage)}</td>
                <td>${escapeHtml(record.venue)}</td>
                <td>${escapeHtml(record.program)}</td>
                <td>${parseNumber(record.count)}</td>
                <td>${getCoverageAmount(record) ? formatCurrency(getCoverageAmount(record)) : ""}</td>
                <td><span class="badge ${badgeClass}">${escapeHtml(record.status || "Realizada")}</span></td>
              </tr>
            `;
          })
          .join("")
      : `<tr><td class="empty-row" colspan="8">Sin datos para estos filtros</td></tr>`;
  };

  render();
})();
