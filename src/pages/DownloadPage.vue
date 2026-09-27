<script setup lang="ts">
import { asset } from '@/lib/asset'
import { ArrowRight, Check, CircleCheck, Clock, Download, FileText, HardDrive, LifeBuoy, Monitor, RotateCw, ShieldCheck } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'
import { ref } from 'vue'
import ImageLightbox from '@/components/ui/ImageLightbox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiMascot from '@/components/ui/UiMascot.vue'
import UiReveal from '@/components/ui/UiReveal.vue'
import { brand } from '@/data/site'

const state = ref<'idle' | 'preparing' | 'started'>('idle')
const notice = ref(false)

function startDownload() {
  state.value = 'preparing'
  setTimeout(() => {
    state.value = 'started'
    window.open(brand.installerUrl, '_blank', 'noopener')
  }, 900)
}

const perks = ['Cancel anytime', 'Secure payment encryption', '24/7 technical and sales support', 'Instant activation']

const installSteps = [
  { title: 'Run the installer', body: 'Open the downloaded file from your browser or Downloads folder.', image: asset('/images/steps/install.webp') },
  { title: 'Sign in & activate', body: 'Sign in with Google — your 30-day trial activates instantly.', image: asset('/images/steps/account.webp') },
  { title: 'Let it work', body: 'HeimerClean starts with Windows and optimizes silently.', image: asset('/images/steps/optimize.webp') },
]

const requirements = [
  { icon: Monitor, label: 'Operating system', value: 'Windows 10 or later' },
  { icon: HardDrive, label: 'Disk space', value: '200 MB free' },
  { icon: Monitor, label: 'Display', value: `${brand.minDisplay} px minimum` },
  { icon: Clock, label: 'Install time', value: 'Under a minute' },
]
</script>

