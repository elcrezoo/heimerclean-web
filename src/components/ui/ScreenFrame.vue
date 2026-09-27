<script setup lang="ts">
import { ref } from 'vue'
import UiSkeleton from './UiSkeleton.vue'

defineProps<{ src: string; alt: string; eager?: boolean }>()
const loaded = ref(false)
</script>

<template>
  <div
    class="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#1e1f22] ring-1 ring-black/10 md:rounded-2xl dark:ring-white/10"
  >
    <UiSkeleton v-if="!loaded" class="absolute inset-0 rounded-none! bg-white/5!" />
    <img
      :src="src"
      :alt="alt"
      width="1024"
      height="576"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      :class="['size-full object-cover transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0']"
      @load="loaded = true"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-b from-white/[0.06] via-transparent to-transparent"
    />
  </div>
</template>
