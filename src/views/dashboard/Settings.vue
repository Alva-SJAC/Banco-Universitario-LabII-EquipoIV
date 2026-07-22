<template>
  <div class="settings-container p-6 text-white">
    <!-- Header de la sección -->
    <header class="mb-6">
      <h1 class="text-3xl font-bold">Configuración</h1>
      <p class="text-gray-400 text-sm">Gestiona tu información personal, seguridad y preferencias</p>
    </header>

    <!-- Barra de Pestañas (Tabs) -->
    <div class="flex border-b border-gray-700 mb-6 space-x-4">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex items-center space-x-2 py-3 px-4 font-medium transition-colors border-b-2',
          activeTab === tab.id 
            ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-lg' 
            : 'border-transparent text-gray-400 hover:text-gray-200'
        ]"
      >
        <component :is="tab.icon" class="w-5 h-5" />
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <!-- Contenido Dinámico según la pestaña activa -->
    <div class="tab-content bg-slate-900/50 p-6 rounded-xl border border-gray-800">
      <PersonalInfoTab v-if="activeTab === 'personal'" :user="userData" @update="handleUserUpdate" />
      <SecurityTab v-else-if="activeTab === 'security'" />
      <NotificationsTab v-else-if="activeTab === 'notifications'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserIcon, ShieldCheckIcon, BellIcon } from 'lucide-vue-next'
import PersonalInfoTab from '../../components/settings/PersonalInfoTab.vue'
import SecurityTab from '../../components/settings/SecurityTab.vue'
import NotificationsTab from '../../components/settings/NotificationsTab.vue'
import { authService } from '../../services/authService'

const activeTab = ref('personal')
const userData = ref({})

const tabs = [
  { id: 'personal', name: 'Información Personal', icon: UserIcon },
  { id: 'security', name: 'Seguridad', icon: ShieldCheckIcon },
  { id: 'notifications', name: 'Notificaciones', icon: BellIcon }
]

onMounted(() => {
  userData.value = authService.getCurrentUser() || {}
})

const handleUserUpdate = (updatedData) => {
  userData.value = { ...userData.value, ...updatedData }
}
</script>