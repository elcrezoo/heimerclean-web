<script setup lang="ts">
import { steps } from '@/data/site'
import SectionHeading from './ui/SectionHeading.vue'
import SpotlightCard from './ui/SpotlightCard.vue'
import UiReveal from './ui/UiReveal.vue'
</script>

<template>
  <section id="get-started" class="py-24 md:py-36">
    <div class="container-page">
      <SectionHeading
        eyebrow="Get started"
        title="Three steps. Then it’s on autopilot."
        lead="No setup wizards, no tuning. Install once and HeimerClean takes care of the rest."
      />

      <ol class="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
        <UiReveal v-for="(s, i) in steps" :key="s.title" as="li" :delay="i * 0.1" class="min-w-0">
          <SpotlightCard class="h-full">
            <div class="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#0747b8]">
              <img
                :src="s.image"
                alt=""
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-700 ease-(--ease-spring) group-hover/spot:scale-105"
              />
              <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#1a0630]/70 to-transparent" />
              <span
                class="absolute top-4 left-4 grid size-9 place-items-center rounded-full border border-white/15 bg-black/40 font-mono text-xs font-medium text-white backdrop-blur-md"
              >
                0{{ i + 1 }}
              </span>
            </div>
            <div class="p-6 md:p-7">
              <h3 class="text-h3 font-semibold">{{ s.title }}</h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ s.body }}</p>
            </div>
          </SpotlightCard>
        </UiReveal>
      </ol>
    </div>
  </section>
</template>
