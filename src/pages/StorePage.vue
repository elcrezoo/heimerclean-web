<script setup lang="ts">
import { Check, Gift, Lock, Minus, Monitor, Plus, ShieldCheck, Sparkles, Star, Users, X } from 'lucide-vue-next'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AnimatedNumber from '@/components/ui/AnimatedNumber.vue'
import SpotlightCard from '@/components/ui/SpotlightCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiMascot from '@/components/ui/UiMascot.vue'
import UiReveal from '@/components/ui/UiReveal.vue'
import { brand, comparison, guarantees, plans, specialOffers, storeFaqs } from '@/data/site'

type Cycle = 'annual' | 'monthly' | 'trial'
const cycles: { id: Cycle; label: string; hint?: string }[] = [
  { id: 'annual', label: 'Annual', hint: 'Best price' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'trial', label: 'Free trial', hint: '30 days' },
]

const route = useRoute()
const router = useRouter()
const initialPlan = plans.find((p) => p.id === route.query.plan)?.id ?? 'core'
const initialCycle = (['annual', 'monthly', 'trial'] as Cycle[]).find((c) => c === route.query.billing) ?? 'annual'

const selectedId = ref(initialPlan)
const cycle = ref<Cycle>(initialCycle)
const seats = ref(1)
const competitor = ref(false)

const selected = computed(() => plans.find((p) => p.id === selectedId.value)!)
const unit = (p: (typeof plans)[number]) => (cycle.value === 'monthly' ? p.price.monthly : p.price.annual)
const subtotal = computed(() => unit(selected.value) * seats.value)
const discount = computed(() => (competitor.value ? subtotal.value * 0.4 : 0))
const recurring = computed(() => subtotal.value - discount.value)
const today = computed(() => (cycle.value === 'trial' ? 0 : recurring.value))

watch([selectedId, cycle], () => router.replace({ query: { plan: selectedId.value, billing: cycle.value } }))
watch(
  () => route.query.plan,
  (plan) => {
    const match = plans.find((p) => p.id === plan)
    if (!match || match.id === selectedId.value) return
    selectedId.value = match.id
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

const checkoutHref = computed(
  () =>
    `${brand.checkoutUrl}?plan=${selected.value.id}&billing=${cycle.value}&seats=${seats.value}${competitor.value ? '&offer=competitor' : ''}`,
)

const trialEnds = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})
</script>

