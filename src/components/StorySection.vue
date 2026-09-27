<script setup lang="ts">
import { ArrowRight, ShieldCheck } from 'lucide-vue-next'
import { Motion, useInView } from 'motion-v'
import { ref } from 'vue'
import { footprint } from '@/data/site'
import ImageLightbox from './ui/ImageLightbox.vue'
import UiMascot from './ui/UiMascot.vue'
import UiReveal from './ui/UiReveal.vue'

const terminal = ref<HTMLElement>()
const inView = useInView(terminal, { once: true, margin: '0px 0px -20% 0px' })
const lines = [
  { t: 'C:\\> heimerclean.bat', c: 'text-white' },
  { t: '[+] Clearing %TEMP% ............ done', c: 'text-[#9ca3af]' },
  { t: '[+] Clearing Prefetch .......... done', c: 'text-[#9ca3af]' },
  { t: '[+] Releasing standby memory ... done', c: 'text-[#9ca3af]' },
  { t: '[ok] 1.4 GB freed in 3.2s', c: 'text-[#cf5cff]' },
]
const notice = ref(false)
</script>

<template>
  <section id="story" class="relative py-24 md:py-36">
    <div class="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <UiReveal class="relative mx-auto w-full max-w-md lg:max-w-none">
        <div
          aria-hidden="true"
          class="absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/20 blur-3xl"
        />
        <Motion
          class="relative z-10 mx-auto w-44 md:w-56"
          :animate="{ y: [0, -12, 0], rotate: [0, -2, 0] }"
          :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut' }"
        >
          <UiMascot
            pose="scan"
            alt="HeimerClean mascot holding a laptop that shows a green check"
            class="w-full"
          />
        </Motion>

        <div
          ref="terminal"
          class="relative -mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] font-mono text-[0.75rem] leading-6 shadow-lg md:text-[0.8125rem]"
        >
          <div class="flex h-8 items-center justify-between border-b border-white/10 bg-[#1a1a1a] px-3 text-[0.6875rem] text-[#9ca3af]">
            <span>C:\WINDOWS\system32\cmd.exe</span>
            <span class="tracking-widest">— ▢ ✕</span>
          </div>
          <div class="min-h-[9.5rem] p-4">
            <Motion
              v-for="(l, i) in lines"
              :key="i"
              as="p"
              :class="['whitespace-pre', l.c]"
              :initial="{ opacity: 0, x: -6 }"
              :animate="inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }"
              :transition="{ delay: 0.2 + i * 0.45, duration: 0.25 }"
            >
              {{ l.t }}
            </Motion>
            <span class="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/80" />
          </div>
        </div>
      </UiReveal>

      <div>
        <UiReveal>
          <p class="font-mono text-caption tracking-wider text-accent uppercase">Our story</p>
          <h2 class="mt-3 text-h2 font-semibold text-gradient text-balance">
            Not just code. A story written with dedication.
          </h2>
          <div class="mt-5 space-y-4 text-body-lg text-fg-muted text-pretty">
            <p>
              HeimerClean began as a 3 KB script in a black-and-white command window — built between friends who
              were tired of junk files, full RAM and paying for bloated cleaner apps.
            </p>
            <p>
              Today the Heimer Team ships an AI-assisted optimizer used by individuals and companies. The mission
              hasn’t changed: functionality and speed over flashy visuals.
            </p>
          </div>
        </UiReveal>

        <UiReveal :delay="0.1">
          <dl class="mt-10 grid grid-cols-3 gap-3">
            <div v-for="f in footprint" :key="f.label" class="surface-card rounded-2xl p-4 md:p-5">
              <dt class="text-caption text-fg-subtle">{{ f.label }}</dt>
              <dd class="mt-1.5 text-xl font-semibold tracking-tight tabular-nums md:text-2xl">{{ f.value }}</dd>
            </div>
          </dl>
        </UiReveal>

        <UiReveal :delay="0.15">
          <button
            type="button"
            class="group surface-card mt-3 flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-[border-color,transform] hover:border-line-strong active:scale-[0.99] md:p-5"
            @click="notice = true"
          >
            <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-[#0078d4]/15">
              <ShieldCheck class="size-5 text-[#3b9cff]" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-[0.9375rem] font-medium tracking-tight">Whitelisted by Microsoft Defender</span>
              <span class="block text-caption text-fg-subtle">Reviewed and confirmed safe for Windows users. Read the notice</span>
            </span>
            <ArrowRight class="size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
          </button>
        </UiReveal>
      </div>
    </div>

    <ImageLightbox
      v-model:open="notice"
      :src="$asset('/images/brand/defender-notice.webp')"
      alt="Heimer Developer Team announcement: HeimerClean has been whitelisted by Microsoft Defender after review"
      title="Microsoft Defender notice"
      :width="600"
      :height="600"
    />
  </section>
</template>
