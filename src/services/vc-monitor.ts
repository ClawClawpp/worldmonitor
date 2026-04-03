import {
  RESEARCH_SOURCES,
  SIGNAL_LENSES,
  STARTUP_RADAR,
  THESIS_TRACKS,
  VC_FIRMS,
  WATCH_BUCKETS,
  WORKFLOW_STEPS,
  type ResearchSourceItem,
  type SignalLens,
  type StartupRadarItem,
  type ThesisTrack,
  type VcFirmProfile,
  type WatchBucket,
  type WorkflowStep,
} from '@/config/vc-ecosystem';
import { getHydratedData } from '@/services/bootstrap';
import { startSmartPollLoop, toApiUrl, type SmartPollLoopHandle } from '@/services/runtime';
import { getPersistentCache, setPersistentCache } from '@/services/persistent-cache';

export interface VcMonitorSnapshot {
  firms: VcFirmProfile[];
  startupRadar: StartupRadarItem[];
  thesisTracks: ThesisTrack[];
  researchSources: ResearchSourceItem[];
  signalLenses: SignalLens[];
  workflowSteps: WorkflowStep[];
  watchBuckets: WatchBucket[];
  updatedAt: string;
  sourceLabel?: string;
}

export type VcMonitorSource = 'live' | 'cached' | 'seed';

export interface VcMonitorResult {
  data: VcMonitorSnapshot;
  source: VcMonitorSource;
}

const VC_MONITOR_CACHE_KEY = 'vc-monitor:snapshot';
const VC_MONITOR_DATA_PATH = '/data/vc-monitor.json';
const VC_MONITOR_REFRESH_MS = 15 * 60 * 1000;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getSeedVcMonitorSnapshot(): VcMonitorSnapshot {
  return {
    firms: clone(VC_FIRMS),
    startupRadar: clone(STARTUP_RADAR),
    thesisTracks: clone(THESIS_TRACKS),
    researchSources: clone(RESEARCH_SOURCES),
    signalLenses: clone(SIGNAL_LENSES),
    workflowSteps: clone(WORKFLOW_STEPS),
    watchBuckets: clone(WATCH_BUCKETS),
    updatedAt: new Date().toISOString(),
    sourceLabel: 'Curated defaults',
  };
}

function normalizeSnapshot(input: Partial<VcMonitorSnapshot> | null | undefined): VcMonitorSnapshot {
  const seed = getSeedVcMonitorSnapshot();
  return {
    firms: Array.isArray(input?.firms) && input?.firms.length > 0 ? input.firms : seed.firms,
    startupRadar: Array.isArray(input?.startupRadar) && input?.startupRadar.length > 0 ? input.startupRadar : seed.startupRadar,
    thesisTracks: Array.isArray(input?.thesisTracks) && input?.thesisTracks.length > 0 ? input.thesisTracks : seed.thesisTracks,
    researchSources: Array.isArray(input?.researchSources) && input?.researchSources.length > 0 ? input.researchSources : seed.researchSources,
    signalLenses: Array.isArray(input?.signalLenses) && input?.signalLenses.length > 0 ? input.signalLenses : seed.signalLenses,
    workflowSteps: Array.isArray(input?.workflowSteps) && input?.workflowSteps.length > 0 ? input.workflowSteps : seed.workflowSteps,
    watchBuckets: Array.isArray(input?.watchBuckets) && input?.watchBuckets.length > 0 ? input.watchBuckets : seed.watchBuckets,
    updatedAt: typeof input?.updatedAt === 'string' ? input.updatedAt : seed.updatedAt,
    sourceLabel: typeof input?.sourceLabel === 'string' ? input.sourceLabel : seed.sourceLabel,
  };
}

async function readCachedSnapshot(): Promise<VcMonitorResult | null> {
  try {
    const cached = await getPersistentCache<VcMonitorSnapshot>(VC_MONITOR_CACHE_KEY);
    if (!cached?.data) return null;
    return {
      data: normalizeSnapshot(cached.data),
      source: 'cached',
    };
  } catch {
    return null;
  }
}

async function writeCachedSnapshot(snapshot: VcMonitorSnapshot): Promise<void> {
  try {
    await setPersistentCache(VC_MONITOR_CACHE_KEY, snapshot);
  } catch {
    // best effort only
  }
}

async function fetchRemoteSnapshot(signal?: AbortSignal): Promise<VcMonitorResult | null> {
  try {
    const response = await fetch(toApiUrl(VC_MONITOR_DATA_PATH), {
      cache: 'no-cache',
      signal: signal ?? AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const payload = normalizeSnapshot(await response.json() as Partial<VcMonitorSnapshot>);
    void writeCachedSnapshot(payload);
    return {
      data: payload,
      source: 'live',
    };
  } catch {
    return null;
  }
}

export async function fetchVcMonitorSnapshot(signal?: AbortSignal): Promise<VcMonitorResult> {
  const hydrated = getHydratedData('vcMonitor') as Partial<VcMonitorSnapshot> | undefined;
  if (hydrated) {
    const data = normalizeSnapshot(hydrated);
    void writeCachedSnapshot(data);
    return { data, source: 'live' };
  }

  const remote = await fetchRemoteSnapshot(signal);
  if (remote) return remote;

  const cached = await readCachedSnapshot();
  if (cached) return cached;

  return {
    data: getSeedVcMonitorSnapshot(),
    source: 'seed',
  };
}

export function startVcMonitorPolling(onUpdate: (result: VcMonitorResult) => void, onError?: (error: unknown) => void): SmartPollLoopHandle {
  return startSmartPollLoop(async ({ signal, reason }) => {
    const result = await fetchVcMonitorSnapshot(signal);
    onUpdate(result);
    return reason !== 'interval' || result.source !== 'seed';
  }, {
    intervalMs: VC_MONITOR_REFRESH_MS,
    hiddenMultiplier: 4,
    runImmediately: false,
    onError,
  });
}
