<script setup lang="ts">
import { Check, ChevronDown, Globe, Loader2 } from 'lucide-vue-next'
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'
import { computed } from 'vue'
import { useTranslate } from '@/composables/useTranslate'
import type { LanguageCode } from '@/data/social'

const props = withDefaults(defineProps<{ compact?: boolean; side?: 'top' | 'bottom' }>(), {
  compact: false,
  side: 'bottom',
})

const { current, status, setLanguage, languages } = useTranslate()
const active = computed(() => languages.find((l) => l.code === current.value) ?? languages[0])
const model = computed({
  get: () => current.value as string,
  set: (v: string) => setLanguage(v as LanguageCode),
})
</script>

<template>
  <DropdownMenuRoot :modal="false">
    <DropdownMenuTrigger
      translate="no"
      :aria-label="`Language: ${active.native}. Change language`"
      :class="[
        'notranslate group inline-flex items-center gap-2 rounded-full text-sm transition-[background-color,border-color,transform] active:scale-[0.97]',
        props.compact
          ? 'size-11 justify-center text-fg-muted hover:bg-line hover:text-fg'
          : 'surface-card h-11 pr-3 pl-3.5 font-medium hover:border-line-strong',
      ]"
    >
      <Loader2 v-if="status === 'loading'" class="size-4 animate-spin text-accent" />
      <Globe v-else class="size-4" :class="props.compact ? '' : 'text-accent'" />
      <template v-if="!props.compact">
        <span>{{ active.native }}</span>
        <ChevronDown class="size-4 text-fg-subtle transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </template>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        translate="no"
        :side="props.side"
        align="end"
        :side-offset="8"
        :collision-padding="12"
        class="notranslate anim-sheet surface-card z-[60] flex max-h-(--reka-dropdown-menu-content-available-height) w-64 flex-col rounded-2xl bg-surface-strong! p-1.5 shadow-lg outline-none"
      >
        <p class="px-3 pt-2 pb-1.5 text-caption text-fg-subtle">Choose language</p>
        <DropdownMenuRadioGroup v-model="model" class="grid min-h-0 max-h-[min(22rem,60vh)] grid-cols-1 overflow-y-auto overscroll-contain">
          <DropdownMenuRadioItem
            v-for="l in languages"
            :key="l.code"
            :value="l.code"
            class="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm outline-none transition-colors data-highlighted:bg-accent-soft data-[state=checked]:font-medium"
          >
            <span class="w-9 font-mono text-[0.6875rem] tracking-wide text-fg-subtle uppercase">{{ l.code.slice(0, 2) }}</span>
            <span class="flex-1">{{ l.native }}</span>
            <Check v-if="current === l.code" class="size-4 text-accent" />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <p class="mt-1 border-t border-line px-3 pt-2 pb-1.5 text-[0.6875rem] text-fg-subtle">
          <template v-if="status === 'error'">Translation is unavailable right now.</template>
          <template v-else>Machine translation by Google Translate</template>
        </p>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
