<script setup lang="ts">
import { ArrowRight, CircleCheck, Info, TriangleAlert } from 'lucide-vue-next'
import { ref } from 'vue'
import { headingId, type DocBlock } from '@/data/docs'
import ImageLightbox from '../ui/ImageLightbox.vue'
import ScreenFrame from '../ui/ScreenFrame.vue'

defineProps<{ blocks: DocBlock[] }>()

const tones = {
  info: { icon: Info, cls: 'border-accent/25 bg-accent-soft', icls: 'text-accent' },
  warning: { icon: TriangleAlert, cls: 'border-amber-500/25 bg-amber-500/[0.06]', icls: 'text-amber-500' },
  success: { icon: CircleCheck, cls: 'border-emerald-500/25 bg-emerald-500/[0.06]', icls: 'text-emerald-500' },
}

const zoom = ref<{ src: string; alt: string } | null>(null)
const zoomOpen = ref(false)
function openZoom(src: string, alt: string) {
  zoom.value = { src, alt }
  zoomOpen.value = true
}
</script>

<template>
  <div class="doc-prose">
    <template v-for="(b, i) in blocks" :key="i">
      <p v-if="b.type === 'p'">{{ b.text }}</p>

      <h2 v-else-if="b.type === 'h2'" :id="headingId(b.text)" class="group scroll-mt-28">
        <a :href="`#${headingId(b.text)}`" class="no-underline!">
          {{ b.text }}
          <span class="ml-1 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100">#</span>
        </a>
      </h2>

      <h3 v-else-if="b.type === 'h3'" :id="headingId(b.text)" class="scroll-mt-28">{{ b.text }}</h3>

      <ul v-else-if="b.type === 'ul'">
        <li v-for="item in b.items" :key="item">{{ item }}</li>
      </ul>

      <ol v-else-if="b.type === 'ol'">
        <li v-for="item in b.items" :key="item">{{ item }}</li>
      </ol>

      <div v-else-if="b.type === 'table'" class="my-6 overflow-x-auto rounded-xl border border-line">
        <table class="w-full min-w-[32rem] text-left text-sm">
          <thead v-if="b.head.some(Boolean)" class="bg-line/60">
            <tr>
              <th v-for="h in b.head" :key="h" class="px-4 py-3 font-medium text-fg">{{ h }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-line">
            <tr v-for="(row, r) in b.rows" :key="r">
              <td v-for="(cell, c) in row" :key="c" class="px-4 py-3 align-top text-fg-muted">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="b.type === 'callout'" :class="['my-6 flex gap-3 rounded-xl border p-4', tones[b.tone].cls]">
        <component :is="tones[b.tone].icon" :class="['mt-0.5 size-[18px] shrink-0', tones[b.tone].icls]" />
        <div class="text-[0.9375rem] leading-relaxed">
          <p v-if="b.title" class="m-0! font-medium text-fg">{{ b.title }}</p>
          <p class="m-0! text-fg-muted">{{ b.text }}</p>
        </div>
      </div>

      <div v-else-if="b.type === 'cards'" class="my-8 grid gap-3 sm:grid-cols-2">
        <RouterLink
          v-for="c in b.items"
          :key="c.title"
          :to="c.to?.startsWith('/') ? c.to : `/docs/${c.to}`"
          class="group surface-card flex items-start justify-between gap-3 rounded-xl p-4 no-underline! transition-[border-color,transform] hover:border-line-strong active:scale-[0.99]"
        >
          <span>
            <span class="block font-medium text-fg">{{ c.title }}</span>
            <span class="mt-1 block text-sm text-fg-muted">{{ c.text }}</span>
          </span>
          <ArrowRight class="mt-1 size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </div>

      <button
        v-else-if="b.type === 'image'"
        type="button"
        class="my-6 block w-full cursor-zoom-in rounded-2xl border border-line bg-surface p-1.5 shadow-md transition-transform hover:-translate-y-0.5"
        :aria-label="`Enlarge: ${b.alt}`"
        @click="openZoom(b.src, b.alt)"
      >
        <ScreenFrame :src="b.src" :alt="b.alt" />
      </button>
    </template>

    <ImageLightbox v-if="zoom" v-model:open="zoomOpen" :src="zoom.src" :alt="zoom.alt" :title="zoom.alt" />
  </div>
</template>

<style scoped>
.doc-prose {
  color: var(--fg-muted);
  font-size: 1rem;
  line-height: 1.75;
}
.doc-prose > p {
  margin: 1rem 0;
}
.doc-prose h2 {
  margin: 2.75rem 0 0.75rem;
  color: var(--fg);
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.3;
}
.doc-prose h3 {
  margin: 2rem 0 0.25rem;
  color: var(--fg);
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.015em;
}
.doc-prose ul,
.doc-prose ol {
  margin: 1rem 0;
  padding-left: 1.25rem;
}
.doc-prose ul { list-style: disc; }
.doc-prose ol { list-style: decimal; }
.doc-prose li { margin: 0.375rem 0; padding-left: 0.25rem; }
.doc-prose li::marker { color: var(--fg-subtle); }
</style>
