<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement>()

function onMove(e: PointerEvent) {
  if (!el.value) return
  const r = el.value.getBoundingClientRect()
  el.value.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.value.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <div
    ref="el"
    class="group/spot surface-card relative overflow-hidden rounded-2xl transition-[border-color,transform] duration-300 hover:border-line-strong"
    @pointermove="onMove"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      style="background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), var(--tr-b-soft) 30%, transparent 50%)"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      style="
        padding: 1px;
        background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), var(--tr-a), var(--tr-b) 45%, transparent 70%);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      "
    />
    <div class="relative h-full">
      <slot />
    </div>
  </div>
</template>
