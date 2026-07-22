<template>
  <div class="settings-container text-white space-y-6">
    <!-- Card Superior de Perfil -->
    <div 
      class="p-6 rounded-2xl border border-[#2a3a48]/50 flex items-center gap-5"
      style="background-color: #0f1e2e;"
    >
      <div class="relative">
        <div class="w-20 h-20 rounded-full bg-[#49beb7] text-white flex items-center justify-center text-2xl font-bold shadow-lg">
          {{ userAvatar }}
        </div>
        <button 
          type="button"
          class="absolute bottom-0 right-0 p-1.5 bg-[#1a2a38] hover:bg-[#2a3a48] border border-[#2a3a48] rounded-full text-slate-300 transition-colors"
          title="Cambiar foto de perfil"
        >
          <Camera :size="14" />
        </button>
      </div>

      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-white leading-tight">
          {{ userData.name || 'Juan Pérez' }}
        </h2>
        <p class="text-xs text-slate-400">
          {{ userData.email || 'juan.perez@universidad.edu' }}
        </p>
        <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#085f63]/30 text-[#49beb7] border border-[#085f63]/50 mt-1">
          Cuenta Verificada
        </div>
      </div>
    </div>

    <!-- Barra de Pestañas (Tabs) -->
    <div class="flex border-b border-[#2a3a48]/50 space-x-2">
      <button 
        type="button"
        @click="activeTab = 'personal'"
        :class="[
          'flex items-center space-x-2 py-3 px-5 text-sm font-medium transition-all rounded-t-xl border-b-2 focus:outline-none',
          activeTab === 'personal' 
            ? 'border-[#49beb7] text-[#49beb7] bg-[#085f63]/20' 
            : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#1a2a38]/40'
        ]"
      >
        <User :size="16" />
        <span>Información Personal</span>
      </button>

      <button 
        type="button"
        @click="activeTab = 'security'"
        :class="[
          'flex items-center space-x-2 py-3 px-5 text-sm font-medium transition-all rounded-t-xl border-b-2 focus:outline-none',
          activeTab === 'security' 
            ? 'border-[#49beb7] text-[#49beb7] bg-[#085f63]/20' 
            : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#1a2a38]/40'
        ]"
      >
        <ShieldCheck :size="16" />
        <span>Seguridad</span>
      </button>

      <button 
        type="button"
        @click="activeTab = 'notifications'"
        :class="[
          'flex items-center space-x-2 py-3 px-5 text-sm font-medium transition-all rounded-t-xl border-b-2 focus:outline-none',
          activeTab === 'notifications' 
            ? 'border-[#49beb7] text-[#49beb7] bg-[#085f63]/20' 
            : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#1a2a38]/40'
        ]"
      >
        <Bell :size="16" />
        <span>Notificaciones</span>
      </button>
    </div>

    <!-- Contenido Dinámico -->
    <div 
      class="tab-content p-6 rounded-2xl border border-[#2a3a48]/50"
      style="background-color: #0f1e2e;"
    >
      <PersonalInfoTab 
        v-if="activeTab === 'personal'" 
        :user="userData" 
        @update="handleUserUpdate" 
      />
      <SecurityTab v-else-if="activeTab === 'security'" />
      <NotificationsTab v-else-if="activeTab === 'notifications'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { User, ShieldCheck, Bell, Camera } from 'lucide-vue-next'
import PersonalInfoTab from '../../components/settings/PersonalInfoTab.vue'
import SecurityTab from '../../components/settings/SecurityTab.vue'
import NotificationsTab from '../../components/settings/NotificationsTab.vue'
import { authService } from '../../services/authService'

const addToast = inject('addToast', () => {})

const activeTab = ref('personal')
const userData = ref({})

const userAvatar = computed(() => {
  const name = userData.value.name || 'Juan Pérez'
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
})

const loadUserData = () => {
  const rawUser = authService.getCurrentUser() || {}
  const currentUser = rawUser.user ? { ...rawUser, ...rawUser.user } : rawUser

  // Obtener el ID para buscar el override específico
  const userId = currentUser.id || currentUser.email || 'default'

  let override = {}
  try {
    override = JSON.parse(
      localStorage.getItem(`bu_override_${userId}`) || 
      localStorage.getItem('bu_profile_override') || 
      '{}'
    )
  } catch (e) {
    override = {}
  }

  // Nombre formateado con fallback a first_name + last_name
  const calculatedName = currentUser.name || 
                         currentUser.full_name || 
                         currentUser.nombre || 
                         `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim()

  const fullName = override.name || calculatedName || 'Juan Pérez'

  userData.value = {
    name: fullName,
    email: currentUser.email || 'rober@prueba.com',
    document_number: override.cedula || currentUser.document_number || currentUser.cedula || 'V-12345678',
    phone_number: override.phone || currentUser.phone_number || currentUser.phone || '+58 414-1234567',
    birth_date: currentUser.birth_date ? String(currentUser.birth_date).split('T')[0] : '1995-05-15',
    address: override.address !== undefined ? override.address : (currentUser.address || currentUser.direccion || 'Av. Principal')
  }
}

onMounted(() => {
  loadUserData()
  // Escuchar evento global cuando se actualiza la info personal
  window.addEventListener('bu_profile_updated', loadUserData)
})

onUnmounted(() => {
  window.removeEventListener('bu_profile_updated', loadUserData)
})

const handleUserUpdate = (updatedData) => {
  loadUserData()
}
</script>