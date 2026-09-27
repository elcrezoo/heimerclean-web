<script setup lang="ts">
import { animate } from 'motion-v'
import { onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ value: number; decimals?: number; prefix?: string }>(), {
  decimals: 2,
  prefix: '$',
})

const display = ref(props.value)
let controls: { stop: () => void } | undefined

watch(
  () => props.value,
  (to) => {
    controls?.stop()
    controls = animate(display.value, to, {
      type: 'spring',
      stiffness: 140,
      damping: 22,
      onUpdate: (v) => (display.value = v),
    })
  },
)
onBeforeUnmount(() => controls?.stop())
</script>

<template>
  <span translate="no" class="notranslate tabular-nums">{{ prefix }}{{ Math.max(0, display).toFixed(decimals) }}</span>
</template>
