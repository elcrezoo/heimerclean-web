import { asset } from '@/lib/asset'
export const brand = {
  name: 'HeimerClean',
  version: '2.2.8',
  releaseDate: 'Latest release',
  minDisplay: '1200 × 800',
  phone: '+31 6 451 718 96',
  phoneHref: 'tel:+31645171896',
  // Replace with the direct installer link (.exe) when available.
  installerUrl: 'https://www.heimerclean.com/download',
  installerSize: '~200 MB',
  // Real checkout (payment provider) — plan and billing are appended as query params.
  checkoutUrl: 'https://www.heimerclean.com/store',
  rating: 3.8,
  requirements: 'Windows 10 or later · 200 MB',
  address: '22 Whitebridge Rd, Onchan, Isle of Man IM3 4HS, UK',
}

export const navLinks = [
  { label: 'Product', to: '/#tour' },
  { label: 'Features', to: '/#features' },
  { label: 'Store', to: '/store' },
  { label: 'Download', to: '/download' },
  { label: 'Docs', to: '/docs' },
  { label: 'Support', to: '/support' },
]

export const stats = [
  { value: 542531, label: 'Junk files cleared', suffix: '', decimals: 0 },
  { value: 6543.5, label: 'GB of RAM optimized', suffix: ' GB', decimals: 1 },
  { value: 85, label: 'Average cleanup score', suffix: '%', decimals: 0 },
  { value: 109, label: 'PCs optimizing right now', suffix: '', decimals: 0 },
]

export const tour = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Your PC’s health, at a glance.',
    body: 'System stress, files cleaned and memory optimized — updated live. The AI orb shows exactly what the optimizer is doing, from idle to a committed run.',
    points: ['Live optimization stats', 'AI status orb with Hybrid mode', 'Daily tasks, XP and leaderboard'],
    images: [asset('/images/screens/dashboard-idle.webp'), asset('/images/screens/dashboard-run.webp')],
    alt: 'HeimerClean dashboard showing daily optimization, AI orb, daily tasks and leaderboard',
  },
  {
    id: 'report',
    label: 'Reports',
    title: 'Every optimization, measured.',
    body: 'Filter by date and action, switch between local and cloud history, and export results. See total runs, energy saved and CO₂ avoided.',
    points: ['Local & cloud history', 'Energy and CO₂ impact', 'One-click export'],
    images: [asset('/images/screens/report.webp')],
    alt: 'HeimerClean report screen with total optimizations, energy saved and CO2 avoided',
  },
  {
    id: 'performance',
    label: 'Performance',
    title: 'Built for gamers and heavy workloads.',
    body: 'Automatic session detection recognizes the game or app in front of you, and dynamic NVIDIA profiles push for maximum performance — with manual override when you need it.',
    points: ['Automatic game & session detection', 'NVIDIA dynamic profiles', 'PresentMon capture support'],
    images: [asset('/images/screens/performance.webp')],
    alt: 'HeimerClean performance screen with auto session detection and manual target override',
  },
  {
    id: 'settings',
    label: 'Settings',
    title: 'Your account, your rules.',
    body: 'Manage your profile, license, family seats and security in one calm place. Updates, certificate trust and theme are a click away.',
    points: ['Google sign-in', 'Subscription & family plans', 'Dark and light themes'],
    images: [asset('/images/screens/settings.webp')],
    alt: 'HeimerClean settings screen with profile, license and application options',
  },
]

export const steps = [
  {
    title: 'Create your account',
    body: 'Sign up with Google in seconds and get your license instantly — every plan starts with a 30-day money-back guarantee.',
    image: asset('/images/steps/account.webp'),
  },
  {
    title: 'Install in a minute',
    body: 'A simple installer: next, next, finish. HeimerClean needs just 200 MB on Windows 10 or later.',
    image: asset('/images/steps/install.webp'),
  },
  {
    title: 'Forget about it',
    body: 'HeimerClean starts with Windows and optimizes silently in the background. Your PC just stays fast.',
    image: asset('/images/steps/optimize.webp'),
  },
]

