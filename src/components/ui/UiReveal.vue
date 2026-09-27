<script setup lang="ts">
import { Motion } from 'motion-v'

withDefaults(defineProps<{ delay?: number; y?: number; as?: 'div' | 'li' }>(), {
  delay: 0,
  y: 24,
  as: 'div',
})
</script>

<template>
  <Motion
    :as="as"
    :initial="{ opacity: 0, y, filter: 'blur(6px)' }"
    :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
    :in-view-options="{ once: true, margin: '0px 0px -12% 0px' }"
    :transition="{ type: 'spring', stiffness: 120, damping: 20, mass: 0.8, delay }"
  >
    <slot />
  </Motion>
</template>
