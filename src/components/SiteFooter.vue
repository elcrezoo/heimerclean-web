<script setup lang="ts">
import { Mail, MapPin, Phone } from 'lucide-vue-next'
import { siProducthunt } from 'simple-icons'
import { RouterLink } from 'vue-router'
import { brand } from '@/data/site'
import { company, footerColumns, legalLinks, socials } from '@/data/social'
import BrandLogo from './BrandLogo.vue'
import LanguageSelect from './LanguageSelect.vue'
import NewsletterStickers from './NewsletterStickers.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="pb-28 md:pb-0">
    <div class="container-page pt-8 pb-16 md:pb-20">
      <NewsletterStickers />
    </div>

    <div class="border-t border-line">
      <div class="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-[repeat(4,1fr)_1.3fr] lg:gap-10">
        <nav v-for="col in footerColumns" :key="col.title" :aria-label="col.title" class="min-w-0">
          <h3 class="text-sm font-semibold tracking-tight">{{ col.title }}</h3>
          <ul class="mt-3">
            <li v-for="l in col.links" :key="l.label">
              <component
                :is="l.to ? RouterLink : 'a'"
                v-bind="l.to ? { to: l.to } : { href: l.href }"
                class="inline-flex min-h-11 items-center text-sm text-fg-muted transition-colors hover:text-accent md:min-h-9"
              >
                {{ l.label }}
              </component>
            </li>
          </ul>
        </nav>

        <div class="col-span-2 md:col-span-4 lg:col-span-1">
          <h3 class="text-sm font-semibold tracking-tight">Follow Us</h3>
          <ul class="mt-4 grid w-fit grid-cols-6 gap-2 lg:grid-cols-4">
            <li v-for="s in socials" :key="s.id">
              <a
                :href="s.url"
                :target="s.url.startsWith('http') ? '_blank' : undefined"
                rel="noopener"
                :aria-label="`HeimerClean on ${s.label}`"
                :title="s.label"
                class="group relative block size-11 rounded-full transition-transform duration-300 ease-(--ease-spring) hover:-translate-y-1 hover:scale-110 active:scale-95"
              >
                <span
                  aria-hidden="true"
                  class="absolute -inset-0.5 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"
                  :style="{ background: s.color }"
                />
                <img
                  :src="$asset(`/images/social/${s.id}.webp`)"
                  alt=""
                  width="128"
                  height="128"
                  loading="lazy"
                  class="relative size-11 rounded-full shadow-sm ring-1 ring-line"
                />
              </a>
            </li>
          </ul>

          <a
            :href="company.productHuntUrl"
            target="_blank"
            rel="noopener"
            class="group mt-5 inline-flex h-12 items-center gap-3 rounded-xl border border-[#da552f]/60 bg-surface-strong pr-3 pl-2.5 text-[#da552f] shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-[#da552f] hover:shadow-md active:scale-[0.98]"
            aria-label="Find HeimerClean on Product Hunt"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="size-7 fill-current"><path :d="siProducthunt.path" /></svg>
            <span class="leading-none">
              <span class="block text-[0.5625rem] font-bold tracking-[0.08em] uppercase">Find us on</span>
              <span class="mt-0.5 block text-[1.0625rem] font-bold tracking-tight">Product Hunt</span>
            </span>
            <span class="ml-2 flex flex-col items-center border-l border-[#da552f]/25 pl-3 text-[0.625rem] font-bold leading-tight">
              <svg viewBox="0 0 10 8" aria-hidden="true" class="size-2.5 fill-current transition-transform group-hover:-translate-y-0.5"><path d="M5 0l5 8H0z" /></svg>
              Upvote
            </span>
          </a>

          <h3 class="mt-7 text-sm font-semibold tracking-tight">Language</h3>
          <div class="mt-3">
            <LanguageSelect side="top" />
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-line">
      <div class="container-page flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <BrandLogo />
          <p class="text-caption text-fg-subtle">
            © {{ year }} <span translate="no" class="notranslate">{{ company.legalName }}</span> · v{{ brand.version }}
          </p>
        </div>
        <nav aria-label="Legal">
          <ul class="flex flex-wrap gap-x-5">
            <li v-for="l in legalLinks" :key="l.label">
              <RouterLink :to="l.to!" class="inline-flex min-h-11 items-center text-sm text-fg-muted transition-colors hover:text-fg">
                {{ l.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="container-page flex flex-col gap-2 pb-8 text-caption text-fg-subtle md:flex-row md:flex-wrap md:gap-x-6">
        <span class="inline-flex items-center gap-1.5"><MapPin class="size-3.5 shrink-0" /> {{ brand.address }}</span>
        <a :href="`mailto:${company.email}`" class="inline-flex items-center gap-1.5 hover:text-fg"><Mail class="size-3.5" /> {{ company.email }}</a>
        <a :href="brand.phoneHref" class="inline-flex items-center gap-1.5 hover:text-fg"><Phone class="size-3.5" /> {{ brand.phone }}</a>
        <span class="md:ml-auto">HeimerClean is not an antivirus — keep Windows Security enabled.</span>
      </div>
    </div>
  </footer>
</template>