<template>
  <div class="pb-24">
    <section class="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,#000_30%,transparent_100%)]" />
        <div class="absolute -top-40 left-[10%] h-[30rem] w-[40rem] rounded-full opacity-60 blur-3xl" style="background: radial-gradient(closest-side, var(--accent-soft), transparent), radial-gradient(closest-side at 80% 60%, var(--tr-b-soft), transparent)" />
      </div>

      <div class="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <UiReveal>
            <p class="font-mono text-caption tracking-wider text-accent uppercase">Download</p>
            <h1 class="mt-3 text-display font-semibold">
              <span class="text-gradient">Download. Install.</span>
              <span class="text-accent-gradient block pb-2">Deep clean.</span>
            </h1>
            <p class="mt-5 max-w-lg text-body-lg text-fg-muted">
              Start silent PC optimization for Windows in minutes — free for your first 30 days.
            </p>
          </UiReveal>

          <UiReveal :delay="0.1" class="mt-9">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <UiButton
                size="lg"
                class="w-full sm:w-auto"
                :disabled="state === 'preparing'"
                @click="startDownload"
              >
                <AnimatePresence mode="wait" :initial="false">
                  <Motion
                    v-if="state === 'preparing'"
                    key="prep"
                    as="span"
                    class="inline-flex items-center gap-2"
                    :initial="{ opacity: 0, y: 6 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :exit="{ opacity: 0, y: -6 }"
                  >
                    <RotateCw class="size-[18px] animate-spin" /> Preparing download…
                  </Motion>
                  <Motion
                    v-else
                    key="dl"
                    as="span"
                    class="inline-flex items-center gap-2"
                    :initial="{ opacity: 0, y: 6 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :exit="{ opacity: 0, y: -6 }"
                  >
                    <Download class="size-[18px]" /> {{ state === 'started' ? 'Download again' : 'Download for Windows' }}
                  </Motion>
                </AnimatePresence>
              </UiButton>
              <UiButton to="/store" variant="ghost" size="lg" class="w-full sm:w-auto">
                See plans <ArrowRight class="size-4" />
              </UiButton>
            </div>
            <p class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption text-fg-subtle">
              <span>Version {{ brand.version }}</span>
              <span>{{ brand.installerSize }}</span>
              <span>Windows 10 / 11</span>
              <RouterLink to="/docs/updates-2-2-7" class="inline-flex items-center gap-1 text-fg-muted hover:text-fg">
                <FileText class="size-3.5" /> Release notes
              </RouterLink>
            </p>

            <AnimatePresence>
              <Motion
                v-if="state === 'started'"
                class="mt-6 flex items-center gap-3 overflow-hidden rounded-2xl border border-success/30 bg-success/[0.07] p-4"
                role="status"
                :initial="{ opacity: 0, height: 0, marginTop: 0 }"
                :animate="{ opacity: 1, height: 'auto', marginTop: 24 }"
                :transition="{ type: 'spring', stiffness: 200, damping: 24 }"
              >
                <UiMascot pose="done" anim="bob" class="-my-2 h-16 w-auto shrink-0 drop-shadow-none" />
                <div class="text-sm">
                  <p class="flex items-center gap-1.5 font-medium"><CircleCheck class="size-4 text-success" /> Your download has started</p>
                  <p class="mt-0.5 text-fg-muted">
                    Didn’t start?
                    <a :href="brand.installerUrl" target="_blank" rel="noopener" class="font-medium text-accent hover:underline">Try the direct link</a>.
                    Then follow the steps below.
                  </p>
                </div>
              </Motion>
            </AnimatePresence>
          </UiReveal>
        </div>

        <UiReveal :delay="0.15" class="relative mt-14 lg:mt-0">
          <UiMascot pose="wave" anim="wave" alt="" class="absolute -top-[5.25rem] left-6 z-10 h-28 w-auto md:right-10 md:left-auto" />
          <div class="surface-card relative overflow-hidden rounded-3xl bg-surface-strong! p-7 shadow-lg md:p-9">
            <div aria-hidden="true" class="absolute -top-16 -right-16 size-48 rounded-full bg-sun/20 blur-3xl" />
            <div class="relative flex items-center gap-3">
              <UiMascot pose="face-excited" class="size-11 object-contain drop-shadow-none" />
              <p class="text-sm text-fg-muted">Your HeimerClean plan</p>
            </div>
            <p class="relative mt-6 text-h1 font-semibold tracking-[-0.04em]">Free for 30 days</p>
            <p class="relative mt-2 text-fg-muted">We won’t charge you until the end of the trial.</p>
            <ul class="relative mt-7 space-y-3">
              <li v-for="p in perks" :key="p" class="flex items-center gap-3 text-[0.9375rem]">
                <span class="grid size-5 place-items-center rounded-full bg-accent-soft"><Check class="size-3 text-accent" /></span>
                {{ p }}
              </li>
            </ul>
            <div class="relative mt-8 flex items-center justify-between border-t border-line pt-5 text-caption text-fg-subtle">
              <span>Then from $1.99/mo + VAT</span>
              <RouterLink to="/store" class="font-medium text-fg hover:text-accent">Compare plans</RouterLink>
            </div>
          </div>
        </UiReveal>
      </div>
    </section>

    <section id="install" class="container-page scroll-mt-24">
      <UiReveal>
        <h2 class="text-h2 font-semibold text-gradient">Install in three steps</h2>
      </UiReveal>
      <ol class="mt-8 grid gap-4 md:grid-cols-3">
        <UiReveal v-for="(s, i) in installSteps" :key="s.title" as="li" :delay="i * 0.08" class="min-w-0">
          <div
            :class="[
              'surface-card h-full overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-500',
              state === 'started' && i === 0 ? 'border-accent! shadow-[0_0_0_3px_var(--accent-soft)]' : '',
            ]"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-[#0747b8]">
              <img :src="s.image" alt="" width="800" height="500" loading="lazy" class="size-full object-cover" />
              <span class="absolute top-3 left-3 grid size-8 place-items-center rounded-full border border-white/15 bg-black/40 font-mono text-xs text-white backdrop-blur-md">
                {{ i + 1 }}
              </span>
            </div>
            <div class="p-5">
              <h3 class="font-semibold tracking-tight">{{ s.title }}</h3>
              <p class="mt-1.5 text-sm text-fg-muted">{{ s.body }}</p>
            </div>
          </div>
        </UiReveal>
      </ol>
    </section>

    <section class="container-page mt-24 grid gap-6 lg:grid-cols-2">
      <UiReveal>
        <div class="surface-card h-full rounded-3xl p-6 md:p-8">
          <h2 class="text-h3 font-semibold">System requirements</h2>
          <dl class="mt-6 divide-y divide-line">
            <div v-for="r in requirements" :key="r.label" class="flex items-center gap-4 py-3.5">
              <component :is="r.icon" class="size-[18px] text-fg-subtle" />
              <dt class="flex-1 text-sm text-fg-muted">{{ r.label }}</dt>
              <dd class="text-sm font-medium">{{ r.value }}</dd>
            </div>
          </dl>
        </div>
      </UiReveal>
      <UiReveal :delay="0.08" class="flex flex-col gap-4">
        <button
          type="button"
          class="group surface-card flex items-center gap-4 rounded-3xl p-6 text-left transition-[border-color,transform] hover:border-line-strong active:scale-[0.99] md:p-8"
          @click="notice = true"
        >
          <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#0078d4]/15"><ShieldCheck class="size-6 text-[#3b9cff]" /></span>
          <span class="flex-1">
            <span class="block font-semibold tracking-tight">Safe to install</span>
            <span class="mt-1 block text-sm text-fg-muted">
              HeimerClean has been reviewed and whitelisted by Microsoft Defender. Read the notice.
            </span>
          </span>
          <ArrowRight class="size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
        </button>
        <RouterLink
          to="/docs/troubleshooting"
          class="group surface-card flex items-center gap-4 rounded-3xl p-6 transition-[border-color,transform] hover:border-line-strong active:scale-[0.99] md:p-8"
        >
          <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft"><LifeBuoy class="size-6 text-accent" /></span>
          <span class="flex-1">
            <span class="block font-semibold tracking-tight">Trouble installing?</span>
            <span class="mt-1 block text-sm text-fg-muted">If Windows Security blocks the app, restart and retry — or follow our troubleshooting guide.</span>
          </span>
          <ArrowRight class="size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </UiReveal>
    </section>

    <ImageLightbox
      v-model:open="notice"
      :src="$asset('/images/brand/defender-notice.webp')"
      alt="Heimer Developer Team announcement: HeimerClean has been whitelisted by Microsoft Defender"
      title="Microsoft Defender notice"
      :width="600"
      :height="600"
    />
  </div>
</template>
