<script setup lang="ts">
import UiMascot from '@/components/ui/UiMascot.vue'
import { refDebounced } from '@vueuse/core'
import { ArrowRight, BadgeCheck, CircleX, Download, KeyRound, Phone, RefreshCw, Rocket, Search, Sparkles } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import ContactSection from '@/components/ContactSection.vue'
import SpotlightCard from '@/components/ui/SpotlightCard.vue'
import UiReveal from '@/components/ui/UiReveal.vue'
import { docs } from '@/data/docs'
import { brand } from '@/data/site'

const query = ref('')
const q = refDebounced(query, 120)
const results = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (term.length < 2) return null
  return docs
    .filter((d) => JSON.stringify(d).toLowerCase().includes(term))
    .slice(0, 5)
})

const topics = [
  { icon: Rocket, title: 'Getting started', body: 'Install, open the dashboard and run your first cleanup.', to: '/docs/getting-started' },
  { icon: KeyRound, title: 'License & account', body: 'License looks invalid or you need to sign in again.', to: '/docs/troubleshooting#license-looks-invalid' },
  { icon: RefreshCw, title: 'Updates', body: 'Automatic vs AI updates, and fixing a failed update.', to: '/docs/update-automation' },
  { icon: Sparkles, title: 'AI Optimizer', body: 'Why it waits, and how to run manual actions.', to: '/docs/ai-optimizer' },
  { icon: Download, title: 'Installation', body: 'App won’t open or Windows Security blocked it.', to: '/docs/troubleshooting#app-does-not-open' },
  { icon: BadgeCheck, title: 'Billing & refunds', body: 'Plans, VAT, trial and the 30-day money-back guarantee.', to: '/store' },
]

const include = ['App version (Settings › About)', 'Windows version', 'The exact error message', 'What you were doing when it happened']
const never = ['Passwords or license keys', 'Payment card details', 'Private documents', 'Screenshots showing private emails']
</script>

<template>
  <div>
    <section class="relative overflow-hidden pt-28 pb-16 md:pt-36">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_30%,transparent_100%)]" />
      </div>
      <UiReveal class="container-page relative text-center">
        <div class="relative mx-auto mb-4 w-fit">
          <div aria-hidden="true" class="absolute inset-3 rounded-full bg-accent-soft blur-2xl" />
          <UiMascot pose="support" anim="bob" eager alt="HeimerClean mascot wearing a headset, ready to help" class="relative h-28 w-auto md:h-36" />
        </div>
        <p class="font-mono text-caption tracking-wider text-accent uppercase">Support</p>
        <h1 class="mt-3 text-h1 font-semibold text-gradient">How can we help?</h1>
        <p class="mx-auto mt-4 max-w-md text-body-lg text-fg-muted">Search the docs, pick a topic, or talk to a real person — 24/7.</p>

        <div class="relative mx-auto mt-8 max-w-xl text-left">
          <label class="relative block">
            <span class="sr-only">Search help articles</span>
            <Search class="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-fg-subtle" />
            <input
              v-model="query"
              type="search"
              placeholder="Describe your problem, e.g. “update failed”"
              class="h-14 w-full rounded-full border border-line-strong bg-surface-strong pr-5 pl-13 text-base shadow-md outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]"
            />
          </label>
          <Transition name="slide">
            <div v-if="results" class="surface-card absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-surface-strong! shadow-lg">
              <ul v-if="results.length">
                <li v-for="r in results" :key="r.slug">
                  <RouterLink :to="`/docs/${r.slug}`" class="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-line">
                    <span class="min-w-0 flex-1">
                      <span class="block text-sm font-medium">{{ r.title }}</span>
                      <span class="block truncate text-caption text-fg-subtle">{{ r.description }}</span>
                    </span>
                    <ArrowRight class="size-4 text-fg-subtle" />
                  </RouterLink>
                </li>
              </ul>
              <div v-else class="flex items-center gap-4 px-5 py-4 text-sm text-fg-muted">
                <UiMascot pose="face-thinking" class="h-12 w-auto shrink-0 drop-shadow-none" />
                <span>No articles found. <a href="#contact" class="font-medium text-accent">Send us a message</a> instead.</span>
              </div>
            </div>
          </Transition>
        </div>
      </UiReveal>
    </section>

    <section class="container-page">
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <UiReveal v-for="(t, i) in topics" :key="t.title" :delay="(i % 3) * 0.06" class="min-w-0">
          <RouterLink :to="t.to" class="block h-full">
            <SpotlightCard class="h-full transition-transform active:scale-[0.99]">
              <div class="flex h-full items-start gap-4 p-6">
                <span class="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg shadow-sm">
                  <component :is="t.icon" class="size-[18px] text-accent" />
                </span>
                <span>
                  <span class="block font-semibold tracking-tight">{{ t.title }}</span>
                  <span class="mt-1 block text-sm text-fg-muted">{{ t.body }}</span>
                </span>
              </div>
            </SpotlightCard>
          </RouterLink>
        </UiReveal>
      </div>
    </section>

    <section class="container-page mt-16 grid gap-4 md:grid-cols-3">
      <UiReveal>
        <a
          :href="brand.phoneHref"
          class="group surface-card flex h-full flex-col rounded-2xl p-6 transition-[border-color,transform] hover:border-line-strong active:scale-[0.99]"
        >
          <Phone class="size-5 text-accent" />
          <span class="mt-4 text-caption text-fg-subtle">Call us, 24/7</span>
          <span class="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">{{ brand.phone }}</span>
        </a>
      </UiReveal>
      <UiReveal :delay="0.06">
        <div class="surface-card h-full rounded-2xl p-6">
          <p class="text-sm font-semibold">Include in your message</p>
          <ul class="mt-3 space-y-2">
            <li v-for="i in include" :key="i" class="flex gap-2 text-sm text-fg-muted">
              <BadgeCheck class="mt-0.5 size-4 shrink-0 text-success" /> {{ i }}
            </li>
          </ul>
        </div>
      </UiReveal>
      <UiReveal :delay="0.12">
        <div class="surface-card h-full rounded-2xl p-6">
          <p class="text-sm font-semibold">Never send</p>
          <ul class="mt-3 space-y-2">
            <li v-for="n in never" :key="n" class="flex gap-2 text-sm text-fg-muted">
              <CircleX class="mt-0.5 size-4 shrink-0 text-danger" /> {{ n }}
            </li>
          </ul>
        </div>
      </UiReveal>
    </section>

    <ContactSection />
  </div>
</template>
