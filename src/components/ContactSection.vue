<script setup lang="ts">
import UiMascot from '@/components/ui/UiMascot.vue'
import { ArrowRight, BookOpen, CircleCheck, Loader2, Phone } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'
import { computed, reactive, ref } from 'vue'
import { brand } from '@/data/site'
import FloatingField from './ui/FloatingField.vue'
import UiButton from './ui/UiButton.vue'
import UiReveal from './ui/UiReveal.vue'

type Field = 'name' | 'email' | 'message'

const form = reactive({ name: '', email: '', message: '' })
const touched = reactive<Record<Field, boolean>>({ name: false, email: false, message: false })
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const rules: Record<Field, (v: string) => string | undefined> = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your name.' : undefined),
  email: (v) =>
    !v.trim()
      ? 'We need an email to reply to you.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? 'That email looks incomplete — check for typos.'
        : undefined,
  message: (v) =>
    v.trim().length < 10 ? `A few more words, please (${Math.max(0, 10 - v.trim().length)} to go).` : undefined,
}

const errors = computed(() => {
  const out: Partial<Record<Field, string>> = {}
  for (const k of Object.keys(rules) as Field[]) if (touched[k]) out[k] = rules[k](form[k])
  return out
})
const isValid = (k: Field) => touched[k] && !rules[k](form[k])

async function submit() {
  ;(Object.keys(touched) as Field[]).forEach((k) => (touched[k] = true))
  if ((Object.keys(rules) as Field[]).some((k) => rules[k](form[k]))) return
  state.value = 'sending'
  try {
    // Mock transport — replace with your support endpoint.
    await new Promise((r) => setTimeout(r, 1200))
    state.value = 'sent'
  } catch {
    state.value = 'error'
  }
}

function reset() {
  Object.assign(form, { name: '', email: '', message: '' })
  Object.assign(touched, { name: false, email: false, message: false })
  state.value = 'idle'
}
</script>

<template>
  <section id="contact" class="py-24 md:py-36">
    <div class="container-page">
      <div class="surface-card overflow-hidden rounded-3xl">
        <div class="grid md:grid-cols-[0.9fr_1.1fr]">
          <UiReveal class="relative border-b border-line p-7 md:border-r md:border-b-0 md:p-12">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full opacity-70 blur-3xl"
              style="background: var(--accent-soft)"
            />
            <p class="relative font-mono text-caption tracking-wider text-accent uppercase">Support</p>
            <h2 class="relative mt-3 text-h2 font-semibold text-gradient text-balance">Talk to the Heimer Team.</h2>
            <p class="relative mt-4 max-w-sm text-body-lg text-fg-muted">
              Real people, 24/7. Tell us your app and Windows version and we'll take it from there.
            </p>
            <div class="relative mt-10 space-y-2">
              <a
                :href="brand.phoneHref"
                class="group flex min-h-14 items-center gap-4 rounded-xl border border-line bg-bg/50 px-4 transition-[border-color,transform] hover:border-line-strong active:scale-[0.99]"
              >
                <Phone class="size-4 text-fg-muted" />
                <span class="flex-1">
                  <span class="block text-caption text-fg-subtle">Call us</span>
                  <span class="block text-[0.9375rem] font-medium tabular-nums">{{ brand.phone }}</span>
                </span>
                <ArrowRight class="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
              </a>
              <RouterLink
                to="/docs"
                class="group flex min-h-14 items-center gap-4 rounded-xl border border-line bg-bg/50 px-4 transition-[border-color,transform] hover:border-line-strong active:scale-[0.99]"
              >
                <BookOpen class="size-4 text-fg-muted" />
                <span class="flex-1">
                  <span class="block text-caption text-fg-subtle">Self-serve</span>
                  <span class="block text-[0.9375rem] font-medium">Read the documentation</span>
                </span>
                <ArrowRight class="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5" />
              </RouterLink>
            </div>
          </UiReveal>

          <div class="relative p-7 md:p-12">
            <AnimatePresence mode="wait">
              <Motion
                v-if="state === 'sent'"
                key="sent"
                class="flex h-full min-h-96 flex-col items-center justify-center text-center"
                :initial="{ opacity: 0, scale: 0.96 }"
                :animate="{ opacity: 1, scale: 1 }"
                :exit="{ opacity: 0 }"
                :transition="{ type: 'spring', stiffness: 200, damping: 22 }"
              >
                <Motion
                  class="relative"
                  :initial="{ scale: 0.4, y: 30, opacity: 0 }"
                  :animate="{ scale: 1, y: 0, opacity: 1 }"
                  :transition="{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }"
                >
                  <div aria-hidden="true" class="absolute inset-2 rounded-full bg-sun-soft blur-xl" />
                  <UiMascot pose="done" anim="bob" alt="" class="relative h-36 w-auto" />
                  <span class="absolute -right-1 bottom-4 grid size-9 place-items-center rounded-full border-4 border-bg-elevated bg-success">
                    <CircleCheck class="size-4 text-white" />
                  </span>
                </Motion>
                <h3 class="mt-6 text-h3 font-semibold">Message received, {{ form.name.split(' ')[0] }}.</h3>
                <p class="mt-2 max-w-xs text-[0.9375rem] text-fg-muted">
                  We'll reply to <span class="text-fg">{{ form.email }}</span> — usually within a few hours.
                </p>
                <UiButton variant="ghost" size="sm" class="mt-6" @click="reset">Send another message</UiButton>
              </Motion>

              <Motion
                v-else
                key="form"
                as="form"
                novalidate
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :exit="{ opacity: 0, scale: 0.98 }"
                @submit.prevent="submit"
              >
                <div class="grid gap-x-4 sm:grid-cols-2">
                  <FloatingField
                    v-model="form.name"
                    name="name"
                    label="Your name"
                    autocomplete="name"
                    :error="errors.name"
                    :valid="isValid('name')"
                    @blur="touched.name = true"
                  />
                  <FloatingField
                    v-model="form.email"
                    name="email"
                    type="email"
                    inputmode="email"
                    label="Email address"
                    autocomplete="email"
                    :error="errors.email"
                    :valid="isValid('email')"
                    @blur="touched.email = true"
                  />
                </div>
                <FloatingField
                  v-model="form.message"
                  name="message"
                  label="How can we help?"
                  multiline
                  hint="Include your app version and Windows version if it's a technical issue."
                  :error="errors.message"
                  :valid="isValid('message')"
                  @blur="touched.message = true"
                />
                <p v-if="state === 'error'" role="alert" class="mb-4 text-caption text-danger">
                  Something went wrong sending your message. Please try again or call us.
                </p>
                <div class="mt-2 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-caption text-fg-subtle">Never include passwords or card details.</p>
                  <UiButton type="submit" :disabled="state === 'sending'" class="sm:min-w-40">
                    <Loader2 v-if="state === 'sending'" class="size-4 animate-spin" />
                    {{ state === 'sending' ? 'Sending…' : 'Send message' }}
                  </UiButton>
                </div>
              </Motion>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
