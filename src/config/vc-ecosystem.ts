export interface VcFirmProfile {
  name: string;
  focus: string;
  geography: string;
  stage: string;
  signal: string;
  url?: string;
}

export interface StartupRadarItem {
  name: string;
  category: string;
  whyItMatters: string;
  signal: string;
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

export const VC_FIRMS: VcFirmProfile[] = [
  {
    name: 'Y Combinator',
    focus: 'Founders, software, AI, infra, applied products',
    geography: 'US / global',
    stage: 'Pre-seed / seed',
    signal: 'Fast read on what early builders are shipping and how founder narratives are changing.',
    url: 'https://www.ycombinator.com/',
  },
  {
    name: 'a16z',
    focus: 'AI, infrastructure, fintech, defense, healthcare, crypto',
    geography: 'US / global',
    stage: 'Seed to growth',
    signal: 'A thesis machine — useful for understanding narrative formation and sector conviction.',
    url: 'https://a16z.com/',
  },
  {
    name: 'Sequoia Capital',
    focus: 'Software, AI, enterprise, consumer, global breakout companies',
    geography: 'US / global',
    stage: 'Seed to growth',
    signal: 'Good proxy for what “quality at scale” looks like in venture-backed companies.',
    url: 'https://www.sequoiacap.com/',
  },
  {
    name: 'General Catalyst',
    focus: 'Applied AI, healthcare, fintech, resilience systems',
    geography: 'US / global',
    stage: 'Seed to growth',
    signal: 'Interesting whenever venture capital starts behaving like industrial policy or ecosystem building.',
    url: 'https://www.generalcatalyst.com/',
  },
  {
    name: 'Founders Fund',
    focus: 'Hard tech, defense, frontier science, contrarian bets',
    geography: 'US',
    stage: 'Early to growth',
    signal: 'Watch when capital rotates from software convenience into strategic infrastructure.',
    url: 'https://foundersfund.com/',
  },
  {
    name: 'Benchmark',
    focus: 'Early-stage product companies with category-defining ambition',
    geography: 'US',
    stage: 'Seed / Series A',
    signal: 'Smaller partnership, strong taste — useful as a quality filter more than a volume feed.',
    url: 'https://www.benchmark.com/',
  },
  {
    name: 'Lightspeed',
    focus: 'Enterprise, consumer, AI, infrastructure, India/SEA',
    geography: 'US / India / Europe / SEA',
    stage: 'Seed to growth',
    signal: 'Helpful for seeing cross-region startup momentum and AI infrastructure appetite.',
    url: 'https://lsvp.com/',
  },
  {
    name: 'Accel',
    focus: 'Developer tools, enterprise, AI, consumer internet',
    geography: 'US / Europe / India',
    stage: 'Seed / Series A',
    signal: 'Strong read on software and developer ecosystem shifts.',
    url: 'https://www.accel.com/',
  },
];

export const STARTUP_RADAR: StartupRadarItem[] = [
  {
    name: 'AI infra toolchains',
    category: 'Infrastructure',
    whyItMatters: 'The picks-and-shovels layer still captures a large share of AI spend before application margins settle.',
    signal: 'GPU orchestration, eval tooling, agent backends, retrieval quality, workflow reliability.',
  },
  {
    name: 'Vertical AI copilots',
    category: 'Applied AI',
    whyItMatters: 'The real defensibility is moving from generic chat to domain-specific workflow replacement.',
    signal: 'Healthcare, legal, sales ops, accounting, field service, compliance.',
  },
  {
    name: 'Defense / resilience startups',
    category: 'Strategic tech',
    whyItMatters: 'Capital is flowing toward sovereign capability, industrial resilience, drones, security, and supply chain visibility.',
    signal: 'Dual-use, logistics, satellite, sensor, autonomy, critical manufacturing.',
  },
  {
    name: 'Developer productivity products',
    category: 'Software tools',
    whyItMatters: 'Code generation is commoditizing; orchestration, review, deployment, and governance are becoming the monetizable layers.',
    signal: 'Agent workflows, code review, CI automation, repo memory, internal developer platforms.',
  },
  {
    name: 'Data moats from the physical world',
    category: 'Robotics / IoT',
    whyItMatters: 'The companies that can capture proprietary operational data may build stronger long-term models than pure software wrappers.',
    signal: 'Sensors, industrial workflows, fleet data, robotics learning loops, edge intelligence.',
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
