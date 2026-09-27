<script setup lang="ts">
import { useIntervalFn, useMediaQuery, useMouseInElement } from '@vueuse/core'
import { CheckCircle2, ScanSearch, Wrench } from 'lucide-vue-next'
import { Motion } from 'motion-v'
import { computed, ref } from 'vue'
import UiMascot from './ui/UiMascot.vue'

const toasts = [
  { key: 'scan', icon: ScanSearch, title: 'Analyzing your system…', tone: 'accent', progress: true },
  { key: 'done', icon: CheckCircle2, title: 'Optimization complete!', sub: '2.85 GB freed · 696 files', tone: 'success' },
  { key: 'fix', icon: Wrench, title: 'Issues found & fixed', sub: 'Automatically, in the background', tone: 'sun' },
] as const

const index = ref(0)
const toast = computed(() => toasts[index.value])
useIntervalFn(() => (index.value = (index.value + 1) % toasts.length), 3400)

const stage = ref<HTMLElement>()
const fine = useMediaQuery('(pointer: fine)')
const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(stage)
const tilt = computed(() => {
  if (!fine.value || isOutside.value || !elementWidth.value) return 'translate3d(0,0,0)'
  const x = (elementX.value / elementWidth.value - 0.5) * 2
  const y = (elementY.value / elementHeight.value - 0.5) * 2
  return `translate3d(${x * 10}px, ${y * 8}px, 0) rotate(${x * 2.5}deg)`
})

const toneCls = {
  accent: 'bg-accent-soft text-accent',
  success: 'bg-success/12 text-success',
  sun: 'bg-sun-soft text-sun',
} as const
</script>

<template>
  <div ref="stage" class="relative mx-auto aspect-[556/640] w-full max-w-[17rem] sm:max-w-xs lg:max-w-[26rem]">
    <div
      aria-hidden="true"
      class="absolute inset-x-[4%] top-[14%] bottom-[6%] rounded-full blur-3xl"
      style="background: radial-gradient(closest-side, rgb(186 0 255 / 0.22), transparent), radial-gradient(closest-side at 70% 25%, var(--tr-b-soft), transparent), radial-gradient(closest-side at 25% 80%, var(--tr-a-soft), transparent)"
    />
    <div aria-hidden="true" class="absolute inset-x-[12%] top-[10%] aspect-square rounded-full border border-line" />
    <div aria-hidden="true" class="absolute inset-x-[2%] top-[2%] aspect-square rounded-full border border-dashed border-line opacity-70" />

    <Motion
      class="relative h-full"
      :initial="{ opacity: 0, y: 40, scale: 0.92 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ type: 'spring', stiffness: 90, damping: 14, delay: 0.3 }"
    >
      <div class="h-full transition-transform duration-500 ease-(--ease-spring)" :style="{ transform: tilt }">
        <UiMascot
          pose="hero"
          eager
          anim="float"
          alt="HeimerClean mascot giving a thumbs-up while using a laptop"
          class="h-full w-full object-contain object-bottom mask-b-from-80% mask-b-to-100%"
        />
      </div>
    </Motion>

    <svg
      v-for="(s, i) in [
        'top-[8%] left-[6%] size-4 fill-sun',
        'top-[30%] right-[2%] size-3 fill-accent',
        'bottom-[30%] left-[0%] size-2.5 fill-accent',
      ]"
      :key="i"
      viewBox="0 0 24 24"
      aria-hidden="true"
      class="absolute animate-pulse"
      :class="s"
      :style="{ animationDelay: `${i * 0.6}s` }"
    >
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>

    <div class="absolute inset-x-0 -bottom-2 flex justify-center sm:-bottom-4 lg:right-auto lg:-left-16 lg:bottom-10" aria-live="polite">
      <Transition name="toast" mode="out-in">
        <div
          :key="toast.key"
          class="surface-card flex w-[16.5rem] items-center gap-3 rounded-2xl p-3 shadow-lg"
        >
          <span class="grid size-10 shrink-0 place-items-center rounded-xl" :class="toneCls[toast.tone]">
            <component :is="toast.icon" class="size-5" />
          </span>
          <span class="min-w-0 flex-1 text-left">
            <span class="block truncate text-sm font-semibold tracking-tight">{{ toast.title }}</span>
            <span v-if="'progress' in toast" class="mt-2 block h-1.5 overflow-hidden rounded-full bg-accent-soft">
              <span class="block h-full origin-left animate-[progress_3.2s_var(--ease-spring)_forwards] rounded-full bg-accent" />
            </span>
            <span v-else class="block truncate text-caption text-fg-muted">{{ toast.sub }}</span>
          </span>
        </div>
      </Transition>
    </div>
  </div>
</template>
