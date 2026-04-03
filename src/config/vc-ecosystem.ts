export interface VcFirmProfile {
  name: string;
  focus: string;
  geography: string;
  stage: string;
  signal: string;
  priority: 'High' | 'Medium';
  tags: string[];
  url?: string;
}

export interface StartupRadarItem {
  name: string;
  category: string;
  whyItMatters: string;
  signal: string;
  urgency: 'Now' | 'Watch' | 'Build Thesis';
  tags: string[];
  url?: string;
}

export interface ThesisTrack {
  theme: string;
  angle: string;
}

export interface ResearchSourceItem {
  name: string;
  kind: 'vc' | 'media' | 'data' | 'community';
  why: string;
  url?: string;
}

export interface SignalLens {
  label: string;
  whatToWatch: string;
  whyItMatters: string;
}

export interface WorkflowStep {
  step: string;
  objective: string;
}

export interface WatchBucket {
  title: string;
  items: string[];
}

export const VC_FIRMS: VcFirmProfile[] = [
  {
    name: 'Y Combinator',
    focus: 'Founders, software, AI, infra, applied products',
    geography: 'US / global',
    stage: 'Pre-seed / seed',
    signal: 'Fast read on what early builders are shipping and how founder narratives are changing.',
    priority: 'High',
    tags: ['founders', 'seed', 'AI'],
    url: 'https://www.ycombinator.com/',
  },
  {
    name: 'a16z',
    focus: 'AI, infrastructure, fintech, defense, healthcare, crypto',
    geography: 'US / global',
    stage: 'Seed to growth',
    signal: 'A thesis machine — useful for understanding narrative formation and sector conviction.',
    priority: 'High',
    tags: ['AI', 'defense', 'thesis'],
    url: 'https://a16z.com/',
  },
  {
    name: 'Sequoia Capital',
    focus: 'Software, AI, enterprise, consumer, global breakout companies',
    geography: 'US / global',
    stage: 'Seed to growth',
    signal: 'Good proxy for what “quality at scale” looks like in venture-backed companies.',
    priority: 'High',
    tags: ['quality', 'growth', 'enterprise'],
    url: 'https://www.sequoiacap.com/',
  },
  {
    name: 'General Catalyst',
    focus: 'Applied AI, healthcare, fintech, resilience systems',
    geography: 'US / global',
    stage: 'Seed to growth',
    signal: 'Interesting whenever venture capital starts behaving like industrial policy or ecosystem building.',
    priority: 'Medium',
    tags: ['resilience', 'healthcare', 'AI'],
    url: 'https://www.generalcatalyst.com/',
  },
  {
    name: 'Founders Fund',
    focus: 'Hard tech, defense, frontier science, contrarian bets',
    geography: 'US',
    stage: 'Early to growth',
    signal: 'Watch when capital rotates from software convenience into strategic infrastructure.',
    priority: 'High',
    tags: ['hard-tech', 'defense', 'contrarian'],
    url: 'https://foundersfund.com/',
  },
  {
    name: 'Benchmark',
    focus: 'Early-stage product companies with category-defining ambition',
    geography: 'US',
    stage: 'Seed / Series A',
    signal: 'Smaller partnership, strong taste — useful as a quality filter more than a volume feed.',
    priority: 'Medium',
    tags: ['product', 'seed', 'taste'],
    url: 'https://www.benchmark.com/',
  },
  {
    name: 'Lightspeed',
    focus: 'Enterprise, consumer, AI, infrastructure, India/SEA',
    geography: 'US / India / Europe / SEA',
    stage: 'Seed to growth',
    signal: 'Helpful for seeing cross-region startup momentum and AI infrastructure appetite.',
    priority: 'Medium',
    tags: ['global', 'AI', 'enterprise'],
    url: 'https://lsvp.com/',
  },
  {
    name: 'Accel',
    focus: 'Developer tools, enterprise, AI, consumer internet',
    geography: 'US / Europe / India',
    stage: 'Seed / Series A',
    signal: 'Strong read on software and developer ecosystem shifts.',
    priority: 'Medium',
    tags: ['developer', 'enterprise', 'seed'],
    url: 'https://www.accel.com/',
  },
];

