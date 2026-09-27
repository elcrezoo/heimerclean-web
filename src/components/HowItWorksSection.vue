<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { ref } from 'vue'
import { optimizerOutcomes, optimizerSteps } from '@/data/site'
import SectionHeading from './ui/SectionHeading.vue'
import UiReveal from './ui/UiReveal.vue'

const pick = ref(0)
useIntervalFn(() => (pick.value = (pick.value + 1) % optimizerOutcomes.length), 2200)
</script>

<template>
  <section id="how-it-works" class="relative py-24 md:py-36">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line-strong to-transparent" />
    <div class="container-page">
      <SectionHeading
        eyebrow="AI Optimizer"
        title="Smart enough to act. Smarter to wait."
        lead="An autonomous agent in the Windows background service layer decides when maintenance helps — and when it would only get in your way."
      />

      <ol class="relative mt-14 grid gap-3 md:mt-20 md:grid-cols-3 md:gap-4">
        <div
          aria-hidden="true"
          class="absolute top-[2.35rem] right-[16%] left-[16%] hidden h-px bg-transition opacity-50 md:block"
        />
        <UiReveal v-for="(s, i) in optimizerSteps" :key="s.title" as="li" :delay="i * 0.1" class="relative">
          <div class="flex flex-col items-center px-4 text-center">
            <span
              class="relative grid size-12 place-items-center rounded-full border border-line-strong bg-bg font-mono text-sm font-medium shadow-md"
            >
              0{{ i + 1 }}
            </span>
            <h3 class="mt-5 text-h3 font-semibold">{{ s.title }}</h3>
            <p class="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-fg-muted">{{ s.body }}</p>
          </div>
        </UiReveal>
      </ol>

      <UiReveal class="mx-auto mt-16 max-w-2xl">
        <div class="surface-card rounded-2xl p-2">
          <p class="px-3 pt-2 pb-3 text-caption text-fg-subtle">Possible decisions, evaluated every cycle</p>
          <ul class="grid grid-cols-2 gap-1.5">
            <li
              v-for="(o, i) in optimizerOutcomes"
              :key="o.label"
              :class="[
                'relative flex min-h-12 items-center rounded-xl border px-3.5 text-sm transition-[background-color,border-color,box-shadow,transform] duration-500 ease-(--ease-spring)',
                pick === i ? 'scale-[1.01] border-line-strong bg-surface-strong shadow-md' : 'border-transparent',
              ]"
            >
              <span
                :class="[
                  'relative mr-2.5 size-2 shrink-0 rounded-full transition-colors duration-300',
                  pick === i ? (o.tone === 'accent' ? 'bg-accent' : 'bg-fg-muted') : 'bg-line-strong',
                ]"
              />
              <span :class="['relative transition-colors duration-300', pick === i ? 'text-fg' : 'text-fg-subtle']">
                {{ o.label }}
              </span>
            </li>
          </ul>
        </div>
      </UiReveal>
    </div>
  </section>
</template>
