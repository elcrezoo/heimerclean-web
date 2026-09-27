<script setup lang="ts">
import { MotionConfig } from 'motion-v'
import { onMounted } from 'vue'
import HelpAssistant from './components/HelpAssistant.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import { initTranslate } from './composables/useTranslate'

onMounted(initTranslate)
</script>

<template>
  <MotionConfig reduced-motion="user">
    <a
      href="#main"
      class="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm text-bg transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
    <SiteHeader />
    <main id="main" class="min-h-[70vh]">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.name === 'docs' || route.name === 'legal' ? String(route.name) : route.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <HelpAssistant />
    <div id="google_translate_element" aria-hidden="true" />
  </MotionConfig>
</template>
