<script setup lang="ts">
import { Activity, BatteryCharging, Cpu, Gamepad2, Gauge, Lock, Phone, Rocket, ShieldCheck, Sparkles, Zap } from 'lucide-vue-next'
import { Motion } from 'motion-v'
import type { Component } from 'vue'
import { features, type FeatureIcon } from '@/data/site'
import SectionHeading from './ui/SectionHeading.vue'
import SpotlightCard from './ui/SpotlightCard.vue'
import UiMascot from './ui/UiMascot.vue'
import UiReveal from './ui/UiReveal.vue'

const icons: Record<FeatureIcon, Component> = {
  sparkles: Sparkles,
  gauge: Gauge,
  cpu: Cpu,
  shield: ShieldCheck,
  rocket: Rocket,
  activity: Activity,
  zap: Zap,
}

const [junkF, memoryF, startupF, healthF, energyF, privacyF] = features

const layout = [
  'md:col-span-2 lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'md:col-span-2 lg:col-span-6',
]

const junk = [
  '%TEMP%',
  'Prefetch',
  'SoftwareDistribution',
  'Squirrel Temp',
  'Downloaded Program Files',
  'INetCache',
  'Windows.old',
  'Recycle Bin',
]

const junkBreakdown = [
  { label: 'Temp files', value: '6.2 GB', w: 52 },
  { label: 'Update cache', value: '3.9 GB', w: 32 },
  { label: 'App leftovers', value: '2.3 GB', w: 16 },
]

const R = 42
const C = 2 * Math.PI * R

const boot = [
  { label: 'Before', secs: 48, w: 100, accent: false },
  { label: 'After', secs: 19, w: 40, accent: true },
]

const spark = 'M0 46 L20 40 L40 44 L60 30 L80 34 L100 22 L120 26 L140 14 L160 18 L180 8 L200 10'

const energyModes = [
  { icon: Gamepad2, label: 'Gaming', state: 'Paused' },
  { icon: Phone, label: 'On a call', state: 'Paused' },
  { icon: BatteryCharging, label: 'On battery', state: 'Light mode' },
]

const privacyTags = ['No file reading', 'No hidden uploads', 'Consent-based sync', 'Respects Windows permissions']
</script>

