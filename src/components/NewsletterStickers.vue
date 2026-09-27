<script setup lang="ts">
import { ArrowRight, Hand, Loader2 } from 'lucide-vue-next'
import { Motion } from 'motion-v'
import { computed, reactive, ref } from 'vue'

const board = ref<HTMLElement>()

const stickers = [
  { src: 'hello', w: 239, h: 240, cls: 'left-[3%] top-4 md:left-[4%] md:top-8', rot: -8 },
  { src: 'lets-clean', w: 237, h: 240, cls: 'right-[3%] top-3 md:right-[5%] md:top-6', rot: 7 },
  { src: 'gg', w: 240, h: 225, cls: 'left-[4%] bottom-3 md:left-[13%] md:bottom-6', rot: 6 },
  { src: 'idea', w: 209, h: 240, cls: 'right-[4%] bottom-3 md:right-[14%] md:bottom-5', rot: -6 },
  { src: 'secure', w: 217, h: 240, cls: 'hidden md:block md:left-[20%] md:top-3', rot: 4, sm: true },
  { src: 'love', w: 197, h: 240, cls: 'hidden md:block md:right-[21%] md:top-2', rot: -5, sm: true },
  { src: 'optimizing', w: 240, h: 238, cls: 'hidden lg:block lg:left-[1%] lg:top-[42%]', rot: -3, sm: true },
  { src: 'super', w: 213, h: 240, cls: 'hidden lg:block lg:right-[1%] lg:top-[40%]', rot: 5, sm: true },
]

const email = ref('')
const touched = ref(false)
const state = ref<'idle' | 'sending' | 'done'>('idle')
const valid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
const error = computed(() => (touched.value && !valid.value ? (email.value ? 'Enter a valid email address.' : 'Email is required.') : ''))

const dragged = reactive(new Set<string>())

async function submit() {
  touched.value = true
  if (!valid.value) return
  state.value = 'sending'
  await new Promise((r) => setTimeout(r, 900))
  state.value = 'done'
}
</script>

<template>
  <div
    ref="board"
    class="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface-strong px-5 py-32 shadow-md md:px-10 md:py-20"
  >
    <div aria-hidden="true" class="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000,transparent)]" />
    <div
      aria-hidden="true"
      class="absolute top-1/2 left-1/2 -z-10 h-72 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      style="background: radial-gradient(closest-side, var(--accent-soft), transparent), radial-gradient(closest-side at 70% 60%, var(--tr-b-soft), transparent), radial-gradient(closest-side at 25% 30%, var(--tr-a-soft), transparent)"
    />

    <Motion
      v-for="(s, i) in stickers"
      :key="s.src"
      drag
      :drag-constraints="board"
      :drag-elastic="0.18"
      :initial="{ opacity: 0, scale: 0.4, rotate: 0 }"
      :while-in-view="{ opacity: 1, scale: 1, rotate: s.rot }"
      :in-view-options="{ once: true }"
      :while-hover="{ scale: 1.08, rotate: s.rot * -0.6 }"
      :while-drag="{ scale: 1.15, rotate: 0, zIndex: 20 }"
      :transition="{ type: 'spring', stiffness: 260, damping: 16, delay: 0.05 * i }"
      :class="['absolute z-10 cursor-grab touch-none active:cursor-grabbing', s.cls]"
      @drag-start="dragged.add(s.src)"
    >
      <img
        :src="$asset(`/images/stickers/${s.src}.webp`)"
        alt=""
        :width="s.w"
        :height="s.h"
        loading="lazy"
        draggable="false"
        :class="[
          'pointer-events-none w-auto select-none drop-shadow-[0_10px_18px_rgb(26_6_43/0.22)]',
          s.sm ? 'h-20 lg:h-24' : 'h-[4.5rem] md:h-28',
        ]"
      />
    </Motion>

    <div class="relative z-0 mx-auto max-w-md text-center">
      <h2 class="text-h2 font-semibold text-gradient">Subscribe to know first</h2>
      <p class="mt-3 text-[0.9375rem] text-fg-muted">
        Only the best news will arrive in your smart mailbox — launch offers, new features and tips from Heimer.
      </p>

      <Transition name="pop" mode="out-in">
        <div v-if="state === 'done'" key="done" class="mt-7 inline-flex items-center gap-3 rounded-2xl bg-success/10 py-2 pr-5 pl-2 text-left" role="status">
          <img :src="$asset('/images/stickers/completed.webp')" alt="" width="240" height="232" class="h-14 w-auto" />
          <span>
            <span class="block text-sm font-semibold">You're on the list!</span>
            <span class="block text-caption text-fg-muted">Watch {{ email }} for our next update.</span>
          </span>
        </div>
        <form v-else key="form" novalidate class="mt-7 text-left" @submit.prevent="submit">
          <div class="flex flex-col gap-2 sm:flex-row">
            <label class="relative flex-1">
              <span class="sr-only">Email address</span>
              <input
                v-model="email"
                type="email"
                autocomplete="email"
                inputmode="email"
                placeholder="Enter your email address"
                :aria-invalid="!!error"
                aria-describedby="newsletter-error"
                :class="[
                  'h-12 w-full rounded-full border bg-bg px-5 text-[0.9375rem] outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle',
                  error
                    ? 'border-danger focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--danger)_18%,transparent)]'
                    : 'border-line-strong focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]',
                ]"
                @blur="touched = !!email || touched"
              />
            </label>
            <button
              type="submit"
              :disabled="state === 'sending'"
              class="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg shadow-md transition-[transform,background-color] hover:bg-accent-strong active:scale-[0.97] disabled:opacity-70"
            >
              <Loader2 v-if="state === 'sending'" class="size-4 animate-spin" />
              <template v-else>Subscribe <ArrowRight class="size-4" /></template>
            </button>
          </div>
          <Transition name="slide">
            <p v-if="error" id="newsletter-error" class="mt-2 pl-5 text-caption text-danger">{{ error }}</p>
          </Transition>
          <p class="mt-3 text-center text-caption text-fg-subtle">No spam. Unsubscribe in one click.</p>
        </form>
      </Transition>

      <Transition name="slide">
        <p v-if="dragged.size === 0" class="mt-5 hidden items-center justify-center gap-1.5 text-caption text-fg-subtle md:flex">
          <Hand class="size-3.5" /> Psst — the stickers are draggable.
        </p>
      </Transition>
    </div>
  </div>
</template>
