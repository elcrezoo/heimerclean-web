<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    href?: string
    to?: RouteLocationRaw
    type?: 'button' | 'submit'
    disabled?: boolean
    block?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
const bindings = computed(() =>
  props.to ? { to: props.to } : props.href ? { href: props.href } : { type: props.type, disabled: props.disabled },
)

const classes = computed(() => [
  'group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-tight',
  'transition-[transform,background-color,box-shadow,color,opacity] duration-200 ease-(--ease-spring)',
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
  {
    sm: 'h-9 min-w-9 px-3.5 text-sm',
    md: 'h-11 px-5 text-[0.9375rem]',
    lg: 'h-12 px-6 text-base',
  }[props.size],
  {
    primary:
      'bg-accent text-accent-fg hover:-translate-y-px hover:bg-accent-strong [box-shadow:0_1px_2px_rgb(26_6_43/0.2),0_8px_20px_-8px_color-mix(in_oklab,var(--accent)_70%,transparent),inset_0_1px_0_rgb(255_255_255/0.22)] hover:[box-shadow:0_1px_2px_rgb(26_6_43/0.2),0_14px_28px_-10px_color-mix(in_oklab,var(--accent)_80%,transparent),inset_0_1px_0_rgb(255_255_255/0.22)]',
    secondary: 'surface-card text-fg hover:border-line-strong hover:bg-surface-strong',
    ghost: 'text-fg-muted hover:bg-line hover:text-fg',
  }[props.variant],
  props.block && 'w-full',
])
</script>

<template>
  <component
    :is="tag"
    v-bind="bindings"
    :class="classes"
  >
    <span
      v-if="variant === 'primary'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
    />
    <slot />
  </component>
</template>
