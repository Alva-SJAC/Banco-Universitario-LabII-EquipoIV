<template>
  <form @submit.prevent="saveChanges" class="space-y-6">
    <h2 class="text-2xl font-semibold mb-4">Información Personal</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-2">Nombre Completo</label>
        <input v-model="form.name" type="text" class="input-style" readonly />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Cédula de Identidad</label>
        <input v-model="form.document_number" type="text" class="input-style" readonly />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Correo Electrónico</label>
        <input v-model="form.email" type="email" class="input-style" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Teléfono</label>
        <input v-model="form.phone_number" type="text" class="input-style" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Fecha de Nacimiento</label>
        <input v-model="form.birth_date" type="date" class="input-style" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Dirección</label>
        <input v-model="form.address" type="text" class="input-style" placeholder="Av. Principal..." />
      </div>
    </div>

    <div class="flex justify-end pt-4">
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg flex items-center space-x-2">
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
    form.name = newVal.name || `${newVal.first_name || ''} ${newVal.last_name || ''}`
    form.document_number = newVal.document_number || ''
    form.email = newVal.email || ''
    form.phone_number = newVal.phone_number || ''
    form.birth_date = newVal.birth_date ? newVal.birth_date.split('T')[0] : ''
    form.address = newVal.address || ''
  }
}, { immediate: true })

const saveChanges = () => {
  // Lógica para enviar a la API cuando esté disponible el endpoint de actualización
  emit('update', form)
  alert('Información actualizada correctamente')
}
</script>

<style scoped>
.input-style {
  @apply w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500;
}
</style>