<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-xl font-bold text-white mb-1">Preferencias de Notificaciones</h3>
    </div>

    <div class="space-y-4 max-w-3xl">
      <div 
        v-for="item in notificationSettings" 
        :key="item.id" 
        class="flex items-center justify-between py-3.5 border-b border-slate-700/50"
      >
        <div class="space-y-0.5">
          <p class="text-xs font-semibold text-slate-200">{{ item.title }}</p>
          <p class="text-xs text-slate-400">{{ item.description }}</p>
        </div>
        
        <!-- Toggle Switch -->
        <label class="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
          <input type="checkbox" v-model="item.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-slate-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#49beb7]"></div>
        </label>
      </div>
    </div>

    <!-- Botón de Envío -->
    <div class="flex justify-end pt-2">
      <button 
        @click="savePreferences" 
        :disabled="isSubmitting"
        class="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-blue-600/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Check :size="16" />
        <span>{{ isSubmitting ? 'Guardando...' : 'Guardar Preferencias' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { Check } from 'lucide-vue-next'
import { authService } from '../../services/authService'

const addToast = inject('addToast', () => {})
const isSubmitting = ref(false)

const DEFAULT_SETTINGS = [
  { id: 'email_tx', title: 'Notificaciones de Transacciones por Email', description: 'Recibe un email cada vez que se realice una transacción', enabled: true },
  { id: 'email_promo', title: 'Promociones por Email', description: 'Recibe ofertas y promociones especiales', enabled: false },
  { id: 'sms', title: 'Notificaciones SMS', description: 'Recibe alertas de seguridad por SMS', enabled: true },
  { id: 'push', title: 'Notificaciones Push', description: 'Recibe notificaciones en tiempo real en tu dispositivo', enabled: true }
]

const notificationSettings = ref([])

const getStorageKey = () => {
  const rawUser = authService.getCurrentUser() || {}
  const currentUser = rawUser.user ? { ...rawUser, ...rawUser.user } : rawUser
  const userId = currentUser.id || currentUser.email || 'default'
  return `bu_notifications_${userId}`
}

const loadPreferences = () => {
  try {
    const key = getStorageKey()
    const saved = localStorage.getItem(key) || localStorage.getItem('bu_notification_settings')
    
    if (saved) {
      notificationSettings.value = JSON.parse(saved)
    } else {
      notificationSettings.value = [...DEFAULT_SETTINGS]
    }
  } catch (error) {
    console.error('Error al cargar preferencias de notificación:', error)
    notificationSettings.value = [...DEFAULT_SETTINGS]
  }
}

const savePreferences = () => {
  isSubmitting.value = true
  try {
    const key = getStorageKey()
    const settingsJson = JSON.stringify(notificationSettings.value)
    
    // Guardar por usuario y en global por compatibilidad
    localStorage.setItem(key, settingsJson)
    localStorage.setItem('bu_notification_settings', settingsJson)

    addToast('Preferencias de notificaciones guardadas', 'success')
  } catch (error) {
    console.error('Error al guardar preferencias de notificación:', error)
    addToast('Error al guardar preferencias', 'error')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadPreferences()
})
</script>