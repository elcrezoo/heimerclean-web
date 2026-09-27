<script setup lang="ts">
import { animate, useInView } from 'motion-v'
import { ref, watch } from 'vue'
import { stats } from '@/data/site'
import UiReveal from './ui/UiReveal.vue'

const root = ref<HTMLElement>()
const inView = useInView(root, { once: true, margin: '0px 0px -20% 0px' })
const display = ref(stats.map(() => 0))

const fmt = (v: number, decimals: number) =>
  v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

watch(inView, (v) => {
  if (!v) return
  stats.forEach((s, i) => {
    animate(0, s.value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.08,
      onUpdate: (n) => (display.value[i] = n),
    })
  })
})
</script>

<template>
  <section ref="root" aria-label="HeimerClean in numbers" class="border-y border-line bg-bg-elevated/50">
    <div class="container-page">
      <dl class="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        <UiReveal
          v-for="(s, i) in stats"
          :key="s.label"
          :delay="i * 0.06"
          :class="['px-2 py-10 md:px-8 md:py-14', i < 2 ? 'border-b border-line md:border-b-0' : '', i % 2 === 0 ? 'border-r border-line md:border-r-0' : '']"
        >
          <dt class="text-caption text-fg-subtle">{{ s.label }}</dt>
          <dd class="mt-2 text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tighter tabular-nums notranslate" translate="no">
            {{ fmt(display[i]!, s.decimals) }}<span class="text-fg-subtle">{{ s.suffix }}</span>
          </dd>
        </UiReveal>
      </dl>
    </div>
  </section>
</template>
