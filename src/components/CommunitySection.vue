<script setup lang="ts">
import { ArrowUpRight, Award, BadgeCheck, Newspaper } from 'lucide-vue-next'
import { listings, press, recognitions } from '@/data/press'
import { company, socialById, socials } from '@/data/social'
import SectionHeading from './ui/SectionHeading.vue'
import UiReveal from './ui/UiReveal.vue'

const youtube = socialById('youtube')
const instagram = socialById('instagram')

const primary = (['youtube', 'instagram', 'linkedin', 'x', 'tiktok'] as const)
  .map((id) => socialById(id))
  .filter((s) => !!s)

const highlights = [
  { img: 'product', label: 'Product', to: '/#tour' },
  { img: 'features', label: 'Features', to: '/#features' },
  { img: 'how-it-works', label: 'How it works', to: '/#how-it-works' },
  { img: 'updates', label: 'Updates', to: '/docs/updates-2-2-7' },
  { img: 'users', label: 'Users', to: '/#testimonials' },
  { img: 'faq', label: 'FAQ', to: '/#faq' },
  { img: 'support', label: 'Support', to: '/support' },
  { img: 'achievements', label: 'Wins', to: '/#press' },
  { img: 'news', label: 'News', to: '/#press' },
  { img: 'community', label: 'Community', to: '/#community' },
]

const ext = (url: string) => (url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})
</script>

