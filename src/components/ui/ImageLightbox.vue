<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'

const open = defineModel<boolean>('open', { required: true })
defineProps<{ src: string; alt: string; title: string; width?: number; height?: number }>()
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="anim-overlay fixed inset-0 z-[70] bg-black/80 backdrop-blur-md" />
      <DialogContent
        class="anim-zoom fixed top-1/2 left-1/2 z-[70] w-max max-w-[96vw] -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        <DialogTitle class="sr-only">{{ title }}</DialogTitle>
        <DialogDescription class="sr-only">{{ alt }}</DialogDescription>
        <img
          :src="src"
          :alt="alt"
          :width="width ?? 1024"
          :height="height ?? 576"
          class="block max-h-[85vh] w-auto max-w-[96vw] rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
        />
        <DialogClose
          class="absolute -top-3 -right-3 grid size-11 place-items-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 active:scale-95 md:-top-4 md:-right-4"
          aria-label="Close image"
        >
          <X class="size-5" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
