<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 bg-white',
      isScrolled ? 'shadow-md border-b border-gray-100 py-2' : 'border-b border-transparent'
    ]"
  >
    <div class="bu-container flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="no-underline">
        <BancoLogo />
      </router-link>

      <!-- Menú Escritorio -->
      <div class="hidden lg:flex items-center gap-12">
        <ul class="flex items-center gap-8 list-none m-0 p-0 font-medium text-[0.85rem]">
          <li v-for="link in navLinks" :key="link.name">
            <a 
              :href="link.href" 
              class="text-slate-600 hover:text-bu-teal no-underline transition-colors tracking-wide"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>

        <!-- Botones de Acción -->
        <div class="flex items-center gap-4">
          <button class="border-2 border-bu-teal text-bu-teal px-7 py-2 rounded-full font-bold text-xs hover:bg-bu-teal hover:text-white transition-all duration-300">
            Banca en Línea
          </button>
          <button class="bg-bu-teal text-white px-7 py-2 rounded-full font-bold text-xs hover:bg-bu-teal-dark shadow-md shadow-bu-teal/20 transition-all duration-300">
            Registrarse
          </button>
        </div>
      </div>

      <!-- Botón Menú Móvil -->
      <button 
        @click="isMenuOpen = !isMenuOpen" 
        class="lg:hidden text-bu-teal p-2 focus:outline-none"
      >
        <Menu v-if="!isMenuOpen" :size="28" />
        <X v-else :size="28" />
      </button>
    </div>

    <!-- Menú Desplegable Móvil -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="lg:hidden bg-white border-t border-gray-100 shadow-2xl absolute top-full left-0 w-full p-8 z-50">
        <ul class="flex flex-col gap-8 list-none m-0 p-0 font-semibold text-lg mb-10">
          <li v-for="link in navLinks" :key="link.name">
            <a 
              :href="link.href" 
              @click="isMenuOpen = false"
              class="text-bu-navy block no-underline hover:text-bu-teal transition-colors"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
        <div class="flex flex-col gap-4">
          <button class="w-full border-2 border-bu-teal text-bu-teal py-3 rounded-full font-bold text-sm">
            Banca en Línea
          </button>
          <button class="w-full bg-bu-teal text-white py-3 rounded-full font-bold text-sm shadow-lg shadow-bu-teal/20">
            Registrarse
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import BancoLogo from '../ui/BancoLogo.vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Quiénes Somos', href: '#nosotros' },
  { name: 'Productos', href: '#productos' },
  { name: 'Contacto', href: '#contacto' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
