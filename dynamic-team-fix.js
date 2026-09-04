(function applyDynamicTeamFix() {
  const originalSplitResponsibles = splitResponsibles;

  function getCleanName(value) {
    return normalizeText(value).replace(/\s+/g, " ");
  }

  function getShortLabel(value) {
    return getCleanName(value).split(" ")[0] || getCleanName(value);
  }

  function ensureMember(person) {
    const clean = normalizePersonName(person);
    if (!clean || TEAM_MEMBERS.includes(clean)) {
      return;
    }
    TEAM_MEMBERS.push(clean);
    TEAM_MEMBER_LABELS[clean] = getShortLabel(clean);
  }

  splitResponsibles = function splitDynamicResponsibles(value) {
    const people = originalSplitResponsibles(value);
    const rawPeople = normalizeText(value)
      .replace(/\s+\b[yo]\b\s+/gi, "\n")
      .split(/\n|\/|,|&/)
      .map(normalizePersonName)
      .filter(Boolean);
    return uniqueInOrder([...people, ...rawPeople]);
  };

  const originalNormalizePersonName = normalizePersonName;
  normalizePersonName = function normalizeDynamicPersonName(value) {
    return originalNormalizePersonName(value) || getCleanName(value);
  };

  refreshFromSheets = async function refreshDynamicTeamFromSheets() {
    const button = document.querySelector("#refreshSheets");
    button.disabled = true;
    setSyncFeedback("Conectando con Google Sheets...");

    try {
      const fetchedGroups = await Promise.all(GOOGLE_SHEET_TABS.map(loadGvizTab));
      const sheetRecords = fetchedGroups.flat();
      sheetRecords.forEach((record) => ensureMember(record.person));
      const localRecords = records.filter((record) => record.source === "manual" || record.source === "paste");
      records = [...localRecords, ...sheetRecords];
      saveRecords(records);
      render();
      setSyncFeedback(`Actualizado desde Sheets: ${sheetRecords.length} filas importadas.`);
    } catch (error) {
      setSyncFeedback("No pude conectar con Sheets. Abre la app en el browser donde tengas Google abierto o revisamos permisos.");
    } finally {
      button.disabled = false;
    }
  };

  function rebindRefreshButton() {
    const button = document.querySelector("#refreshSheets");
    if (!button) {
      return;
    }
    const cleanButton = button.cloneNode(true);
    button.replaceWith(cleanButton);
    cleanButton.addEventListener("click", refreshFromSheets);
  }

  rebindRefreshButton();
  window.setTimeout(refreshFromSheets, 300);
})();
