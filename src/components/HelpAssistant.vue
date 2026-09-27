<script setup lang="ts">
import { useSessionStorage, useTimeoutFn } from '@vueuse/core'
import { BookOpen, Download, LifeBuoy, Phone, X } from 'lucide-vue-next'
import { PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { brand } from '@/data/site'
import UiMascot from './ui/UiMascot.vue'

const route = useRoute()
const open = ref(false)
const ready = ref(false)
const bubble = ref(false)
const greeted = useSessionStorage('hc-assistant-greeted', false)

useTimeoutFn(() => (ready.value = true), 1200)
useTimeoutFn(() => {
  if (greeted.value) return
  bubble.value = true
  useTimeoutFn(() => (bubble.value = false), 6500)
}, 3200)

watch(open, (v) => {
  if (v) {
    bubble.value = false
    greeted.value = true
  }
})

function dismissBubble() {
  bubble.value = false
  greeted.value = true
}

const position = computed(() =>
  route.path === '/store'
    ? 'bottom-[calc(6rem+env(safe-area-inset-bottom))] lg:bottom-6'
    : 'bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-6',
)

const links = [
  { to: '/docs', icon: BookOpen, title: 'Browse the docs', sub: 'Setup, optimizer, billing' },
  { to: '/support', icon: LifeBuoy, title: 'Contact support', sub: 'Usually replies within a few hours' },
  { to: '/download', icon: Download, title: 'Download HeimerClean', sub: `v${brand.version} · free for 30 days` },
]
</script>

<template>
  <Transition name="pop">
    <div v-if="ready" class="fixed right-3 z-40 flex items-end gap-2 md:right-6" :class="position">
      <Transition name="toast">
        <div
          v-if="bubble && !open"
          class="surface-card relative mb-3 hidden max-w-[12rem] rounded-2xl rounded-br-md py-2.5 pr-8 pl-3.5 shadow-lg min-[380px]:block"
        >
          <p class="text-sm font-semibold tracking-tight">Need help?</p>
          <p class="text-caption text-fg-muted">I'm here — ask me anything.</p>
          <button
            type="button"
            class="absolute top-0 right-0 grid size-9 place-items-center rounded-full text-fg-subtle transition-colors hover:text-fg"
            aria-label="Dismiss"
            @click="dismissBubble"
          >
            <X class="size-3.5" />
          </button>
        </div>
      </Transition>

      <PopoverRoot v-model:open="open">
        <PopoverTrigger
          class="group relative grid size-14 place-items-center rounded-full border border-line bg-surface-strong shadow-lg transition-transform duration-200 ease-(--ease-spring) hover:scale-105 active:scale-[0.94] md:size-16"
          :aria-label="open ? 'Close help' : 'Open help'"
        >
          <span aria-hidden="true" class="absolute inset-0 rounded-full bg-accent/25 opacity-0 group-data-[state=closed]:animate-ping group-data-[state=closed]:[animation-iteration-count:3] group-data-[state=closed]:opacity-60" />
          <span class="absolute inset-0 overflow-hidden rounded-full bg-linear-to-b from-accent-soft to-transparent">
            <UiMascot pose="support" class="absolute -bottom-1 left-1/2 w-[118%] max-w-none -translate-x-1/2 drop-shadow-none" />
          </span>
          <span
            aria-hidden="true"
            class="absolute top-0.5 right-0.5 size-3 rounded-full border-2 border-surface-strong bg-success"
          />
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent
            side="top"
            align="end"
            :side-offset="12"
            :collision-padding="12"
            class="anim-sheet surface-card z-50 w-[min(20rem,calc(100vw-1.5rem))] origin-bottom-right rounded-3xl bg-surface-strong! p-2 shadow-lg outline-none"
          >
            <div class="flex items-center gap-3 rounded-2xl bg-transition-soft p-3">
              <UiMascot pose="wave" anim="wave" class="h-16 w-auto drop-shadow-none" />
              <div class="min-w-0">
                <p class="font-semibold tracking-tight">Hi, I'm Heimer!</p>
                <p class="text-caption text-fg-muted">How can I help you today?</p>
              </div>
              <PopoverClose
                class="ml-auto grid size-11 shrink-0 place-items-center self-start rounded-full text-fg-subtle transition-colors hover:bg-bg/60 hover:text-fg"
                aria-label="Close help"
              >
                <X class="size-4" />
              </PopoverClose>
            </div>
            <ul class="mt-1">
              <li v-for="l in links" :key="l.to">
                <RouterLink
                  :to="l.to"
                  class="flex min-h-14 items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-accent-soft active:scale-[0.98]"
                  @click="open = false"
                >
                  <span class="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent">
                    <component :is="l.icon" class="size-4" />
                  </span>
                  <span class="min-w-0">
                    <span class="block text-sm font-medium tracking-tight">{{ l.title }}</span>
                    <span class="block truncate text-caption text-fg-subtle">{{ l.sub }}</span>
                  </span>
                </RouterLink>
              </li>
              <li>
                <a
                  :href="brand.phoneHref"
                  class="flex min-h-14 items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-accent-soft active:scale-[0.98]"
                >
                  <span class="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent">
                    <Phone class="size-4" />
                  </span>
                  <span class="min-w-0">
                    <span class="block text-sm font-medium tracking-tight">Call {{ brand.phone }}</span>
                    <span class="block truncate text-caption text-fg-subtle">Talk to a real person</span>
                  </span>
                </a>
              </li>
            </ul>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  </Transition>
</template>
