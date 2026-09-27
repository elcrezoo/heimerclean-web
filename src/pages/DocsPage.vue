<script setup lang="ts">
import UiMascot from '@/components/ui/UiMascot.vue'
import { ArrowLeft, ArrowRight, ChevronRight, LifeBuoy, PanelLeft, ThumbsDown, ThumbsUp } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { X } from 'lucide-vue-next'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DocBlocks from '@/components/docs/DocBlocks.vue'
import DocsSidebar from '@/components/docs/DocsSidebar.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { docBySlug, docs, headingId } from '@/data/docs'

const route = useRoute()
const slug = computed(() => (route.params.slug as string) || 'overview')
const page = computed(() => docBySlug(slug.value))
const idx = computed(() => docs.findIndex((d) => d.slug === slug.value))
const prev = computed(() => (idx.value > 0 ? docs[idx.value - 1] : undefined))
const next = computed(() => (idx.value >= 0 && idx.value < docs.length - 1 ? docs[idx.value + 1] : undefined))
const toc = computed(() =>
  (page.value?.blocks ?? []).filter((b) => b.type === 'h2').map((b) => ({ text: 'text' in b ? b.text : '', id: headingId('text' in b ? b.text : '') })),
)

const drawer = ref(false)
const feedback = ref<'yes' | 'no' | null>(null)
const activeHeading = ref<string | null>(null)
let observer: IntersectionObserver | undefined

