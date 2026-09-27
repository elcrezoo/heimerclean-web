<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { Download, Menu, Moon, Sun, X } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'
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
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useActiveSection } from '@/composables/useActiveSection'
import { useTheme } from '@/composables/useTheme'
import { navLinks } from '@/data/site'
import BrandLogo from './BrandLogo.vue'
import LanguageSelect from './LanguageSelect.vue'
import UiButton from './ui/UiButton.vue'

const { y } = useWindowScroll()
const route = useRoute()
const isHome = computed(() => route.path === '/')
const scrolled = computed(() => y.value > 12 || !isHome.value)
const ctaPrimary = computed(() => !isHome.value || y.value > 560)
const { isDark, toggle } = useTheme()
const menuOpen = ref(false)
const hovered = ref<string | null>(null)

const sectionIds = navLinks.filter((l) => l.to.startsWith('/#')).map((l) => l.to.slice(2))
const activeSection = useActiveSection(sectionIds)

function isActive(to: string) {
  if (to.startsWith('/#')) return isHome.value && activeSection.value === to.slice(2)
  return route.path.startsWith(to)
}
const highlighted = computed(() => hovered.value ?? navLinks.find((l) => isActive(l.to))?.to ?? null)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4">
    <div
      :class="[
        'mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border pr-2 pl-3 transition-all duration-500 ease-(--ease-spring)',
        scrolled
          ? 'border-line bg-surface shadow-md backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-transparent',
      ]"
    >
      <BrandLogo />

      <nav class="hidden md:block" aria-label="Primary">
        <ul class="flex items-center" @mouseleave="hovered = null">
          <li v-for="link in navLinks" :key="link.to" class="relative">
            <RouterLink
              :to="link.to"
              :aria-current="isActive(link.to) ? 'page' : undefined"
              :class="[
                'relative z-10 inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-sm transition-colors duration-200',
                highlighted === link.to ? 'text-fg' : 'text-fg-muted hover:text-fg',
              ]"
              @mouseenter="hovered = link.to"
            >
              {{ link.label }}
            </RouterLink>
            <Motion
              v-if="highlighted === link.to"
              layout-id="nav-pill"
              class="absolute inset-0 rounded-full bg-line"
              :transition="{ type: 'spring', stiffness: 400, damping: 32 }"
            />
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-0.5 md:gap-1">
        <LanguageSelect compact />
        <button
          type="button"
          class="grid size-11 place-items-center rounded-full text-fg-muted transition-[color,background-color,transform] hover:bg-line hover:text-fg active:scale-90"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <AnimatePresence mode="wait" :initial="false">
            <Motion
              :key="isDark ? 'moon' : 'sun'"
              :initial="{ rotate: -90, scale: 0.5, opacity: 0 }"
              :animate="{ rotate: 0, scale: 1, opacity: 1 }"
              :exit="{ rotate: 90, scale: 0.5, opacity: 0 }"
              :transition="{ duration: 0.2 }"
            >
              <Moon v-if="isDark" class="size-[18px]" />
              <Sun v-else class="size-[18px]" />
            </Motion>
          </AnimatePresence>
        </button>

        <div class="hidden md:block">
          <UiButton
            to="/download"
            size="sm"
            :variant="ctaPrimary ? 'primary' : 'secondary'"
            class="ml-1"
          >
            <Download class="size-4" />
            Download
          </UiButton>
        </div>

        <DialogRoot v-model:open="menuOpen">
          <DialogTrigger
            class="grid size-11 place-items-center rounded-full text-fg transition-[background-color,transform] hover:bg-line active:scale-90 md:hidden"
            aria-label="Open menu"
          >
            <Menu class="size-5" />
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay class="anim-overlay fixed inset-0 z-50 bg-bg/60 backdrop-blur-sm" />
            <DialogContent
              class="anim-sheet surface-card fixed inset-x-3 top-3 z-50 rounded-3xl bg-surface-strong! p-3 shadow-lg outline-none"
            >
              <div class="flex h-12 items-center justify-between pl-2">
                <DialogTitle class="text-sm font-semibold tracking-tight">Menu</DialogTitle>
                <DialogDescription class="sr-only">Site navigation</DialogDescription>
                <DialogClose
                  class="grid size-11 place-items-center rounded-full hover:bg-line active:scale-90"
                  aria-label="Close menu"
                >
                  <X class="size-5" />
                </DialogClose>
              </div>
              <nav class="mt-1" aria-label="Mobile">
                <ul>
                  <li v-for="(link, i) in navLinks" :key="link.to">
                    <Motion
                      :initial="{ opacity: 0, x: -8 }"
                      :animate="{ opacity: 1, x: 0 }"
                      :transition="{ delay: 0.04 * i + 0.05, type: 'spring', stiffness: 300, damping: 26 }"
                    >
                      <RouterLink
                        :to="link.to"
                        :class="[
                          'flex min-h-13 items-center justify-between rounded-xl px-3 text-lg font-medium tracking-tight active:bg-line',
                          isActive(link.to) ? 'bg-line text-fg' : '',
                        ]"
                        @click="menuOpen = false"
                      >
                        {{ link.label }}
                      </RouterLink>
                    </Motion>
                  </li>
                </ul>
              </nav>
              <div class="mt-3 flex items-center justify-between gap-3 border-t border-line px-3 pt-3">
                <span class="text-sm text-fg-muted">Language</span>
                <LanguageSelect />
              </div>
              <div class="mt-3">
                <UiButton to="/download" size="lg" block @click="menuOpen = false">
                  <Download class="size-4" />
                  Download for Windows
                </UiButton>
              </div>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </div>
  </header>
</template>
