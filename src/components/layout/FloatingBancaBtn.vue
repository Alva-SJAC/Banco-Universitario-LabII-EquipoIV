<template>
  <div class="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-3 scale-95"
    >
      <div v-if="isOpen" class="flex flex-col items-end gap-3">
        <button
          type="button"
          class="min-w-[170px] bg-bu-teal text-white px-5 py-3 rounded-full font-bold text-sm shadow-xl shadow-bu-teal/30 flex items-center justify-center gap-3 hover:bg-bu-teal-dark transition-all"
          @click="openAuthModal"
        >
          <LogIn :size="18" />
          Banca en Línea
        </button>

        <RouterLink
          to="/registro"
          class="min-w-[170px] bg-white text-bu-navy-deep px-5 py-3 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-3 hover:text-bu-teal transition-all no-underline"
          @click="isOpen = false"
        >
          <UserPlus :size="18" class="text-bu-teal" />
          Registrarse
        </RouterLink>
      </div>
    </Transition>

    <button
      type="button"
      title="Accesos rápidos"
      class="w-16 h-16 bg-bu-teal text-white rounded-full flex items-center justify-center shadow-[0_5px_20px_rgba(73,190,183,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
      @click="isOpen = !isOpen"
    >
      <Transition
        mode="out-in"
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-75 rotate-45"
        enter-to-class="opacity-100 scale-100 rotate-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 rotate-0"
        leave-to-class="opacity-0 scale-75 -rotate-45"
      >
        <Monitor v-if="!isOpen" key="monitor" :size="26" />
        <Plus v-else key="plus" :size="30" />
      </Transition>
    </button>
  </div>

  <AuthModal v-model="isAuthModalOpen" />
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { LogIn, Monitor, Plus, UserPlus } from 'lucide-vue-next'
import AuthModal from '../auth/AuthModal.vue'

const isOpen = ref(false)
const isAuthModalOpen = ref(false)

const openAuthModal = () => {
  isOpen.value = false
  isAuthModalOpen.value = true
}
</script>