watch(
  slug,
  async () => {
    feedback.value = null
    activeHeading.value = null
    if (page.value) document.title = page.value.slug === "overview" ? page.value.title : `${page.value.title} — HeimerClean Docs`
    observer?.disconnect()
    await nextTick()
    setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting)
          if (visible[0]) activeHeading.value = visible[0].target.id
        },
        { rootMargin: '-96px 0px -70% 0px' },
      )
      toc.value.forEach((t) => {
        const el = document.getElementById(t.id)
        if (el) observer!.observe(el)
      })
    }, 350)
  },
  { immediate: true },
)
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="container-page pt-24 pb-24 md:pt-28">
    <div class="sticky top-[4.75rem] z-30 -mx-5 mb-6 border-y border-line bg-bg/80 px-5 backdrop-blur-xl lg:hidden">
      <DialogRoot v-model:open="drawer">
        <DialogTrigger class="flex h-12 w-full items-center gap-2 text-sm">
          <PanelLeft class="size-4 text-fg-muted" />
          <span class="text-fg-muted">Docs</span>
          <ChevronRight class="size-3.5 text-fg-subtle" />
          <span class="truncate font-medium">{{ page?.title ?? 'Not found' }}</span>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay class="anim-overlay fixed inset-0 z-50 bg-bg/60 backdrop-blur-sm" />
          <DialogContent
            class="anim-drawer fixed inset-y-0 left-0 z-50 w-[min(22rem,88vw)] overflow-y-auto border-r border-line bg-bg-elevated p-4 pt-3 shadow-lg outline-none"
          >
            <div class="mb-4 flex h-12 items-center justify-between">
              <DialogTitle class="text-sm font-semibold">Documentation</DialogTitle>
              <DialogDescription class="sr-only">Browse documentation pages</DialogDescription>
              <DialogClose class="grid size-11 place-items-center rounded-full hover:bg-line" aria-label="Close">
                <X class="size-5" />
              </DialogClose>
            </div>
            <DocsSidebar :current="slug" @navigate="drawer = false" />
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>

    <div class="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem] xl:gap-14">
      <aside class="hidden lg:block">
        <div class="no-scrollbar sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
          <DocsSidebar :current="slug" />
        </div>
      </aside>

      <Transition name="page" mode="out-in">
        <article v-if="page" :key="page.slug" class="min-w-0 max-w-3xl">
          <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-caption text-fg-subtle">
            <RouterLink to="/docs" class="hover:text-fg">Docs</RouterLink>
            <ChevronRight class="size-3" />
            <span>{{ page.group }}</span>
          </nav>
          <h1 class="mt-3 text-h1 font-semibold text-gradient">{{ page.title }}</h1>
          <p class="mt-4 text-body-lg text-fg-muted">{{ page.description }}</p>
          <p v-if="page.updated" class="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-caption text-accent">
            Released {{ page.updated }}
          </p>

          <div class="mt-8 border-t border-line pt-2">
            <DocBlocks :blocks="page.blocks" />
          </div>

          <div class="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center">
            <Transition name="slide" mode="out-in">
              <p v-if="!feedback" key="ask" class="text-sm font-medium">Was this page helpful?</p>
              <p v-else key="thanks" class="flex items-center gap-3 text-sm text-fg-muted">
                <UiMascot :pose="feedback === 'yes' ? 'thanks' : 'face-thinking'" class="h-12 w-auto shrink-0 drop-shadow-none" />
                <span>{{ feedback === 'yes' ? 'Thanks — glad it helped!' : 'Thanks for telling us. We’ll improve this page.' }}
                <RouterLink v-if="feedback === 'no'" to="/support" class="ml-1 font-medium text-accent hover:underline">Contact support</RouterLink></span>
              </p>
            </Transition>
            <div v-if="!feedback" class="flex gap-2">
              <UiButton variant="secondary" size="sm" @click="feedback = 'yes'"><ThumbsUp class="size-4" /> Yes</UiButton>
              <UiButton variant="secondary" size="sm" @click="feedback = 'no'"><ThumbsDown class="size-4" /> No</UiButton>
            </div>
          </div>

          <nav class="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Pagination">
            <RouterLink
              v-if="prev"
              :to="`/docs/${prev.slug}`"
              class="group surface-card flex flex-col rounded-2xl p-4 transition-[border-color,transform] hover:border-line-strong active:scale-[0.99]"
            >
              <span class="inline-flex items-center gap-1 text-caption text-fg-subtle">
                <ArrowLeft class="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Previous
              </span>
              <span class="mt-1 font-medium">{{ prev.title }}</span>
            </RouterLink>
            <span v-else />
            <RouterLink
              v-if="next"
              :to="`/docs/${next.slug}`"
              class="group surface-card flex flex-col items-end rounded-2xl p-4 text-right transition-[border-color,transform] hover:border-line-strong active:scale-[0.99]"
            >
              <span class="inline-flex items-center gap-1 text-caption text-fg-subtle">
                Next <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span class="mt-1 font-medium">{{ next.title }}</span>
            </RouterLink>
          </nav>
        </article>

        <div v-else key="missing" class="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <UiMascot pose="face-surprised" anim="bob" class="h-24 w-auto" />
          <h1 class="mt-5 text-h2 font-semibold">This page doesn’t exist</h1>
          <p class="mt-2 max-w-sm text-fg-muted">It may have moved. Search the docs or start from the overview.</p>
          <UiButton to="/docs" class="mt-6">Go to docs overview</UiButton>
        </div>
      </Transition>

      <aside class="hidden xl:block">
        <div v-if="page" class="sticky top-28">
          <template v-if="toc.length">
            <p class="font-mono text-[0.6875rem] tracking-wider text-fg-subtle uppercase">On this page</p>
            <ul class="mt-3 space-y-1 border-l border-line">
              <li v-for="t in toc" :key="t.id">
                <a
                  :href="`#${t.id}`"
                  :class="[
                    '-ml-px block border-l py-1 pl-3 text-[0.8125rem] leading-snug transition-colors',
                    activeHeading === t.id ? 'border-accent text-fg' : 'border-transparent text-fg-subtle hover:text-fg',
                  ]"
                >
                  {{ t.text }}
                </a>
              </li>
            </ul>
          </template>
          <RouterLink
            to="/support"
            class="mt-8 flex items-center gap-2 rounded-xl border border-line p-3 text-caption text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <LifeBuoy class="size-4 text-accent" /> Still stuck? Contact support
          </RouterLink>
        </div>
      </aside>
    </div>
  </div>
</template>
