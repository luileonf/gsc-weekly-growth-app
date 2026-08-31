(function applyCalendarWeekFix() {
  const CALENDAR_YEAR = 2026;

  if (Array.isArray(GOOGLE_SHEET_TABS) && !GOOGLE_SHEET_TABS.some((tab) => tab.name === "Septiembre")) {
    GOOGLE_SHEET_TABS.push({ name: "Septiembre", gid: "195641769" });
  }

  function localDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

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

  function weekRangeFromValue(value) {
    const match = String(value || "").match(/^(\d{4})-(\d{2})-S(\d+)$/);
    if (!match) {
      return null;
    }

    const [, yearText, monthText, weekText] = match;
    return calendarWeeksForMonth(Number(monthText) - 1, Number(yearText)).find(
      (week) => week.code === `S${Number(weekText)}`,
    ) || null;
  }

  function shortWeekDate(date) {
    return new Intl.DateTimeFormat("es-GT", {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  function weekRangeLabel(week) {
    return week ? `${shortWeekDate(week.start)} - ${shortWeekDate(week.end)}` : "";
  }

  function selectedAgendaMonthIndex(selectedMonth) {
    if (selectedMonth && selectedMonth !== "Todos") {
      return MONTHS.indexOf(selectedMonth);
    }
    return getCurrentWeekBounds(new Date()).end.getMonth();
  }

  getWeekRangeFromValue = weekRangeFromValue;

  getRecordWeekLabel = function getRecordCalendarWeekLabel(record, monthIndex = null) {
    const date = localDate(record.date);
    const resolvedMonthIndex = monthIndex ?? date.getMonth();
    const week = calendarWeeksForMonth(resolvedMonthIndex).find((item) => date >= item.start && date <= item.end);
    return week?.value || "";
  };

  formatSheetWeekLabel = function formatCalendarWeekLabel(value) {
    if (!value || value === "Todas") {
      return value || "";
    }
    return weekRangeFromValue(value)?.code || String(value).replace(/\s+/g, " ").trim();
  };

  formatSheetWeekTitle = function formatCalendarWeekTitle(value) {
    if (value === "Todas") {
      return "Todas las semanas del mes";
    }
    const week = weekRangeFromValue(value);
    return week ? `${week.code} · ${weekRangeLabel(week)}` : formatSheetWeekLabel(value);
  };

  getPeriodFilteredRecords = function getCalendarPeriodFilteredRecords() {
    const month = document.querySelector("#monthFilter").value;
    const weekRange = weekRangeFromValue(document.querySelector("#semesterFilter").value);

    return records.filter((record) => {
      const matchesPerson = TEAM_MEMBERS.includes(record.person);
      const matchesMonth = weekRange || month === "Todos" || getMonthName(record.date) === month;
      const matchesWeek = !weekRange || isInDateRange(record.date, weekRange.start, weekRange.end);
      return matchesPerson && matchesMonth && matchesWeek;
    });
  };

  getSelectedAgendaMonthIndex = function getCalendarAgendaMonthIndex() {
    return selectedAgendaMonthIndex(document.querySelector("#monthFilter").value);
  };

  getAgendaMonthRecords = function getCalendarAgendaMonthRecords() {
    const weeks = calendarWeeksForMonth(getSelectedAgendaMonthIndex());
    const start = weeks[0]?.start;
    const end = weeks.at(-1)?.end;

    return records
      .filter((record) => TEAM_MEMBERS.includes(record.person))
      .filter((record) => start && end && isInDateRange(record.date, start, end));
  };

  resolveSelectedSheetWeek = function resolveCalendarWeek(availableWeeks) {
    const selected = document.querySelector("#semesterFilter").value;
    if (selected && selected !== "Todas" && availableWeeks.includes(selected)) {
      return selected;
    }

    const today = localDate(toIsoDate(new Date()));
    const currentWeek = availableWeeks.find((value) => {
      const week = weekRangeFromValue(value);
      return week && today >= week.start && today <= week.end;
    });
    return currentWeek || availableWeeks[0] || "";
  };

  renderFilterChips = function renderCalendarFilterChips(containerId, selectId, values, selectedValue, kind) {
    document.querySelector(containerId).innerHTML = values
      .map(
        (value) => `
          <button
            class="filter-chip ${value === selectedValue ? "is-active" : ""}"
            type="button"
            data-select="${selectId}"
            data-value="${escapeHtml(value)}"
            title="${escapeHtml(kind === "semester" ? formatSheetWeekTitle(value) : value)}"
          >
            ${escapeHtml(getFilterLabel(value, kind))}
          </button>
        `,
      )
      .join("");
  };

  renderAgendaWeekButtons = function renderCalendarAgendaWeekButtons(weeks, selectedWeek) {
    document.querySelector("#agendaWeekButtons").innerHTML = weeks
      .map(
        (value) => `
          <button
            class="agenda-week-chip ${value === selectedWeek ? "is-active" : ""}"
            type="button"
            data-week="${escapeHtml(value)}"
            title="${escapeHtml(formatSheetWeekTitle(value))}"
          >
            ${escapeHtml(formatSheetWeekLabel(value))}
          </button>
        `,
      )
      .join("");
  };

  renderFilters = function renderCalendarFilters() {
    const currentPerson = document.querySelector("#personFilter").value || TEAM_MEMBERS[0];
    const currentMonth = document.querySelector("#monthFilter").value || "Todos";
    const currentSemester = document.querySelector("#semesterFilter").value || "Todas";
    const configuredMonths = GOOGLE_SHEET_TABS.map((tab) => tab.name).filter((name) => MONTHS.includes(name));
    const monthsWithRecords = MONTHS.filter((month) => records.some((record) => getMonthName(record.date) === month));
    const months = ["Todos", ...MONTHS.filter((month) => configuredMonths.includes(month) || monthsWithRecords.includes(month))];
    const weeks = calendarWeeksForMonth(selectedAgendaMonthIndex(currentMonth)).map((week) => week.value);

    fillSelect(document.querySelector("#personFilter"), TEAM_MEMBERS, currentPerson);
    renderPersonButtons(document.querySelector("#personFilter").value);
    fillSelect(document.querySelector("#monthFilter"), months, currentMonth);
    fillSelect(document.querySelector("#semesterFilter"), ["Todas", ...weeks], currentSemester);
    renderFilterChips("#monthButtons", "monthFilter", months, document.querySelector("#monthFilter").value, "month");
    renderFilterChips("#semesterButtons", "semesterFilter", ["Todas", ...weeks], document.querySelector("#semesterFilter").value, "semester");
  };

  renderWeekGrid = function renderCalendarWeekGrid(filtered) {
    const monthIndex = selectedAgendaMonthIndex(document.querySelector("#monthFilter").value);
    const groups = groupBy(filtered, (record) => getRecordWeekLabel(record, monthIndex));
    const weeks = calendarWeeksForMonth(monthIndex).map((week) => week.value);
    const total = sumCounts(filtered);

    document.querySelector("#weekTotalLabel").textContent = `${total} total`;
    document.querySelector("#weekGrid").innerHTML = weeks
      .map((weekValue) => {
        const week = weekRangeFromValue(weekValue);
        const count = sumCounts(groups[weekValue] || []);
        return `<article class="week-card"><span title="${escapeHtml(formatSheetWeekTitle(weekValue))}">${escapeHtml(formatSheetWeekLabel(weekValue))}</span><strong>${count}</strong><p style="margin:7px 0 0;color:var(--muted);font-size:10px;font-weight:800;white-space:nowrap;">${escapeHtml(weekRangeLabel(week))}</p></article>`;
      })
      .join("");
  };

  renderCurrentWeek = function renderCalendarCurrentWeek() {
    const monthIndex = getSelectedAgendaMonthIndex();
    const availableWeeks = calendarWeeksForMonth(monthIndex).map((week) => week.value);
    const selectedWeek = resolveSelectedSheetWeek(availableWeeks);
    const selectedWeekRange = weekRangeFromValue(selectedWeek);
    const weeklyRecords = getAgendaMonthRecords()
      .filter((record) => record.status !== "Cancelada")
      .filter((record) => selectedWeekRange && isInDateRange(record.date, selectedWeekRange.start, selectedWeekRange.end))
      .sort((a, b) => a.date.localeCompare(b.date) || a.person.localeCompare(b.person) || a.time.localeCompare(b.time));

    renderAgendaWeekButtons(availableWeeks, selectedWeek);
    document.querySelector("#currentWeekLabel").textContent = `${getAgendaMonthLabel(monthIndex)} · ${formatSheetWeekTitle(selectedWeek) || "Sin semana"} · ${weeklyRecords.length} filas`;
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

  render();
})();
