import { VC_FIRMS, STARTUP_RADAR, THESIS_TRACKS, RESEARCH_SOURCES } from '@/config/vc-ecosystem';
import { escapeHtml } from '@/utils/sanitize';
import { Panel } from './Panel';

function renderLink(url?: string, label = 'open'): string {
  if (!url) return '';
  return `<a class="vc-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
}

export class VcEcosystemPanel extends Panel {
  constructor() {
    super({
      id: 'vc-ecosystem',
      title: 'VC Ecosystem Monitor',
      showCount: true,
      infoTooltip: 'Curated venture firms, startup radar, themes, and research sources for tracking the private-market ecosystem.',
    });
    this.render();
  }

  private render(): void {
    const firms = VC_FIRMS.map((firm) => `
      <div class="vc-card">
        <div class="vc-card-head">
          <div class="vc-name">${escapeHtml(firm.name)}</div>
          ${renderLink(firm.url, 'site')}
        </div>
        <div class="vc-meta">${escapeHtml(firm.stage)} · ${escapeHtml(firm.geography)}</div>
        <div class="vc-focus">${escapeHtml(firm.focus)}</div>
        <div class="vc-signal">${escapeHtml(firm.signal)}</div>
      </div>
    `).join('');

    const startups = STARTUP_RADAR.map((item) => `
      <div class="vc-radar-item">
        <div class="vc-radar-top">
          <span class="vc-pill">${escapeHtml(item.category)}</span>
          <strong>${escapeHtml(item.name)}</strong>
        </div>
        <div class="vc-radar-text">${escapeHtml(item.whyItMatters)}</div>
        <div class="vc-radar-signal"><span>Watch:</span> ${escapeHtml(item.signal)}</div>
      </div>
    `).join('');

    const theses = THESIS_TRACKS.map((item) => `
      <li>
        <strong>${escapeHtml(item.theme)}</strong>
        <div class="vc-thesis-angle">${escapeHtml(item.angle)}</div>
      </li>
    `).join('');

    const sources = RESEARCH_SOURCES.map((item) => `
      <li>
        <span class="vc-source-kind">${escapeHtml(item.kind)}</span>
        <strong>${escapeHtml(item.name)}</strong> — ${escapeHtml(item.why)} ${renderLink(item.url, 'source')}
      </li>
    `).join('');

    this.setContent(`
      <div class="vc-panel">
        <div class="vc-section">
          <div class="vc-section-title">Target firms</div>
          <div class="vc-grid">${firms}</div>
        </div>

        <div class="vc-section">
          <div class="vc-section-title">Startup radar</div>
          <div class="vc-radar-list">${startups}</div>
        </div>

        <div class="vc-section vc-two-col">
          <div>
            <div class="vc-section-title">Themes to track</div>
            <ul class="vc-list">${theses}</ul>
          </div>
          <div>
            <div class="vc-section-title">Research sources</div>
            <ul class="vc-list vc-sources">${sources}</ul>
          </div>
        </div>

        <div class="vc-section">
          <div class="vc-section-title">How to use this panel</div>
          <ol class="vc-list vc-ops-list">
            <li>Track recurring firms and themes rather than reacting to isolated funding headlines.</li>
            <li>Compare startup momentum across launches, GitHub activity, hiring, and investor attention.</li>
            <li>Turn repeated signals into watchlists for founders, sectors, and likely warm-intro paths.</li>
          </ol>
        </div>
      </div>
    `);

    if (this.countEl) this.countEl.textContent = String(VC_FIRMS.length + STARTUP_RADAR.length);
  }
}
