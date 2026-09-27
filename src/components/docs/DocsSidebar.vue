<script setup lang="ts">
import UiMascot from '@/components/ui/UiMascot.vue'
import { onKeyStroke, refDebounced } from '@vueuse/core'
import { Search, X } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { docGroups, docs } from '@/data/docs'

defineProps<{ current: string }>()
const emit = defineEmits<{ navigate: [] }>()

const query = ref('')
const q = refDebounced(query, 100)
const input = ref<HTMLInputElement>()

onKeyStroke('k', (e) => {
  if (e.metaKey || e.ctrlKey) {
    e.preventDefault()
    input.value?.focus()
  }
})

function text(page: (typeof docs)[number]) {
  return [page.title, page.description, ...page.blocks.flatMap((b) => ('text' in b ? [b.text] : 'items' in b ? b.items.map((i) => (typeof i === 'string' ? i : i.title)) : []))]
    .join(' ')
    .toLowerCase()
}
const index = docs.map((d) => ({ page: d, haystack: text(d) }))

const results = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return null
  return index.filter((d) => d.haystack.includes(term)).map((d) => d.page)
})

const grouped = computed(() => docGroups.map((g) => ({ group: g, pages: docs.filter((d) => d.group === g) })))
</script>

<template>
  <div>
    <label class="relative block">
      <span class="sr-only">Search docs</span>
      <Search class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" />
      <input
        ref="input"
        v-model="query"
        type="search"
        placeholder="Search docs"
        class="h-11 w-full rounded-xl border border-line-strong bg-surface-strong pr-14 pl-9 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        v-if="query"
        type="button"
        aria-label="Clear search"
        class="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-fg-subtle hover:bg-line"
        @click="query = ''"
      >
        <X class="size-4" />
      </button>
      <kbd
        v-else
        class="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] text-fg-subtle lg:block"
      >⌘K</kbd>
    </label>

    <nav class="mt-6" aria-label="Documentation">
      <template v-if="results">
        <p class="px-3 text-caption text-fg-subtle">{{ results.length }} result{{ results.length === 1 ? '' : 's' }}</p>
        <ul v-if="results.length" class="mt-2 space-y-0.5">
          <li v-for="p in results" :key="p.slug">
            <RouterLink
              :to="`/docs/${p.slug}`"
              class="block rounded-lg px-3 py-2 transition-colors hover:bg-line"
              @click="emit('navigate')"
            >
              <span class="block text-sm font-medium text-fg">{{ p.title }}</span>
              <span class="line-clamp-1 block text-caption text-fg-subtle">{{ p.description }}</span>
            </RouterLink>
          </li>
        </ul>
        <div v-else class="mt-4 flex flex-col items-center rounded-xl border border-dashed border-line-strong px-4 py-8 text-center">
          <UiMascot pose="face-thinking" anim="bob" class="h-16 w-auto drop-shadow-none" />
          <p class="mt-3 text-sm font-medium">Nothing matches “{{ q }}”</p>
          <p class="mt-1 text-caption text-fg-subtle">Try “license”, “update” or “privacy”.</p>
        </div>
      </template>

      <div v-else class="space-y-6">
        <div v-for="g in grouped" :key="g.group">
          <p class="px-3 font-mono text-[0.6875rem] tracking-wider text-fg-subtle uppercase">{{ g.group }}</p>
          <ul class="mt-2 space-y-0.5 border-l border-line">
            <li v-for="p in g.pages" :key="p.slug">
              <RouterLink
                :to="`/docs/${p.slug}`"
                :aria-current="current === p.slug ? 'page' : undefined"
                :class="[
                  '-ml-px flex min-h-9 items-center border-l px-3 text-sm transition-colors',
                  current === p.slug
                    ? 'border-accent font-medium text-fg'
                    : 'border-transparent text-fg-muted hover:border-line-strong hover:text-fg',
                ]"
                @click="emit('navigate')"
              >
                {{ p.title === 'HeimerClean Docs' ? 'Overview' : p.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
