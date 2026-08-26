const STORAGE_KEY = "gscCoverageRecords.v5";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const COVERAGE_RATE = 250;
const GOOGLE_SHEET_ID = "10p4rnU1EiiXm9KXStpOw4Gav70FKS_quGtQdWiQM3aA";
const GOOGLE_SHEET_TABS = [
  { name: "Enero", gid: "981658448" },
  { name: "Febrero", gid: "1408983268" },
  { name: "Marzo", gid: "1999822357" },
  { name: "Abril", gid: "1828000831" },
  { name: "Mayo", gid: "1923502420" },
  { name: "Junio", gid: "322979845" },
  { name: "Agosto", gid: "8252026" },
];
const TEAM_MEMBERS = [
  "Gabriel Ordonez",
  "Josue Giron",
  "Daniel Ruano",
];

const TEAM_MEMBER_LABELS = {
  "Gabriel Ordonez": "Gabriel",
  "Josue Giron": "Josue",
  "Daniel Ruano": "Daniel",
};

const DEFAULT_RECORDS = [
  {
    id: "jun-2026-daniel-1",
    date: "2026-06-03",
    person: "Daniel Ruano",
    time: "5:15 - 7:00pm / 5:00 - 6:30pm / 6:30 - 8:00pm",
    coverage: "GRA / Juventus Academy / Juventus Academy",
    venue: "Colegio Interamericano",
    program: "Marca MIXTA",
    type: "Marca MIXTA",
    count: 2,
    status: "Realizada",
    notes: "Importado del corte de junio",
  },
  {
    id: "jun-2026-daniel-2",
    date: "2026-06-04",
    person: "Daniel Ruano",
    time: "4:15 - 5:45pm / 4:15 - 5:45pm / 4:00 - 6:00pm",
    coverage: "Juventus Academy / GBA",
    venue: "Colegio El Roble",
    program: "Marca MIXTA",
    type: "Marca MIXTA",
    count: 2,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-daniel-3",
    date: "2026-06-09",
    person: "Daniel Ruano",
    time: "4:15 - 5:00pm / 4:15 - 5:45pm / 4:15 - 5:45pm",
    coverage: "Baby Juve / Juventus Academy / GBA",
    venue: "Colegio El Roble",
    program: "Marca MIXTA",
    type: "Marca MIXTA",
    count: 2,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-daniel-4",
    date: "2026-06-11",
    person: "Daniel Ruano",
    time: "3:00 - 6:00pm / 5:00 - 6:15pm",
    coverage: "DMV Track Camp / GSA",
    venue: "Colegio Interamericano",
    program: "Marca MIXTA",
    type: "Marca MIXTA",
    count: 2,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-daniel-5",
    date: "2026-06-15",
    person: "Daniel Ruano",
    time: "17:30 - 19:30",
    coverage: "Leones vs Kings / Sagrado vs GBA",
    venue: "HUB",
    program: "Partidos",
    type: "Salida fisica",
    count: 2,
    status: "Realizada",
    notes: "Agregado por ajuste manual",
  },
  {
    id: "jun-2026-daniel-6",
    date: "2026-06-24",
    person: "Daniel Ruano",
    time: "9 - 12PM",
    coverage: "GBA CAMP",
    venue: "Colegio Ingles Americano",
    program: "GBA",
    type: "CAMP",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-daniel-7",
    date: "2026-06-25",
    person: "Daniel Ruano",
    time: "9 - 12PM",
    coverage: "GBA CAMP",
    venue: "Colegio Ingles Americano",
    program: "GBA",
    type: "CAMP",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-gabriel-1",
    date: "2026-06-03",
    person: "Gabriel Ordonez",
    time: "6:30 - 8:00pm",
    coverage: "GSA Video",
    venue: "GSC Complex, Fraijanes",
    program: "GSA",
    type: "GSA",
    count: 1,
    status: "Realizada",
    notes: "Importado del corte de junio",
  },
  {
    id: "jun-2026-gabriel-2",
    date: "2026-06-04",
    person: "Gabriel Ordonez",
    time: "3:30 - 5:30pm / 4:00 - 5:30pm",
    coverage: "Nido Aguila / GBA",
    venue: "Colegio Internacional",
    program: "Marca MIXTA",
    type: "Marca MIXTA",
    count: 2,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-gabriel-3",
    date: "2026-06-10",
    person: "Gabriel Ordonez",
    time: "3:00 - 6:00pm",
    coverage: "DMV Track Camp / Campamento JAG",
    venue: "Colegio Interamericano",
    program: "CAMP",
    type: "CAMP",
    count: 2,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-gabriel-4",
    date: "2026-06-22",
    person: "Gabriel Ordonez",
    time: "8:30am - 12:00pm",
    coverage: "Apertura Campamento GBA",
    venue: "Colegio Ingles Americano",
    program: "CAMP",
    type: "CAMP",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-gabriel-5",
    date: "2026-06-25",
    person: "Gabriel Ordonez",
    time: "9:00",
    coverage: "CAMPS INTER",
    venue: "Colegio Interamericano",
    program: "CAMP",
    type: "CAMP",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-gabriel-6",
    date: "2026-06-26",
    person: "Gabriel Ordonez",
    time: "9 - 12PM",
    coverage: "GBA CAMP",
    venue: "Colegio Ingles Americano",
    program: "CAMP",
    type: "CAMP",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-josue-1",
    date: "2026-06-03",
    person: "Josue Giron",
    time: "3:00 - 3:45pm / 3:30 - 6:15pm / 4:00 - 7:00pm",
    coverage: "Baby Juve / Juventus Academy / Ser Portero",
    venue: "Colegio Suizo Americano",
    program: "Marca MIXTA",
    type: "Marca MIXTA",
    count: 3,
    status: "Realizada",
    notes: "Importado del corte de junio",
  },
  {
    id: "jun-2026-josue-2",
    date: "2026-06-08",
    person: "Josue Giron",
    time: "3:00 - 6:00pm",
    coverage: "DMV Track Camp",
    venue: "Colegio Interamericano",
    program: "CAMP",
    type: "CAMP",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-josue-3",
    date: "2026-06-22",
    person: "Josue Giron",
    time: "9 - 12PM",
    coverage: "Apertura CAMP Juve",
    venue: "Colegio Suizo Americano",
    program: "Juventus Academy",
    type: "Juventus Academy",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-josue-4",
    date: "2026-06-23",
    person: "Josue Giron",
    time: "9 - 12PM",
    coverage: "Camp Juve",
    venue: "Colegio Suizo Americano",
    program: "Juventus Academy",
    type: "Juventus Academy",
    count: 1,
    status: "Realizada",
    notes: "",
  },
  {
    id: "jun-2026-gabriel-shared-1",
    date: "2026-06-09",
    person: "Gabriel Ordonez",
    time: "3:00 - 6:00pm",
    coverage: "DMV Track Camp / Campamento JAG",
    venue: "Colegio Interamericano",
    program: "CAMP",
    type: "CAMP",
    count: 2,
    status: "Realizada",
    notes: "Fila compartida importada de junio",
  },
  {
    id: "jun-2026-josue-shared-1",
    date: "2026-06-09",
    person: "Josue Giron",
    time: "3:00 - 6:00pm",
    coverage: "DMV Track Camp / Campamento JAG",
    venue: "Colegio Interamericano",
    program: "CAMP",
    type: "CAMP",
    count: 2,
    status: "Realizada",
    notes: "Fila compartida importada de junio",
  },
  {
    id: "jun-2026-gabriel-shared-2",
    date: "2026-06-12",
    person: "Gabriel Ordonez",
    time: "3:00 - 6:00pm",
    coverage: "Cierre DMV Track Camp / Campamento JAG",
    venue: "Colegio Interamericano",
    program: "CAMP",
    type: "CAMP",
    count: 2,
    status: "Realizada",
    notes: "Fila compartida importada de junio",
  },
  {
    id: "jun-2026-josue-shared-2",
    date: "2026-06-12",
    person: "Josue Giron",
    time: "3:00 - 6:00pm",
    coverage: "Cierre DMV Track Camp / Campamento JAG",
    venue: "Colegio Interamericano",
    program: "CAMP",
    type: "CAMP",
    count: 2,
    status: "Realizada",
    notes: "Fila compartida importada de junio",
  },
  {
    id: "aug-2026-daniel-1",
    date: "2026-08-08",
    person: "Daniel Ruano",
    time: "9am",
    coverage: "Tercera",
    venue: "GSC COMPLEX",
    program: "Tercera Division Global",
    type: "Tercera Division Global",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-gabriel-1",
    date: "2026-08-08",
    person: "Gabriel Ordonez",
    time: "3PM",
    coverage: "Tercera",
    venue: "Futeca Cayala",
    program: "Tercera Division Juve",
    type: "Tercera Division Juve",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-josue-1",
    date: "2026-08-09",
    person: "Josue Giron",
    time: "9am - 10am",
    coverage: "Torneo Cejusa",
    venue: "Cejusa",
    program: "Juventus Academy",
    type: "Juventus Academy",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-daniel-2",
    date: "2026-08-12",
    person: "Daniel Ruano",
    time: "5:30 - 8:30pm",
    coverage: "Liga estudiantil Awards",
    venue: "Hotel Barcelo",
    program: "Liga Estudiantil",
    type: "Liga Estudiantil",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-gabriel-2",
    date: "2026-08-12",
    person: "Gabriel Ordonez",
    time: "5:30 - 8:30pm",
    coverage: "Liga estudiantil Awards",
    venue: "Hotel Barcelo",
    program: "Liga Estudiantil",
    type: "Liga Estudiantil",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-josue-2",
    date: "2026-08-12",
    person: "Josue Giron",
    time: "5:30 - 8:30pm",
    coverage: "Liga estudiantil Awards",
    venue: "Hotel Barcelo",
    program: "Liga Estudiantil",
    type: "Liga Estudiantil",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-gabriel-3",
    date: "2026-08-15",
    person: "Gabriel Ordonez",
    time: "9am",
    coverage: "Tercera",
    venue: "Futeca Cayala",
    program: "Tercera Division Global",
    type: "Tercera Division Global",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-daniel-3",
    date: "2026-08-15",
    person: "Daniel Ruano",
    time: "9am",
    coverage: "Tercera",
    venue: "Futeca Cayala",
    program: "Tercera Division Global",
    type: "Tercera Division Global",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-gabriel-4",
    date: "2026-08-15",
    person: "Gabriel Ordonez",
    time: "3:00 - 5:30pm",
    coverage: "Torneo academias privadas",
    venue: "Suizo Z16",
    program: "Juventus Academy",
    type: "Juventus Academy",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-daniel-4",
    date: "2026-08-22",
    person: "Daniel Ruano",
    time: "7:00 - 12pm",
    coverage: "Copa Cima",
    venue: "GSC COMPLEX",
    program: "Copa Cima",
    type: "Copa Cima",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-daniel-5",
    date: "2026-08-21",
    person: "Daniel Ruano",
    time: "7:00 - 12pm",
    coverage: "Copa Cima",
    venue: "GSC COMPLEX",
    program: "Copa Cima",
    type: "Copa Cima",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-gabriel-5",
    date: "2026-08-22",
    person: "Gabriel Ordonez",
    time: "7:00 - 12pm",
    coverage: "Copa Cima",
    venue: "GSC COMPLEX",
    program: "Copa Cima",
    type: "Copa Cima",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
  {
    id: "aug-2026-josue-3",
    date: "2026-08-23",
    person: "Josue Giron",
    time: "7:00 - 6pm",
    coverage: "Copa Cima",
    venue: "GSC COMPLEX",
    program: "Copa Cima",
    type: "Copa Cima",
    count: 1,
    status: "Realizada",
    notes: "Importado de agosto",
  },
];

function readRecords() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return DEFAULT_RECORDS;
  }
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : DEFAULT_RECORDS;
  } catch {
    return DEFAULT_RECORDS;
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  setSyncFeedback("Datos guardados en este navegador.");
}

