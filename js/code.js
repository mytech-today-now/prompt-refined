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

  function announceInitializationFailure(config) {
    let status = document.querySelector(config.selector);
    if (!status) {
      status = document.createElement("p");
      status.className = config.className;
      status.setAttribute(config.attribute, "");
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      const host = document.querySelector(config.hostSelector) || document.body;
      if (host) host.append(status);
    }
    status.textContent = config.message;
  }

  function runInitializer(initializer, failureConfig) {
    try {
      initializer();
    } catch {
      if (failureConfig) {
        announceInitializationFailure(failureConfig);
      }
    }
  }

  function initializeAppearanceControls() {
    let fieldset = document.querySelector("[data-report-preferences], .report-preferences");
    if (!fieldset) {
      fieldset = document.createElement("fieldset");
      fieldset.className = "report-preferences";
      fieldset.setAttribute("data-report-preferences", "");
      const header = document.querySelector(".report-header") || document.body;
      const title = header.querySelector(".report-title");
      if (title) title.insertAdjacentElement("afterend", fieldset);
      else header.prepend(fieldset);
    }
    if (fieldset.hasAttribute("data-preferences-ready")) {
      fieldset.hidden = false;
      fieldset.disabled = false;
      fieldset.querySelectorAll("[data-report-style-control], [data-color-mode-control]")
        .forEach((control) => { control.disabled = false; });
      return;
    }

    fieldset.classList.add("report-preferences");
    fieldset.setAttribute("data-report-preferences", "");
    fieldset.disabled = true;

    let legend = fieldset.querySelector("legend");
    if (!legend) {
      legend = document.createElement("legend");
      legend.textContent = "Report appearance";
      fieldset.prepend(legend);
    }

    function ensureSelect(attribute, labelText, options) {
      let control = fieldset.querySelector(`[${attribute}]`);
      if (!control) {
        const label = document.createElement("label");
        const caption = document.createElement("span");
        caption.textContent = labelText;
        control = document.createElement("select");
        control.setAttribute(attribute, "");
        label.append(caption, control);
        fieldset.append(label);
      } else if (!control.closest("label")) {
        const associatedLabel = control.id && Array.from(fieldset.querySelectorAll("label[for]")).find((label) => (
          label.htmlFor === control.id
        ));
        if (!associatedLabel) {
          const label = document.createElement("label");
          const caption = document.createElement("span");
          caption.textContent = labelText;
          control.before(label);
          label.append(caption, control);
        }
      }

      control.replaceChildren();
      options.forEach(([value, text]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        control.append(option);
      });
      control.setAttribute("aria-label", labelText);
      control.disabled = true;
      return control;
    }

    const styleControl = ensureSelect("data-report-style-control", "Report style", [
      ["basic", "Basic"],
      ["minimal", "Minimal"],
      ["full", "Full & complete style"]
    ]);
    const modeControl = ensureSelect("data-color-mode-control", "Color mode", [
      ["system", "System"],
      ["light", "Light"],
      ["dark", "Dark"]
    ]);

    let status = fieldset.querySelector("[data-preferences-status]");
    if (!status) {
      status = document.createElement("p");
      status.className = "preferences-status";
      status.setAttribute("data-preferences-status", "");
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      fieldset.append(status);
    }
    status.classList.add("preferences-status");
    status.setAttribute("data-preferences-status", "");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    if (!status.id) status.id = "report-preferences-status";
    styleControl.setAttribute("aria-describedby", status.id);
    modeControl.setAttribute("aria-describedby", status.id);

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
    fieldset.disabled = false;
    styleControl.disabled = false;
    modeControl.disabled = false;
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
    let actions = article.querySelector("[data-issue-actions], .issue-actions");
    if (actions) {
      actions.classList.add("issue-actions");
      actions.setAttribute("data-issue-actions", "");
      return actions;
    }

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

  function ensureIssueTocIndicators(articles) {
    let toc = document.querySelector(".issue-toc");
    if (!toc) {
      toc = document.createElement("nav");
      toc.className = "issue-toc";
      toc.setAttribute("aria-label", "Table of contents");
      const issueList = document.querySelector(".issue-list");
      if (issueList) issueList.before(toc);
      else if (articles[0]) articles[0].before(toc);
      else (document.querySelector(".report-main") || document.body).prepend(toc);
    }
    toc.setAttribute("aria-label", "Table of contents");

    articles.forEach((article) => {
      if (!article.id) return;

      let link = Array.from(toc.querySelectorAll("a")).find((candidate) => (
        candidate.getAttribute("href") === `#${article.id}`
      ));
      if (!link) {
        link = document.createElement("a");
        link.className = "issue-toc-link";
        link.setAttribute("href", `#${article.id}`);
        const issueNumber = article.querySelector(".issue-number");
        const issueTitle = article.querySelector(".issue-title");
        const label = document.createElement("span");
        label.className = "issue-toc-title";
        label.textContent = [
          issueNumber ? issueNumber.textContent.trim() : article.id,
          issueTitle ? issueTitle.textContent.trim() : ""
        ].filter(Boolean).join(" ");
        link.append(label);
        toc.append(link);
      }

      let indicator = Array.from(link.querySelectorAll("[data-issue-progress-indicator], .issue-toc-status"))
        .find((candidate) => candidate.getAttribute("data-issue-progress-indicator") === article.id);
      if (!indicator) {
        indicator = Array.from(link.querySelectorAll(".issue-toc-status"))[0] || null;
      }
      if (!indicator) {
        indicator = document.createElement("span");
        link.append(indicator);
      }
      indicator.classList.add("issue-toc-status");
      indicator.setAttribute("data-issue-progress-indicator", article.id);
      if (!validProgressStates.includes(indicator.getAttribute("data-progress"))) {
        indicator.setAttribute("data-progress", "incomplete");
      }
      if (!indicator.textContent.trim()) indicator.textContent = "Incomplete";
    });
  }

  function initializeIssueProgressControls() {
    const articles = Array.from(document.querySelectorAll(".issue"));
    if (!articles.length) return;

    const status = getProgressStatus();
    ensureIssueTocIndicators(articles);
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
      let control = actions.querySelector("select[data-issue-progress-control]");
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
      } else if (!control.closest("label")) {
        const label = document.createElement("label");
        const labelText = document.createElement("span");
        label.classList.add("issue-progress-control");
        labelText.textContent = "Progress";
        control.before(label);
        label.append(labelText, control);
      }
      control.closest("label")?.classList.add("issue-progress-control");
      control.disabled = true;
      control.replaceChildren();
      validProgressStates.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = progressLabels[value];
        control.append(option);
      });
      const issueNumber = article.querySelector(".issue-number");
      const accessibleIssueLabel = issueNumber ? issueNumber.textContent.trim() : issueId.replaceAll("-", " ");
      control.setAttribute("aria-label", `Progress for ${accessibleIssueLabel}`);

      let stateBadge = actions.querySelector("[data-issue-progress-state]");
      if (!stateBadge) {
        stateBadge = document.createElement("span");
        stateBadge.className = "issue-progress-state";
        stateBadge.setAttribute("data-issue-progress-state", "");
        actions.append(stateBadge);
      }
      stateBadge.classList.add("issue-progress-state");
      stateBadge.setAttribute("data-issue-progress-state", "");

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
      control.disabled = false;
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

  let initializationStarted = false;

  function initializeReportControls() {
    if (initializationStarted) return;
    initializationStarted = true;

    runInitializer(initializeAppearanceControls, {
      selector: "[data-preferences-status]",
      className: "preferences-status",
      attribute: "data-preferences-status",
      hostSelector: ".report-preferences, .report-header",
      message: "Appearance controls could not initialize. Reload the report and check that the shared script is available."
    });
    runInitializer(initializeIssueProgressControls, {
      selector: "[data-issue-progress-status]",
      className: "issue-progress-storage-status",
      attribute: "data-issue-progress-status",
      hostSelector: ".report-header, .report-main",
      message: "Issue progress controls could not initialize. Reload the report and check that the shared script is available."
    });
    runInitializer(initializeIssueCopyControls, {
      selector: "[data-issue-copy-initialization-status]",
      className: "copy-status",
      attribute: "data-issue-copy-initialization-status",
      hostSelector: ".report-header, .report-main",
      message: "Issue-copy controls could not initialize. Reload the report and check that the shared script is available."
    });
    runInitializer(initializeCopyControls, {
      selector: "[data-prompt-copy-initialization-status]",
      className: "copy-status",
      attribute: "data-prompt-copy-initialization-status",
      hostSelector: ".report-main, .report-header",
      message: "Implementation-prompt copy controls could not initialize. Reload the report and check that the shared script is available."
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeReportControls, { once: true });
  } else {
    initializeReportControls();
  }
})();
