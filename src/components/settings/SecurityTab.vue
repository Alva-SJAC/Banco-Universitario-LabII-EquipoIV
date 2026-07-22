<template>
  <div class="space-y-6 max-w-2xl text-white">
    <div>
      <h3 class="text-xl font-bold text-white mb-1">Seguridad</h3>
    </div>

    <!-- Banner informativo -->
    <div class="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 flex items-start space-x-3 text-sm text-slate-300">
      <Info class="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
      <div>
        <p class="font-semibold text-white">Protección de Cuenta</p>
        <p class="text-xs text-slate-400 mt-0.5">
          Tu nueva contraseña debe tener entre 8 y 16 caracteres. Recuerda no compartir tus credenciales con nadie.
        </p>
      </div>
    </div>

    <form @submit.prevent="changePassword" class="space-y-5">
      <!-- Contraseña Actual -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">
          Contraseña Actual
        </label>
        <div class="relative max-w-sm">
          <input
            v-model="passwords.current"
            :type="showCurrent ? 'text' : 'password'"
            required
            placeholder="Ingresa tu contraseña actual"
            class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bu-teal focus:ring-1 focus:ring-bu-teal transition-all"
          />
          <button
            type="button"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            @click="showCurrent = !showCurrent"
          >
            <EyeOff v-if="showCurrent" :size="18" />
            <Eye v-else :size="18" />
          </button>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        <!-- Nueva Contraseña -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">
            Nueva Contraseña
          </label>
          <div class="relative">
            <input
              v-model="passwords.new"
              :type="showNew ? 'text' : 'password'"
              required
              placeholder="Ingresa tu nueva contraseña"
              class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bu-teal focus:ring-1 focus:ring-bu-teal transition-all"
            />
            <button
              type="button"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              @click="showNew = !showNew"
            >
              <EyeOff v-if="showNew" :size="18" />
              <Eye v-else :size="18" />
            </button>
          </div>
        </div>

        <!-- Confirmar Nueva Contraseña -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">
            Confirmar Nueva Contraseña
          </label>
          <div class="relative">
            <input
              v-model="passwords.confirm"
              :type="showConfirm ? 'text' : 'password'"
              required
              placeholder="Repite la nueva contraseña"
              class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bu-teal focus:ring-1 focus:ring-bu-teal transition-all"
            />
            <button
              type="button"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              @click="showConfirm = !showConfirm"
            >
              <EyeOff v-if="showConfirm" :size="18" />
              <Eye v-else :size="18" />
            </button>
          </div>
        </div>
      </div>

      <!-- Botón de Envío -->
      <div class="flex justify-end pt-2">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Key :size="16" />
          <span>{{ isSubmitting ? 'Cambiando...' : 'Cambiar Contraseña' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, inject, ref } from 'vue'
import { Eye, EyeOff, Info, Key } from 'lucide-vue-next'
import { authService } from '../../services/authService'

const addToast = inject('addToast', () => {})
const isSubmitting = ref(false)

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const passwords = reactive({
  current: '',
  new: '',
  confirm: ''
})

const changePassword = async () => {
  if (passwords.new !== passwords.confirm) {
    addToast('La confirmación de la nueva contraseña no coincide', 'info')
    return
  }

  if (passwords.new.length < 8 || passwords.new.length > 16) {
    addToast('La nueva contraseña debe tener entre 8 y 16 caracteres', 'info')
    return
  }

  isSubmitting.value = true

  try {
    // 1. Cambiar la contraseña en el backend
    await authService.changePassword(passwords.current, passwords.new)
    
    // 2. Si authService cuenta con la función auxiliar updateCurrentUser la ejecuta de forma segura
    if (typeof authService.updateCurrentUser === 'function') {
      authService.updateCurrentUser({ password: passwords.new })
    }

    addToast('Contraseña actualizada con éxito', 'success')
    
    // Limpiar campos
    passwords.current = ''
    passwords.new = ''
    passwords.confirm = ''
  } catch (error) {
    console.error('Error al actualizar contraseña:', error)
    const errorMessage = error.response?.data?.message || 'Error al cambiar la contraseña. Verifica tu contraseña actual.'
    addToast(errorMessage, 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>