let records = readRecords();

function normalizeText(value) {
  return String(value || "").trim();
}

function setSyncFeedback(message) {
  const feedback = document.querySelector("#syncFeedback");
  if (feedback) {
    feedback.textContent = message;
  }
}

function parseNumber(value) {
  const number = Number.parseFloat(String(value || "").replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

function normalizeForMatch(value) {
  return normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizePersonName(value) {
  const normalized = normalizeForMatch(value);
  if (normalized.includes("gabriel")) {
    return "Gabriel Ordonez";
  }
  if (normalized.includes("josue")) {
    return "Josue Giron";
  }
  if (normalized.includes("daniel")) {
    return "Daniel Ruano";
  }
  return "";
}

function getMonthName(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  return MONTHS[date.getMonth()] || "";
}

function getYear(dateValue) {
  return new Date(`${dateValue}T00:00:00`).getFullYear();
}

function getSemester(dateValue) {
  return new Date(`${dateValue}T00:00:00`).getMonth() < 6 ? "S1" : "S2";
}

function getWeekCode(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  return `S${Math.floor((date.getDate() - 1) / 7) + 1}`;
}

function getWeekOfMonth(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  return `Semana ${Math.floor((date.getDate() - 1) / 7) + 1}`;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }
  const date = new Date(`${dateValue}T00:00:00`);
  return new Intl.DateTimeFormat("es-GT", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatCurrency(value) {
  return `Q${Number(value || 0).toLocaleString("es-GT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function isBillableRecord(record) {
  return record.status === "Realizada";
}

function getCoverageAmount(record) {
  return isBillableRecord(record) ? parseNumber(record.count) * COVERAGE_RATE : 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getFilteredRecords() {
  const person = document.querySelector("#personFilter").value;
  return getPeriodFilteredRecords().filter((record) => record.person === person);
}

function getPeriodFilteredRecords() {
  const month = document.querySelector("#monthFilter").value;
  const semester = document.querySelector("#semesterFilter").value;

  return records.filter((record) => {
    const matchesPerson = TEAM_MEMBERS.includes(record.person);
    const matchesMonth = month === "Todos" || getMonthName(record.date) === month;
    const matchesSemester = semester === "Todas" || getRecordWeekLabel(record) === semester;
    return matchesPerson && matchesMonth && matchesSemester;
  });
}

function sumCounts(items) {
  return items.reduce((sum, record) => sum + parseNumber(record.count), 0);
}

function groupBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "Sin dato";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function uniqueInOrder(values) {
  return values.filter((value, index, array) => value && array.indexOf(value) === index);
}

function getRecordWeekLabel(record) {
  if (record.sheetWeek) {
    return record.sheetWeek;
  }
  const weekNumber = getWeekCode(record.date).replace("S", "");
  return `SEMANA#${weekNumber} - ${getMonthName(record.date)} ${getYear(record.date)}`;
}

function formatSheetWeekLabel(value) {
  if (!value || value === "Todas") {
    return value || "";
  }
  return String(value)
    .replace(/^SEMANA#?\s*/i, "S")
    .replace(/\s+2026$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fillSelect(select, values, selectedValue = "Todos") {
  select.innerHTML = values.map((value) => `<option>${escapeHtml(value)}</option>`).join("");
  select.value = values.includes(selectedValue) ? selectedValue : values[0];
}

function renderPersonButtons(selectedPerson) {
  document.querySelector("#personButtons").innerHTML = TEAM_MEMBERS.map(
    (person) => `
      <button
        class="person-option ${person === selectedPerson ? "is-active" : ""}"
        type="button"
        data-person="${escapeHtml(person)}"
      >
        ${escapeHtml(TEAM_MEMBER_LABELS[person] || person)}
      </button>
    `,
  ).join("");
}

function getFilterLabel(value, kind) {
  const monthLabels = {
    Todos: "Todo",
    Enero: "Ene",
    Febrero: "Feb",
    Marzo: "Mar",
    Abril: "Abr",
    Mayo: "May",
    Junio: "Jun",
    Julio: "Jul",
    Agosto: "Ago",
    Septiembre: "Sep",
    Octubre: "Oct",
    Noviembre: "Nov",
    Diciembre: "Dic",
  };
  const semesterLabels = {
    Todas: "Todas",
  };
  if (kind === "month") {
    return monthLabels[value] || value;
  }
  if (kind === "semester") {
    return semesterLabels[value] || formatSheetWeekLabel(value);
  }
  return value;
}

function renderFilterChips(containerId, selectId, values, selectedValue, kind) {
  document.querySelector(containerId).innerHTML = values
    .map(
      (value) => `
        <button
          class="filter-chip ${value === selectedValue ? "is-active" : ""}"
          type="button"
          data-select="${selectId}"
          data-value="${escapeHtml(value)}"
        >
          ${escapeHtml(getFilterLabel(value, kind))}
        </button>
      `,
    )
    .join("");
}

function renderAgendaWeekButtons(weeks, selectedWeek) {
  const values = weeks.length ? weeks : ["Sin semana"];
  document.querySelector("#agendaWeekButtons").innerHTML = values
    .map(
      (value) => `
        <button
          class="agenda-week-chip ${value === selectedWeek ? "is-active" : ""}"
          type="button"
          data-week="${value}"
          title="${escapeHtml(value)}"
        >
          ${escapeHtml(formatSheetWeekLabel(value))}
        </button>
      `,
    )
    .join("");
}

function renderFilters() {
  const currentPerson = document.querySelector("#personFilter").value || TEAM_MEMBERS[0];
  const currentMonth = document.querySelector("#monthFilter").value || "Todos";
  const currentSemester = document.querySelector("#semesterFilter").value || "Todas";
  const people = TEAM_MEMBERS;
  const months = ["Todos", ...MONTHS.filter((month) => records.some((record) => getMonthName(record.date) === month))];
  const weekSource = getAgendaMonthRecords();
  const semesters = ["Todas", ...uniqueInOrder(weekSource.map(getRecordWeekLabel))];

  fillSelect(document.querySelector("#personFilter"), people, currentPerson);
  renderPersonButtons(document.querySelector("#personFilter").value);
  fillSelect(document.querySelector("#monthFilter"), months, currentMonth);
  fillSelect(document.querySelector("#semesterFilter"), semesters, currentSemester);
  renderFilterChips("#monthButtons", "monthFilter", months, document.querySelector("#monthFilter").value, "month");
  renderFilterChips("#semesterButtons", "semesterFilter", semesters, document.querySelector("#semesterFilter").value, "semester");
}

function renderKpis(filtered) {
  const realized = filtered.filter((record) => record.status !== "Cancelada");
  const total = sumCounts(realized);
  const peopleCount = uniqueSorted(realized.map((record) => record.person)).length;
  const monthsCount = uniqueSorted(realized.map((record) => `${getYear(record.date)}-${getMonthName(record.date)}`)).length;
  const pending = filtered.filter((record) => record.status === "Pendiente" || record.status === "Planificada").length;
  const totalAmount = filtered.reduce((sum, record) => sum + getCoverageAmount(record), 0);

  const kpis = [
    ["Coberturas", total],
    ["Personas", peopleCount],
    ["Meses activos", monthsCount],
    ["Pendientes", pending],
    ["Monto total", formatCurrency(totalAmount)],
  ];

  document.querySelector("#kpiGrid").innerHTML = kpis
    .map(([label, value]) => `<article class="kpi"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");
}

function renderPersonCards(filtered) {
  const groups = groupBy(filtered.filter((record) => record.status !== "Cancelada"), (record) => record.person);
  const rows = Object.entries(groups)
    .map(([person, items]) => {
      const count = sumCounts(items);
      const amount = items.reduce((sum, item) => sum + getCoverageAmount(item), 0);
      const months = uniqueSorted(items.map((item) => getMonthName(item.date))).join(", ");
      const latestDate = [...items].sort((a, b) => b.date.localeCompare(a.date))[0]?.date;
      const invoiceMonth = latestDate ? getMonthName(latestDate) : "";
      const invoiceYear = latestDate ? getYear(latestDate) : "";
      const invoiceDate = invoiceMonth ? `25 de ${invoiceMonth.toLowerCase()} ${invoiceYear}` : "corte día 25";
      return { person, count, amount, months, invoiceDate };
    })
    .sort((a, b) => b.count - a.count);

  document.querySelector("#personCardsLabel").textContent = `Q${COVERAGE_RATE} por cobertura · corte día 25`;
  document.querySelector("#personCards").innerHTML = rows.length
    ? rows
        .map(
          (row) => `
            <article class="person-card">
              <div class="person-avatar">${escapeHtml(row.person.slice(0, 1))}</div>
              <div>
                <h3>${escapeHtml(row.person)}</h3>
                <p>${escapeHtml(row.months || "Sin mes")}</p>
              </div>
              <div class="person-total">
                <strong>${row.count}</strong>
                <span>coberturas</span>
              </div>
              <div class="person-billing">
                <strong>${formatCurrency(row.amount)}</strong>
                <span>${escapeHtml(row.invoiceDate)}</span>
              </div>
            </article>
          `,
        )
        .join("")
    : `<div class="empty-row">Sin personas para estos filtros</div>`;
}


function renderPersonBars(filtered) {
  const groups = groupBy(filtered, (record) => record.person);
  const rows = Object.entries(groups)
    .map(([person, items]) => ({ person, total: sumCounts(items) }))
    .sort((a, b) => b.total - a.total);
  const max = Math.max(...rows.map((row) => row.total), 1);
  document.querySelector("#personTotalLabel").textContent = `${rows.length} personas`;
  document.querySelector("#personBars").innerHTML = rows.length
    ? rows
        .map(
          (row) => `
            <div class="bar-row">
              <div class="bar-label" title="${escapeHtml(row.person)}">${escapeHtml(row.person)}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${(row.total / max) * 100}%"></div></div>
              <div class="bar-value">${row.total}</div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-row">Sin datos para estos filtros</div>`;
}

function renderWeekGrid(filtered) {
  const groups = groupBy(filtered, getRecordWeekLabel);
  const weeks = uniqueInOrder(filtered.map(getRecordWeekLabel));
  const total = sumCounts(filtered);
  document.querySelector("#weekTotalLabel").textContent = `${total} total`;
  document.querySelector("#weekGrid").innerHTML = weeks.length
    ? weeks
        .map((week) => {
          const count = sumCounts(groups[week] || []);
          return `<article class="week-card"><span title="${escapeHtml(week)}">${escapeHtml(formatSheetWeekLabel(week))}</span><strong>${count}</strong></article>`;
        })
        .join("")
    : `<div class="empty-row">Sin semanas para estos filtros</div>`;
}

function getCurrentWeekBounds(referenceDate = new Date()) {
  const start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const day = start.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diffToMonday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
}

function getSelectedAgendaMonthIndex() {
  const selectedMonth = document.querySelector("#monthFilter").value;
  if (selectedMonth && selectedMonth !== "Todos") {
    return MONTHS.indexOf(selectedMonth);
  }
  return new Date().getMonth();
}

function getAgendaMonthLabel(monthIndex) {
  return MONTHS[monthIndex] || MONTHS[new Date().getMonth()];
}

function getAgendaMonthRecords() {
  const monthIndex = getSelectedAgendaMonthIndex();
  return records
    .filter((record) => TEAM_MEMBERS.includes(record.person))
    .filter((record) => new Date(`${record.date}T00:00:00`).getMonth() === monthIndex);
}

function resolveSelectedSheetWeek(availableWeeks) {
  const selected = document.querySelector("#semesterFilter").value;
  if (selected && selected !== "Todas" && availableWeeks.includes(selected)) {
    return selected;
  }

  const todayWeek = getWeekCode(toIsoDate(new Date()));
  const matchingCurrentWeek = availableWeeks.find((week) => formatSheetWeekLabel(week).startsWith(todayWeek));
  return matchingCurrentWeek || availableWeeks[0] || "";
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isInDateRange(dateValue, start, end) {
  const date = new Date(`${dateValue}T00:00:00`);
  return date >= start && date <= end;
}

function formatScheduleDay(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  return new Intl.DateTimeFormat("es-GT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function renderCurrentWeek() {
  const monthIndex = getSelectedAgendaMonthIndex();
  const monthRecords = getAgendaMonthRecords();
  const availableWeeks = uniqueInOrder(monthRecords.map(getRecordWeekLabel));
  const selectedWeek = resolveSelectedSheetWeek(availableWeeks);
  renderAgendaWeekButtons(availableWeeks, selectedWeek);
  const weeklyRecords = monthRecords
    .filter((record) => record.status !== "Cancelada")
    .filter((record) => getRecordWeekLabel(record) === selectedWeek)
    .sort((a, b) => a.date.localeCompare(b.date) || a.person.localeCompare(b.person) || a.time.localeCompare(b.time));

  document.querySelector("#currentWeekLabel").textContent = `${getAgendaMonthLabel(monthIndex)} · ${formatSheetWeekLabel(selectedWeek) || "Sin semana"} · ${weeklyRecords.length} filas`;
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
}

function renderPeriodGrid(filtered) {
  const active = filtered.filter((record) => record.status !== "Cancelada");
  const teamCards = TEAM_MEMBERS.map((person) => {
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
}

function renderTable(filtered) {
  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));
  document.querySelector("#recordCountLabel").textContent = `${sorted.length} filas`;
  document.querySelector("#recordsTable").innerHTML = sorted.length
    ? sorted
        .map((record) => {
          const badgeClass =
            record.status === "Cancelada" ? "cancelled" : record.status === "Pendiente" || record.status === "Planificada" ? "pending" : "";
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
}

function render() {
  renderFilters();
  const filtered = getFilteredRecords();
  const periodFiltered = getPeriodFilteredRecords();
  renderCurrentWeek();
  renderKpis(filtered);
  renderPersonCards(filtered);
  renderWeekGrid(filtered);
  renderPeriodGrid(periodFiltered);
  renderTable(filtered);
}

function buildRecord(formData) {
  return {
    id: formData.id || window.crypto?.randomUUID?.() || `record-${Date.now()}-${Math.random()}`,
    date: formData.date,
    person: normalizePersonName(formData.person),
    time: normalizeText(formData.time),
    coverage: normalizeText(formData.coverage),
    venue: normalizeText(formData.venue),
    program: normalizeText(formData.program),
    type: normalizeText(formData.type),
    count: parseNumber(formData.count),
    status: normalizeText(formData.status) || "Realizada",
    notes: normalizeText(formData.notes),
    sheetWeek: normalizeText(formData.sheetWeek),
    source: formData.source || "manual",
  };
}

function parseSpanishDate(dayText, monthName, year) {
  const text = normalizeForMatch(dayText);
  const numericDate = text.match(/\b(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?\b/);
  if (numericDate) {
    const [, numericDay, numericMonth, numericYear] = numericDate;
    const resolvedYear = numericYear ? Number(String(numericYear).padStart(4, "20")) : year;
    return `${resolvedYear}-${String(Number(numericMonth)).padStart(2, "0")}-${String(Number(numericDay)).padStart(2, "0")}`;
  }

  const monthAliases = {
    ene: 0,
    enero: 0,
    feb: 1,
    febrero: 1,
    mar: 2,
    marzo: 2,
    abr: 3,
    abril: 3,
    may: 4,
    mayo: 4,
    jun: 5,
    junio: 5,
    jul: 6,
    julio: 6,
    ago: 7,
    agosto: 7,
    sep: 8,
    septiembre: 8,
    oct: 9,
    octubre: 9,
    nov: 10,
    noviembre: 10,
    dic: 11,
    diciembre: 11,
  };
  const day = Number.parseInt(text.match(/\d{1,2}/)?.[0] || "", 10);
  const mentionedMonth = Object.entries(monthAliases).find(([alias]) => text.includes(alias))?.[1];
  const fallbackMonth = MONTHS.findIndex((month) => month.toLowerCase() === monthName.toLowerCase());
  const monthIndex = Number.isInteger(mentionedMonth) ? mentionedMonth : fallbackMonth;
  if (!day || monthIndex < 0) {
    return "";
  }
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);
  return rows;
}

function normalizeSheetRow(row) {
  const cleaned = row.map(normalizeText);
  return cleaned[0] ? cleaned : cleaned.slice(1);
}

function splitResponsibles(value) {
  return normalizeText(value)
    .replace(/\s+\b[yo]\b\s+/gi, "\n")
    .split(/\n|\/|,|&/)
    .map(normalizePersonName)
    .filter(Boolean);
}

function parseSheetRows(rows, monthName, year) {
  const parsedRecords = [];
  let currentSheetWeek = "";

  rows.forEach((rawRow, index) => {
    const row = normalizeSheetRow(rawRow);
    const firstCell = normalizeText(row[0]).toLowerCase();
    if (firstCell.startsWith("semana")) {
      currentSheetWeek = normalizeText(row[0]);
      return;
    }
    if (!firstCell || firstCell === "responsable") {
      return;
    }

    const [responsibleCell, day, time, coverage] = row;
    const hasBooleanColumn = /^(true|false|verdadero|falso)$/i.test(normalizeText(row[4]));
    const venue = hasBooleanColumn ? row[5] : row[4];
    const program = hasBooleanColumn ? row[6] : row[5];
    const possibleCount = hasBooleanColumn ? 0 : parseNumber(row[6]);
    const count = possibleCount > 0 ? possibleCount : 1;
    const notes = hasBooleanColumn ? row[7] : possibleCount > 0 ? row[7] : row[6] || row[7];
    const date = parseSpanishDate(day, monthName, year);
    if (!date || !responsibleCell || !coverage) {
      return;
    }

    splitResponsibles(responsibleCell).forEach((person, personIndex) => {
      parsedRecords.push(buildRecord({
        date,
        person,
        time,
        coverage,
        venue,
        program,
        type: program,
        count,
        status: "Realizada",
        notes,
        sheetWeek: currentSheetWeek,
        source: "sheet",
        id: `sheet-${monthName}-${index}-${personIndex}`,
      }));
    });
  });

  return parsedRecords;
}

function readGvizCell(cell) {
  if (!cell) {
    return "";
  }
  if (cell.f !== undefined && cell.f !== null) {
    return normalizeText(cell.f);
  }
  if (cell.v === undefined || cell.v === null) {
    return "";
  }
  return normalizeText(cell.v);
}

function parseGvizRows(response) {
  if (!response || response.status !== "ok" || !response.table) {
    throw new Error("Google Sheets no devolvio datos.");
  }
  return response.table.rows.map((row) => row.c.map(readGvizCell));
}

function loadGvizTab(tab) {
  return new Promise((resolve, reject) => {
    const callbackName = `gscSheet${tab.gid}${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error(`No pude leer ${tab.name}`));
    }, 12000);

    window[callbackName] = (response) => {
      window.clearTimeout(timeout);
      try {
        resolve(parseSheetRows(parseGvizRows(response), tab.name, 2026));
      } catch (error) {
        reject(error);
      } finally {
        cleanup();
      }
    };

    script.onerror = () => {
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error(`No pude conectar ${tab.name}`));
    };

    const query = encodeURIComponent("select *");
    script.src = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?gid=${tab.gid}&headers=0&tq=${query}&tqx=responseHandler:${callbackName}&cache=${Date.now()}`;
    document.head.appendChild(script);
  });
}

async function refreshFromSheets() {
  const button = document.querySelector("#refreshSheets");
  button.disabled = true;
  setSyncFeedback("Conectando con Google Sheets...");

  try {
    const fetchedGroups = await Promise.all(GOOGLE_SHEET_TABS.map(loadGvizTab));

    const sheetRecords = fetchedGroups.flat();
    const localRecords = records.filter((record) => record.source === "manual" || record.source === "paste");
    records = [...localRecords, ...sheetRecords];
    saveRecords(records);
    render();
    setSyncFeedback(`Actualizado desde Sheets: ${sheetRecords.length} filas importadas.`);
  } catch (error) {
    setSyncFeedback("No pude conectar con Sheets. Abri la app en el browser donde tengas Google abierto o revisamos permisos.");
  } finally {
    button.disabled = false;
  }
}

function setupEvents() {
  ["personFilter", "monthFilter", "semesterFilter"].forEach((id) => {
    document.querySelector(`#${id}`).addEventListener("change", () => {
      const filtered = getFilteredRecords();
      const periodFiltered = getPeriodFilteredRecords();
      renderCurrentWeek();
      renderKpis(filtered);
      renderPersonCards(filtered);
      renderWeekGrid(filtered);
      renderPeriodGrid(periodFiltered);
      renderTable(filtered);
    });
  });

  document.querySelector("#personButtons").addEventListener("click", (event) => {
    const button = event.target.closest(".person-option");
    if (!button) {
      return;
    }
    document.querySelector("#personFilter").value = button.dataset.person;
    render();
  });

  document.querySelector(".filter-block").addEventListener("click", (event) => {
    const button = event.target.closest(".filter-chip");
    if (!button) {
      return;
    }
    document.querySelector(`#${button.dataset.select}`).value = button.dataset.value;
    render();
  });

  document.querySelector("#agendaWeekButtons").addEventListener("click", (event) => {
    const button = event.target.closest(".agenda-week-chip");
    if (!button) {
      return;
    }
    document.querySelector("#semesterFilter").value = button.dataset.week;
    render();
  });

  document.querySelector("#refreshSheets").addEventListener("click", refreshFromSheets);
}

setupEvents();
render();
window.setTimeout(refreshFromSheets, 250);
