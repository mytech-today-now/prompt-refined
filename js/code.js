(() => {
  "use strict";

  const preferenceKey = "prompt-refined:report-preferences:v1";
  const issueProgressKeyPrefix = "prompt-refined:issue-progress:v1:";
  const validStyles = ["basic", "minimal", "full"];
  const validModes = ["system", "light", "dark"];
  const validProgressStates = ["incomplete", "in-progress", "complete"];
  const progressLabels = {
    incomplete: "Incomplete",
    "in-progress": "In progress",
    complete: "Complete"
  };
  let statusNumber = 0;

  function assignStatusDescription(button, status, prefix) {
    let statusId;
    do {
      statusNumber += 1;
      statusId = `${prefix}-${statusNumber}`;
    } while (document.getElementById(statusId));
    status.id = statusId;
    button.setAttribute("aria-describedby", statusId);
  }

  function initializeAppearanceControls() {
    const fieldset = document.querySelector("[data-report-preferences]");
    if (!fieldset || fieldset.hasAttribute("data-preferences-ready")) return;

    const styleControl = fieldset.querySelector("[data-report-style-control]");
    const modeControl = fieldset.querySelector("[data-color-mode-control]");
    const status = fieldset.querySelector("[data-preferences-status]");
    if (!styleControl || !modeControl || !status) return;

    const root = document.documentElement;
    let style = "basic";
    let colorMode = "system";
    let invalidSavedValue = false;
    let storageReadFailed = false;

    let savedText = null;
    try {
      savedText = window.localStorage.getItem(preferenceKey);
    } catch {
      storageReadFailed = true;
    }

    if (!storageReadFailed && savedText !== null) {
      try {
        const saved = JSON.parse(savedText);
        if (saved && typeof saved === "object" && !Array.isArray(saved)) {
          if (validStyles.includes(saved.style)) style = saved.style;
          else invalidSavedValue = true;
          if (validModes.includes(saved.colorMode)) colorMode = saved.colorMode;
          else invalidSavedValue = true;
        } else {
          invalidSavedValue = true;
        }
      } catch {
        invalidSavedValue = true;
      }
    }

    function applyPreferences() {
      root.setAttribute("data-report-style", style);
      root.setAttribute("data-color-mode", colorMode);
      styleControl.value = style;
      modeControl.value = colorMode;
    }

    function savePreferences() {
      const selectedStyle = styleControl.value;
      const selectedMode = modeControl.value;
      style = validStyles.includes(selectedStyle) ? selectedStyle : "basic";
      colorMode = validModes.includes(selectedMode) ? selectedMode : "system";
      applyPreferences();

      try {
        window.localStorage.setItem(preferenceKey, JSON.stringify({ style, colorMode }));
        status.textContent = "Appearance settings saved in this browser.";
      } catch {
        status.textContent = "Appearance settings apply for this page, but browser storage is unavailable. They will not persist after this session.";
      }
    }

    applyPreferences();
    styleControl.addEventListener("change", savePreferences);
    modeControl.addEventListener("change", savePreferences);
    fieldset.setAttribute("data-preferences-ready", "true");
    fieldset.hidden = false;

    if (storageReadFailed) {
      status.textContent = "Browser storage is unavailable. Appearance settings use Basic and System until you change them, and will not persist after this session.";
    } else if (invalidSavedValue) {
      status.textContent = "Invalid saved appearance values were replaced with defaults where needed.";
    } else {
      status.textContent = "Choose a style and color mode. Changes are saved in this browser.";
    }
  }

  function getIssueActions(article) {
    let actions = article.querySelector("[data-issue-actions]");
    if (actions) return actions;

    actions = document.createElement("div");
    actions.className = "issue-actions";
    actions.setAttribute("data-issue-actions", "");
    article.prepend(actions);
    return actions;
  }

  function getIssueProgressStorageKey() {
    let documentPath = "report";
    try {
      documentPath = window.location.pathname || document.title || "report";
    } catch {
      // Keep a usable in-page control even in restricted browsing contexts.
    }
    return `${issueProgressKeyPrefix}${encodeURIComponent(documentPath)}`;
  }

  function getProgressStatus() {
    let status = document.querySelector("[data-issue-progress-status]");
    if (status) return status;

    status = document.createElement("p");
    status.className = "issue-progress-storage-status";
    status.setAttribute("data-issue-progress-status", "");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    const host = document.querySelector(".report-header, .report-main") || document.body;
    host.append(status);
    return status;
  }

  function setIssueProgress(article, state, indicators) {
    article.setAttribute("data-progress", state);

    const stateBadge = article.querySelector("[data-issue-progress-state]");
    if (stateBadge) {
      stateBadge.textContent = progressLabels[state];
      stateBadge.setAttribute("data-progress", state);
    }

    const issueId = article.id;
    (indicators.get(issueId) || []).forEach((indicator) => {
      indicator.textContent = progressLabels[state];
      indicator.setAttribute("data-progress", state);
    });
  }

  function initializeIssueProgressControls() {
    const articles = Array.from(document.querySelectorAll(".issue"));
    if (!articles.length) return;

    const status = getProgressStatus();
    const indicators = new Map();
    document.querySelectorAll("[data-issue-progress-indicator]").forEach((indicator) => {
      const issueId = indicator.getAttribute("data-issue-progress-indicator");
      if (!issueId) return;
      if (!indicators.has(issueId)) indicators.set(issueId, []);
      indicators.get(issueId).push(indicator);
    });

    let savedProgress = {};
    let storageReadFailed = false;
    let invalidSavedValue = false;
    try {
      const savedText = window.localStorage.getItem(getIssueProgressStorageKey());
      if (savedText !== null) {
        const parsed = JSON.parse(savedText);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          savedProgress = parsed;
        } else {
          invalidSavedValue = true;
        }
      }
    } catch {
      storageReadFailed = true;
    }

    const issueRecords = [];
    articles.forEach((article) => {
      const issueId = article.id;
      if (!issueId) {
        invalidSavedValue = true;
        return;
      }

      const stateInMarkup = article.getAttribute("data-progress");
      let state = validProgressStates.includes(stateInMarkup) ? stateInMarkup : "incomplete";
      if (Object.prototype.hasOwnProperty.call(savedProgress, issueId)) {
        if (validProgressStates.includes(savedProgress[issueId])) {
          state = savedProgress[issueId];
        } else {
          state = "incomplete";
          invalidSavedValue = true;
        }
      }

      const actions = getIssueActions(article);
      let control = actions.querySelector("[data-issue-progress-control]");
      if (!control) {
        const label = document.createElement("label");
        label.className = "issue-progress-control";
        const labelText = document.createElement("span");
        labelText.textContent = "Progress";

        control = document.createElement("select");
        control.setAttribute("data-issue-progress-control", "");
        control.setAttribute("aria-label", `Progress for ${issueId.replaceAll("-", " ")}`);
        validProgressStates.forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = progressLabels[value];
          control.append(option);
        });

        label.append(labelText, control);
        actions.append(label);
      }

      let stateBadge = actions.querySelector("[data-issue-progress-state]");
      if (!stateBadge) {
        stateBadge = document.createElement("span");
        stateBadge.className = "issue-progress-state";
        stateBadge.setAttribute("data-issue-progress-state", "");
        actions.append(stateBadge);
      }

      control.value = state;
      setIssueProgress(article, state, indicators);
      issueRecords.push({ article, control });

      if (!article.hasAttribute("data-issue-progress-ready")) {
        control.addEventListener("change", () => {
          const selected = validProgressStates.includes(control.value) ? control.value : "incomplete";
          control.value = selected;
          setIssueProgress(article, selected, indicators);

          const allProgress = Object.create(null);
          issueRecords.forEach(({ article: currentArticle, control: currentControl }) => {
            if (currentArticle.id && validProgressStates.includes(currentControl.value)) {
              allProgress[currentArticle.id] = currentControl.value;
            }
          });

          try {
            window.localStorage.setItem(getIssueProgressStorageKey(), JSON.stringify(allProgress));
            status.textContent = `Progress for ${issueId.replaceAll("-", " ")} is ${progressLabels[selected].toLowerCase()} and saved for this report.`;
          } catch {
            status.textContent = "Progress applies to this page, but browser storage is unavailable. It will not persist after this session.";
          }
        });
        article.setAttribute("data-issue-progress-ready", "true");
      }
    });

    if (storageReadFailed) {
      status.textContent = "Saved issue progress could not be read. Controls still work on this page; storage may be unavailable.";
    } else if (invalidSavedValue) {
      status.textContent = "Some saved issue progress was invalid. Affected issues start as Incomplete.";
    } else {
      status.textContent = "Change an issue's progress to update its visual status and matching table-of-contents indicator.";
    }
  }

  function getIssueCopyText(article) {
    const snapshot = article.cloneNode(true);
    snapshot.querySelectorAll("[data-issue-actions], .copy-control").forEach((control) => control.remove());
    const text = typeof snapshot.innerText === "string" ? snapshot.innerText : snapshot.textContent || "";
    return text.trim();
  }

  function initializeIssueCopyControls() {
    document.querySelectorAll(".issue").forEach((article) => {
      if (article.hasAttribute("data-issue-copy-ready")) return;

      const actions = getIssueActions(article);
      const button = document.createElement("button");
      button.className = "copy-button issue-copy-button";
      button.type = "button";
      button.textContent = "Copy Issue to Clipboard";

      const issueNumber = article.querySelector(".issue-number");
      const title = article.querySelector(".issue-title");
      const issueLabel = issueNumber ? issueNumber.textContent.trim() : article.id;
      const issueTitle = title ? title.textContent.trim() : "";
      const accessibleName = ["Copy Issue to Clipboard", issueLabel, issueTitle].filter(Boolean).join(": ");
      button.setAttribute("aria-label", accessibleName);

      const status = document.createElement("span");
      status.className = "copy-status issue-copy-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      assignStatusDescription(button, status, "issue-copy-status");

      actions.prepend(button);
      actions.append(status);
      button.addEventListener("click", async () => {
        const text = getIssueCopyText(article);
        if (!text) {
          status.textContent = "No issue text is available. Select and copy the visible issue manually.";
          return;
        }

        try {
          const clipboard = typeof navigator === "undefined" ? null : navigator.clipboard;
          if (!clipboard || typeof clipboard.writeText !== "function") {
            throw new Error("Clipboard access is unavailable.");
          }
          await clipboard.writeText(text);
          status.textContent = "The entire issue was copied to the clipboard.";
        } catch {
          status.textContent = "Clipboard access is unavailable. Select the issue text, including its number, and copy it manually.";
        }
      });

      article.setAttribute("data-issue-copy-ready", "true");
    });
  }

  function initializeCopyControls() {
    document.querySelectorAll("[data-copy-target]").forEach((target) => {
      if (target.hasAttribute("data-copy-control-ready")) return;

      const control = document.createElement("div");
      control.className = "copy-control";

      const button = document.createElement("button");
      button.className = "copy-button";
      button.type = "button";
      button.textContent = "Copy implementation prompt";

      const issue = target.closest(".issue");
      const heading = issue ? issue.querySelector(".issue-title") : null;
      const title = heading ? heading.textContent.trim() : "";
      if (title) button.setAttribute("aria-label", `Copy implementation prompt: ${title}`);

      const status = document.createElement("span");
      status.className = "copy-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      assignStatusDescription(button, status, "prompt-copy-status");

      control.append(button, status);
      target.insertAdjacentElement("afterend", control);
      target.setAttribute("data-copy-control-ready", "true");

      button.addEventListener("click", async () => {
        const text = target.textContent || "";
        if (!text.trim()) {
          status.textContent = "No prompt text is available. Select and copy visible prompt text manually.";
          return;
        }

        try {
          const clipboard = typeof navigator === "undefined" ? null : navigator.clipboard;
          if (!clipboard || typeof clipboard.writeText !== "function") {
            throw new Error("Clipboard access is unavailable.");
          }
          await clipboard.writeText(text);
          status.textContent = "Implementation prompt copied to the clipboard.";
        } catch {
          status.textContent = "Clipboard access is unavailable. Select the implementation prompt above and copy it manually.";
        }
      });
    });
  }

  initializeAppearanceControls();
  initializeIssueProgressControls();
  initializeIssueCopyControls();
  initializeCopyControls();
})();
