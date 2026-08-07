(() => {
  "use strict";

  const data = window.AI4IC_DATA;
  if (!data) throw new Error("schedule-data.js 未加载");

  const STORAGE_KEY = "ai4ic-study-progress-v1";
  const THEME_KEY = "ai4ic-theme-v1";
  const VALID_STATUS = new Set(["未开始", "进行中", "完成"]);
  const resourceById = new Map(data.resources.map((item) => [item.id, item]));

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
  const lower = (value) => String(value ?? "").toLocaleLowerCase("zh-CN");
  const fmtDate = (iso) => new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", weekday: "short" }).format(new Date(`${iso}T12:00:00`));
  const todayIso = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  let progress = loadProgress();

  function loadProgress() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return sanitizeProgress(raw);
    } catch {
      return { days: {}, milestones: {} };
    }
  }

  function sanitizeProgress(raw) {
    const clean = { days: {}, milestones: {} };
    const allowedDays = new Set(data.daily.map((d) => d.day));
    const allowedMilestones = new Set(data.milestones.map((m) => m.milestone));
    Object.entries(raw?.days || {}).forEach(([key, value]) => {
      if (!allowedDays.has(key) || !value || typeof value !== "object") return;
      clean.days[key] = {
        status: VALID_STATUS.has(value.status) ? value.status : "未开始",
        hours: Number.isFinite(Number(value.hours)) ? Math.max(0, Math.min(24, Number(value.hours))) : "",
        notes: String(value.notes || "").slice(0, 5000)
      };
    });
    Object.entries(raw?.milestones || {}).forEach(([key, value]) => {
      if (!allowedMilestones.has(key) || !value || typeof value !== "object") return;
      clean.milestones[key] = {
        status: VALID_STATUS.has(value.status) ? value.status : "未开始",
        evidence: String(value.evidence || "").slice(0, 2000)
      };
    });
    return clean;
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function dayState(day) {
    const local = progress.days[day.day] || {};
    return {
      status: local.status || day.status || "未开始",
      hours: local.hours !== undefined && local.hours !== "" ? local.hours : (day.actualHours ?? ""),
      notes: local.notes ?? day.notes ?? ""
    };
  }

  function milestoneState(item) {
    const local = progress.milestones[item.milestone] || {};
    return { status: local.status || item.status || "未开始", evidence: local.evidence ?? item.evidence ?? "" };
  }

  function statusOptions(current) {
    return ["未开始", "进行中", "完成"].map((s) => `<option${s === current ? " selected" : ""}>${s}</option>`).join("");
  }

  function renderSummary() {
    const done = data.daily.filter((day) => dayState(day).status === "完成").length;
    const actual = data.daily.reduce((sum, day) => sum + (Number(dayState(day).hours) || 0), 0);
    const milestoneDone = data.milestones.filter((m) => milestoneState(m).status === "完成").length;
    const pct = Math.round((done / data.daily.length) * 100);
    $("#progress-percent").textContent = `${pct}%`;
    $("#progress-label").textContent = `${done} / ${data.daily.length} days`;
    $("#progress-bar").style.width = `${pct}%`;
    $("#actual-hours").textContent = `${actual.toFixed(actual % 1 ? 1 : 0)}h`;
    $("#milestone-progress").textContent = `${milestoneDone} / ${data.milestones.length}`;
    const next = getNextDay();
    $("#next-day-label").textContent = next ? `${next.week} · ${next.day} · ${fmtDate(next.date)} · ${next.topic}` : "40 天全部完成 · Nice work.";
    $("#jump-next").disabled = !next;
  }

  function getNextDay() {
    const open = data.daily.filter((day) => dayState(day).status !== "完成");
    if (!open.length) return null;
    const today = todayIso();
    return open.find((day) => day.date >= today) || open[0];
  }

  function renderRoadmap() {
    $("#roadmap-grid").innerHTML = data.roadmap.map((week) => {
      const days = data.daily.filter((d) => d.week === week.week);
      const done = days.filter((d) => dayState(d).status === "完成").length;
      const pct = Math.round(done / days.length * 100);
      return `<article class="week-card">
        <div class="week-card-top"><span class="week-number">${esc(week.week)}</span><span class="week-dates">${esc(week.dates)}</span></div>
        <h3>${esc(week.focus)}</h3>
        <p class="week-deliverable">→ ${esc(week.deliverable)}</p>
        <div class="week-meta">
          <span><b>BOOK</b>${esc(week.book)}</span>
          <span><b>MODEL</b>${esc(week.model)}</span>
          <span><b>EDA</b>${esc(week.verification)}</span>
        </div>
        <div class="week-progress"><div class="week-progress-track"><i style="width:${pct}%"></i></div><span>${done}/5</span></div>
        <button class="week-open" type="button" data-open-week="${esc(week.week)}">打开 ${esc(week.week)} 每日计划 →</button>
      </article>`;
    }).join("");

    $("#daily-blocks").innerHTML = data.dailyBlocks.map((block) => `<div class="daily-block"><time>${esc(block.time)}</time><span class="hours">${esc(block.hours)}h</span><p><strong>${esc(block.use)}</strong> · ${esc(block.rule)}</p></div>`).join("");
    $("#execution-rules").innerHTML = data.rules.map((rule) => `<li>${esc(String(rule).replace(/^[①②③④⑤]\s*/, ""))}</li>`).join("");
  }

  function scheduleCard(day) {
    const state = dayState(day);
    const resources = day.resourceIds.map((id) => resourceById.get(id)).filter(Boolean);
    return `<details class="day-card" data-day-card="${esc(day.day)}">
      <summary class="day-summary">
        <span class="day-index">${esc(day.week)}·${esc(day.day)}</span>
        <span class="day-date">${esc(fmtDate(day.date))}</span>
        <span class="day-topic"><strong>${esc(day.topic)}</strong><span>${esc(day.book)} · ${esc(day.plannedHours)}h planned</span></span>
        <select class="status-pill" data-day-status="${esc(day.day)}" data-status="${esc(state.status)}" aria-label="${esc(day.day)} 状态">${statusOptions(state.status)}</select>
      </summary>
      <div class="day-body">
        <div class="time-grid">
          ${timeTask("09:00–11:00", "THEORY · 2H", day.theory)}
          ${timeTask("11:00–12:00", "LAB · 1H", day.lab)}
          ${timeTask("13:30–17:30", "PROJECT · 4H", day.project)}
          ${timeTask("19:30–20:30", "REVIEW · 1H", day.review)}
        </div>
        <div class="deliverable-box"><span>DONE WHEN</span><p>${esc(day.deliverable)}</p></div>
        <div class="resource-chips">${resources.map((r) => `<a class="resource-chip" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" title="${esc(r.resource)}">${esc(r.id)} · ${esc(r.resource)}</a>`).join("")}</div>
        <div class="day-editor">
          <label class="field"><span>ACTUAL HOURS</span><input data-day-hours="${esc(day.day)}" type="number" min="0" max="24" step="0.5" value="${esc(state.hours)}" placeholder="0"></label>
          <label class="field"><span>REVIEW NOTES · LOCAL ONLY</span><textarea data-day-notes="${esc(day.day)}" placeholder="记录 evidence、失败原因和明日入口…">${esc(state.notes)}</textarea></label>
        </div>
      </div>
    </details>`;
  }

  function timeTask(time, label, content) {
    return `<article class="time-task"><header><strong>${esc(label)}</strong><span>${esc(time)}</span></header><p>${esc(content)}</p></article>`;
  }

  function renderSchedule() {
    const week = $("#week-filter").value;
    const status = $("#status-filter").value;
    const query = lower($("#schedule-search").value.trim());
    const filtered = data.daily.filter((day) => {
      const state = dayState(day);
      if (week !== "all" && day.week !== week) return false;
      if (status !== "all" && state.status !== status) return false;
      if (!query) return true;
      return lower([day.week, day.day, day.topic, day.theory, day.lab, day.project, day.review, day.deliverable, day.book, ...day.resourceIds].join(" ")).includes(query);
    });
    $("#schedule-list").innerHTML = filtered.map(scheduleCard).join("");
    $("#schedule-count").textContent = `${filtered.length} / ${data.daily.length} days`;
    $("#schedule-empty").hidden = filtered.length !== 0;
  }

  function renderResources() {
    const query = lower($("#resource-search").value.trim());
    const priority = $("#resource-priority").value;
    const filtered = data.resources.filter((item) => {
      if (priority !== "all" && item.priority !== priority) return false;
      return !query || lower([item.id, item.type, item.resource, item.use, item.priority, item.notes].join(" ")).includes(query);
    });
    $("#resource-grid").innerHTML = filtered.map((item) => `<article class="resource-card">
      <div class="resource-top"><span class="resource-id">${esc(item.id)}</span><span class="priority-tag">${esc(item.priority)}</span></div>
      <h3>${esc(item.resource)}</h3><span class="resource-type">${esc(item.type)}</span>
      <p>${esc(item.use)}</p><p>${esc(item.notes)}</p>
      <a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">打开资源 ↗</a>
    </article>`).join("");
  }

  function renderMilestones() {
    $("#milestone-list").innerHTML = data.milestones.map((item) => {
      const state = milestoneState(item);
      return `<article class="milestone-card">
        <div class="milestone-code">${esc(item.milestone)}<time>${esc(item.due)}</time></div>
        <div class="milestone-title"><h3>${esc(item.deliverable)}</h3><p>${esc(item.metrics)}</p></div>
        <div class="milestone-main"><strong>ACCEPTANCE</strong><p>${esc(item.acceptance)}</p><p class="ip-rule">IP 红线 · ${esc(item.ipRule)}</p></div>
        <div class="milestone-controls">
          <select data-mile-status="${esc(item.milestone)}" class="status-pill" data-status="${esc(state.status)}" aria-label="${esc(item.milestone)} 状态">${statusOptions(state.status)}</select>
          <input data-mile-evidence="${esc(item.milestone)}" value="${esc(state.evidence)}" placeholder="commit / report / demo URL" aria-label="${esc(item.milestone)} 证据链接">
        </div>
      </article>`;
    }).join("");
  }

  function renderModels() {
    const labels = { S: "必须掌握", A: "工作级理解", B: "选读", C: "本轮暂缓" };
    const priorities = ["S", "A", "B", "C"];
    $("#model-map").innerHTML = priorities.map((priority) => {
      const items = data.modelMap.filter((item) => item.priority === priority);
      if (!items.length) return "";
      return `<section class="priority-group"><div class="priority-heading"><strong>${priority}</strong><span>${labels[priority]}</span></div><div class="model-table">
        ${items.map((item) => `<article class="model-row">
          <h3>${esc(item.topic)}</h3><p>${esc(item.knowledge)}</p><span class="model-badge">${esc(item.week)}</span><span class="model-badge">${esc(item.depth)}</span><p><strong>Exit:</strong> ${esc(item.exitCriteria)}<br><strong>Deferred:</strong> ${esc(item.deferred)}</p>
        </article>`).join("")}
      </div></section>`;
    }).join("");
  }

  function setView(view, updateHash = true) {
    const exists = $(`[data-panel="${view}"]`);
    if (!exists) view = "roadmap";
    $$('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== view; panel.classList.toggle("is-active", panel.dataset.panel === view); });
    $$('[data-view]').forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
    if (updateHash) history.replaceState(null, "", `#${view}`);
    window.scrollTo({ top: Math.max(0, $(".metric-strip").offsetTop - 70), behavior: "smooth" });
  }

  function openWeek(week) {
    setView("schedule");
    $("#week-filter").value = week;
    $("#status-filter").value = "all";
    $("#schedule-search").value = "";
    renderSchedule();
  }

  function jumpNext() {
    const day = getNextDay();
    if (!day) return;
    openWeek(day.week);
    requestAnimationFrame(() => {
      const card = $(`[data-day-card="${day.day}"]`);
      if (card) { card.open = true; card.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  }

  function exportProgress() {
    const payload = { version: 1, exportedAt: new Date().toISOString(), source: data.generatedFrom, ...progress };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ai4ic-progress-${todayIso()}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  async function importProgress(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      progress = sanitizeProgress(parsed);
      saveProgress();
      renderAll();
      alert("进度导入完成。仅写入当前浏览器。\n");
    } catch {
      alert("无法读取这个进度 JSON，请确认文件来自本 Dashboard。\n");
    }
  }

  function bindEvents() {
    $("#hero-subtitle").textContent = data.subtitle;
    $("#source-note").textContent = `Source: ${data.generatedFrom}`;

    $$('[data-view]').forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
    $("#jump-next").addEventListener("click", jumpNext);
    $("#schedule-search").addEventListener("input", renderSchedule);
    $("#week-filter").addEventListener("change", renderSchedule);
    $("#status-filter").addEventListener("change", renderSchedule);
    $("#resource-search").addEventListener("input", renderResources);
    $("#resource-priority").addEventListener("change", renderResources);
    $("#export-progress").addEventListener("click", exportProgress);
    $("#import-progress").addEventListener("click", () => $("#progress-file").click());
    $("#progress-file").addEventListener("change", (event) => importProgress(event.target.files?.[0]));

    document.addEventListener("click", (event) => {
      const weekButton = event.target.closest("[data-open-week]");
      if (weekButton) openWeek(weekButton.dataset.openWeek);
    });

    document.addEventListener("click", (event) => {
      if (event.target.matches(".status-pill")) event.stopPropagation();
    });

    document.addEventListener("change", (event) => {
      const status = event.target.closest("[data-day-status]");
      if (status) {
        const key = status.dataset.dayStatus;
        progress.days[key] = { ...(progress.days[key] || {}), status: status.value };
        saveProgress(); renderSummary(); renderRoadmap(); renderSchedule(); return;
      }
      const hours = event.target.closest("[data-day-hours]");
      if (hours) {
        const key = hours.dataset.dayHours;
        progress.days[key] = { ...(progress.days[key] || {}), hours: hours.value === "" ? "" : Math.max(0, Math.min(24, Number(hours.value) || 0)) };
        saveProgress(); renderSummary(); return;
      }
      const mileStatus = event.target.closest("[data-mile-status]");
      if (mileStatus) {
        const key = mileStatus.dataset.mileStatus;
        progress.milestones[key] = { ...(progress.milestones[key] || {}), status: mileStatus.value };
        saveProgress(); renderSummary(); renderMilestones(); return;
      }
      const evidence = event.target.closest("[data-mile-evidence]");
      if (evidence) {
        const key = evidence.dataset.mileEvidence;
        progress.milestones[key] = { ...(progress.milestones[key] || {}), evidence: evidence.value.slice(0, 2000) };
        saveProgress();
      }
    });

    document.addEventListener("input", (event) => {
      const notes = event.target.closest("[data-day-notes]");
      if (!notes) return;
      const key = notes.dataset.dayNotes;
      progress.days[key] = { ...(progress.days[key] || {}), notes: notes.value.slice(0, 5000) };
      saveProgress();
    });

    const themeButton = $("#theme-toggle");
    themeButton.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem(THEME_KEY, next);
    });
  }

  function initFilters() {
    data.roadmap.forEach((week) => $("#week-filter").insertAdjacentHTML("beforeend", `<option value="${esc(week.week)}">${esc(week.week)} · ${esc(week.focus)}</option>`));
    [...new Set(data.resources.map((r) => r.priority))].forEach((priority) => $("#resource-priority").insertAdjacentHTML("beforeend", `<option>${esc(priority)}</option>`));
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = saved || (systemDark ? "dark" : "light");
  }

  function renderAll() {
    renderSummary(); renderRoadmap(); renderSchedule(); renderResources(); renderMilestones(); renderModels();
  }

  initTheme();
  initFilters();
  bindEvents();
  renderAll();
  const initialView = location.hash.replace("#", "");
  if (initialView && $(`[data-panel="${initialView}"]`)) setView(initialView, false);
})();
