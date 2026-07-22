<template>
  <form @submit.prevent="changePassword" class="space-y-6">
    <h2 class="text-xl font-bold text-white mb-4">Seguridad</h2>

    <!-- Banner Informativo Bancario -->
    <div class="bg-[#0a1520] border border-[#085f63]/50 p-4 rounded-xl flex items-start space-x-3 text-[#49beb7]">
      <span class="text-lg">ⓘ</span>
      <div>
        <p class="font-semibold text-xs text-white">Protección de Cuenta</p>
        <p class="text-[11px] text-slate-400">Tu nueva contraseña debe tener al menos 8 caracteres. Recuerda no compartir tus credenciales con nadie.</p>
      </div>
    </div>

    <div class="space-y-4 max-w-2xl">
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">Contraseña Actual</label>
        <input v-model="passwords.current" type="password" class="input-style" placeholder="••••••••" required />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">Nueva Contraseña</label>
          <input v-model="passwords.new" type="password" class="input-style" placeholder="••••••••" minlength="8" required />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">Confirmar Nueva Contraseña</label>
          <input v-model="passwords.confirm" type="password" class="input-style" placeholder="••••••••" minlength="8" required />
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button 
        type="submit" 
        class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-colors focus:outline-none shadow-md shadow-blue-600/20"
      >
        <span>🔑</span>
        <span>Cambiar Contraseña</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { authService } from '../../services/authService'

const addToast = inject('addToast', () => {})

const passwords = reactive({
  current: '',
  new: '',
  confirm: ''
})

const changePassword = () => {
  if (passwords.new !== passwords.confirm) {
    addToast('La confirmación de contraseña no coincide', 'info')
    return
  }

  const currentUser = authService.getCurrentUser() || {}
  
  // Si existe contraseña almacenada, la validamos
  if (currentUser.password && currentUser.password !== passwords.current) {
    addToast('La contraseña actual es incorrecta', 'info')
    return
  }

  // Guardar nueva contraseña
  authService.updateCurrentUser({ password: passwords.new })

  addToast('Contraseña actualizada con éxito', 'success')
  passwords.current = ''
  passwords.new = ''
  passwords.confirm = ''
}
</script>

<style scoped>
.input-style {
  @apply w-full bg-[#0a1520] border border-[#2a3a48]/60 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#49beb7] transition-colors;
}
</style>