<template>
  <div class="pb-32 lg:pb-24">
    <section class="relative overflow-hidden pt-28 pb-12 md:pt-36 lg:pt-40">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_30%,transparent_100%)]" />
      </div>
      <UiReveal class="container-page relative text-center">
        <div class="mx-auto mb-3 w-fit lg:absolute lg:top-2 lg:left-6 lg:mb-0 xl:left-10">
          <UiMascot pose="point" anim="bob" eager alt="HeimerClean mascot pointing at the plans" class="h-24 w-auto md:h-28 lg:h-44" />
        </div>
        <p class="font-mono text-caption tracking-wider text-accent uppercase">Store</p>
        <h1 class="mx-auto mt-3 max-w-3xl text-h1 font-semibold text-gradient text-balance">
          Get the most out of your PC with a HeimerClean plan.
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-body-lg text-fg-muted">
          Start free for 30 days. Cancel anytime. Backed by a 30-day money-back guarantee.
        </p>
        <div class="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-caption text-fg-muted">
          <span class="inline-flex items-center gap-1.5">
            <span class="flex">
              <Star v-for="n in 5" :key="n" :class="['size-3.5', n <= Math.round(brand.rating) ? 'fill-[#fcd34d] text-[#fcd34d]' : 'text-fg-subtle']" />
            </span>
            {{ brand.rating }} / 5 user rating
          </span>
          <span aria-hidden="true" class="size-1 rounded-full bg-line-strong" />
          <span>Latest version {{ brand.version }}</span>
          <span aria-hidden="true" class="size-1 rounded-full bg-line-strong" />
          <span>From $1.99 + VAT</span>
        </div>
      </UiReveal>
    </section>

    <div class="container-page grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-12">
      <div class="min-w-0">
        <UiReveal>
          <div role="radiogroup" aria-label="Billing" class="surface-card grid grid-cols-3 gap-1 rounded-2xl p-1 sm:inline-grid sm:rounded-full">
            <button
              v-for="c in cycles"
              :key="c.id"
              role="radio"
              :aria-checked="cycle === c.id"
              :class="[
                'flex h-11 items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-300 active:scale-[0.97] sm:rounded-full',
                cycle === c.id ? 'bg-fg text-bg shadow-md' : 'text-fg-muted hover:text-fg',
              ]"
              @click="cycle = c.id"
            >
              {{ c.label }}
              <span
                v-if="c.hint"
                :class="['hidden rounded-full px-1.5 py-px text-[0.625rem] font-semibold sm:inline', cycle === c.id ? 'bg-accent text-accent-fg' : 'bg-accent-soft text-accent']"
              >{{ c.hint }}</span>
            </button>
          </div>
        </UiReveal>

        <div role="radiogroup" aria-label="Plan" class="mt-6 grid gap-3 md:grid-cols-3">
          <UiReveal v-for="(p, i) in plans" :key="p.id" :delay="i * 0.06" class="min-w-0">
            <SpotlightCard
              role="radio"
              :aria-checked="selectedId === p.id"
              tabindex="0"
              :class="[
                'h-full cursor-pointer transition-[box-shadow,border-color,transform] duration-300 active:scale-[0.99]',
                selectedId === p.id ? 'border-accent! shadow-[0_0_0_3px_var(--accent-soft)]' : '',
              ]"
              @click="selectedId = p.id"
              @keydown.enter.space.prevent="selectedId = p.id"
            >
              <div class="flex h-full flex-col p-5">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <p class="font-semibold tracking-tight">{{ p.name }}</p>
                    <p class="mt-0.5 text-caption text-fg-subtle">for {{ p.seats }}</p>
                  </div>
                  <span
                    :class="[
                      'grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
                      selectedId === p.id ? 'border-accent bg-accent' : 'border-line-strong',
                    ]"
                  >
                    <Check v-if="selectedId === p.id" class="size-3 text-accent-fg" />
                  </span>
                </div>
                <p class="mt-4 text-3xl font-semibold tracking-tighter">
                  <template v-if="cycle === 'trial'">$0</template>
                  <AnimatedNumber v-else :value="unit(p)" />
                  <span class="ml-1 text-sm font-normal tracking-normal text-fg-subtle">{{ cycle === 'trial' ? '/ 30 days' : '/ mo' }}</span>
                </p>
                <p class="mt-1 text-caption text-fg-subtle">
                  {{ cycle === 'trial' ? `then $${p.price.annual.toFixed(2)}/mo` : cycle === 'annual' ? 'billed annually' : 'billed monthly' }}
                </p>
                <p class="mt-4 text-sm text-fg-muted">{{ p.tagline }}</p>
                <span v-if="p.featured" class="mt-4 w-fit rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-semibold text-accent uppercase">
                  Most popular
                </span>
              </div>
            </SpotlightCard>
          </UiReveal>
        </div>

        <UiReveal class="mt-4">
          <div class="surface-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
              <span class="grid size-10 place-items-center rounded-xl bg-accent-soft"><Users class="size-[18px] text-accent" /></span>
              <div>
                <p class="text-sm font-medium">Number of users</p>
                <p class="text-caption text-fg-subtle">Each user can activate HeimerClean on their PC.</p>
              </div>
            </div>
            <div class="flex items-center gap-1 self-start rounded-full border border-line-strong p-1 sm:self-auto">
              <button
                type="button"
                class="grid size-10 place-items-center rounded-full transition-[background-color,transform] hover:bg-line active:scale-90 disabled:opacity-30"
                :disabled="seats <= 1"
                aria-label="Remove a user"
                @click="seats--"
              >
                <Minus class="size-4" />
              </button>
              <output class="w-10 text-center font-medium tabular-nums" aria-live="polite">{{ seats }}</output>
              <button
                type="button"
                class="grid size-10 place-items-center rounded-full transition-[background-color,transform] hover:bg-line active:scale-90 disabled:opacity-30"
                :disabled="seats >= 10"
                aria-label="Add a user"
                @click="seats++"
              >
                <Plus class="size-4" />
              </button>
            </div>
          </div>
        </UiReveal>

        <UiReveal class="mt-4">
          <label
            class="surface-card flex cursor-pointer items-center gap-4 rounded-2xl p-5 transition-[border-color] has-[:checked]:border-accent"
          >
            <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fcd34d]/15"><Gift class="size-[18px] text-[#eab308]" /></span>
            <span class="flex-1">
              <span class="block text-sm font-medium">I use another PC cleaner or antivirus</span>
              <span class="block text-caption text-fg-subtle">Apply the 40% competitor discount — verified at checkout.</span>
            </span>
            <input v-model="competitor" type="checkbox" class="peer sr-only" />
            <span
              aria-hidden="true"
              class="relative h-7 w-12 shrink-0 rounded-full bg-line-strong transition-colors peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--ring) after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 after:ease-(--ease-spring) peer-checked:after:translate-x-5"
            />
          </label>
        </UiReveal>
      </div>

      <aside class="hidden lg:sticky lg:top-24 lg:block">
        <UiReveal>
          <div class="surface-card rounded-3xl bg-surface-strong! p-6 shadow-lg">
            <p class="text-caption text-fg-subtle">Your HeimerClean plan</p>
            <p class="mt-1 text-xl font-semibold tracking-tight">{{ selected.name }}</p>
            <dl class="mt-6 space-y-3 text-sm">
              <div class="flex justify-between">
                <dt class="text-fg-muted">{{ cycle === 'monthly' ? 'Monthly' : 'Annual' }} price × {{ seats }}</dt>
                <dd><AnimatedNumber :value="subtotal" /></dd>
              </div>
              <div v-if="competitor" class="flex justify-between text-success">
                <dt>Competitor discount</dt>
                <dd>−<AnimatedNumber :value="discount" /></dd>
              </div>
              <div v-if="cycle === 'trial'" class="flex justify-between text-success">
                <dt>30-day free trial</dt>
                <dd>−<AnimatedNumber :value="recurring" /></dd>
              </div>
              <div class="flex justify-between text-fg-subtle">
                <dt>VAT</dt>
                <dd>Calculated at checkout</dd>
              </div>
            </dl>
            <div class="mt-5 flex items-end justify-between border-t border-line pt-5">
              <span class="text-sm font-medium">You pay today</span>
              <span class="text-3xl font-semibold tracking-tighter"><AnimatedNumber :value="today" /></span>
            </div>
            <p class="mt-1 text-right text-caption text-fg-subtle">
              <template v-if="cycle === 'trial'">Then ${{ recurring.toFixed(2) }}/mo from {{ trialEnds }}</template>
              <template v-else>Then ${{ recurring.toFixed(2) }}/mo + VAT</template>
            </p>

            <UiButton v-if="cycle === 'trial'" to="/download" size="lg" block class="mt-6">Start free trial</UiButton>
            <UiButton v-else :href="checkoutHref" size="lg" block class="mt-6">
              <Lock class="size-4" /> Continue to secure checkout
            </UiButton>

            <ul class="mt-6 space-y-2.5">
              <li v-for="g in guarantees" :key="g" class="flex items-center gap-2.5 text-caption text-fg-muted">
                <ShieldCheck class="size-4 shrink-0 text-accent" /> {{ g }}
              </li>
            </ul>
          </div>
        </UiReveal>
      </aside>
    </div>

    <section class="container-page mt-24">
      <UiReveal>
        <h2 class="text-h2 font-semibold text-gradient">Compare plans</h2>
        <div class="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table class="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr class="border-b border-line bg-line/40">
                <th class="sticky left-0 bg-bg-elevated px-5 py-4 font-medium text-fg-muted">Feature</th>
                <th v-for="p in plans" :key="p.id" class="px-5 py-4 font-semibold">
                  {{ p.name }}
                  <span v-if="p.featured" class="ml-1.5 rounded-full bg-accent-soft px-1.5 py-0.5 text-[0.625rem] text-accent">Popular</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-line">
              <tr v-for="row in comparison" :key="row.label" class="transition-colors hover:bg-line/30">
                <td class="sticky left-0 bg-bg px-5 py-3.5 text-fg-muted">{{ row.label }}</td>
                <td v-for="(v, i) in row.values" :key="i" class="px-5 py-3.5">
                  <Check v-if="v === true" class="size-4 text-accent" aria-label="Included" />
                  <X v-else-if="v === false" class="size-4 text-fg-subtle/60" aria-label="Not included" />
                  <span v-else class="text-fg">{{ v }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </UiReveal>
    </section>

    <section id="offers" class="container-page mt-24 grid scroll-mt-24 gap-4 md:grid-cols-2">
      <UiReveal v-for="(o, i) in specialOffers" :key="o.title" :delay="i * 0.08">
        <SpotlightCard class="h-full">
          <div class="flex h-full flex-col p-6 md:p-8">
            <span class="w-fit rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs font-semibold text-accent">{{ o.badge }}</span>
            <h3 class="mt-4 text-h3 font-semibold">{{ o.title }}</h3>
            <p class="mt-2 flex-1 text-[0.9375rem] text-fg-muted">{{ o.body }}</p>
            <UiButton to="/support" variant="secondary" size="sm" class="mt-6 w-fit">Ask about this offer</UiButton>
          </div>
        </SpotlightCard>
      </UiReveal>
      <UiReveal class="md:col-span-2">
        <div class="surface-card flex flex-col gap-6 overflow-hidden rounded-2xl p-6 md:flex-row md:items-center md:p-8">
          <div class="flex-1">
            <p class="inline-flex items-center gap-2 font-mono text-caption tracking-wider text-accent uppercase">
              <Sparkles class="size-3.5" /> For teams
            </p>
            <h3 class="mt-3 text-h3 font-semibold">Need centralized PC fleet administration?</h3>
            <p class="mt-2 max-w-lg text-[0.9375rem] text-fg-muted">
              Core Suite adds the Team view, scoped devices, AI intervention controls and organization-level insights.
            </p>
          </div>
          <UiButton variant="primary" @click="selectedId = 'core'; cycle = 'annual'">Choose Core Suite</UiButton>
        </div>
      </UiReveal>
    </section>

    <section class="container-page mt-24 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
      <UiReveal>
        <h2 class="text-h2 font-semibold text-gradient">System requirements</h2>
        <dl class="mt-8 grid grid-cols-2 gap-3">
          <div class="surface-card rounded-2xl p-5">
            <Monitor class="size-5 text-accent" />
            <dt class="mt-3 text-caption text-fg-subtle">Operating system</dt>
            <dd class="mt-0.5 font-medium">Windows 10 or later</dd>
          </div>
          <div class="surface-card rounded-2xl p-5">
            <svg viewBox="0 0 24 24" class="size-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 16h.01M11 16h6" /></svg>
            <dt class="mt-3 text-caption text-fg-subtle">Disk space</dt>
            <dd class="mt-0.5 font-medium">200 MB</dd>
          </div>
          <div class="surface-card rounded-2xl p-5">
            <svg viewBox="0 0 24 24" class="size-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            <dt class="mt-3 text-caption text-fg-subtle">Minimum display</dt>
            <dd class="mt-0.5 font-medium">{{ brand.minDisplay }} px</dd>
          </div>
          <div class="surface-card rounded-2xl p-5">
            <Sparkles class="size-5 text-accent" />
            <dt class="mt-3 text-caption text-fg-subtle">Latest version</dt>
            <dd class="mt-0.5 font-medium">{{ brand.version }}</dd>
          </div>
        </dl>
      </UiReveal>
      <UiReveal :delay="0.08">
        <h2 class="text-h2 font-semibold text-gradient">Billing questions</h2>
        <AccordionRoot type="single" collapsible class="mt-6 divide-y divide-line border-y border-line">
          <AccordionItem v-for="f in storeFaqs" :key="f.q" :value="f.q" class="group">
            <AccordionHeader as="h3">
              <AccordionTrigger class="flex min-h-15 w-full items-center justify-between gap-6 py-4 text-left font-medium tracking-tight hover:text-accent">
                {{ f.q }}
                <Plus class="size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-content overflow-hidden">
              <p class="pb-5 text-[0.9375rem] leading-relaxed text-fg-muted">{{ f.a }}</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </UiReveal>
    </section>

    <div class="pb-safe fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden">
      <div class="surface-card flex items-center gap-3 rounded-2xl bg-surface-strong/90! p-2 pl-4 shadow-lg">
        <div class="min-w-0 flex-1">
          <p class="truncate text-caption text-fg-subtle">{{ selected.name }} · {{ seats }} user{{ seats > 1 ? 's' : '' }}</p>
          <p class="text-lg font-semibold tracking-tight">
            <AnimatedNumber :value="today" /> <span class="text-caption font-normal text-fg-subtle">today</span>
          </p>
        </div>
        <UiButton v-if="cycle === 'trial'" to="/download">Start trial</UiButton>
        <UiButton v-else :href="checkoutHref"><Lock class="size-4" /> Checkout</UiButton>
      </div>
    </div>
  </div>
</template>