export const STARTUP_RADAR: StartupRadarItem[] = [
  {
    name: 'AI infra toolchains',
    category: 'Infrastructure',
    whyItMatters: 'The picks-and-shovels layer still captures a large share of AI spend before application margins settle.',
    signal: 'GPU orchestration, eval tooling, agent backends, retrieval quality, workflow reliability.',
    urgency: 'Now',
    tags: ['AI', 'infrastructure', 'compute'],
  },
  {
    name: 'Vertical AI copilots',
    category: 'Applied AI',
    whyItMatters: 'The real defensibility is moving from generic chat to domain-specific workflow replacement.',
    signal: 'Healthcare, legal, sales ops, accounting, field service, compliance.',
    urgency: 'Now',
    tags: ['AI', 'vertical', 'workflow'],
  },
  {
    name: 'Defense / resilience startups',
    category: 'Strategic tech',
    whyItMatters: 'Capital is flowing toward sovereign capability, industrial resilience, drones, security, and supply chain visibility.',
    signal: 'Dual-use, logistics, satellite, sensor, autonomy, critical manufacturing.',
    urgency: 'Watch',
    tags: ['defense', 'resilience', 'supply-chain'],
  },
  {
    name: 'Developer productivity products',
    category: 'Software tools',
    whyItMatters: 'Code generation is commoditizing; orchestration, review, deployment, and governance are becoming the monetizable layers.',
    signal: 'Agent workflows, code review, CI automation, repo memory, internal developer platforms.',
    urgency: 'Now',
    tags: ['developer', 'agents', 'software'],
  },
  {
    name: 'Data moats from the physical world',
    category: 'Robotics / IoT',
    whyItMatters: 'The companies that can capture proprietary operational data may build stronger long-term models than pure software wrappers.',
    signal: 'Sensors, industrial workflows, fleet data, robotics learning loops, edge intelligence.',
    urgency: 'Build Thesis',
    tags: ['robotics', 'IoT', 'data'],
  },
];

export const THESIS_TRACKS: ThesisTrack[] = [
  {
    theme: 'AI is unbundling software seats into autonomous workflows.',
    angle: 'Watch products that replace steps in a process, not just add a chatbot on top.',
  },
  {
    theme: 'Distribution is getting re-priced by agents and search changes.',
    angle: 'Traffic, discovery, and lead generation assumptions are becoming unstable across startups.',
  },
  {
    theme: 'Strategic sectors are converging with venture.',
    angle: 'Defense, energy, semis, robotics, and supply chain are no longer “slow” sectors from a capital perspective.',
  },
  {
    theme: 'The next software moat is operational data plus trusted workflow insertion.',
    angle: 'Companies embedded in the real decision loop will outrun generic AI wrappers.',
  },
];

export const RESEARCH_SOURCES: ResearchSourceItem[] = [
  {
    name: 'Crunchbase',
    kind: 'data',
    why: 'Baseline company, funding, and investor discovery.',
    url: 'https://www.crunchbase.com/',
  },
  {
    name: 'PitchBook',
    kind: 'data',
    why: 'Higher-quality private markets and deal flow intelligence if you have access.',
  },
  {
    name: 'TechCrunch',
    kind: 'media',
    why: 'Still useful for public startup and funding momentum, despite noise.',
    url: 'https://techcrunch.com/',
  },
  {
    name: 'StrictlyVC',
    kind: 'media',
    why: 'Good for who is active, who is speaking, and where private-market attention is clustering.',
    url: 'https://strictlyvc.com/',
  },
  {
    name: 'OpenVC',
    kind: 'data',
    why: 'Useful structured view of firms, stages, and filters for outreach.',
    url: 'https://www.openvc.app/',
  },
  {
    name: 'YC / a16z / Sequoia essays',
    kind: 'vc',
    why: 'Best used as thesis signals rather than objective truth.',
  },
  {
    name: 'Hacker News / GitHub Trending / Product Hunt',
    kind: 'community',
    why: 'Early signal for builder energy, open-source traction, and product curiosity.',
  },
];

export const SIGNAL_LENSES: SignalLens[] = [
  {
    label: 'Deal flow',
    whatToWatch: 'fundraises, new funds, exits, M&A, partner moves',
    whyItMatters: 'This tells you where capital is actually moving, not just what people claim to believe.',
  },
  {
    label: 'Product momentum',
    whatToWatch: 'launches, GitHub velocity, Product Hunt, user buzz, infra adoption',
    whyItMatters: 'Early product traction often surfaces before the formal financing narrative catches up.',
  },
  {
    label: 'Talent migration',
    whatToWatch: 'senior hires, founders leaving incumbents, operator-to-investor moves',
    whyItMatters: 'Talent movement is often the earliest signal of where strategic gravity is shifting.',
  },
  {
    label: 'Narrative formation',
    whatToWatch: 'partner essays, conference themes, media framing, policy talk',
    whyItMatters: 'Thesis language changes before allocation becomes obvious in the data.',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 'Scan',
    objective: 'Review top signals across firms, sectors, and startups instead of drowning in isolated headlines.',
  },
  {
    step: 'Cluster',
    objective: 'Group repeated signals into themes: AI infra, defense tech, enterprise AI, robotics, climate, fintech.',
  },
  {
    step: 'Score',
    objective: 'Rank items by strategic relevance, timing, and whether they alter your thesis or outreach plan.',
  },
  {
    step: 'Act',
    objective: 'Turn signal into action: update watchlists, draft outreach, note a thesis shift, or ignore noise.',
  },
];

export const WATCH_BUCKETS: WatchBucket[] = [
  {
    title: 'Track weekly',
    items: ['Top VC firms and partner essays', 'AI infra and developer-tools startups', 'macro/geopolitics that change capital appetite'],
  },
  {
    title: 'Trigger alerts',
    items: ['large fundraises', 'major partner moves', 'portfolio exits', 'regulatory shifts affecting AI or defense'],
  },
  {
    title: 'Deep-research queue',
    items: ['private company dossiers', 'sector maps', 'warm-intro paths', 'hidden second-order winners'],
  },
];
