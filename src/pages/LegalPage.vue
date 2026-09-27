<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import DocBlocks from '@/components/docs/DocBlocks.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiMascot from '@/components/ui/UiMascot.vue'
import UiReveal from '@/components/ui/UiReveal.vue'
import { legalBySlug, legalPages } from '@/data/legal'

const route = useRoute()
const page = computed(() => legalBySlug(String(route.params.slug)))

watchEffect(() => {
  document.title = page.value ? `${page.value.title} — HeimerClean` : 'Page not found — HeimerClean'
})
</script>

<template>
  <div class="container-page pt-28 pb-24 md:pt-36">
    <nav aria-label="Legal pages" class="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 md:mx-0 md:px-0">
      <RouterLink
        v-for="p in legalPages"
        :key="p.slug"
        :to="`/legal/${p.slug}`"
        :aria-current="p.slug === page?.slug ? 'page' : undefined"
        :class="[
          'inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors',
          p.slug === page?.slug ? 'bg-fg text-bg' : 'text-fg-muted hover:bg-line hover:text-fg',
        ]"
      >
        {{ p.title }}
      </RouterLink>
    </nav>

    <Transition name="page" mode="out-in">
      <article v-if="page" :key="page.slug" class="mt-10 grid gap-12 lg:grid-cols-[1fr_16rem]">
        <div class="min-w-0 max-w-3xl">
          <p class="font-mono text-caption tracking-wider text-accent uppercase">Legal</p>
          <h1 class="mt-3 text-h1 font-semibold text-gradient">{{ page.title }}</h1>
          <p class="mt-4 text-body-lg text-fg-muted">{{ page.description }}</p>
          <p class="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-caption text-accent">Last updated {{ page.updated }}</p>
          <div class="mt-8 border-t border-line pt-2">
            <DocBlocks :blocks="page.blocks" />
          </div>
        </div>
        <UiReveal class="hidden lg:block">
          <div class="sticky top-28 surface-card flex flex-col items-center rounded-3xl p-6 text-center">
            <UiMascot pose="face-thinking" anim="bob" class="h-20 w-auto" />
            <p class="mt-4 font-semibold tracking-tight">Questions about this page?</p>
            <p class="mt-1 text-sm text-fg-muted">Our team replies within a few hours.</p>
            <UiButton to="/support#contact" variant="secondary" size="sm" class="mt-4">Contact us</UiButton>
          </div>
        </UiReveal>
      </article>

      <div v-else class="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <UiMascot pose="face-surprised" anim="bob" class="h-24 w-auto" />
        <h1 class="mt-5 text-h2 font-semibold">This page doesn’t exist</h1>
        <UiButton to="/" variant="secondary" class="mt-6"><ArrowLeft class="size-4" /> Back to home</UiButton>
      </div>
    </Transition>
  </div>
</template>