export const testimonials = [
  {
    quote: 'Since the day I started using HeimerClean, my machine has felt noticeably lighter. I honestly didn’t expect this kind of performance.',
    name: 'Alexander Warme',
    role: 'Warme Medical Oxygen Systems — USA',
  },
  {
    quote: 'I was looking for an app to boost my PC’s performance and found HeimerClean. Now my computer starts faster every single time.',
    name: 'Aysu Bağcı',
    role: 'Customer Representative Manager, Cargoverse',
  },
  {
    quote: 'Before HeimerClean our company lost a lot of time to slow machines. Those losses are a thing of the past.',
    name: 'Kurt Sedlaczek',
    role: 'BOCK Kompressoren',
  },
  {
    quote: 'I used to get stutters mid-game. Since installing HeimerClean my games are fun again — it optimizes the PC in the background for me.',
    name: 'Engin Coşku',
    role: 'Interior Architect & Gamer',
  },
  {
    quote: 'I didn’t expect this much performance from an app with such a simple interface. User-friendly, affordable — highly recommended.',
    name: 'Nur Ergül',
    role: 'Translator',
  },
]

export const footprint = [
  { value: '0.2%', label: 'CPU while idle' },
  { value: '13%', label: 'Peak CPU during a run' },
  { value: '54 MB', label: 'Peak memory use' },
]

export type FeatureIcon = 'sparkles' | 'gauge' | 'cpu' | 'shield' | 'rocket' | 'activity' | 'zap'

export const features: {
  icon: FeatureIcon
  title: string
  body: string
}[] = [
  {
    icon: 'sparkles',
    title: 'Deep junk cleanup',
    body: 'Temporary files, caches and leftovers from uninstalled apps — found and removed from safe maintenance areas only. Your documents are never touched.',
  },
  {
    icon: 'cpu',
    title: 'Memory pressure relief',
    body: 'Frees avoidable RAM pressure in the background so the apps you use stay responsive.',
  },
  {
    icon: 'rocket',
    title: 'Faster startup',
    body: 'Trims background clutter that slows boot, so Windows is ready when you are.',
  },
  {
    icon: 'activity',
    title: 'Clear system health',
    body: 'A calm dashboard that shows what changed, when, and why — no cryptic logs.',
  },
  {
    icon: 'zap',
    title: 'Energy-aware',
    body: 'Pauses heavy work on battery and during games or calls, so optimizing never costs you performance.',
  },
  {
    icon: 'shield',
    title: 'Local-first & private',
    body: 'Decisions are made on your PC. HeimerClean never reads your files, messages or personal content.',
  },
]

export const optimizerSteps = [
  {
    title: 'Observe',
    body: 'Reads technical signals only — disk usage, memory pressure, CPU load. Never your personal content.',
  },
  {
    title: 'Decide',
    body: 'Chooses a safe, permitted action — or deliberately waits if you are gaming, on a call or rendering.',
  },
  {
    title: 'Act & verify',
    body: 'Runs the cleanup, then compares before/after results so every action is measurable.',
  },
]

export const optimizerOutcomes = [
  { label: 'Run a cleanup', tone: 'accent' },
  { label: 'Reduce memory pressure', tone: 'accent' },
  { label: 'Wait — system is busy', tone: 'muted' },
  { label: 'Skip — gain too low', tone: 'muted' },
] as const

export type BillingCycle = 'annual' | 'monthly'

export interface Plan {
  id: string
  name: string
  tagline: string
  price: Record<BillingCycle, number>
  seats: string
  featured?: boolean
  cta: string
  features: string[]
}

// Annual prices match heimerclean.com/store; monthly prices are placeholders to adjust.
export const plans: Plan[] = [
  {
    id: 'clean',
    name: 'HeimerClean',
    tagline: 'Silent, automatic care for your personal PC.',
    price: { annual: 1.99, monthly: 2.99 },
    seats: '1 user',
    cta: 'Get HeimerClean',
    features: ['Deep junk cleanup', 'Memory pressure relief', 'AI optimizer', 'Startup optimization', 'Automatic updates'],
  },
  {
    id: 'core',
    name: 'Core Suite',
    tagline: 'Everything in HeimerClean, plus fleet control.',
    price: { annual: 2.99, monthly: 3.99 },
    seats: '1 user',
    featured: true,
    cta: 'Get Core Suite',
    features: [
      'Everything in HeimerClean',
      'Centralized PC fleet administration',
      'Web portal & activity history',
      'Priority 24/7 support',
      'Before/after reports',
    ],
  },
  {
    id: 'vpn',
    name: 'HeimerVPN',
    tagline: 'Private browsing to pair with a clean PC.',
    price: { annual: 12.95, monthly: 14.95 },
    seats: '1 user',
    cta: 'Get HeimerVPN',
    features: ['Encrypted connection', 'No-logs browsing', 'Works alongside HeimerClean', 'One-click connect'],
  },
]

