import type { DocBlock } from './docs'
import { brand } from './site'
import { company } from './social'

export interface LegalPage {
  slug: string
  title: string
  description: string
  updated: string
  blocks: DocBlock[]
}

export const legalPages: LegalPage[] = [
  {
    slug: 'company',
    title: 'Company',
    description: `HeimerClean is built and operated by ${company.legalName}.`,
    updated: 'September 2026',
    blocks: [
      {
        type: 'p',
        text: 'We are the Heimer Team — a small group of engineers building privacy-first, on-device AI that keeps Windows PCs fast, stable and energy efficient without constant user input.',
      },
      {
        type: 'table',
        head: ['', ''],
        rows: [
          ['Legal name', company.legalName],
          ['Registered address', brand.address],
          ['Email', company.email],
          ['Phone', brand.phone],
          ['Founded', '2024'],
        ],
      },
      { type: 'h2', text: 'What we build' },
      {
        type: 'ul',
        items: [
          'HeimerClean — silent, automatic PC optimization for Windows 10 and 11.',
          'HeimerClean Core Suite — HeimerClean plus centralized fleet control for teams.',
          'HeimerVPN — private browsing that pairs with a clean PC.',
        ],
      },
      {
        type: 'cards',
        items: [
          { title: 'Contact support', text: 'Real people, 24/7.', to: '/support' },
          { title: 'Read the docs', text: 'Guides, FAQ and troubleshooting.', to: '/docs' },
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    description: 'The rules for using the HeimerClean website, apps and subscriptions.',
    updated: 'September 2026',
    blocks: [
      {
        type: 'callout',
        tone: 'info',
        text: 'This is a plain-language summary. Contact us if you need the full contractual version for procurement or compliance.',
      },
      { type: 'h2', text: 'Using HeimerClean' },
      {
        type: 'p',
        text: 'You may install HeimerClean on the number of devices included in your plan. You agree not to reverse engineer, resell or redistribute the software.',
      },
      { type: 'h2', text: 'Subscriptions and trials' },
      {
        type: 'ul',
        items: [
          'Trials last 30 days and convert to a paid plan unless cancelled before the trial ends.',
          'Subscriptions renew automatically for the same billing period. You can cancel anytime.',
          'Prices exclude VAT, which is calculated at checkout.',
        ],
      },
      { type: 'h2', text: 'Money-back guarantee' },
      { type: 'p', text: 'If HeimerClean is not right for you, request a full refund within 30 days of your first payment.' },
      { type: 'h2', text: 'Acceptable use' },
      {
        type: 'p',
        text: 'HeimerClean is a maintenance tool, not an antivirus. Keep Windows Security enabled and keep backups of important files.',
      },
      { type: 'h2', text: 'Liability' },
      {
        type: 'p',
        text: 'We design every optimization to be safe and reversible, but the software is provided “as is”. To the extent permitted by law, our liability is limited to the amount you paid in the last 12 months.',
      },
      { type: 'h2', text: 'Contact' },
      { type: 'p', text: `${company.legalName} · ${brand.address} · ${company.email}` },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'What we collect, what we never collect, and the choices you have.',
    updated: 'September 2026',
    blocks: [
      { type: 'h2', text: 'Our principle' },
      {
        type: 'p',
        text: 'HeimerClean evaluates technical system signals locally on your device. It does not read documents, messages, photos or other personal content.',
      },
      { type: 'h2', text: 'What we process' },
      {
        type: 'table',
        head: ['Data', 'Why', 'Where'],
        rows: [
          ['Account email and license', 'Sign-in and activation', 'Our servers'],
          ['Technical before/after operation logs', 'Improve optimization — only with your consent', 'Our servers'],
          ['System signals (CPU, memory, disk)', 'Decide when to optimize', 'Your device only'],
          ['Payment details', 'Billing', 'Our payment provider — never stored by us'],
          ['Support messages', 'Answer your request', 'Our support inbox'],
        ],
      },
      { type: 'h2', text: 'What we never collect' },
      {
        type: 'ul',
        items: ['Contents of your files', 'Passwords or license keys you type elsewhere', 'Browsing history', 'Keystrokes or screenshots'],
      },
      { type: 'h2', text: 'Your rights' },
      {
        type: 'p',
        text: `You can request a copy of your data, correct it or delete your account at any time by emailing ${company.email}. We reply within 30 days.`,
      },
      {
        type: 'cards',
        items: [{ title: 'Privacy & security in the app', text: 'How local context works.', to: 'privacy-security' }],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    description: 'This website uses as little storage as possible. Here is all of it.',
    updated: 'September 2026',
    blocks: [
      {
        type: 'p',
        text: 'We do not use advertising or cross-site tracking cookies. The website stores only what it needs to remember your choices.',
      },
      {
        type: 'table',
        head: ['Name', 'Type', 'Purpose', 'Duration'],
        rows: [
          ['hc-theme', 'Local storage', 'Remembers light or dark theme', 'Until you clear it'],
          ['googtrans', 'Cookie', 'Remembers the language you picked (Google Translate)', 'Session'],
          ['hc-assistant-greeted', 'Session storage', 'Shows the help bubble only once', 'Until the tab closes'],
        ],
      },
      { type: 'h2', text: 'Google Translate' },
      {
        type: 'p',
        text: 'When you choose a language other than English, the page is translated by Google Translate, which may set its own cookies. Switch back to English to stop using it.',
      },
      { type: 'h2', text: 'Managing cookies' },
      { type: 'p', text: 'You can delete cookies and site data at any time in your browser settings. The site keeps working without them.' },
    ],
  },
]

export const legalBySlug = (slug: string) => legalPages.find((p) => p.slug === slug)
