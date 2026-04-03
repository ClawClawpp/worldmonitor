import {
  RESEARCH_SOURCES,
  SIGNAL_LENSES,
  STARTUP_RADAR,
  THESIS_TRACKS,
  VC_FIRMS,
  WATCH_BUCKETS,
  WORKFLOW_STEPS,
} from '@/config/vc-ecosystem';
import { escapeHtml } from '@/utils/sanitize';
import { Panel } from './Panel';

function renderLink(url?: string, label = 'open'): string {
  if (!url) return '';
  return `<a class="vc-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
}

function renderTags(tags: string[]): string {
  return tags.map(tag => `<span class="vc-mini-tag">${escapeHtml(tag)}</span>`).join('');
}

export class VcEcosystemPanel extends Panel {
  constructor() {
    super({
      id: 'vc-ecosystem',
      title: 'VC Ecosystem Monitor',
      showCount: true,
      infoTooltip: 'Track venture firms, startup momentum, thesis shifts, and the workflows needed to turn signal into action.',
    });
    this.render();
  }

  private render(): void {
    const firms = VC_FIRMS.map((firm) => `
      <div class="vc-card">
        <div class="vc-card-head">
          <div>
            <div class="vc-name">${escapeHtml(firm.name)}</div>
            <div class="vc-meta">${escapeHtml(firm.stage)} · ${escapeHtml(firm.geography)}</div>
          </div>
          <div class="vc-head-right">
            <span class="vc-priority ${firm.priority === 'High' ? 'high' : 'medium'}">${escapeHtml(firm.priority)}</span>
            ${renderLink(firm.url, 'site')}
          </div>
        </div>
        <div class="vc-focus">${escapeHtml(firm.focus)}</div>
        <div class="vc-signal">${escapeHtml(firm.signal)}</div>
        <div class="vc-tags">${renderTags(firm.tags)}</div>
      </div>
    `).join('');

    const startupItems = STARTUP_RADAR.map((item) => `
      <div class="vc-radar-item">
        <div class="vc-radar-top">
          <div>
            <span class="vc-pill">${escapeHtml(item.category)}</span>
            <strong class="vc-radar-name">${escapeHtml(item.name)}</strong>
          </div>
          <span class="vc-urgency ${item.urgency.toLowerCase().replace(/\s+/g, '-')}">${escapeHtml(item.urgency)}</span>
        </div>
        <div class="vc-radar-text">${escapeHtml(item.whyItMatters)}</div>
        <div class="vc-radar-signal"><span>Watch:</span> ${escapeHtml(item.signal)}</div>
        <div class="vc-tags">${renderTags(item.tags)}</div>
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

    const lenses = SIGNAL_LENSES.map((item) => `
      <div class="vc-lens-card">
        <div class="vc-lens-title">${escapeHtml(item.label)}</div>
        <div class="vc-lens-watch"><span>Watch:</span> ${escapeHtml(item.whatToWatch)}</div>
        <div class="vc-lens-why">${escapeHtml(item.whyItMatters)}</div>
      </div>
    `).join('');

    const workflow = WORKFLOW_STEPS.map((item) => `
      <div class="vc-flow-step">
        <div class="vc-flow-label">${escapeHtml(item.step)}</div>
        <div class="vc-flow-text">${escapeHtml(item.objective)}</div>
      </div>
    `).join('');

    const buckets = WATCH_BUCKETS.map((bucket) => `
      <div class="vc-bucket">
        <div class="vc-bucket-title">${escapeHtml(bucket.title)}</div>
        <ul class="vc-list">
          ${bucket.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    const highPriorityCount = VC_FIRMS.filter(firm => firm.priority === 'High').length;

    this.setContent(`
      <div class="vc-panel">
        <div class="vc-summary-strip">
          <div class="vc-summary-card">
            <div class="vc-summary-label">Priority firms</div>
            <div class="vc-summary-value">${highPriorityCount}</div>
            <div class="vc-summary-note">Start with the firms most likely to shape narrative and allocation.</div>
          </div>
          <div class="vc-summary-card">
            <div class="vc-summary-label">Radar themes</div>
            <div class="vc-summary-value">${STARTUP_RADAR.length}</div>
            <div class="vc-summary-note">Use them as persistent search lenses, not one-off headlines.</div>
          </div>
          <div class="vc-summary-card">
            <div class="vc-summary-label">Research loop</div>
            <div class="vc-summary-value">${WORKFLOW_STEPS.length}</div>
            <div class="vc-summary-note">Scan → cluster → score → act.</div>
          </div>
        </div>

        <div class="vc-section">
          <div class="vc-section-title">Target firms</div>
          <div class="vc-grid">${firms}</div>
        </div>

        <div class="vc-section">
          <div class="vc-section-title">Startup radar</div>
          <div class="vc-radar-list">${startupItems}</div>
        </div>

        <div class="vc-section">
          <div class="vc-section-title">Signal lenses</div>
          <div class="vc-grid vc-grid-tight">${lenses}</div>
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

        <div class="vc-section vc-two-col">
          <div>
            <div class="vc-section-title">Monitoring workflow</div>
            <div class="vc-flow-grid">${workflow}</div>
          </div>
          <div>
            <div class="vc-section-title">Watch buckets</div>
            <div class="vc-buckets">${buckets}</div>
          </div>
        </div>
      </div>
    `);

    if (this.countEl) this.countEl.textContent = String(VC_FIRMS.length + STARTUP_RADAR.length + SIGNAL_LENSES.length);
  }
}