export const comparison: { label: string; values: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: 'Deep junk cleanup', values: [true, true, false] },
  { label: 'Memory pressure relief', values: [true, true, false] },
  { label: 'AI optimizer', values: [true, true, false] },
  { label: 'Startup optimization', values: [true, true, false] },
  { label: 'Reports & export', values: [true, true, false] },
  { label: 'Performance & game detection', values: [true, true, false] },
  { label: 'Centralized fleet administration', values: [false, true, false] },
  { label: 'Team view & tenant analytics', values: [false, true, false] },
  { label: 'Encrypted VPN connection', values: [false, false, true] },
  { label: 'Support', values: ['24/7', 'Priority 24/7', '24/7'] },
]

export const specialOffers = [
  {
    title: 'Upgrade to HeimerClean AI',
    body: 'Using the classic HeimerClean? Upgrade to the new AI-powered version. Compatible with Windows 10 and newer.',
    badge: 'Upgrade',
  },
  {
    title: 'Competitor discount — 40% off',
    body: 'Already paying for another PC cleaner or antivirus? Switch to HeimerClean and save 40%.',
    badge: '−40%',
  },
]

export const storeFaqs = [
  {
    q: 'How does billing work?',
    a: 'Plans are subscriptions. With annual billing you get the lower price and are charged monthly over the 12-month contract. Monthly billing can be cancelled at any time.',
  },
  {
    q: 'Is VAT included?',
    a: 'Prices are shown excluding VAT. Applicable VAT is calculated at checkout based on your country.',
  },
  {
    q: 'Can I try before I buy?',
    a: 'Yes. Every plan starts with a 30-day free trial — we won’t charge you until the trial ends, and you can cancel before then.',
  },
  {
    q: 'What if it’s not for me?',
    a: 'You’re covered by a 30-day money-back guarantee. Contact support and we’ll refund you, no questions asked.',
  },
]

export const guarantees = [
  '30-day money-back guarantee',
  'Cancel anytime',
  '24/7 technical & sales support',
  'Encrypted, secure payments',
]

export const faqs = [
  {
    q: 'Is HeimerClean an antivirus?',
    a: 'No. HeimerClean is not an antivirus replacement. Keep Windows Security or your organization-approved endpoint protection active — HeimerClean is designed to complement it.',
  },
  {
    q: 'Will cleanup delete my personal documents?',
    a: 'No. Cleanup targets temporary files and safe maintenance areas only. It is not designed to touch personal documents, photos or projects.',
  },
  {
    q: 'Why does the AI optimizer sometimes wait?',
    a: 'Acting at the wrong moment can be worse than doing nothing. If you are gaming, on a call or running heavy work, the optimizer waits so you are never interrupted.',
  },
  {
    q: 'Does the AI read my files or send my data?',
    a: 'No. The optimizer evaluates technical system signals locally. It does not inspect documents, messages or personal content. Only technical before/after operation logs may sync, and only with your consent.',
  },
  {
    q: 'Which folders does HeimerClean clean?',
    a: 'Safe maintenance locations such as Temp, Prefetch, SoftwareDistribution, Squirrel Temp, Downloaded Program Files, INetCache, Windows.old and the Recycle Bin. After a run it goes back to silent mode.',
  },
  {
    q: 'How much of my system does HeimerClean use?',
    a: 'Very little. While idle it uses about 0.2% CPU. During an active run it peaks around 13% CPU and 54 MB of RAM — it never bottlenecks your hardware.',
  },
  {
    q: 'Was HeimerClean flagged by Microsoft Defender?',
    a: 'An earlier version was mistakenly flagged as a potentially unwanted app. After review it was whitelisted and confirmed safe for Windows users.',
  },
  {
    q: 'Can I use HeimerClean without the web portal?',
    a: 'Yes. Most people use the desktop app only. Portal access depends on your account, role and plan — Core Suite includes it for fleet administration.',
  },
  {
    q: 'What are the system requirements?',
    a: 'Windows 10 or later and about 200 MB of free disk space. The desktop app is designed for displays of at least 1200 × 800 pixels.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Every plan comes with a 30-day money-back guarantee and easy cancellation — no questions asked.',
  },
  {
    q: 'What should I send to support?',
    a: 'Your app version, Windows version, any visible error message and what you were doing when it happened. Never send passwords, tokens, card data or private documents.',
  },
]
