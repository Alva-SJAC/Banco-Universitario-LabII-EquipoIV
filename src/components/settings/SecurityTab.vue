<template>
  <form @submit.prevent="changePassword" class="space-y-6">
    <h2 class="text-2xl font-semibold mb-4">Seguridad</h2>

    <!-- Banner Informativo -->
    <div class="bg-slate-800/80 border border-cyan-800/50 p-4 rounded-xl flex items-start space-x-3 text-cyan-300">
      <span class="text-xl">ⓘ</span>
      <div>
        <p class="font-semibold text-white">Protege tu cuenta</p>
        <p class="text-xs text-gray-300">Usa una contraseña fuerte con al menos 8 caracteres, incluyendo letras, números y símbolos.</p>
      </div>
    </div>

    <div class="space-y-4 max-w-2xl">
      <div>
        <label class="block text-sm font-medium mb-2">Contraseña Actual</label>
        <input v-model="passwords.current" type="password" class="input-style" required />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Nueva Contraseña</label>
          <input v-model="passwords.new" type="password" class="input-style" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Confirmar Contraseña</label>
          <input v-model="passwords.confirm" type="password" class="input-style" required />
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg flex items-center space-x-2">
        <span>🔑</span>
        <span>Cambiar Contraseña</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const passwords = reactive({
  current: '',
  new: '',
  confirm: ''
})

const changePassword = () => {
  if (passwords.new !== passwords.confirm) {
    alert('Las contraseñas no coinciden')
    return
  }
  // Llamada al endpoint correspondiente
  alert('Contraseña actualizada con éxito')
}
</script>