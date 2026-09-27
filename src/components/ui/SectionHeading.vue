<script setup lang="ts">
import UiReveal from './UiReveal.vue'

withDefaults(defineProps<{ eyebrow: string; title: string; lead?: string; align?: 'left' | 'center' }>(), {
  align: 'center',
})
</script>

<template>
  <UiReveal :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p class="font-mono text-caption tracking-wider text-accent uppercase">{{ eyebrow }}</p>
    <h2 class="mt-3 text-h2 font-semibold text-gradient text-balance">{{ title }}</h2>
    <p v-if="lead" class="mt-4 text-body-lg text-fg-muted text-pretty">{{ lead }}</p>
  </UiReveal>
</template>
