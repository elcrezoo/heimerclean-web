<template>
  <RouterLink to="/" class="group inline-flex h-11 items-center gap-2 rounded-lg" aria-label="HeimerClean home">
    <span class="relative block size-9 shrink-0 transition-transform duration-300 ease-(--ease-spring) group-hover:-rotate-6 group-hover:scale-105 group-active:scale-95">
      <img
        :src="$asset('/images/mascot/face-excited.webp')"
        alt=""
        width="229"
        height="256"
        class="absolute inset-0 size-full object-contain drop-shadow-[0_2px_6px_rgb(26_6_43/0.25)] transition-opacity duration-150 group-hover:opacity-0"
      />
      <img
        :src="$asset('/images/mascot/face-wink.webp')"
        alt=""
        width="229"
        height="256"
        loading="lazy"
        class="absolute inset-0 size-full object-contain opacity-0 drop-shadow-[0_2px_6px_rgb(26_6_43/0.25)] transition-opacity duration-150 group-hover:opacity-100"
      />
    </span>
    <span translate="no" class="notranslate relative text-[1.0625rem] font-bold tracking-[-0.04em]">
      Heimer<span class="text-accent-gradient">Clean</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        class="absolute -top-1.5 -right-3 size-2.5 fill-accent transition-transform duration-500 ease-(--ease-spring) group-hover:rotate-90 group-hover:scale-125"
      >
        <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
      </svg>
    </span>
  </RouterLink>
</template>
