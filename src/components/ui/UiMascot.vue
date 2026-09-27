<script setup lang="ts">
import { computed } from 'vue'

export type MascotPose =
  | 'hero' | 'wave' | 'scan' | 'done' | 'point' | 'help' | 'search' | 'boost' | 'energy' | 'thanks' | 'support'
  | 'face-excited' | 'face-happy' | 'face-sad' | 'face-smile' | 'face-surprised' | 'face-thinking' | 'face-wink'

const sizes: Record<MascotPose, [number, number]> = {
  hero: [556, 720],
  wave: [304, 400],
  scan: [287, 400],
  done: [283, 400],
  point: [308, 400],
  help: [258, 400],
  search: [311, 400],
  boost: [383, 400],
  energy: [275, 400],
  thanks: [305, 400],
  support: [339, 400],
  'face-excited': [235, 256],
  'face-happy': [229, 256],
  'face-sad': [235, 256],
  'face-smile': [233, 256],
  'face-surprised': [218, 256],
  'face-thinking': [220, 256],
  'face-wink': [229, 256],
}

const props = withDefaults(
  defineProps<{ pose: MascotPose; alt?: string; eager?: boolean; anim?: 'none' | 'float' | 'bob' | 'wave' }>(),
  { alt: '', eager: false, anim: 'none' },
)

const dims = computed(() => sizes[props.pose])
const animClass = computed(
  () => ({ none: '', float: 'animate-float', bob: 'animate-bob', wave: 'animate-wave origin-bottom' })[props.anim],
)
</script>

<template>
  <img
    :src="$asset(`/images/mascot/${pose}.webp`)"
    :alt="alt"
    :width="dims[0]"
    :height="dims[1]"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
    draggable="false"
    class="pointer-events-none select-none drop-shadow-[0_14px_24px_rgb(26_6_43/0.22)]"
    :class="animClass"
  />
</template>
