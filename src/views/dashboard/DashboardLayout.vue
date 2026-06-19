<template>
  <div
    class="min-h-screen text-slate-200 relative overflow-x-hidden font-montserrat"
    style="background-color: #0a1520;"
  >
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 bottom-0 z-40 w-52 transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      style="background-color: #0f1e2e;"
    >
      <div class="h-full flex flex-col px-4 py-5">
        <!-- Logo -->
        <div class="mb-6 px-1">
          <div class="flex items-center gap-2.5">
            <img
              src="/src/assets/img/banco-universitario-website-favicon-color.png"
              alt="Banco Universitario"
              class="w-8 h-8 rounded-lg object-contain flex-shrink-0 bg-[#085f63]/15 p-[3px]"
            />
            <div>
              <span class="text-white block font-bold text-sm leading-tight">Banco</span>
              <span class="block text-xs font-normal leading-tight text-slate-400">Universitario</span>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <nav class="flex-1 overflow-y-auto">
          <div class="space-y-1">
            <button
              v-for="item in menuItems"
              :key="item.path"
              @click="navigate(item.path)"
              class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 min-w-0 focus:outline-none"
              :style="isActive(item.path)
                ? {
                    backgroundColor: 'rgba(8, 95, 99, 0.2)',
                    color: '#49beb7',
                    border: '1px solid rgba(8, 95, 99, 0.4)',
                  }
                : { color: '#cbd5e1' }"
              :class="!isActive(item.path) && 'hover:bg-[#1a2a38]'"
            >
              <component :is="item.icon" :size="17" class="flex-shrink-0" />
              <span class="text-xs truncate font-medium">{{ item.label }}</span>
            </button>
          </div>
        </nav>

        <!-- Bottom Actions -->
        <div class="pt-4 border-t border-[#1a2a38]/30 space-y-1">
          <button
            class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-[#1a2a38] transition-colors focus:outline-none"
            @click="navigate('/dashboard/profile')"
          >
            <Settings :size="17" class="flex-shrink-0" />
            <span class="text-xs truncate font-medium">Configuración</span>
          </button>
          <button
            class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-[#1a2a38] transition-colors focus:outline-none"
            @click="handleLogout"
          >
            <LogOut :size="17" class="flex-shrink-0" />
            <span class="text-xs truncate font-medium">Cerrar Sesión</span>
          </button>

          <!-- Brand footer -->
          <div
            class="mt-3 pt-3 flex items-center gap-2 justify-center border-t border-[#2a3a48]/30"
          >
            <img
              src="/src/assets/img/banco-universitario-website-favicon-color.png"
              alt="Banco Universitario"
              class="w-7 h-7 object-contain opacity-60"
            />
            <p class="text-[10px] text-slate-600 mb-0 font-semibold">
              BU v1.0
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main Content -->
    <main class="lg:ml-52 h-screen overflow-y-auto flex flex-col">
      <!-- Top Header -->
      <header
        class="sticky top-0 z-40 px-6 py-4 border-none"
        style="background-color: #0f1e2e;"
      >
        <div class="flex items-center justify-between">
          <!-- Left Section -->
          <div class="flex items-center gap-4 min-w-0">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden text-white hover:bg-[#1a2a38] p-2 rounded-lg flex-shrink-0 focus:outline-none"
            >
              <X v-if="sidebarOpen" :size="24" />
              <Menu v-else :size="24" />
            </button>

            <div>
              <h1 class="text-white font-bold text-2xl md:text-3xl leading-tight">
                {{ currentMeta.title }}
              </h1>
              <p class="text-xs md:text-sm mt-0.5 text-slate-400 mb-0">
                {{ currentMeta.subtitle }}
              </p>
            </div>
          </div>

          <!-- Right Section -->
          <div class="flex items-center gap-3">
            <!-- Notifications Dropdown -->
            <div class="relative" ref="notificationsContainer">
              <button
                class="relative text-white hover:bg-[#1a2a38] p-2 rounded-lg focus:outline-none transition-colors"
                @click="notificationsOpen = !notificationsOpen"
              >
                <Bell :size="20" />
                <span
                  class="absolute top-1 right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px] border-0 font-bold rounded-full text-white bg-blue-600"
                >
                  3
                </span>
              </button>

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 translate-y-2 scale-95"
              >
                <div
                  v-if="notificationsOpen"
                  class="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl overflow-hidden z-50 border-none"
                  style="background-color: #1a2a38;"
                >
                  <div
                    class="px-4 py-3 border-b border-[#2a3a48]/55 flex items-center justify-between"
                  >
                    <h3 class="font-bold text-sm text-white mb-0">Notificaciones</h3>
                    <button
                      class="text-xs font-semibold hover:underline text-bu-teal focus:outline-none"
                      @click="notificationsOpen = false"
                    >
                      Cerrar
                    </button>
                  </div>

                  <div class="max-h-[300px] overflow-y-auto">
                    <div
                      v-for="notification in notifications"
                      :key="notification.id"
                      class="px-4 py-3 border-b border-[#2a3a48]/40 hover:bg-[#0f1e2e]/50 cursor-pointer transition-colors"
                    >
                      <div class="flex items-start gap-3 min-w-0">
                        <div
                          class="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          :style="{ backgroundColor: notification.unread ? '#49beb7' : 'transparent' }"
                        />
                        <div class="flex-1 min-w-0">
                          <h4 class="text-xs font-bold text-white mb-1 break-words">
                            {{ notification.title }}
                          </h4>
                          <p class="text-[11px] text-slate-400 mb-1 break-words">
                            {{ notification.message }}
                          </p>
                          <p class="text-[9px] text-slate-500 mb-0">
                            {{ notification.time }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="px-4 py-2.5 text-center border-t border-[#2a3a48]/55"
                  >
                    <button
                      class="text-xs font-bold text-bu-teal hover:underline focus:outline-none"
                    >
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Profile Info dropdown trigger -->
            <div
              class="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-[#1a2a38]/30 min-w-0 cursor-pointer group"
              @click="navigate('/dashboard/profile')"
            >
              <div
                class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm bg-bu-teal shadow-md shadow-bu-teal/20"
              >
                {{ user.avatar }}
              </div>
              <div class="hidden xl:block min-w-0 max-w-[150px]">
                <p class="text-xs font-bold text-white truncate mb-0 group-hover:text-bu-teal transition-colors">
                  {{ user.name }}
                </p>
                <p class="text-[10px] text-slate-400 truncate mb-0">
                  {{ user.accountNumber }}
                </p>
              </div>
              <ChevronDown
                :size="16"
                class="flex-shrink-0 text-slate-400 group-hover:text-white transition-colors"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 p-6 md:p-8 pt-2">
        <router-view />
      </div>
    </main>

    <!-- Custom Premium Toast System -->
    <div class="fixed top-6 right-6 z-[100] space-y-3 pointer-events-none">
      <transition-group
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-10 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-10 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border border-[#2a3a48] max-w-sm"
          :style="toast.type === 'success' ? 'background-color: #0d2824; border-color: #174b43;' : 'background-color: #1a2a38; border-color: #2a3a48;'"
        >
          <div
            v-if="toast.type === 'success'"
            class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0"
          >
            ✓
          </div>
          <div
            v-else
            class="w-5 h-5 rounded-full bg-bu-teal/20 flex items-center justify-center text-bu-teal flex-shrink-0 font-bold"
          >
            i
          </div>
          <span class="text-xs font-semibold text-white">{{ toast.message }}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Home,
  Send,
  TrendingUp,
  Users,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  CreditCard,
  Settings
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(false)
const notificationsOpen = ref(false)
const notificationsContainer = ref(null)

const user = ref({
  name: 'Juan Pérez',
  email: 'juan.perez@universidad.edu',
  avatar: 'JP',
  accountNumber: '****1234'
})

const notifications = ref([
  {
    id: 1,
    title: 'Transferencia recibida',
    message: 'Has recibido Bs 500.00 de María González',
    time: 'Hace 5 min',
    unread: true,
    type: 'success'
  },
  {
    id: 2,
    title: 'Transferencia realizada',
    message: 'Tu transferencia a Carlos Rodríguez fue exitosa',
    time: 'Hace 2 horas',
    unread: true,
    type: 'info'
  },
  {
    id: 3,
    title: 'Nuevo movimiento',
    message: 'Se registró un nuevo débito en tu cuenta corriente',
    time: 'Hace 1 día',
    unread: true,
    type: 'warning'
  }
])

const menuItems = [
  { icon: Home, label: 'Inicio', path: '/dashboard' },
  { icon: Send, label: 'Transferencias', path: '/dashboard/transfers' },
  { icon: TrendingUp, label: 'Movimientos', path: '/dashboard/movements' },
  { icon: CreditCard, label: 'Tarjetas', path: '/dashboard/cards' },
  { icon: Users, label: 'Contactos', path: '/dashboard/contacts' },
  { icon: User, label: 'Perfil', path: '/dashboard/profile' }
]

const PAGE_META = {
  '/dashboard': {
    title: 'Bienvenido, Juan Pérez',
    subtitle: 'Aquí está el resumen de tus cuentas'
  },
  '/dashboard/transfers': {
    title: 'Transferencias',
    subtitle: 'Envía dinero de forma rápida y segura'
  },
  '/dashboard/movements': {
    title: 'Movimientos',
    subtitle: 'Consulta el historial de tus transacciones'
  },
  '/dashboard/cards': {
    title: 'Mis Tarjetas',
    subtitle: 'Gestiona tus tarjetas de débito y crédito'
  },
  '/dashboard/contacts': {
    title: 'Contactos Frecuentes',
    subtitle: 'Gestiona tus contactos para transferencias'
  },
  '/dashboard/profile': {
    title: 'Mi Perfil',
    subtitle: 'Gestiona tu información personal y seguridad'
  }
}

const currentMeta = computed(() => {
  return PAGE_META[route.path] || PAGE_META['/dashboard']
})

const isActive = (path) => {
  if (path === '/dashboard') {
    return route.path === path
  }
  return route.path.startsWith(path)
}

const navigate = (path) => {
  router.push(path)
  sidebarOpen.value = false
}

const handleLogout = () => {
  router.push('/')
}

// Simple Custom Toast System to pass down to children
const toasts = ref([])
let toastCount = 0

const addToast = (message, type = 'info') => {
  const id = ++toastCount
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, 4000)
}

provide('addToast', addToast)

const handleClickOutside = (event) => {
  if (
    notificationsContainer.value &&
    !notificationsContainer.value.contains(event.target)
  ) {
    notificationsOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
/* Scrollbar */
nav::-webkit-scrollbar {
  width: 4px;
}
nav::-webkit-scrollbar-track {
  background: transparent;
}
nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>
