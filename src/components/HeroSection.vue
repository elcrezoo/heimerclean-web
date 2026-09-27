<script setup lang="ts">
import { ArrowRight, Download, ShieldCheck } from 'lucide-vue-next'
import { Motion, useScroll, useTransform } from 'motion-v'
import { ref } from 'vue'
import { useTranslate } from '@/composables/useTranslate'
import { brand } from '@/data/site'
import HeroMascot from './HeroMascot.vue'
import HeroShowcase from './HeroShowcase.vue'
import UiButton from './ui/UiButton.vue'

const headline = ['Deep', 'clean', 'your', 'PC.']
const { current: lang } = useTranslate()
const spring = { type: 'spring', stiffness: 110, damping: 18 } as const

const mockRef = ref<HTMLElement>()
const { scrollYProgress } = useScroll({ target: mockRef, offset: ['start end', 'center center'] })
const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0])
const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
</script>

<template>
  <section id="top" class="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div
        class="absolute top-[-18rem] left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style="background: radial-gradient(closest-side, var(--accent-soft), transparent), radial-gradient(closest-side at 80% 55%, var(--tr-b-soft), transparent), radial-gradient(closest-side at 20% 70%, var(--tr-a-soft), transparent)"
      />
    </div>

    <div class="container-page relative">
      <div class="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
      <div class="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
        <Motion
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="spring"
        >
          <a
            href="#how-it-works"
            class="group surface-card inline-flex h-9 items-center gap-2 rounded-full pr-3 pl-1.5 text-caption text-fg-muted transition-colors hover:text-fg"
          >
            <span class="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.6875rem] font-medium text-accent">NEW</span>
            AI Optimizer that knows when to wait
            <ArrowRight class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Motion>

        <h1 v-if="lang !== 'en'" class="mt-7 text-display font-semibold">
          <span class="text-gradient block">Deep clean your PC.</span>
          <span class="text-accent-gradient block pb-2">Zero input.</span>
        </h1>
        <h1 v-else class="mt-7 text-display font-semibold">
          <span class="sr-only">Deep clean your PC. Zero input, full performance.</span>
          <span aria-hidden="true" class="block">
            <Motion
              v-for="(word, i) in headline"
              :key="word"
              as="span"
              class="text-gradient mr-[0.22em] inline-block last:mr-0"
              :initial="{ opacity: 0, y: 28, filter: 'blur(10px)' }"
              :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :transition="{ ...spring, delay: 0.08 + i * 0.07 }"
            >{{ word }}</Motion>
          </span>
          <Motion
            as="span"
            aria-hidden="true"
            class="text-accent-gradient block pb-2"
            :initial="{ opacity: 0, y: 28, filter: 'blur(10px)' }"
            :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ ...spring, delay: 0.42 }"
          >
            Zero input.
          </Motion>
        </h1>

        <Motion
          as="p"
          class="mx-auto mt-6 max-w-xl text-body-lg text-fg-muted text-pretty lg:mx-0"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ ...spring, delay: 0.55 }"
        >
          HeimerClean silently removes junk, relieves memory pressure and keeps Windows fast — without scans,
          pop-ups or babysitting.
        </Motion>

        <Motion
          class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ ...spring, delay: 0.65 }"
        >
          <UiButton to="/download" size="lg" class="w-full sm:w-auto">
            <Download class="size-[18px]" />
            Download for Windows
          </UiButton>
          <UiButton to="/store" variant="ghost" size="lg" class="w-full sm:w-auto">
            View pricing
            <ArrowRight class="size-4" />
          </UiButton>
        </Motion>

        <Motion
          as="p"
          class="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-caption text-fg-subtle lg:justify-start"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.85 }"
        >
          <span>From $1.99</span>
          <span aria-hidden="true" class="size-1 rounded-full bg-line-strong" />
          <span>{{ brand.requirements }}</span>
          <span aria-hidden="true" class="size-1 rounded-full bg-line-strong" />
          <span class="inline-flex items-center gap-1"><ShieldCheck class="size-3.5" /> 30-day money-back</span>
        </Motion>
      </div>
      <HeroMascot class="pb-6 lg:pb-0" />
      </div>

      <div ref="mockRef" class="mx-auto mt-16 max-w-5xl [perspective:1400px] md:mt-24">
        <Motion
          :style="{ rotateX, scale, transformOrigin: 'center top' }"
          :initial="{ opacity: 0, y: 40 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ ...spring, delay: 0.75 }"
        >
          <div class="relative">
            <div
              aria-hidden="true"
              class="absolute -inset-x-8 -top-8 -bottom-4 -z-10 rounded-[3rem] opacity-70 blur-2xl"
              style="background: radial-gradient(60% 50% at 50% 30%, var(--accent-soft), transparent)"
            />
            <HeroShowcase />
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
