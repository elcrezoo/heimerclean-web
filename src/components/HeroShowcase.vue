<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { Cpu, Sparkles, Zap } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'
import { ref } from 'vue'
import ScreenFrame from './ui/ScreenFrame.vue'

const running = ref(false)
useIntervalFn(() => (running.value = !running.value), 3200)

const float = (delay: number, distance = 8) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
})
</script>

<template>
  <div class="relative">
    <div class="rounded-2xl border border-line bg-surface p-1.5 shadow-lg backdrop-blur-xl md:rounded-[1.4rem] md:p-2">
      <div class="relative">
        <ScreenFrame
          :src="$asset('/images/screens/dashboard-idle.webp')"
          alt="HeimerClean dashboard with the AI optimizer idle"
          eager
        />
        <img
          :src="$asset('/images/screens/dashboard-run.webp')"
          alt=""
          aria-hidden="true"
          width="1024"
          height="576"
          :class="[
            'absolute inset-0 size-full rounded-xl object-cover transition-opacity duration-700 ease-in-out md:rounded-2xl',
            running ? 'opacity-100' : 'opacity-0',
          ]"
        />
      </div>
    </div>

    <Motion
      v-bind="float(0)"
      class="surface-card absolute top-[14%] -left-6 hidden items-center gap-2.5 rounded-2xl bg-surface-strong/80! py-2.5 pr-4 pl-2.5 shadow-lg lg:flex"
    >
      <span class="grid size-8 place-items-center rounded-xl bg-accent-soft">
        <Zap class="size-4 text-accent" />
      </span>
      <div class="w-32">
        <p class="text-[0.6875rem] text-fg-subtle">AI optimizer</p>
        <AnimatePresence mode="wait" :initial="false">
          <Motion
            :key="running ? 'run' : 'idle'"
            as="p"
            class="text-sm font-medium tracking-tight"
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -6 }"
            :transition="{ duration: 0.2 }"
          >
            {{ running ? 'Run committed' : 'Idle — watching' }}
          </Motion>
        </AnimatePresence>
      </div>
    </Motion>

    <Motion
      v-bind="float(1.2, 10)"
      class="surface-card absolute top-[48%] -right-8 hidden items-center gap-2.5 rounded-2xl bg-surface-strong/80! py-2.5 pr-4 pl-2.5 shadow-lg lg:flex"
    >
      <span class="grid size-8 place-items-center rounded-xl bg-[#fcd34d]/15">
        <Cpu class="size-4 text-[#eab308]" />
      </span>
      <div>
        <p class="text-[0.6875rem] text-fg-subtle">Memory optimized</p>
        <p class="text-sm font-medium tracking-tight tabular-nums">2.85 GB today</p>
      </div>
    </Motion>

    <Motion
      v-bind="float(2.4, 6)"
      class="surface-card absolute -bottom-6 left-[12%] hidden items-center gap-2.5 rounded-2xl bg-surface-strong/80! py-2.5 pr-4 pl-2.5 shadow-lg md:flex"
    >
      <span class="grid size-8 place-items-center rounded-xl bg-sun-soft">
        <Sparkles class="size-4 text-sun" />
      </span>
      <div>
        <p class="text-[0.6875rem] text-fg-subtle">Files cleaned</p>
        <p class="text-sm font-medium tracking-tight tabular-nums">696 files · 23 folders</p>
      </div>
    </Motion>
  </div>
</template>
