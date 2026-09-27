<script setup lang="ts">
import { useElementVisibility, useRafFn } from '@vueuse/core'
import { Check, Maximize2 } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'
import { computed, ref } from 'vue'
import { tour } from '@/data/site'
import ImageLightbox from './ui/ImageLightbox.vue'
import ScreenFrame from './ui/ScreenFrame.vue'
import SectionHeading from './ui/SectionHeading.vue'
import UiReveal from './ui/UiReveal.vue'

const DURATION = 7000
const index = ref(0)
const progress = ref(0)
const paused = ref(false)
const lightbox = ref(false)
const root = ref<HTMLElement>()
const visible = useElementVisibility(root)
const current = computed(() => tour[index.value]!)

useRafFn(({ delta }) => {
  if (paused.value || lightbox.value || !visible.value) return
  progress.value += delta / DURATION
  if (progress.value >= 1) select((index.value + 1) % tour.length)
})

function select(i: number) {
  index.value = i
  progress.value = 0
}
</script>

<template>
  <section id="tour" ref="root" class="py-24 md:py-36">
    <div class="container-page">
      <SectionHeading
        eyebrow="Inside the app"
        title="Calm on the surface. Powerful underneath."
        lead="A real look at HeimerClean 2.2 — the desktop app that keeps your Windows PC fast."
      />

      <UiReveal class="mt-10 md:mt-14">
        <div
          role="tablist"
          aria-label="App screens"
          class="no-scrollbar -mx-5 flex snap-x gap-1 overflow-x-auto px-5 md:mx-auto md:w-fit md:justify-center md:rounded-full md:border md:border-line md:bg-surface md:p-1 md:backdrop-blur-xl"
        >
          <button
            v-for="(t, i) in tour"
            :key="t.id"
            role="tab"
            :aria-selected="index === i"
            :aria-controls="`tour-panel-${t.id}`"
            :class="[
              'relative h-11 shrink-0 snap-start overflow-hidden rounded-full border px-5 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-300 active:scale-[0.97]',
              index === i
                ? 'border-line-strong bg-surface-strong text-fg shadow-sm'
                : 'border-transparent text-fg-muted hover:text-fg max-md:border-line',
            ]"
            @click="select(i)"
          >
            <span class="relative">{{ t.label }}</span>
            <span
              v-if="index === i"
              aria-hidden="true"
              class="absolute inset-x-5 bottom-1.5 h-0.5 origin-left rounded-full bg-accent"
              :style="{ transform: `scaleX(${progress})` }"
            />
          </button>
        </div>
      </UiReveal>

      <UiReveal class="mt-10 md:mt-12">
        <div
          :id="`tour-panel-${current.id}`"
          role="tabpanel"
          class="grid items-center gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-14"
          @pointerenter="paused = true"
          @pointerleave="paused = false"
        >
          <div class="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <Motion
                :key="current.id"
                :initial="{ opacity: 0, y: 12 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -8 }"
                :transition="{ type: 'spring', stiffness: 260, damping: 26 }"
              >
                <h3 class="text-[1.625rem] leading-tight font-semibold tracking-[-0.03em] text-balance">
                  {{ current.title }}
                </h3>
                <p class="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{{ current.body }}</p>
                <ul class="mt-6 space-y-3">
                  <li v-for="p in current.points" :key="p" class="flex items-center gap-3 text-[0.9375rem]">
                    <span class="grid size-5 place-items-center rounded-full bg-accent-soft">
                      <Check class="size-3 text-accent" />
                    </span>
                    {{ p }}
                  </li>
                </ul>
              </Motion>
            </AnimatePresence>
          </div>

          <div class="order-1 lg:order-2">
            <button
              type="button"
              class="group relative block w-full cursor-zoom-in rounded-2xl border border-line bg-surface p-1.5 text-left shadow-lg backdrop-blur-xl transition-transform duration-500 ease-(--ease-spring) hover:-translate-y-1 active:scale-[0.99] md:rounded-[1.4rem] md:p-2"
              :aria-label="`Enlarge ${current.label} screenshot`"
              @click="lightbox = true"
            >
              <AnimatePresence mode="wait">
                <Motion
                  :key="current.id"
                  :initial="{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }"
                  :animate="{ opacity: 1, scale: 1, filter: 'blur(0px)' }"
                  :exit="{ opacity: 0, scale: 1.01, filter: 'blur(8px)' }"
                  :transition="{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }"
                >
                  <ScreenFrame :src="current.images[0]!" :alt="current.alt" />
                </Motion>
              </AnimatePresence>
              <span
                class="absolute right-4 bottom-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-black/60 px-3 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100"
              >
                <Maximize2 class="size-3.5" /> Enlarge
              </span>
            </button>
          </div>
        </div>
      </UiReveal>
    </div>

    <ImageLightbox v-model:open="lightbox" :src="current.images[0]!" :alt="current.alt" :title="current.label" />
  </section>
</template>
