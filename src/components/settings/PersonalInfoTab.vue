<template>
  <form @submit.prevent="saveChanges" class="space-y-6">
    <h2 class="text-xl font-bold text-white mb-4">Información Personal</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Nombre Completo (Editable) -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">Nombre Completo</label>
        <input v-model="form.name" type="text" class="input-style" required />
      </div>

      <!-- Cédula (Bloqueado por Normativa Bancaria) -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <label class="block text-xs font-semibold text-slate-300">Cédula de Identidad</label>
          <span class="text-[10px] text-slate-500 flex items-center gap-1">🔒 No editable</span>
        </div>
        <input 
          v-model="form.document_number" 
          type="text" 
          class="input-style opacity-60 cursor-not-allowed bg-[#081018]" 
          disabled 
          title="Para modificar tu documento de identidad debes acudir a una agencia"
        />
      </div>

      <!-- Correo Electrónico (Editable) -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">Correo Electrónico</label>
        <input v-model="form.email" type="email" class="input-style" required />
      </div>

      <!-- Teléfono (Editable) -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">Teléfono</label>
        <input v-model="form.phone_number" type="text" class="input-style" required />
      </div>

      <!-- Fecha de Nacimiento (Bloqueado por Normativa Bancaria) -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <label class="block text-xs font-semibold text-slate-300">Fecha de Nacimiento</label>
          <span class="text-[10px] text-slate-500 flex items-center gap-1">🔒 No editable</span>
        </div>
        <input 
          v-model="form.birth_date" 
          type="date" 
          class="input-style opacity-60 cursor-not-allowed bg-[#081018] text-slate-400" 
          disabled 
        />
      </div>

      <!-- Dirección (Editable) -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">Dirección de Habitación</label>
        <input v-model="form.address" type="text" class="input-style" placeholder="Av. Principal..." required />
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button 
        type="submit" 
        class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-colors focus:outline-none shadow-md shadow-blue-600/20"
      >
        <span>✓</span>
        <span>Guardar Cambios</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ user: Object })
const emit = defineEmits(['update'])

const form = reactive({
  name: '',
  document_number: '',
  email: '',
  phone_number: '',
  birth_date: '',
  address: ''
})

watch(() => props.user, (newVal) => {
  if (newVal) {
    form.name = newVal.name || ''
    form.document_number = newVal.document_number || ''
    form.email = newVal.email || ''
    form.phone_number = newVal.phone_number || ''
    form.birth_date = newVal.birth_date || ''
    form.address = newVal.address || ''
  }
}, { immediate: true })

const saveChanges = () => {
  emit('update', form)
}
</script>

<style scoped>
.input-style {
  @apply w-full bg-[#0a1520] border border-[#2a3a48]/60 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#49beb7] transition-colors;
}
</style>