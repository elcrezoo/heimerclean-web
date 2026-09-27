<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { Download } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'
import { computed } from 'vue'
import UiButton from './ui/UiButton.vue'

const { y } = useWindowScroll()
const { height } = useWindowSize()
const visible = computed(() => {
  const nearBottom = y.value + height.value > document.documentElement.scrollHeight - 160
  return y.value > 640 && !nearBottom
})
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="visible"
      class="pb-safe fixed inset-x-0 bottom-0 z-40 px-3 md:hidden"
      :initial="{ y: '110%' }"
      :animate="{ y: 0 }"
      :exit="{ y: '110%' }"
      :transition="{ type: 'spring', stiffness: 380, damping: 34 }"
    >
      <div class="surface-card flex items-center gap-3 rounded-2xl p-2 pl-4 shadow-lg">
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium tracking-tight">HeimerClean</p>
          <p class="truncate text-caption text-fg-subtle">From $1.99 · 30-day guarantee</p>
        </div>
        <UiButton to="/download" size="md">
          <Download class="size-4" />
          Download
        </UiButton>
      </div>
    </Motion>
  </AnimatePresence>
</template>
