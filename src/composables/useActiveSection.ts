import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useActiveSection(ids: string[]) {
  const active = ref<string | null>(null)
  const route = useRoute()
  let observer: IntersectionObserver | undefined
  let timer: ReturnType<typeof setTimeout> | undefined

  function observe() {
    observer?.disconnect()
    active.value = null
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
          else if (active.value === entry.target.id) active.value = null
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer!.observe(el)
    })
  }

  // Page transitions mount the new page after a short delay, so wait before observing.
  watch(
    () => route.path,
    () => {
      clearTimeout(timer)
      timer = setTimeout(observe, 450)
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    clearTimeout(timer)
    observer?.disconnect()
  })
  return active
}
