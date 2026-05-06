<template>
  <div class="fixed bottom-8 right-8 z-[60] flex items-center group">
    <!-- Etiqueta pegada al botón -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-2"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-2"
    >
      <div 
        v-if="isHovered" 
        class="bg-[#0f4a58] text-white px-4 py-2.5 rounded-l-xl font-bold text-[0.8rem] shadow-xl border-y border-l border-white/10 whitespace-nowrap -mr-2 pr-6"
      >
        Banca en Línea
      </div>
    </Transition>

    <!-- Botón Circular -->
    <button 
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      title="Banca en Línea"
      class="w-16 h-16 bg-bu-teal text-white rounded-full flex items-center justify-center shadow-[0_5px_20px_rgba(73,190,183,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 z-10"
    >
      <Monitor :size="26" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Monitor } from 'lucide-vue-next'

const isHovered = ref(false)
</script>
