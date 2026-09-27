import { ref } from 'vue'
import { languages, type LanguageCode } from '@/data/social'

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: object, el: string) => unknown } }
    hcTranslateInit?: () => void
  }
}

const COOKIE = 'googtrans'
const codes = languages.map((l) => l.code)

function readCookie(): LanguageCode {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/)
  const code = m ? decodeURIComponent(m[1]) : 'en'
  return (codes as readonly string[]).includes(code) ? (code as LanguageCode) : 'en'
}

function writeCookie(code: LanguageCode) {
  const host = location.hostname
  const domains = ['', host, host.split('.').slice(-2).join('.')].filter((d, i, a) => a.indexOf(d) === i)
  for (const d of domains) {
    const domain = d && d.includes('.') ? `; domain=.${d.replace(/^\./, '')}` : ''
    if (code === 'en') document.cookie = `${COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    else document.cookie = `${COOKIE}=/en/${code}; path=/${domain}`
  }
}

const current = ref<LanguageCode>(typeof document === 'undefined' ? 'en' : readCookie())
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
let loader: Promise<void> | null = null

function loadWidget(): Promise<void> {
  if (loader) return loader
  status.value = 'loading'
  loader = new Promise<void>((resolve, reject) => {
    window.hcTranslateInit = () => {
      new window.google!.translate!.TranslateElement(
        { pageLanguage: 'en', includedLanguages: codes.join(','), autoDisplay: false },
        'google_translate_element',
      )
      status.value = 'ready'
      resolve()
    }
    const s = document.createElement('script')
    s.src = 'https://translate.google.com/translate_a/element.js?cb=hcTranslateInit'
    s.async = true
    s.onerror = () => {
      status.value = 'error'
      loader = null
      reject(new Error('Translate failed to load'))
    }
    document.head.appendChild(s)
  })
  return loader
}

function waitForCombo(timeout = 5000): Promise<HTMLSelectElement | null> {
  return new Promise((resolve) => {
    const start = performance.now()
    const tick = () => {
      const el = document.querySelector<HTMLSelectElement>('select.goog-te-combo')
      if (el && el.options.length > 1) return resolve(el)
      if (performance.now() - start > timeout) return resolve(null)
      requestAnimationFrame(tick)
    }
    tick()
  })
}

async function setLanguage(code: LanguageCode) {
  if (code === current.value) return
  const wasTranslated = current.value !== 'en'
  writeCookie(code)
  current.value = code

  if (code === 'en') {
    if (wasTranslated) location.reload()
    return
  }
  try {
    await loadWidget()
    const combo = await waitForCombo()
    if (!combo) return location.reload()
    combo.value = code
    combo.dispatchEvent(new Event('change'))
  } catch {
    writeCookie('en')
    current.value = 'en'
  }
}

export function initTranslate() {
  if (current.value !== 'en') loadWidget().catch(() => {})
}

export function useTranslate() {
  return { current, status, setLanguage, languages }
}
