<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold text-white">Información Personal</h3>
    </div>

    <form @submit.prevent="saveProfile" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Nombre Completo -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">
            Nombre Completo
          </label>
          <input
            v-model="profile.name"
            type="text"
            required
            placeholder="Ingresa tu nombre completo"
            class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bu-teal focus:ring-1 focus:ring-bu-teal transition-all"
          />
        </div>

        <!-- Cédula de Identidad (No editable) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-semibold text-slate-300">
              Cédula de Identidad
            </label>
            <span class="text-[10px] text-slate-500 flex items-center gap-1">🔒 No editable</span>
          </div>
          <input
            v-model="profile.cedula"
            type="text"
            disabled
            placeholder="Sin especificar"
            class="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-400 cursor-not-allowed select-none opacity-80"
          />
        </div>

        <!-- Correo Electrónico (No editable) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-semibold text-slate-300">
              Correo Electrónico
            </label>
            <span class="text-[10px] text-slate-500 flex items-center gap-1">🔒 Usuario principal</span>
          </div>
          <input
            v-model="profile.email"
            type="email"
            disabled
            class="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-400 cursor-not-allowed select-none opacity-80"
          />
        </div>

        <!-- Teléfono -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">
            Teléfono
          </label>
          <input
            v-model="profile.phone"
            type="tel"
            required
            placeholder="04XXXXXXXXX"
            class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bu-teal focus:ring-1 focus:ring-bu-teal transition-all"
          />
        </div>

        <!-- Fecha de Nacimiento (No editable) -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-semibold text-slate-300">
              Fecha de Nacimiento
            </label>
            <span class="text-[10px] text-slate-500 flex items-center gap-1">🔒 No editable</span>
          </div>
          <input
            v-model="profile.birthDate"
            type="text"
            disabled
            class="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-400 cursor-not-allowed select-none opacity-80"
          />
        </div>

        <!-- Dirección (Opcional) -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">
            Dirección
          </label>
          <input
            v-model="profile.address"
            type="text"
            placeholder="Ingresa tu dirección (Opcional)"
            class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-bu-teal focus:ring-1 focus:ring-bu-teal transition-all"
          />
        </div>
      </div>

      <!-- Botón de Envío -->
      <div class="flex justify-end pt-2">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check :size="16" />
          <span>{{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted, inject } from 'vue'
import { Check } from 'lucide-vue-next'
import { authService } from '../../services/authService'

const addToast = inject('addToast', () => {})
const isSubmitting = ref(false)

const profile = reactive({
  name: '',
  cedula: '',
  email: '',
  phone: '',
  birthDate: '',
  address: ''
})

const populateFormData = () => {
  const rawUser = authService.getCurrentUser() || {}
  const currentUser = rawUser.user ? { ...rawUser, ...rawUser.user } : rawUser
  const clientObj = rawUser.client || currentUser.client || {}
  const profileObj = rawUser.profile || currentUser.profile || {}

  const userId = currentUser.id || currentUser.email || 'default'
  let override = {}
  try {
    override = JSON.parse(localStorage.getItem(`bu_override_${userId}`) || '{}')
  } catch (e) {
    override = {}
  }

  // Nombre
  const calculatedName = currentUser.name || 
                         currentUser.full_name || 
                         currentUser.nombre || 
                         `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim()
  profile.name = override.name || calculatedName || ''

  // Búsqueda exhaustiva de Cédula en todas las estructuras posibles
  const foundCedula = override.cedula ||
                      currentUser.document_number ||
                      currentUser.cedula || 
                      currentUser.identity_card || 
                      currentUser.id_card || 
                      currentUser.national_id || 
                      currentUser.document_id ||
                      currentUser.identification ||
                      currentUser.dni ||
                      currentUser.doc_id ||
                      clientObj.cedula ||
                      clientObj.identity_card ||
                      clientObj.identification ||
                      profileObj.cedula ||
                      profileObj.identity_card

  profile.cedula = foundCedula || 'Sin especificar'

  // Email
  profile.email = currentUser.email || ''

  // Teléfono
  profile.phone = override.phone ||
                  currentUser.phone_number ||  
                  currentUser.phone || 
                  currentUser.telefono || 
                  clientObj.phone ||
                  ''

  // Fecha de Nacimiento
  const rawDate = currentUser.birth_date || currentUser.birthDate || currentUser.fecha_nacimiento || clientObj.birth_date
  profile.birthDate = rawDate ? String(rawDate).split('T')[0] : ''

  // Dirección
  profile.address = override.address !== undefined 
                    ? override.address 
                    : (currentUser.address || currentUser.direccion || clientObj.address || '')
}

onMounted(() => {
  populateFormData()
  window.addEventListener('bu_profile_updated', populateFormData)
})

onUnmounted(() => {
  window.removeEventListener('bu_profile_updated', populateFormData)
})

const saveProfile = async () => {
  isSubmitting.value = true

  try {
    // 1. Payload completo adaptado tanto a snake_case como camelCase
    const payload = {
      name: profile.name,
      full_name: profile.name,
      first_name: profile.name.split(' ')[0] || '',
      last_name: profile.name.split(' ').slice(1).join(' ') || '',
      phone: profile.phone,
      phone_number: profile.phone,
      address: profile.address,
      direccion: profile.address
    }

    // 2. Intentar actualizar en Backend / authService
    await authService.updateProfile(payload)

    // 3. Guardar override persistente por usuario para la UI
    const rawUser = authService.getCurrentUser() || {}
    const currentUser = rawUser.user ? { ...rawUser, ...rawUser.user } : rawUser
    const userId = currentUser.id || currentUser.email || 'default'

    const override = {
      name: profile.name,
      phone: profile.phone,
      address: profile.address
    }
    localStorage.setItem(`bu_override_${userId}`, JSON.stringify(override))

    // 4. Sincronizar UI
    window.dispatchEvent(new CustomEvent('bu_profile_updated'))
    addToast('Información personal actualizada con éxito', 'success')
  } catch (error) {
    console.error('Error al guardar el perfil:', error)
    addToast('Ocurrió un error al guardar los cambios', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>