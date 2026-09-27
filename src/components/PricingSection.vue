<script setup lang="ts">
import UiMascot from '@/components/ui/UiMascot.vue'
import { Check, RefreshCw } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'
import { ref } from 'vue'
import { usePlans } from '@/composables/usePlans'
import { guarantees, type BillingCycle } from '@/data/site'
import SectionHeading from './ui/SectionHeading.vue'
import SpotlightCard from './ui/SpotlightCard.vue'
import UiButton from './ui/UiButton.vue'
import UiReveal from './ui/UiReveal.vue'
import UiSkeleton from './ui/UiSkeleton.vue'

const cycle = ref<BillingCycle>('annual')
const cycles: { id: BillingCycle; label: string }[] = [
  { id: 'annual', label: 'Annual' },
  { id: 'monthly', label: 'Monthly' },
]
const { plans, status, reload } = usePlans()
</script>

<template>
  <section id="pricing" class="relative py-24 md:py-36">
    <div class="container-page">
      <SectionHeading
        eyebrow="Pricing"
        title="Less than a coffee. Every month."
        lead="Pick a plan, install in under a minute and let HeimerClean take it from there."
      />

      <UiReveal class="mt-10 flex justify-center">
        <div role="radiogroup" aria-label="Billing cycle" class="surface-card inline-flex rounded-full p-1">
          <button
            v-for="c in cycles"
            :key="c.id"
            role="radio"
            :aria-checked="cycle === c.id"
            class="relative h-10 min-w-28 rounded-full px-4 text-sm font-medium transition-colors active:scale-[0.97]"
            :class="cycle === c.id ? 'text-bg' : 'text-fg-muted hover:text-fg'"
            @click="cycle = c.id"
          >
            <Motion
              v-if="cycle === c.id"
              layout-id="billing-pill"
              class="absolute inset-0 rounded-full bg-fg shadow-md"
              :transition="{ type: 'spring', stiffness: 420, damping: 34 }"
            />
            <span class="relative inline-flex items-center gap-1.5">
              {{ c.label }}
              <span
                v-if="c.id === 'annual'"
                :class="['rounded-full px-1.5 py-px text-[0.625rem] font-semibold', cycle === 'annual' ? 'bg-accent text-accent-fg' : 'bg-accent-soft text-accent']"
              >
                SAVE
              </span>
            </span>
          </button>
        </div>
      </UiReveal>

      <div aria-live="polite" class="mt-12 md:mt-16">
        <div v-if="status === 'loading'" class="grid gap-4 md:grid-cols-3" aria-busy="true" aria-label="Loading plans">
          <div v-for="n in 3" :key="n" class="surface-card space-y-5 rounded-2xl p-8">
            <UiSkeleton class="h-5 w-32" />
            <UiSkeleton class="h-4 w-48" />
            <UiSkeleton class="h-10 w-28" />
            <UiSkeleton class="h-11 w-full rounded-full" />
            <div class="space-y-3 pt-2">
              <UiSkeleton v-for="k in 4" :key="k" class="h-3.5" :style="{ width: `${90 - k * 12}%` }" />
            </div>
          </div>
        </div>

        <div
          v-else-if="status === 'error'"
          class="surface-card mx-auto flex max-w-md flex-col items-center rounded-2xl px-6 py-12 text-center"
        >
          <UiMascot pose="face-sad" class="h-20 w-auto" />
          <h3 class="mt-5 text-h3 font-semibold">We couldn't load current prices</h3>
          <p class="mt-2 text-[0.9375rem] text-fg-muted">
            Check your connection and try again. Plans start at $1.99 with a 30-day money-back guarantee.
          </p>
          <UiButton variant="secondary" class="mt-6" @click="reload">
            <RefreshCw class="size-4" /> Try again
          </UiButton>
        </div>

        <div v-else class="grid items-stretch gap-4 md:grid-cols-3">
          <UiReveal v-for="(p, i) in plans" :key="p.id" :delay="i * 0.08" class="h-full min-w-0">
            <SpotlightCard
              :class="['h-full', p.featured ? 'border-accent/40! shadow-lg md:-my-3' : '']"
            >
              <div class="flex h-full flex-col p-7 md:p-8">
                <div class="flex items-center justify-between">
                  <h3 class="text-h3 font-semibold">{{ p.name }}</h3>
                  <span
                    v-if="p.featured"
                    class="rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-accent uppercase"
                  >
                    Most popular
                  </span>
                </div>
                <p class="mt-2 min-h-12 text-[0.9375rem] text-fg-muted">{{ p.tagline }}</p>

                <div class="mt-6 flex items-baseline gap-1.5">
                  <span class="text-4xl font-semibold tracking-tighter tabular-nums">
                    $<span class="relative inline-flex overflow-hidden">
                      <AnimatePresence mode="popLayout" :initial="false">
                        <Motion
                          :key="p.price[cycle]"
                          as="span"
                          :initial="{ y: '100%', opacity: 0 }"
                          :animate="{ y: 0, opacity: 1 }"
                          :exit="{ y: '-100%', opacity: 0 }"
                          :transition="{ type: 'spring', stiffness: 300, damping: 28 }"
                        >
                          {{ p.price[cycle].toFixed(2) }}
                        </Motion>
                      </AnimatePresence>
                    </span>
                  </span>
                  <span class="text-sm text-fg-subtle">/ mo + VAT</span>
                </div>
                <p class="mt-1 text-caption text-fg-subtle">
                  {{ p.seats }} · {{ cycle === 'annual' ? 'billed annually' : 'billed monthly' }}
                </p>

                <UiButton
                  :to="{ path: '/store', query: { plan: p.id, billing: cycle } }"
                  :variant="p.featured ? 'primary' : 'secondary'"
                  block
                  class="mt-7"
                >
                  {{ p.cta }}
                </UiButton>

                <ul class="mt-8 space-y-3 border-t border-line pt-6">
                  <li v-for="f in p.features" :key="f" class="flex gap-3 text-[0.9375rem]">
                    <Check class="mt-0.5 size-4 shrink-0 text-accent" />
                    <span class="text-fg-muted">{{ f }}</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </UiReveal>
        </div>
      </div>

      <UiReveal>
        <ul class="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 text-caption text-fg-muted">
          <li v-for="g in guarantees" :key="g" class="inline-flex items-center gap-2">
            <Check class="size-3.5 text-accent" /> {{ g }}
          </li>
        </ul>
        <p class="mt-6 text-center text-caption text-fg-subtle">
          Using another PC cleaner or antivirus? Ask support about the 40% competitor discount.
        </p>
      </UiReveal>
    </div>
  </section>
</template>
