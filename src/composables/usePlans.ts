import { onMounted, ref, shallowRef } from 'vue'
import { plans as seed, type Plan } from '@/data/site'

// Stands in for a store/pricing API; append ?pricing=error to the URL to preview the error state.
function fetchPlans(): Promise<Plan[]> {
  const fail = new URLSearchParams(location.search).get('pricing') === 'error'
  return new Promise((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error('Pricing unavailable')) : resolve(seed)), 900),
  )
}

export function usePlans() {
  const plans = shallowRef<Plan[]>([])
  const status = ref<'loading' | 'ready' | 'error'>('loading')

  async function load() {
    status.value = 'loading'
    try {
      plans.value = await fetchPlans()
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  onMounted(load)
  return { plans, status, reload: load }
}
