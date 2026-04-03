import {
  type SignalLens,
  type StartupRadarItem,
  type ThesisTrack,
  type VcFirmProfile,
  type WatchBucket,
  type WorkflowStep,
} from '@/config/vc-ecosystem';
import { type VcMonitorResult, type VcMonitorSnapshot, fetchVcMonitorSnapshot, startVcMonitorPolling } from '@/services/vc-monitor';
import { escapeHtml } from '@/utils/sanitize';
import { Panel } from './Panel';
import type { SmartPollLoopHandle } from '@/services/runtime';

function renderLink(url?: string, label = 'open'): string {
  if (!url) return '';
  return `<a class="vc-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
}

function renderTags(tags: string[]): string {
  return tags.map(tag => `<span class="vc-mini-tag">${escapeHtml(tag)}</span>`).join('');
}

export class VcEcosystemPanel extends Panel {
  private pollHandle: SmartPollLoopHandle | null = null;

  constructor() {
    super({
      id: 'vc-ecosystem',
      title: 'VC Ecosystem Monitor',
      showCount: true,
      infoTooltip: 'Track venture firms, startup momentum, thesis shifts, and the workflows needed to turn signal into action.',
    });
    this.load();
    this.pollHandle = startVcMonitorPolling((result) => {
      if (!this.getElement().isConnected) return;
      this.renderSnapshot(result);
    }, (error) => {
      console.warn('[VcEcosystemPanel] polling failed:', error);
    });
  }

  private async load(): Promise<void> {
    this.showLoading('Loading VC monitor...');
    try {
      const result = await fetchVcMonitorSnapshot(this.signal);
      if (!this.getElement().isConnected) return;
      this.renderSnapshot(result);
    } catch (error) {
      if (this.isAbortError(error)) return;
      console.error('[VcEcosystemPanel] load failed:', error);
      this.showError('Failed to load VC monitor.', () => this.load());
      this.setDataBadge('unavailable');
    }
  }

  private renderSnapshot(result: VcMonitorResult): void {
    const data = result.data;
    const firms = this.renderFirms(data.firms);
    const startupItems = this.renderStartupRadar(data.startupRadar);
    const theses = this.renderTheses(data.thesisTracks);
    const sources = this.renderSources(data.researchSources);
    const lenses = this.renderLenses(data.signalLenses);
    const workflow = this.renderWorkflow(data.workflowSteps);
    const buckets = this.renderBuckets(data.watchBuckets);
    const highPriorityCount = data.firms.filter(firm => firm.priority === 'High').length;

    const badgeSource = result.source === 'seed' ? 'cached' : result.source;
    const freshness = data.updatedAt ? new Date(data.updatedAt).toLocaleString() : result.source;
    this.setDataBadge(badgeSource, freshness);

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
            <div class="vc-summary-value">${data.startupRadar.length}</div>
            <div class="vc-summary-note">Use them as persistent search lenses, not one-off headlines.</div>
          </div>
          <div class="vc-summary-card">
            <div class="vc-summary-label">Research loop</div>
            <div class="vc-summary-value">${data.workflowSteps.length}</div>
            <div class="vc-summary-note">${escapeHtml(data.sourceLabel || 'Scan → cluster → score → act.')}</div>
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

    this.setCount(data.firms.length + data.startupRadar.length + data.signalLenses.length);
  }

  private renderFirms(firms: VcFirmProfile[]): string {
    return firms.map((firm) => `
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
  }

  private renderStartupRadar(items: StartupRadarItem[]): string {
    return items.map((item) => `
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
  }

  private renderTheses(items: ThesisTrack[]): string {
    return items.map((item) => `
      <li>
        <strong>${escapeHtml(item.theme)}</strong>
        <div class="vc-thesis-angle">${escapeHtml(item.angle)}</div>
      </li>
    `).join('');
  }

  private renderSources(items: VcMonitorSnapshot['researchSources']): string {
    return items.map((item) => `
      <li>
        <span class="vc-source-kind">${escapeHtml(item.kind)}</span>
        <strong>${escapeHtml(item.name)}</strong> — ${escapeHtml(item.why)} ${renderLink(item.url, 'source')}
      </li>
    `).join('');
  }

  private renderLenses(items: SignalLens[]): string {
    return items.map((item) => `
      <div class="vc-lens-card">
        <div class="vc-lens-title">${escapeHtml(item.label)}</div>
        <div class="vc-lens-watch"><span>Watch:</span> ${escapeHtml(item.whatToWatch)}</div>
        <div class="vc-lens-why">${escapeHtml(item.whyItMatters)}</div>
      </div>
    `).join('');
  }

  private renderWorkflow(items: WorkflowStep[]): string {
    return items.map((item) => `
      <div class="vc-flow-step">
        <div class="vc-flow-label">${escapeHtml(item.step)}</div>
        <div class="vc-flow-text">${escapeHtml(item.objective)}</div>
      </div>
    `).join('');
  }

  private renderBuckets(items: WatchBucket[]): string {
    return items.map((bucket) => `
      <div class="vc-bucket">
        <div class="vc-bucket-title">${escapeHtml(bucket.title)}</div>
        <ul class="vc-list">
          ${bucket.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  public override destroy(): void {
    this.pollHandle?.stop();
    this.pollHandle = null;
    super.destroy();
  }
}
