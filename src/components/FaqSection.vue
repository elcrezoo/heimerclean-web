<script setup lang="ts">
import UiMascot from '@/components/ui/UiMascot.vue'
import { refDebounced } from '@vueuse/core'
import { Plus, Search, X } from 'lucide-vue-next'
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'
import { computed, ref } from 'vue'
import { faqs } from '@/data/site'
import SectionHeading from './ui/SectionHeading.vue'
import UiButton from './ui/UiButton.vue'
import UiReveal from './ui/UiReveal.vue'

const query = ref('')
const debounced = refDebounced(query, 120)
const results = computed(() => {
  const q = debounced.value.trim().toLowerCase()
  if (!q) return faqs
  return faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q))
})
</script>

<template>
  <section id="faq" class="py-24 md:py-36">
    <div class="container-page grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
      <div class="md:sticky md:top-28 md:self-start">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered."
          lead="Straight answers about safety, privacy and what HeimerClean actually does on your PC."
        />
        <UiReveal class="mt-8">
          <label class="relative block">
            <span class="sr-only">Search questions</span>
            <Search class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-subtle" />
            <input
              v-model="query"
              type="search"
              placeholder="Search questions…"
              class="h-12 w-full rounded-full border border-line-strong bg-surface-strong pr-11 pl-11 text-[0.9375rem] outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              v-if="query"
              type="button"
              aria-label="Clear search"
              class="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-full text-fg-subtle hover:bg-line hover:text-fg"
              @click="query = ''"
            >
              <X class="size-4" />
            </button>
          </label>
        </UiReveal>
      </div>

      <div>
        <AccordionRoot v-if="results.length" type="single" collapsible class="divide-y divide-line border-y border-line">
          <AccordionItem v-for="f in results" :key="f.q" :value="f.q" class="group">
            <AccordionHeader as="h3">
              <AccordionTrigger
                class="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-base font-medium tracking-tight transition-colors hover:text-accent"
              >
                {{ f.q }}
                <span
                  class="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color] duration-300 ease-(--ease-spring) group-data-[state=open]:rotate-45 group-data-[state=open]:bg-line"
                >
                  <Plus class="size-4" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-content overflow-hidden">
              <p class="max-w-xl pr-12 pb-6 text-[0.9375rem] leading-relaxed text-fg-muted">{{ f.a }}</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <div v-else class="flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
          <UiMascot pose="face-thinking" anim="bob" class="h-20 w-auto" />
          <h3 class="mt-5 text-h3 font-semibold">No answers for “{{ debounced }}”</h3>
          <p class="mt-2 max-w-sm text-[0.9375rem] text-fg-muted">
            Try a broader word like “privacy” or “refund” — or ask us directly and we'll reply within a day.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <UiButton variant="secondary" size="sm" @click="query = ''">Clear search</UiButton>
            <UiButton variant="ghost" size="sm" to="/support">Contact support</UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
