export const company = {
  legalName: 'Heimer Developer UK Ltd.',
  email: 'info@heimerclean.com',
  productHuntUrl: 'https://www.producthunt.com/products/heimerclean',
}

export interface Social {
  id: string
  label: string
  handle: string
  url: string
  color: string
  cta: string
}

// Order matches the brand avatar set in public/images/social/. Leave `url` empty to hide a network.
export const socials: Social[] = [
  { id: 'web', label: 'Web / Site', handle: 'heimerclean.com', url: 'https://www.heimerclean.com', color: '#ba00ff', cta: 'Visit' },
  { id: 'youtube', label: 'YouTube', handle: '@heimerclean', url: 'https://www.youtube.com/@heimerclean', color: '#ff0000', cta: 'Subscribe' },
  { id: 'instagram', label: 'Instagram', handle: '@heimerclean', url: 'https://www.instagram.com/heimerclean', color: '#e1306c', cta: 'Follow' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'HeimerClean', url: 'https://www.linkedin.com/company/heimerclean', color: '#0a66c2', cta: 'Follow' },
  { id: 'x', label: 'X (Twitter)', handle: '@heimerclean', url: 'https://x.com/heimerclean', color: '#111827', cta: 'Follow' },
  { id: 'tiktok', label: 'TikTok', handle: '@heimerclean', url: 'https://www.tiktok.com/@heimerclean', color: '#fe2c55', cta: 'Follow' },
  { id: 'discord', label: 'Discord', handle: 'Heimer Community', url: 'https://discord.gg/heimerclean', color: '#5865f2', cta: 'Join' },
  { id: 'telegram', label: 'Telegram', handle: '@heimerclean', url: 'https://t.me/heimerclean', color: '#229ed9', cta: 'Join' },
  { id: 'whatsapp', label: 'WhatsApp', handle: '+31 6 451 718 96', url: 'https://wa.me/31645171896', color: '#25d366', cta: 'Chat' },
  { id: 'github', label: 'GitHub', handle: 'heimerclean', url: 'https://github.com/heimerclean', color: '#24292f', cta: 'Star' },
  { id: 'email', label: 'Email / Contact', handle: 'info@heimerclean.com', url: 'mailto:info@heimerclean.com', color: '#f97316', cta: 'Write' },
].filter((s) => s.url)

export const socialById = (id: string) => socials.find((s) => s.id === id)

export type FooterLink = { label: string; to?: string; href?: string }

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'HeimerClean', to: '/store?plan=clean' },
      { label: 'HeimerClean Core Suite', to: '/store?plan=core' },
      { label: 'HeimerVPN', to: '/store?plan=vpn' },
    ],
  },
  {
    title: 'Popular',
    links: [
      { label: 'PC Running Slow', to: '/docs/pc-running-slow' },
      { label: 'Speed Up PC', to: '/docs/speed-up-pc' },
      { label: 'PC Cleaner Solutions', to: '/docs/pc-cleaner-solutions' },
      { label: 'Clear Cache on PC', to: '/docs/clear-cache' },
      { label: 'Clean Other Storage', to: '/docs/clean-other-storage' },
      { label: 'Uninstall Apps on PC', to: '/docs/uninstall-apps' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About HeimerClean', to: '/#story' },
      { label: 'Company', to: '/legal/company' },
      { label: 'Store', to: '/store' },
      { label: 'Download', to: '/download' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Account', to: '/docs/privacy-security#account-safety' },
      { label: 'Contact Support', to: '/support#contact' },
      { label: 'Documentation', to: '/docs' },
      { label: 'Knowledge Base', to: '/docs/faq' },
      { label: 'License Management', to: '/docs/troubleshooting#license-looks-invalid' },
      { label: 'HeimerClean Coupons', to: '/store#offers' },
      { label: 'Uninstall Apps', to: '/docs/uninstall-apps' },
      { label: 'Error Reporting', to: '/support#contact' },
    ],
  },
]

export const legalLinks: FooterLink[] = [
  { label: 'Support', to: '/support' },
  { label: 'Terms of Use', to: '/legal/terms' },
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Cookie Policy', to: '/legal/cookies' },
]

export const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands' },
  { code: 'pt', label: 'Portuguese', native: 'Português' },
  { code: 'pl', label: 'Polish', native: 'Polski' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'uk', label: 'Ukrainian', native: 'Українська' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'ko', label: 'Korean', native: '한국어' },
  { code: 'zh-CN', label: 'Chinese', native: '简体中文' },
] as const

export type LanguageCode = (typeof languages)[number]['code']
