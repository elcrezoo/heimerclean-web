import { asset } from '@/lib/asset'
export type DocBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'info' | 'warning' | 'success'; title?: string; text: string }
  | { type: 'cards'; items: { title: string; text: string; to?: string }[] }
  | { type: 'image'; src: string; alt: string }

export interface DocPage {
  slug: string
  title: string
  description: string
  group: string
  updated?: string
  blocks: DocBlock[]
}

export const docGroups = ['Start here', 'Desktop app', 'AI Optimizer', 'Privacy & security', 'Help', 'Guides', 'Release notes']

export const docs: DocPage[] = [
  {
    slug: 'overview',
    title: 'HeimerClean Docs',
    description: 'Everything you need to keep your Windows PC clean, responsive and easy to maintain.',
    group: 'Start here',
    blocks: [
      {
        type: 'p',
        text: 'HeimerClean helps Windows users keep their computer clean, responsive and easier to maintain. It combines safe cleanup tools, system health views and an AI-assisted optimizer that decides when it is useful to act — and when it is better to wait.',
      },
      {
        type: 'cards',
        items: [
          { title: 'Getting started', text: 'New to HeimerClean? Start here.', to: 'getting-started' },
          { title: 'Desktop app', text: 'Dashboard, Report, Performance, Team and Settings.', to: 'desktop-app' },
          { title: 'AI Optimizer', text: 'How automation decides when to act.', to: 'ai-optimizer' },
          { title: 'Troubleshooting', text: 'Fixes for common problems.', to: 'troubleshooting' },
        ],
      },
      { type: 'h2', text: 'What HeimerClean does' },
      {
        type: 'ul',
        items: [
          'Cleans temporary files and common clutter.',
          'Helps reduce unnecessary memory pressure.',
          'Shows clear system status and activity.',
          'Keeps optimization actions understandable.',
          'Uses local-first behavior where possible.',
          'Gives users control before sensitive actions.',
        ],
      },
      { type: 'h2', text: 'What HeimerClean does not do' },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Not an antivirus',
        text: 'HeimerClean is not an antivirus replacement, not a password manager, and not a tool for bypassing Windows security. It is designed to complement safe Windows usage and standard endpoint protection.',
      },
      {
        type: 'p',
        text: 'This documentation is public. It does not include internal server details, private APIs, database design, tokens, admin-only procedures or infrastructure secrets.',
      },
    ],
  },
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Understand the desktop app quickly and run your first safe cleanup.',
    group: 'Start here',
    blocks: [
      { type: 'h2', text: '1. Open HeimerClean' },
      {
        type: 'p',
        text: 'Launch HeimerClean from the Windows Start menu or desktop shortcut. The first screen is designed to show the current system state before you run any action.',
      },
      { type: 'h2', text: '2. Check the Dashboard' },
      {
        type: 'p',
        text: 'Use the dashboard to see the current status of your computer. If something needs attention, start with the visible message on the dashboard before using advanced settings.',
      },
      { type: 'image', src: asset('/images/screens/dashboard-idle.webp'), alt: 'HeimerClean dashboard' },
      { type: 'h2', text: '3. Run a safe cleanup' },
      { type: 'p', text: 'Use the cleanup action when you want to remove temporary files and reduce clutter. Recommended first run:' },
      {
        type: 'ol',
        items: [
          'Close unnecessary apps.',
          'Start cleanup from the dashboard or tray menu.',
          'Wait for the result message.',
          'Review what changed.',
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'HeimerClean avoids presenting cleanup as a magic fix. It is one maintenance step, not a replacement for healthy storage habits.',
      },
      { type: 'h2', text: '4. Use the tray menu' },
      { type: 'p', text: 'The Windows tray menu gives quick access to common actions without keeping the full app open:' },
      {
        type: 'ul',
        items: ['Run daily optimization', 'Clear temporary files', 'Clear memory pressure', 'Open the dashboard'],
      },
      { type: 'h2', text: '5. Understand AI activity' },
      {
        type: 'p',
        text: 'The AI optimizer may wait instead of acting. This is intentional. It can defer optimization when the computer appears busy, when the gain is low, or when an action could interrupt work. A no-action decision can be the correct decision.',
      },
      { type: 'h2', text: '6. Keep the app updated' },
      {
        type: 'p',
        text: 'When updates are available, follow the in-app update flow. Updates may include safer cleanup rules, better device detection and improved optimization decisions.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Quick checklist',
        text: 'Open the app · Review dashboard status · Run one safe cleanup · Check the result · Learn the tray menu · Read AI Optimizer before relying on automation.',
      },
    ],
  },
  {
    slug: 'desktop-app',
    title: 'Desktop App',
    description: 'The desktop app is organized into focused pages so you can quickly find the right action.',
    group: 'Desktop app',
    blocks: [
      { type: 'h2', text: 'Dashboard' },
      { type: 'p', text: 'Primary daily surface for optimization run status, AI state, energy savings, tasks and plan state.' },
      { type: 'image', src: asset('/images/screens/dashboard-run.webp'), alt: 'Dashboard with an AI run committed' },
      { type: 'h2', text: 'Report' },
      {
        type: 'p',
        text: 'Operational output area to review detected and cleaned totals, evidence lists, date-range filtering and export actions.',
      },
      { type: 'image', src: asset('/images/screens/report.webp'), alt: 'Report page' },
      { type: 'h2', text: 'Performance' },
      {
        type: 'p',
        text: 'Telemetry diagnostics page for active app detection, capture metrics, GPU and platform diagnostics, and cloud snapshots.',
      },
      { type: 'image', src: asset('/images/screens/performance.webp'), alt: 'Performance page' },
      { type: 'h2', text: 'Team' },
      {
        type: 'p',
        text: 'B2B-oriented view for team activity, AI intervention and training, scoped devices and organization-level insights.',
      },
      { type: 'h2', text: 'Settings' },
      {
        type: 'p',
        text: 'Control center for account, app behavior, update policy, notifications, background services and AI rollout controls.',
      },
      {
        type: 'table',
        head: ['Group', 'Panels'],
        rows: [
          ['Profile and License', 'Personal Info, Subscription, Security, Family/Company'],
          ['Application', 'About, Certificate Trust, Software Update, Theme, Language, Notifications'],
          ['System and Control', 'Background Services, AI Policy and Rollout, Privacy/Security'],
        ],
      },
      { type: 'h2', text: 'Recommended use flow' },
      {
        type: 'ol',
        items: [
          'Open Dashboard for current status.',
          'Run optimization when required.',
          'Review Report evidence.',
          'Tune behavior from Settings.',
          'Use Performance and Team for advanced diagnostics and tenant analytics.',
        ],
      },
      { type: 'h2', text: 'When to contact support' },
      {
        type: 'ul',
        items: [
          'App startup repeatedly fails.',
          'License status stays invalid after sign-in.',
          'Update installation fails repeatedly.',
          'Report or telemetry does not refresh.',
          'Team panel cannot load tenant data.',
        ],
      },
    ],
  },
  {
    slug: 'update-automation',
    title: 'Update Automation',
    description: 'How Automatic Updates and AI Update work together in Settings › Updates.',
    group: 'Desktop app',
    blocks: [
      { type: 'h2', text: 'How the two switches work' },
      {
        type: 'table',
        head: ['Automatic Updates', 'AI Update', 'Behavior'],
        rows: [
          ['On', 'On', 'Standard automatic flow. The app checks, downloads and applies updates automatically.'],
          ['On', 'Off', 'Standard automatic flow. AI does not add extra gating.'],
          ['Off', 'On', 'AI-controlled flow. Waits for low device activity, then updates in the background.'],
          ['Off', 'Off', 'Manual mode. The app only reports availability.'],
        ],
      },
      { type: 'h2', text: 'Manual actions (always available)' },
      {
        type: 'ul',
        items: [
          'Start update download manually from the Updates area.',
          'Start install manually for installer/extract packages.',
          'Re-run failed update actions from the same panel.',
        ],
      },
      { type: 'h2', text: 'Notifications and deep links' },
      {
        type: 'p',
        text: 'When an update is found, a Windows toast notification can be shown. Clicking it focuses HeimerClean and routes directly to Settings › Updates, with the update card as the primary focus area.',
      },
      { type: 'h2', text: 'Recommended defaults' },
      {
        type: 'ol',
        items: [
          'Keep Automatic Updates on.',
          'Keep AI Update on if you want AI-assisted timing.',
          'Use manual actions only when you need full control over package timing.',
        ],
      },
    ],
  },
  {
    slug: 'ai-optimizer',
    title: 'AI Optimizer',
    description: 'An autonomous AI system agent for Windows that decides when maintenance actions are useful.',
    group: 'AI Optimizer',
    blocks: [
      {
        type: 'p',
        text: 'HeimerClean classifies this capability as an Autonomous AI System Agent for Windows. It runs in the Windows background service layer, evaluates technical system signals locally, and can choose a permitted maintenance action without requiring you to understand processes or system files.',
      },
      { type: 'h2', text: 'Simple explanation' },
      { type: 'p', text: 'The optimizer looks at system context and chooses a safe action, or chooses no action. Possible outcomes:' },
      {
        type: 'ul',
        items: [
          'Run a cleanup.',
          'Reduce avoidable memory pressure.',
          'Wait because the system is busy.',
          'Do nothing because the expected gain is low.',
        ],
      },
      { type: 'h2', text: 'Why it may wait' },
      {
        type: 'p',
        text: 'Waiting protects the user experience. The optimizer avoids interrupting heavy workloads, games, calls or active foreground work.',
      },
      { type: 'h2', text: 'User control' },
      { type: 'p', text: 'You can still run manual actions — useful when you know you want maintenance now.' },
      { type: 'h2', text: 'What it does not mean' },
      {
        type: 'callout',
        tone: 'info',
        text: 'AI optimization does not mean the app reads private files, bypasses Windows permissions, or sends hidden personal data for decisions. Only technical anomaly-training fields and before/after operation logs may be synchronized when the relevant consent and configuration allow it.',
      },
      { type: 'h2', text: 'Good habits' },
      {
        type: 'ul',
        items: [
          'Keep Windows updated.',
          'Keep enough free disk space.',
          'Do not run several cleanup tools at the same time.',
          'Let HeimerClean finish before starting another optimization.',
        ],
      },
    ],
  },
  {
    slug: 'local-context-privacy',
    title: 'Local Context and Privacy',
    description: 'Why the live decision path runs on your device, and what — if anything — is synchronized.',
    group: 'AI Optimizer',
    blocks: [
      {
        type: 'p',
        text: 'HeimerClean needs to understand the operating condition of a Windows device, not the private meaning of your work. The local agent asks a narrow question: is one of the registered maintenance actions useful and safe now, or should the system wait?',
      },
      { type: 'h2', text: 'Local-first by design' },
      {
        type: 'p',
        text: 'The live context vector, the safety mask and the final action decision are produced on the Windows device. A cloud response is not required to decide whether the local agent should wait or apply an allowed action.',
      },
      {
        type: 'p',
        text: 'If the network is unavailable, records remain in a local queue and are retried later. Cloud availability never authorizes a blocked action.',
      },
      { type: 'h2', text: 'Data minimization' },
      {
        type: 'p',
        text: 'HeimerClean separates private content from machine-state measurements, minimizes the learning payload, keeps the live decision path on-device, and documents the remaining operational metadata — in line with GDPR Article 5 and the NIST Privacy Framework.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'In short',
        text: 'HeimerClean does not read or analyse personal file content to make optimization decisions. Only limited technical learning and before/after records are eligible for cloud sync, together with operational metadata required by the authenticated service.',
      },
    ],
  },
  {
    slug: 'privacy-security',
    title: 'Privacy and Security',
    description: 'The public privacy and security posture, explained at a user level.',
    group: 'Privacy & security',
    blocks: [
      { type: 'h2', text: 'Public principle' },
      { type: 'p', text: 'HeimerClean explains what it does without exposing internal infrastructure or private customer data.' },
      { type: 'h2', text: 'Desktop safety' },
      {
        type: 'p',
        text: 'The desktop app is designed to work with normal Windows permissions. Some cleanup actions may require elevated permissions depending on file type, system location or Windows policy.',
      },
      { type: 'h2', text: 'Account safety' },
      {
        type: 'p',
        text: 'Use a strong password for account access. Do not share one account across multiple people if your organization provides separate accounts.',
      },
      { type: 'h2', text: 'Support safety' },
      { type: 'p', text: 'When asking for help, avoid sending:' },
      {
        type: 'ul',
        items: ['Passwords', 'License keys', 'Full screenshots with private emails', 'Private documents', 'Payment details'],
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'Send only the error message, app version, Windows version and a short description of what happened.',
      },
    ],
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fixes for the most common user-facing problems.',
    group: 'Help',
    blocks: [
      { type: 'h2', text: 'App does not open' },
      {
        type: 'ol',
        items: [
          'Restart Windows.',
          'Open HeimerClean again.',
          'Check whether Windows Security or another endpoint tool blocked the app.',
          'Reinstall only if the app still does not open.',
        ],
      },
      { type: 'h2', text: 'Cleanup is slow' },
      { type: 'p', text: 'Cleanup can take longer when:' },
      {
        type: 'ul',
        items: [
          'The device has many temporary files.',
          'The disk is nearly full.',
          'Another program is scanning files.',
          'Windows is installing updates.',
        ],
      },
      { type: 'p', text: 'Wait for the current action to finish before starting another one.' },
      { type: 'h2', text: 'License looks invalid' },
      {
        type: 'ol',
        items: [
          'Check your internet connection.',
          'Sign in again if the app asks.',
          'Restart the app.',
          'Contact support if the license still does not refresh.',
        ],
      },
      { type: 'h2', text: 'AI Optimizer did nothing' },
      {
        type: 'p',
        text: 'This can be normal. The optimizer may decide that waiting is safer than acting. Run a manual cleanup if you want immediate maintenance.',
      },
      { type: 'h2', text: 'Update failed' },
      {
        type: 'ol',
        items: ['Restart the app.', 'Restart Windows.', 'Run the update again.', 'Contact support if it fails twice.'],
      },
    ],
  },
  {
    slug: 'faq',
    title: 'FAQ',
    description: 'Short answers to the questions we hear most.',
    group: 'Help',
    blocks: [
      { type: 'h3', text: 'Is HeimerClean an antivirus?' },
      { type: 'p', text: 'No. Keep Windows Security or your organization-approved endpoint protection active.' },
      { type: 'h3', text: 'Does cleanup delete my personal documents?' },
      { type: 'p', text: 'No. Cleanup is intended for temporary files and safe maintenance areas.' },
      { type: 'h3', text: 'Why does the AI optimizer sometimes wait?' },
      { type: 'p', text: 'Acting at the wrong time can be worse than doing nothing. Waiting avoids interrupting active work.' },
      { type: 'h3', text: 'Can I use HeimerClean without the portal?' },
      { type: 'p', text: 'Yes. Most users only use the desktop app. Portal access depends on your account, role and subscription.' },
      { type: 'h3', text: 'What should I send to support?' },
      {
        type: 'p',
        text: 'The app version, Windows version, visible error message and what you were doing. Never send passwords, tokens, payment card data or private documents.',
      },
    ],
  },
  {
    slug: 'pc-running-slow',
    title: 'PC Running Slow?',
    description: 'Why Windows slows down over time — and how to get the speed back without guesswork.',
    group: 'Guides',
    blocks: [
      {
        type: 'p',
        text: 'A PC rarely becomes slow for a single reason. Temporary files pile up, startup apps multiply, memory stays reserved by programs you closed hours ago and the disk fills until Windows has no room to work.',
      },
      { type: 'h2', text: 'Common causes' },
      {
        type: 'ul',
        items: [
          'Too many apps launching with Windows.',
          'Less than 10–15% free space on the system drive.',
          'Standby memory that is not released after heavy apps close.',
          'Background updates, indexing or antivirus scans running at the same time.',
          'Old drivers or an overheating laptop throttling the CPU.',
        ],
      },
      { type: 'h2', text: 'Quick checks you can do now' },
      {
        type: 'ol',
        items: [
          'Restart Windows — a full restart, not sleep.',
          'Open Task Manager (Ctrl + Shift + Esc) and sort by CPU, Memory and Disk.',
          'Disable startup apps you do not need under Task Manager › Startup apps.',
          'Free space on drive C: until at least 15% is available.',
        ],
      },
      { type: 'h2', text: 'Let HeimerClean handle it' },
      {
        type: 'p',
        text: 'HeimerClean watches these signals continuously. The AI Optimizer clears junk, releases memory pressure and trims startup delay when it is safe to act — and waits when you are busy.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Result',
        text: 'Most users see faster startup and fewer stutters within the first day, without changing how they use their PC.',
      },
      {
        type: 'cards',
        items: [
          { title: 'Speed up your PC', text: 'Seven practical ways to make Windows feel new.', to: 'speed-up-pc' },
          { title: 'How the AI Optimizer decides', text: 'Why it sometimes waits.', to: 'ai-optimizer' },
        ],
      },
    ],
  },
  {
    slug: 'speed-up-pc',
    title: 'Speed Up Your PC',
    description: 'Seven practical ways to make a Windows 10 or 11 PC feel fast again.',
    group: 'Guides',
    blocks: [
      { type: 'h2', text: '1. Trim startup apps' },
      { type: 'p', text: 'Every app that starts with Windows adds seconds to boot and keeps using memory. Keep only what you use daily.' },
      { type: 'h2', text: '2. Keep free disk space' },
      { type: 'p', text: 'Windows needs room for updates, the page file and temporary data. Aim for at least 15% free on drive C:.' },
      { type: 'h2', text: '3. Release standby memory' },
      { type: 'p', text: 'After games or editors close, memory can stay reserved. HeimerClean releases it automatically when pressure builds.' },
      { type: 'h2', text: '4. Clear temporary files' },
      { type: 'p', text: 'Browser caches, %TEMP% and Prefetch grow quietly. See Clear cache on PC for a safe routine.' },
      { type: 'h2', text: '5. Use the right power plan' },
      { type: 'p', text: 'On desktops, choose Balanced or Best performance. On laptops, plug in for heavy work.' },
      { type: 'h2', text: '6. Keep Windows and drivers updated' },
      { type: 'p', text: 'Graphics and chipset drivers often include performance fixes. Install updates when you are not busy.' },
      { type: 'h2', text: '7. Automate the routine' },
      {
        type: 'p',
        text: 'Manual maintenance works until you forget it. HeimerClean runs these steps silently in the background and reports what changed.',
      },
      {
        type: 'cards',
        items: [
          { title: 'Clear cache on PC', text: 'A safe, step-by-step routine.', to: 'clear-cache' },
          { title: 'Getting started', text: 'Install HeimerClean in a minute.', to: 'getting-started' },
        ],
      },
    ],
  },
  {
    slug: 'pc-cleaner-solutions',
    title: 'PC Cleaner Solutions',
    description: 'What a modern PC cleaner should do — and what it should never do.',
    group: 'Guides',
    blocks: [
      {
        type: 'p',
        text: 'Classic cleaners wait for you to press Scan and then show a long list of “problems”. A modern cleaner should work quietly, explain its actions and never touch your personal files.',
      },
      { type: 'h2', text: 'What to look for' },
      {
        type: 'table',
        head: ['Capability', 'Classic cleaners', 'HeimerClean'],
        rows: [
          ['Needs a manual scan', 'Yes', 'No — runs automatically'],
          ['Decides when to act', 'No', 'AI Optimizer evaluates every cycle'],
          ['Memory optimization', 'Rarely', 'Standby memory release'],
          ['Reads personal files', 'Sometimes', 'Never'],
          ['Windows 11 support', 'Varies', 'Yes'],
        ],
      },
      { type: 'h2', text: 'Red flags' },
      {
        type: 'ul',
        items: [
          'Scary warnings with hundreds of “critical errors”.',
          'Aggressive registry cleaning with no undo.',
          'Bundled toolbars or unrelated software.',
          'Asking you to disable Windows Security.',
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'HeimerClean is not an antivirus. Keep Windows Security enabled — HeimerClean is whitelisted by Microsoft Defender.',
      },
    ],
  },
  {
    slug: 'clear-cache',
    title: 'Clear Cache on PC',
    description: 'A safe routine for clearing temporary files, browser cache and Windows caches.',
    group: 'Guides',
    blocks: [
      { type: 'h2', text: 'Windows temporary files' },
      {
        type: 'ol',
        items: [
          'Open Settings › System › Storage › Temporary files.',
          'Select Temporary files and Delivery Optimization files.',
          'Leave Downloads unchecked unless you have reviewed it.',
          'Select Remove files.',
        ],
      },
      { type: 'h2', text: 'Browser cache' },
      { type: 'p', text: 'In Chrome or Edge press Ctrl + Shift + Delete, choose Cached images and files, and keep passwords and cookies unless you want to sign out everywhere.' },
      { type: 'h2', text: 'The automatic way' },
      {
        type: 'p',
        text: 'HeimerClean clears %TEMP%, Prefetch leftovers and other safe caches on its own schedule, and skips anything in use.',
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Never delete',
        text: 'Do not delete folders under C:\\Windows\\System32 or WinSxS manually — Windows needs them.',
      },
    ],
  },
  {
    slug: 'clean-other-storage',
    title: 'Clean “Other” Storage',
    description: 'Find out what the “Other” category in Windows storage is and how to reduce it safely.',
    group: 'Guides',
    blocks: [
      {
        type: 'p',
        text: '“Other” is where Windows puts files it cannot classify: app caches, old logs, installer leftovers, virtual machine disks and large files in unusual folders.',
      },
      { type: 'h2', text: 'Find the biggest folders' },
      {
        type: 'ol',
        items: [
          'Open Settings › System › Storage › Other.',
          'Sort by size and review the top folders.',
          'Remove app data only for apps you have uninstalled.',
        ],
      },
      { type: 'h2', text: 'Safe wins' },
      {
        type: 'ul',
        items: [
          'Old Windows update files (Storage › Cleanup recommendations).',
          'Installer caches of apps you no longer use.',
          'Crash dumps and old log files.',
        ],
      },
      { type: 'p', text: 'HeimerClean handles the safe categories automatically and shows the result in the Report tab.' },
    ],
  },
  {
    slug: 'uninstall-apps',
    title: 'Uninstall Apps on PC',
    description: 'Remove apps completely — including the leftovers Windows leaves behind.',
    group: 'Guides',
    blocks: [
      { type: 'h2', text: 'Uninstall with Windows' },
      {
        type: 'ol',
        items: [
          'Open Settings › Apps › Installed apps.',
          'Find the app, select ⋯ and choose Uninstall.',
          'Restart Windows if the uninstaller asks.',
        ],
      },
      { type: 'h2', text: 'Remove leftovers' },
      {
        type: 'p',
        text: 'Many uninstallers leave folders in AppData, ProgramData and startup entries. HeimerClean’s Zero-Residue Deep Uninstall removes those leftovers after the app is gone.',
      },
      { type: 'h2', text: 'Uninstalling HeimerClean' },
      {
        type: 'p',
        text: 'Open Settings › Apps › Installed apps, select HeimerClean and choose Uninstall. Your license stays linked to your account, so you can reinstall at any time.',
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'Cancelling a subscription is separate from uninstalling. Manage billing from the Store or contact support.',
      },
    ],
  },
  {
    slug: 'updates-2-2-7',
    title: 'Version 2.2.7',
    description: 'Update flow stability, manual fallback clarity and docs-linked guidance.',
    group: 'Release notes',
    updated: 'April 2026',
    blocks: [
      { type: 'h2', text: 'Update state handling' },
      {
        type: 'p',
        text: 'The update pipeline now handles wait/running transitions more clearly, so you can understand the current state without guessing.',
      },
      { type: 'h2', text: 'Automatic vs AI-driven behavior' },
      {
        type: 'p',
        text: 'Standard automation applies when Automatic Updates is enabled; AI-only mode waits for low-usage windows.',
      },
      { type: 'h2', text: 'Manual install path' },
      { type: 'ul', items: ['Trigger download.', 'Trigger install.', 'Retry from the update panel after a failure.'] },
      { type: 'h2', text: 'Notification-to-UI routing' },
      { type: 'p', text: 'Clicking an update toast focuses the app and routes to Settings › Updates.' },
      { type: 'h2', text: 'Per-version docs links' },
      { type: 'p', text: 'The info icon on each update card opens version-specific release notes like this page.' },
    ],
  },
]

export const docBySlug = (slug: string) => docs.find((d) => d.slug === slug)

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
