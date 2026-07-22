<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold mb-2">Preferencias de Notificaciones</h2>

    <div class="space-y-6 max-w-3xl">
      <div v-for="item in notificationSettings" :key="item.id" class="flex items-center justify-between py-2 border-b border-gray-800">
        <div>
          <p class="font-medium text-white">{{ item.title }}</p>
          <p class="text-xs text-gray-400">{{ item.description }}</p>
        </div>
        
        <!-- Toggle Switch -->
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="item.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
        </label>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button @click="savePreferences" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg flex items-center space-x-2">
        <span>✓</span>
        <span>Guardar Preferencias</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notificationSettings = ref([
  { id: 'email_tx', title: 'Notificaciones de Transacciones por Email', description: 'Recibe un email cada vez que se realice una transacción', enabled: true },
  { id: 'email_promo', title: 'Promociones por Email', description: 'Recibe ofertas y promociones especiales', enabled: false },
  { id: 'sms', title: 'Notificaciones SMS', description: 'Recibe alertas de seguridad por SMS', enabled: true },
  { id: 'push', title: 'Notificaciones Push', description: 'Recibe notificaciones en tiempo real en tu dispositivo', enabled: true }
])

const savePreferences = () => {
  alert('Preferencias de notificaciones guardadas')
}
</script>