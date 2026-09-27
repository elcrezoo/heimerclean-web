<script setup lang="ts">
import { ArrowLeft, BookOpen } from 'lucide-vue-next'
import { Motion } from 'motion-v'
import UiButton from '@/components/ui/UiButton.vue'
import UiMascot from '@/components/ui/UiMascot.vue'
</script>

<template>
  <section class="container-page flex min-h-[80vh] flex-col items-center justify-center pt-28 pb-16 text-center">
    <div class="relative">
      <div aria-hidden="true" class="absolute inset-4 rounded-full bg-accent-soft blur-2xl" />
      <Motion
        class="relative"
        :initial="{ opacity: 0, scale: 0.8, rotate: -6 }"
        :animate="{ opacity: 1, scale: 1, rotate: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 12 }"
      >
        <UiMascot pose="search" anim="bob" eager alt="HeimerClean mascot searching with a magnifying glass" class="h-44 w-auto md:h-56" />
      </Motion>
      <Motion
        class="absolute -top-2 -right-10 md:-right-14"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ type: 'spring', stiffness: 260, damping: 14, delay: 0.5 }"
      >
        <span class="surface-card block rounded-2xl rounded-bl-md px-3 py-1.5 font-mono text-sm font-semibold text-accent shadow-md">404?</span>
      </Motion>
    </div>
    <p class="mt-8 font-mono text-caption tracking-wider text-accent uppercase">Error 404</p>
    <h1 class="mt-3 text-h1 font-semibold text-gradient">This page got cleaned up.</h1>
    <p class="mt-4 max-w-md text-body-lg text-fg-muted">
      Heimer searched everywhere — it looks like junk. The page you’re looking for doesn’t exist or has moved.
    </p>
    <div class="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <UiButton to="/"><ArrowLeft class="size-4" /> Back to home</UiButton>
      <UiButton to="/docs" variant="secondary"><BookOpen class="size-4" /> Browse docs</UiButton>
    </div>
  </section>
</template>