<template>
  <section id="community" class="relative overflow-hidden py-24 md:py-36">
    <div class="container-page">
      <SectionHeading
        eyebrow="Community"
        title="Heimer is everywhere you scroll."
        lead="Quick tips, behind-the-scenes and launch offers — follow HeimerClean on your favourite platform."
      />

      <!-- Profile -->
      <UiReveal class="mt-12 md:mt-16">
        <div class="surface-card overflow-hidden rounded-3xl bg-surface-strong! shadow-md">
          <div class="relative">
            <img
              :src="$asset('/images/banners/hero.webp')"
              alt="HeimerClean — AI powered system optimization. Faster, more stable, longer life, more efficient."
              width="673"
              height="188"
              loading="lazy"
              class="aspect-[2.4/1] w-full object-cover object-left sm:aspect-[673/188]"
            />
            <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/30 to-transparent" />
          </div>

          <div class="flex flex-col gap-5 px-5 pb-6 md:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div class="flex min-w-0 items-end gap-4">
              <span class="-mt-10 shrink-0 rounded-full ring-transition p-[3px] shadow-lg md:-mt-12">
                <img :src="$asset('/images/social/web.webp')" alt="" width="128" height="128" class="size-20 rounded-full border-4 border-surface-strong md:size-24" loading="lazy" />
              </span>
              <div class="min-w-0 pb-1">
                <p class="flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                  <span translate="no" class="notranslate">HeimerClean</span>
                  <BadgeCheck class="size-5 fill-accent text-surface-strong" aria-label="Official" />
                </p>
                <p class="truncate text-caption text-fg-subtle">@heimerclean · AI powered system optimization</p>
              </div>
            </div>

            <ul class="flex flex-wrap gap-2 lg:shrink-0 lg:flex-nowrap">
              <li v-for="s in primary" :key="s.id">
                <a
                  :href="s.url"
                  v-bind="ext(s.url)"
                  class="inline-flex h-11 items-center gap-2 rounded-full py-1 pr-4 pl-1 text-sm font-semibold text-white shadow-md transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  :style="{ background: s.id === 'instagram' ? 'linear-gradient(90deg,#f58529,#dd2a7b,#8134af)' : s.color }"
                >
                  <img :src="$asset(`/images/social/${s.id}.webp`)" alt="" width="128" height="128" class="size-9 rounded-full ring-2 ring-white/40" loading="lazy" />
                  {{ s.cta }}
                  <span class="sr-only">on {{ s.label }}</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="border-t border-line px-5 py-5 md:px-8">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-caption font-semibold tracking-wide text-fg-subtle uppercase">Featured in the startup world</p>
              <ul class="flex flex-wrap gap-1.5">
                <li
                  v-for="r in recognitions"
                  :key="r.label"
                  class="relative inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium"
                >
                  <span aria-hidden="true" class="absolute inset-0 rounded-full bg-transition opacity-15 dark:opacity-20" />
                  <svg v-if="r.icon" viewBox="0 0 24 24" class="relative size-3.5 fill-current text-[#003399] dark:text-[#ffcc00]" aria-hidden="true"><path :d="r.icon" /></svg>
                  <Award v-else class="relative size-3.5 text-tr-b dark:text-tr-a" />
                  <span class="relative">{{ r.label }}</span>
                </li>
              </ul>
            </div>
            <ul class="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
              <li v-for="l in listings" :key="l.id" class="min-w-0">
                <a
                  :href="l.url"
                  target="_blank"
                  rel="noopener"
                  class="group flex min-h-14 items-center gap-2.5 rounded-2xl border border-line bg-bg/60 p-2 sm:gap-3 sm:pr-3 transition-[transform,border-color,box-shadow] duration-300 ease-(--ease-spring) hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md active:scale-[0.98]"
                >
                  <span class="grid size-8 shrink-0 place-items-center rounded-lg text-white shadow-sm sm:size-10 sm:rounded-xl" :style="{ background: l.color }">
                    <svg v-if="l.icon" viewBox="0 0 24 24" class="size-5 fill-current" aria-hidden="true"><path :d="l.icon" /></svg>
                    <span v-else translate="no" class="notranslate text-[0.8125rem] font-bold tracking-tight">{{ l.mark }}</span>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span translate="no" class="notranslate block truncate text-sm font-semibold tracking-tight">{{ l.name }}</span>
                    <span class="block truncate text-caption text-fg-subtle">{{ l.blurb }}</span>
                  </span>
                  <ArrowUpRight class="hidden size-4 shrink-0 text-fg-subtle transition-transform sm:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Highlights" class="border-t border-line">
            <ul class="no-scrollbar flex gap-4 overflow-x-auto px-5 py-5 md:justify-between md:px-8">
              <li v-for="h in highlights" :key="h.img" class="shrink-0">
                <RouterLink :to="h.to" class="group flex w-16 flex-col items-center gap-2 text-center active:scale-95">
                  <span class="rounded-full ring-transition p-[2px] transition-transform duration-300 ease-(--ease-spring) group-hover:scale-110 group-hover:-rotate-6">
                    <img :src="$asset(`/images/highlights/${h.img}.webp`)" alt="" width="128" height="128" loading="lazy" class="size-14 rounded-full border-2 border-surface-strong" />
                  </span>
                  <span class="text-[0.6875rem] leading-tight font-medium text-fg-muted group-hover:text-fg">{{ h.label }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </UiReveal>

      <!-- Channels -->
      <ul class="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
        <UiReveal
          v-for="(c, i) in socials"
          :key="c.id"
          as="li"
          :delay="(i % 6) * 0.04"
          class="w-32 shrink-0 snap-start md:w-[calc((100%-3*0.75rem)/4)] lg:w-[calc((100%-5*0.75rem)/6)]"
        >
          <a
            :href="c.url"
            v-bind="ext(c.url)"
            class="group surface-card flex h-full flex-col items-center rounded-2xl px-3 pt-5 pb-4 text-center transition-[transform,border-color,box-shadow] duration-300 ease-(--ease-spring) hover:-translate-y-1 hover:border-line-strong hover:shadow-md active:scale-[0.98]"
          >
            <span class="relative">
              <span aria-hidden="true" class="absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70" :style="{ background: c.color }" />
              <img
                :src="$asset(`/images/social/${c.id}.webp`)"
                alt=""
                width="128"
                height="128"
                loading="lazy"
                class="relative size-16 rounded-full ring-2 ring-bg transition-transform duration-500 ease-(--ease-spring) group-hover:scale-110 group-hover:-rotate-6"
              />
            </span>
            <span class="mt-3 text-sm font-semibold tracking-tight">{{ c.label }}</span>
            <span translate="no" class="notranslate mt-0.5 block w-full truncate text-caption text-fg-subtle">{{ c.handle }}</span>
            <span
              class="mt-3 inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs font-semibold text-white transition-transform group-hover:scale-105"
              :style="{ background: c.color }"
            >
              {{ c.cta }} <ArrowUpRight class="size-3" />
            </span>
          </a>
        </UiReveal>
      </ul>

      <!-- Banners -->
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <UiReveal v-if="youtube">
          <a :href="youtube.url" target="_blank" rel="noopener" class="group block overflow-hidden rounded-3xl border border-line shadow-md transition-[transform,box-shadow] duration-500 ease-(--ease-spring) hover:-translate-y-1 hover:shadow-lg active:scale-[0.99]">
            <img :src="$asset('/images/banners/youtube.webp')" alt="HeimerClean on YouTube — subscribe" width="419" height="188" loading="lazy" class="aspect-[419/188] w-full object-cover transition-transform duration-700 ease-(--ease-spring) group-hover:scale-[1.03]" />
          </a>
        </UiReveal>
        <UiReveal :delay="0.06">
          <a :href="instagram?.url" target="_blank" rel="noopener" class="group block overflow-hidden rounded-3xl border border-line shadow-md transition-[transform,box-shadow] duration-500 ease-(--ease-spring) hover:-translate-y-1 hover:shadow-lg active:scale-[0.99]">
            <img :src="$asset('/images/banners/follow.webp')" alt="Follow HeimerClean on Instagram, LinkedIn, X, TikTok, YouTube and Discord" width="397" height="188" loading="lazy" class="aspect-[419/188] w-full object-cover transition-transform duration-700 ease-(--ease-spring) group-hover:scale-[1.03]" />
          </a>
        </UiReveal>
      </div>

      <!-- Press -->
      <div id="press" class="scroll-mt-24 pt-20 md:pt-28">
        <UiReveal class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="inline-flex items-center gap-2 text-caption font-semibold tracking-wide text-accent uppercase">
              <Newspaper class="size-3.5" /> In the press &amp; news
            </p>
            <h3 class="mt-3 text-h2 font-semibold tracking-tight">Recognised beyond the desktop.</h3>
          </div>
          <a
            :href="`mailto:${company.email}?subject=Press%20enquiry`"
            class="inline-flex h-11 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            Press enquiries <ArrowUpRight class="size-4" />
          </a>
        </UiReveal>

        <ul class="mt-8 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          <UiReveal v-for="(p, i) in press" :key="p.title" as="li" :delay="i * 0.06" class="min-w-0">
            <a
              :href="p.url"
              target="_blank"
              rel="noopener"
              class="group surface-card relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-[transform,border-color,box-shadow] duration-300 ease-(--ease-spring) hover:-translate-y-1 hover:border-line-strong hover:shadow-lg md:p-6"
            >
              <span aria-hidden="true" class="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-25 bg-transition transition-transform duration-500 ease-(--ease-spring) group-hover:scale-x-100" />
              <div class="flex items-center justify-between gap-3">
                <span class="inline-flex min-w-0 items-center gap-2">
                  <span class="grid size-8 shrink-0 place-items-center rounded-lg text-white" :style="{ background: p.color }">
                    <svg v-if="p.icon" viewBox="0 0 24 24" class="size-4 fill-[#ffcc00]" aria-hidden="true"><path :d="p.icon" /></svg>
                    <Award v-else class="size-4" />
                  </span>
                  <span translate="no" class="notranslate truncate text-sm font-semibold">{{ p.source }}</span>
                </span>
                <span class="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[0.6875rem] font-medium text-accent">{{ p.kind }}</span>
              </div>
              <h4 class="mt-5 text-[1.0625rem] leading-snug font-semibold tracking-tight">{{ p.title }}</h4>
              <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ p.body }}</p>
              <span class="mt-auto flex items-center justify-between pt-6 text-caption">
                <time class="text-fg-subtle">{{ p.date }}</time>
                <span class="inline-flex items-center gap-1 font-medium text-accent">
                  Read <ArrowUpRight class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </UiReveal>
        </ul>
      </div>
    </div>
  </section>
</template>