<template>
  <section id="features" class="py-24 md:py-36">
    <div class="container-page">
      <SectionHeading
        eyebrow="Features"
        title="Everything a slow PC needs. Nothing it doesn't."
        lead="HeimerClean works quietly in the background, so you get a faster, lighter Windows without learning what a registry is."
      />

      <div class="mt-14 grid gap-3 md:mt-20 md:grid-cols-2 md:gap-4 lg:grid-cols-6">
        <!-- Deep junk cleanup -->
        <UiReveal :class="['min-w-0', layout[0]]">
          <SpotlightCard class="h-full">
            <div class="flex h-full flex-col">
            <div class="grid flex-1 gap-6 p-6 sm:grid-cols-[1fr_auto] md:p-8">
              <div class="min-w-0">
                <span class="feature-icon"><component :is="icons[junkF.icon]" class="size-[18px] text-accent" /></span>
                <h3 class="mt-5 text-h3 font-semibold">{{ junkF.title }}</h3>
                <p class="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted">{{ junkF.body }}</p>

                <div class="mt-6 rounded-xl border border-line bg-bg/60 p-4">
                  <div class="flex items-baseline justify-between gap-4">
                    <span class="text-xs font-medium text-fg-muted">Recovered this week</span>
                    <span class="notranslate text-lg font-semibold tracking-tight tabular-nums" translate="no">12.4 GB</span>
                  </div>
                  <div class="mt-3 flex h-2 gap-1 overflow-hidden rounded-full">
                    <Motion
                      v-for="(b, k) in junkBreakdown"
                      :key="b.label"
                      class="h-full origin-left rounded-full"
                      :class="['bg-accent', 'bg-tr-b', 'bg-tr-a'][k]"
                      :style="{ width: `${b.w}%` }"
                      :initial="{ scaleX: 0 }"
                      :while-in-view="{ scaleX: 1 }"
                      :in-view-options="{ once: true }"
                      :transition="{ duration: 0.8, delay: 0.2 + k * 0.15, ease: [0.22, 1, 0.36, 1] }"
                    />
                  </div>
                  <ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
                    <li v-for="(b, k) in junkBreakdown" :key="b.label" class="inline-flex items-center gap-1.5">
                      <span class="size-2 rounded-full" :class="['bg-accent', 'bg-tr-b', 'bg-tr-a'][k]" />
                      {{ b.label }} <span class="notranslate tabular-nums text-fg" translate="no">{{ b.value }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="relative hidden w-40 items-end justify-center sm:flex lg:w-48">
                <div aria-hidden="true" class="absolute inset-x-0 bottom-4 mx-auto size-36 rounded-full bg-accent/15 blur-2xl" />
                <UiMascot pose="scan" anim="float" class="relative h-auto w-full" />
              </div>
            </div>

            <div
              class="relative -mt-2 mb-6 overflow-hidden md:mb-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
            >
              <div class="flex w-max animate-marquee gap-2 hover:[animation-play-state:paused]">
                <span
                  v-for="(j, k) in [...junk, ...junk]"
                  :key="k"
                  class="notranslate rounded-full border border-line bg-bg px-3 py-1.5 font-mono text-xs text-fg-muted"
                  translate="no"
                >
                  {{ j }}
                </span>
              </div>
            </div>
            </div>
          </SpotlightCard>
        </UiReveal>

        <!-- Memory -->
        <UiReveal :delay="0.06" :class="['min-w-0', layout[1]]">
          <SpotlightCard class="h-full">
            <div class="flex h-full flex-col p-6 md:p-8">
              <span class="feature-icon"><component :is="icons[memoryF.icon]" class="size-[18px] text-accent" /></span>
              <h3 class="mt-5 text-h3 font-semibold">{{ memoryF.title }}</h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ memoryF.body }}</p>

              <div class="mt-auto flex items-center gap-5 pt-8">
                <div class="relative size-28 shrink-0">
                  <svg viewBox="0 0 100 100" class="size-full -rotate-90" aria-hidden="true">
                    <circle cx="50" cy="50" :r="R" fill="none" stroke="var(--line)" stroke-width="9" />
                    <Motion
                      as="circle"
                      cx="50"
                      cy="50"
                      :r="R"
                      fill="none"
                      stroke="var(--accent)"
                      stroke-width="9"
                      stroke-linecap="round"
                      :stroke-dasharray="C"
                      :initial="{ strokeDashoffset: C * 0.14 }"
                      :while-in-view="{ strokeDashoffset: C * 0.46 }"
                      :in-view-options="{ once: true }"
                      :transition="{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }"
                    />
                  </svg>
                  <div class="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <div class="notranslate text-xl font-semibold tracking-tight tabular-nums" translate="no">54%</div>
                      <div class="text-[0.6875rem] text-fg-muted">RAM in use</div>
                    </div>
                  </div>
                </div>
                <dl class="space-y-2 text-sm">
                  <div>
                    <dt class="text-xs text-fg-muted">Before</dt>
                    <dd class="notranslate font-semibold tabular-nums text-fg-subtle line-through decoration-fg-muted/50" translate="no">86%</dd>
                  </div>
                  <div>
                    <dt class="text-xs text-fg-muted">Freed</dt>
                    <dd class="notranslate font-semibold tabular-nums text-accent" translate="no">+5.1 GB</dd>
                  </div>
                </dl>
              </div>
            </div>
          </SpotlightCard>
        </UiReveal>

        <!-- Startup -->
        <UiReveal :class="['min-w-0', layout[2]]">
          <SpotlightCard class="h-full">
            <div class="flex h-full flex-col p-6 md:p-8">
              <span class="feature-icon"><component :is="icons[startupF.icon]" class="size-[18px] text-accent" /></span>
              <h3 class="mt-5 text-h3 font-semibold">{{ startupF.title }}</h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ startupF.body }}</p>

              <div class="mt-auto space-y-4 pt-8">
                <div v-for="(b, k) in boot" :key="b.label">
                  <div class="mb-1.5 flex justify-between text-xs">
                    <span class="text-fg-muted">{{ b.label }}</span>
                    <span class="notranslate font-semibold tabular-nums" :class="b.accent ? 'text-accent' : ''" translate="no">{{ b.secs }}s</span>
                  </div>
                  <div class="h-2.5 overflow-hidden rounded-full bg-line/60">
                    <Motion
                      class="h-full origin-left rounded-full"
                      :class="b.accent ? 'bg-accent shadow-[0_0_12px_var(--accent)]' : 'bg-fg-muted/40'"
                      :style="{ width: `${b.w}%` }"
                      :initial="{ scaleX: 0 }"
                      :while-in-view="{ scaleX: 1 }"
                      :in-view-options="{ once: true }"
                      :transition="{ duration: b.accent ? 0.6 : 1.3, delay: 0.25 + k * 0.2, ease: [0.22, 1, 0.36, 1] }"
                    />
                  </div>
                </div>
                <p class="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                  <Rocket class="size-3.5" /> <span class="notranslate" translate="no">2.5×</span> faster boot
                </p>
              </div>
            </div>
          </SpotlightCard>
        </UiReveal>

        <!-- Health -->
        <UiReveal :delay="0.06" :class="['min-w-0', layout[3]]">
          <SpotlightCard class="h-full">
            <div class="flex h-full flex-col p-6 md:p-8">
              <span class="feature-icon"><component :is="icons[healthF.icon]" class="size-[18px] text-accent" /></span>
              <h3 class="mt-5 text-h3 font-semibold">{{ healthF.title }}</h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ healthF.body }}</p>

              <div class="mt-auto pt-8">
                <div class="flex items-end justify-between">
                  <div>
                    <div class="text-xs text-fg-muted">Health score</div>
                    <div class="notranslate text-2xl font-semibold tracking-tight tabular-nums" translate="no">
                      96<span class="text-sm text-fg-muted">/100</span>
                    </div>
                  </div>
                  <span class="rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Excellent
                  </span>
                </div>
                <svg viewBox="0 0 200 56" class="mt-3 h-14 w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.25" />
                      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  <path :d="`${spark} L200 56 L0 56 Z`" fill="url(#spark-fill)" />
                  <Motion
                    as="path"
                    :d="spark"
                    fill="none"
                    stroke="var(--accent)"
                    stroke-width="2.5"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    vector-effect="non-scaling-stroke"
                    :initial="{ pathLength: 0 }"
                    :while-in-view="{ pathLength: 1 }"
                    :in-view-options="{ once: true }"
                    :transition="{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }"
                  />
                </svg>
              </div>
            </div>
          </SpotlightCard>
        </UiReveal>

        <!-- Energy -->
        <UiReveal :class="['min-w-0', layout[4]]">
          <SpotlightCard class="h-full">
            <div class="flex h-full flex-col p-6 md:p-8">
              <div class="flex items-start justify-between">
                <span class="feature-icon"><component :is="icons[energyF.icon]" class="size-[18px] text-sun-strong" /></span>
                <UiMascot pose="energy" anim="bob" class="-mt-3 -mb-12 h-auto w-14" />
              </div>
              <h3 class="mt-5 pr-16 text-h3 font-semibold">{{ energyF.title }}</h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ energyF.body }}</p>

              <ul class="mt-auto space-y-2 pt-8">
                <li
                  v-for="m in energyModes"
                  :key="m.label"
                  class="flex items-center justify-between gap-3 rounded-xl border border-line bg-bg/60 px-3 py-2.5 text-sm"
                >
                  <span class="inline-flex items-center gap-2"><component :is="m.icon" class="size-4 text-fg-muted" /> {{ m.label }}</span>
                  <span class="rounded-full bg-sun-soft px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">{{ m.state }}</span>
                </li>
              </ul>
            </div>
          </SpotlightCard>
        </UiReveal>

        <!-- Privacy -->
        <UiReveal :delay="0.06" :class="['min-w-0', layout[5]]">
          <SpotlightCard class="h-full">
            <div class="grid items-center gap-8 p-6 md:grid-cols-[1fr_auto] md:p-8 lg:px-12">
              <div class="min-w-0">
                <span class="feature-icon"><component :is="icons[privacyF.icon]" class="size-[18px] text-accent" /></span>
                <h3 class="mt-5 text-h3 font-semibold">{{ privacyF.title }}</h3>
                <p class="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">{{ privacyF.body }}</p>
                <div class="mt-6 flex flex-wrap gap-2">
                  <span
                    v-for="tag in privacyTags"
                    :key="tag"
                    class="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"
                  >
                    <ShieldCheck class="size-3.5" /> {{ tag }}
                  </span>
                </div>
              </div>

              <div class="relative mx-auto grid size-44 place-items-center md:size-52">
                <div aria-hidden="true" class="absolute inset-0 rounded-full border border-accent/20" />
                <div aria-hidden="true" class="absolute inset-5 rounded-full border border-accent/30" />
                <div aria-hidden="true" class="absolute inset-10 rounded-full bg-accent/10 blur-xl" />
                <span
                  aria-hidden="true"
                  class="absolute top-3 left-4 grid size-9 place-items-center rounded-full border border-line bg-bg shadow-sm animate-bob"
                >
                  <Lock class="size-4 text-accent" />
                </span>
                <img
                  :src="$asset('/images/stickers/secure.webp')"
                  alt="Secure sticker with the HeimerClean mascot"
                  width="217"
                  height="240"
                  loading="lazy"
                  decoding="async"
                  class="relative w-32 animate-float drop-shadow-[0_14px_24px_rgb(26_6_43/0.22)] md:w-36"
                />
              </div>
            </div>
          </SpotlightCard>
        </UiReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-icon {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--line);
  background: var(--bg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
}
</style>
