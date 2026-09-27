<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { Motion } from 'motion-v'
import { brand } from '@/data/site'
import UiButton from './ui/UiButton.vue'
import UiMascot from './ui/UiMascot.vue'
import UiReveal from './ui/UiReveal.vue'
</script>

<template>
  <section class="relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent)]" />
      <div
        class="absolute top-1/2 left-1/2 h-80 w-[48rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style="background: var(--accent-soft)"
      />
    </div>
    <div class="container-page relative text-center">
      <Motion
        class="mx-auto mb-6 w-fit"
        :initial="{ opacity: 0, x: -220, y: 60, rotate: -18 }"
        :while-in-view="{ opacity: 1, x: 0, y: 0, rotate: 0 }"
        :in-view-options="{ once: true, amount: 0.6 }"
        :transition="{ type: 'spring', stiffness: 70, damping: 13 }"
      >
        <UiMascot pose="boost" anim="float" alt="HeimerClean mascot flying with a red cape" class="h-32 w-auto md:h-40" />
      </Motion>
    </div>
    <UiReveal class="container-page relative text-center">
      <h2 class="mx-auto max-w-2xl text-h1 font-semibold text-gradient text-balance">Your PC, lighter by tonight.</h2>
      <p class="mx-auto mt-5 max-w-md text-body-lg text-fg-muted">
        Install in under a minute. HeimerClean handles the rest — quietly.
      </p>
      <div class="mt-9 flex justify-center">
        <UiButton to="/download" size="lg">
          <Download class="size-[18px]" />
          Download for Windows
        </UiButton>
      </div>
      <p class="mt-4 text-caption text-fg-subtle">
        v{{ brand.version }} · {{ brand.requirements }}
      </p>
    </UiReveal>
  </section>
</template>
