<script setup lang="ts">
import { Quote } from 'lucide-vue-next'
import { testimonials } from '@/data/site'
import SectionHeading from './ui/SectionHeading.vue'
import UiReveal from './ui/UiReveal.vue'

const palette = ['#ba00ff', '#f59e0b', '#d946ef', '#fb923c', '#8b5cf6']
const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
const loop = [...testimonials, ...testimonials]
</script>

<template>
  <section id="testimonials" class="overflow-hidden py-24 md:py-36">
    <div class="container-page">
      <SectionHeading
        eyebrow="Loved by users"
        title="Faster PCs. Happier people."
        lead="From gamers to operations teams — here’s what HeimerClean users say."
      />
    </div>

    <UiReveal class="mt-14 md:mt-20">
      <div
        class="group relative [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <ul class="flex w-max animate-[marquee_60s_linear_infinite] gap-4 group-hover:[animation-play-state:paused]">
          <li
            v-for="(t, i) in loop"
            :key="i"
            :aria-hidden="i >= testimonials.length"
            class="surface-card w-[20rem] shrink-0 rounded-2xl md:w-[24rem]"
          >
            <figure class="flex h-full flex-col p-6 md:p-7">
            <Quote class="size-5 text-accent" />
            <blockquote class="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-fg">“{{ t.quote }}”</blockquote>
            <figcaption class="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span
                class="grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-black"
                :style="{ background: palette[i % palette.length] }"
              >
                {{ initials(t.name) }}
              </span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium">{{ t.name }}</span>
                <span class="block truncate text-caption text-fg-subtle">{{ t.role }}</span>
              </span>
            </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </UiReveal>
  </section>
</template>
