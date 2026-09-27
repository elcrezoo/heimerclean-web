<script setup lang="ts">
import { CircleAlert, CircleCheck } from 'lucide-vue-next'
import { computed, useId } from 'vue'

const model = defineModel<string>({ required: true })

const props = defineProps<{
  label: string
  name: string
  type?: string
  autocomplete?: string
  inputmode?: 'text' | 'email' | 'tel'
  multiline?: boolean
  error?: string
  valid?: boolean
  hint?: string
}>()

const emit = defineEmits<{ blur: [] }>()
const id = useId()

const shared = computed(() => ({
  name: props.name,
  autocomplete: props.autocomplete,
  inputmode: props.inputmode,
  placeholder: ' ',
  'aria-invalid': !!props.error,
  'aria-describedby': props.error ? `${id}-err` : props.hint ? `${id}-hint` : undefined,
}))
</script>

<template>
  <div>
    <div
      :class="[
        'group relative rounded-xl border bg-surface-strong transition-[border-color,box-shadow] duration-200',
        error
          ? 'border-danger/60 shadow-[0_0_0_4px_color-mix(in_oklab,var(--danger)_14%,transparent)]'
          : 'border-line-strong focus-within:border-accent focus-within:shadow-[0_0_0_4px_var(--accent-soft)]',
      ]"
    >
      <textarea
        v-if="multiline"
        :id="id"
        v-model="model"
        v-bind="shared"
        rows="4"
        class="peer block min-h-32 w-full resize-none bg-transparent px-4 pt-7 pr-11 pb-3 text-[0.9375rem] text-fg placeholder:text-transparent"
        style="outline: none"
        @blur="emit('blur')"
      />
      <input
        v-else
        :id="id"
        v-model="model"
        v-bind="shared"
        :type="type ?? 'text'"
        class="peer block h-14 w-full bg-transparent px-4 pt-5 pr-11 text-[0.9375rem] text-fg placeholder:text-transparent"
        style="outline: none"
        @blur="emit('blur')"
      />
      <label
        :for="id"
        class="pointer-events-none absolute top-4 left-4 origin-left text-[0.9375rem] text-fg-subtle transition-all duration-200 ease-(--ease-spring) peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {{ label }}
      </label>
      <div class="pointer-events-none absolute top-4 right-4">
        <Transition name="pop" mode="out-in">
          <CircleAlert v-if="error" key="err" class="size-5 text-danger" />
          <CircleCheck v-else-if="valid" key="ok" class="size-5 text-success" />
        </Transition>
      </div>
    </div>
    <div class="min-h-6 px-1 pt-1.5">
      <Transition name="slide" mode="out-in">
        <p v-if="error" :id="`${id}-err`" key="e" role="alert" class="text-caption text-danger">{{ error }}</p>
        <p v-else-if="hint" :id="`${id}-hint`" key="h" class="text-caption text-fg-subtle">{{ hint }}</p>
      </Transition>
    </div>
  </div>
</template>
