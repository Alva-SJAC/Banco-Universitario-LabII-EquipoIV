<template>
  <div class="space-y-6 font-montserrat">
    <!-- Encabezado -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-1">
          Mis Contactos
        </h2>
        <p class="text-sm text-slate-400 mb-0">
          Gestiona tus contactos frecuentes conectados al backend
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-slate-200 border border-[#2a3a48] hover:bg-[#1a2a38] transition-colors focus:outline-none disabled:opacity-60"
          :disabled="isLoading"
          @click="loadContacts"
        >
          <RefreshCw :size="17" :class="isLoading ? 'animate-spin' : ''" />
          Actualizar
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none"
          @click="openCreateModal"
        >
          <UserPlus :size="18" />
          Nuevo Contacto
        </button>
      </div>
    </div>

    <!-- Mensaje de error -->
    <div
      v-if="apiError"
      class="rounded-2xl px-5 py-4 border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-semibold"
    >
      {{ apiError }}
    </div>

    <!-- Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="rounded-3xl p-6 border-none"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            style="background-color: rgba(8, 95, 99, 0.25);"
          >
            <Users :size="22" style="color: #49beb7;" />
          </div>
          <div>
            <p class="text-xs text-slate-400 mb-3">Total Contactos</p>
            <p class="text-3xl font-bold text-white mb-0">
              {{ contacts.length }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="rounded-3xl p-6 border-none"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            style="background-color: rgba(8, 95, 99, 0.25);"
          >
            <CreditCard :size="22" style="color: #49beb7;" />
          </div>
          <div>
            <p class="text-xs text-slate-400 mb-3">Disponibles</p>
            <p class="text-3xl font-bold text-white mb-0">
              {{ filteredContacts.length }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="rounded-3xl p-6 border-none"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            style="background-color: rgba(8, 95, 99, 0.25);"
          >
            <FileText :size="22" style="color: #49beb7;" />
          </div>
          <div>
            <p class="text-xs text-slate-400 mb-3">Con Descripción</p>
            <p class="text-3xl font-bold text-white mb-0">
              {{ contactsWithDescription }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Buscador -->
    <div
      class="flex items-center gap-3 rounded-lg px-4 py-3 border border-[#2a3a48]"
      style="background-color: #132333;"
    >
      <Search :size="18" class="text-slate-400 flex-shrink-0" />
      <input
        v-model="searchTerm"
        type="text"
        class="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500"
        placeholder="Buscar por alias, número de cuenta o descripción..."
      />
    </div>

    <p class="text-xs text-slate-400 mb-0">
      {{ filteredContacts.length }} contactos encontrados
    </p>

    <!-- Cargando -->
    <div
      v-if="isLoading"
      class="rounded-3xl p-10 text-center border border-[#223446]"
      style="background-color: #1a2a38;"
    >
      <Loader2 :size="42" class="mx-auto mb-4 text-[#49beb7] animate-spin" />
      <h3 class="text-white font-bold text-lg mb-2">
        Cargando contactos...
      </h3>
      <p class="text-sm text-slate-400 mb-0">
        Consultando información desde el backend.
      </p>
    </div>

    <!-- Lista de contactos -->
    <div
      v-else-if="filteredContacts.length > 0"
      class="grid grid-cols-1 xl:grid-cols-2 gap-5"
    >
      <article
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="rounded-3xl p-5 border border-[#223446] hover:border-[#49beb7]/30 transition-all"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style="background-color: #0f8f8f;"
          >
            {{ getInitials(contact.alias) }}
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-xl font-bold text-white mb-1 truncate">
              {{ contact.alias }}
            </h3>

            <p class="text-xs text-slate-400 mb-4">
              Contacto frecuente registrado en la cuenta del usuario
            </p>

            <div
              class="rounded-xl p-4 mb-4"
              style="background-color: #0f1e2e;"
            >
              <p class="text-xs text-slate-400 mb-2">
                Número de cuenta
              </p>

              <p class="text-sm text-white font-semibold mb-3 break-all">
                {{ contact.account_number }}
              </p>

              <p class="text-xs text-slate-400 mb-2">
                Descripción
              </p>

              <p class="text-sm text-slate-200 mb-0">
                {{ contact.description || 'Sin descripción registrada' }}
              </p>
            </div>

            <p class="text-[11px] text-slate-500 mb-4">
              Creado: {{ formatDate(contact.created_at) }}
            </p>

            <div class="grid grid-cols-[1fr_auto_auto] gap-2">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 transition-colors focus:outline-none"
                @click="transferToContact(contact)"
              >
                <Send :size="16" />
                Transferir
              </button>

              <button
                type="button"
                class="w-10 h-10 flex items-center justify-center border border-[#49beb7]/70 text-[#49beb7] hover:bg-[#49beb7]/10 transition-colors focus:outline-none"
                @click="openEditModal(contact)"
                title="Editar contacto"
              >
                <Edit3 :size="16" />
              </button>

              <button
                type="button"
                class="w-10 h-10 flex items-center justify-center border border-red-400/70 text-red-400 hover:bg-red-500/10 transition-colors focus:outline-none"
                @click="openDeleteModal(contact)"
                title="Eliminar contacto"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Estado vacío -->
    <div
      v-else
      class="rounded-3xl p-10 text-center border border-[#223446]"
      style="background-color: #1a2a38;"
    >
      <Users :size="42" class="mx-auto mb-4 text-slate-500" />
      <h3 class="text-white font-bold text-lg mb-2">
        No se encontraron contactos
      </h3>
      <p class="text-sm text-slate-400 mb-5">
        Puedes registrar un nuevo contacto usando una cuenta existente del banco.
      </p>

      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none"
        @click="openCreateModal"
      >
        <UserPlus :size="18" />
        Nuevo Contacto
      </button>
    </div>

    <!-- Modal Crear / Editar -->
    <div
      v-if="showContactModal"
      class="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
    >
      <div
        class="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl"
        style="background-color: #1a2a38;"
      >
        <div class="px-6 py-5 flex items-start justify-between border-b border-[#2a3a48]">
          <div class="flex items-center gap-4">
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center"
              style="background-color: rgba(8, 95, 99, 0.25);"
            >
              <Edit3 v-if="isEditing" :size="20" style="color: #49beb7;" />
              <UserPlus v-else :size="20" style="color: #49beb7;" />
            </div>

            <div>
              <h3 class="text-2xl font-bold text-white mb-1">
                {{ isEditing ? 'Editar Contacto' : 'Nuevo Contacto' }}
              </h3>
              <p class="text-xs text-slate-400 mb-0">
                {{ isEditing ? 'Actualiza alias y descripción' : 'Registra un contacto frecuente real' }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="text-slate-400 hover:text-white transition-colors focus:outline-none"
            @click="closeContactModal"
          >
            <X :size="20" />
          </button>
        </div>

        <form class="px-6 py-6 space-y-4" @submit.prevent="saveContact">
          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Alias del contacto <span class="text-orange-400">*</span>
            </label>
            <input
              v-model.trim="contactForm.alias"
              type="text"
              class="w-full rounded-md border border-white/80 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7]"
              placeholder="Ej: Jane Smith"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Número de cuenta <span class="text-orange-400">*</span>
            </label>
            <input
              v-model.trim="contactForm.account_number"
              type="text"
              class="w-full rounded-md border border-white/80 px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7] disabled:opacity-60 disabled:cursor-not-allowed"
              :class="isEditing ? 'bg-[#0f1e2e]' : 'bg-transparent'"
              placeholder="Ej: 18273619283746556473"
              :disabled="isEditing"
            />
            <p class="text-[11px] text-slate-500 mt-2 mb-0">
              El backend valida que la cuenta exista y que no sea tu propia cuenta.
            </p>
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Descripción
            </label>
            <textarea
              v-model.trim="contactForm.description"
              rows="3"
              class="w-full rounded-md border border-white/80 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7] resize-none"
              placeholder="Ej: Contacto frecuente para transferencias"
            ></textarea>
          </div>

          <p
            v-if="formError"
            class="text-sm text-red-400 font-semibold mb-0"
          >
            {{ formError }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              type="button"
              class="border border-white/80 text-slate-200 hover:bg-white/10 px-4 py-3 text-sm font-semibold transition-colors focus:outline-none"
              :disabled="isSaving"
              @click="closeContactModal"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-bold transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="isSaving"
            >
              <Loader2 v-if="isSaving" :size="16" class="animate-spin" />
              <Check v-else :size="16" />
              {{ isSaving ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Contacto' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Eliminar -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
    >
      <div
        class="w-full max-w-sm rounded-3xl p-7 text-center shadow-2xl"
        style="background-color: #1a2a38;"
      >
        <div
          class="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
          style="background-color: rgba(239, 68, 68, 0.2);"
        >
          <Trash2 :size="28" class="text-red-400" />
        </div>

        <h3 class="text-2xl font-bold text-white mb-2">
          ¿Eliminar contacto?
        </h3>

        <p class="text-sm text-slate-400 mb-6">
          Estás a punto de eliminar a
          <span class="font-bold text-white">{{ selectedContact?.alias }}</span>.
          Esta acción no se puede deshacer.
        </p>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="border border-white/80 text-slate-200 hover:bg-white/10 px-4 py-3 text-sm font-semibold transition-colors focus:outline-none"
            :disabled="isDeleting"
            @click="closeDeleteModal"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-bold transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="isDeleting"
            @click="deleteContact"
          >
            <Loader2 v-if="isDeleting" :size="16" class="animate-spin" />
            <Trash2 v-else :size="16" />
            {{ isDeleting ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Users,
  UserPlus,
  Search,
  Send,
  Edit3,
  Trash2,
  X,
  Check,
  RefreshCw,
  Loader2,
  CreditCard,
  FileText
} from 'lucide-vue-next'
import { contactService } from '../../services/contactService'

const router = useRouter()
const addToast = inject('addToast', null)

const contacts = ref([])
const searchTerm = ref('')
const showContactModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedContact = ref(null)
const formError = ref('')
const apiError = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)

const contactForm = ref({
  alias: '',
  account_number: '',
  description: ''
})

const contactsWithDescription = computed(() => {
  return contacts.value.filter((contact) => Boolean(contact.description)).length
})

const filteredContacts = computed(() => {
  const search = searchTerm.value.trim().toLowerCase()

  if (!search) {
    return contacts.value
  }

  return contacts.value.filter((contact) => {
    return (
      String(contact.alias || '').toLowerCase().includes(search) ||
      String(contact.account_number || '').toLowerCase().includes(search) ||
      String(contact.description || '').toLowerCase().includes(search)
    )
  })
})

const normalizeContactsResponse = (response) => {
  const payload = response?.data ?? response

  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.contacts)) {
    return payload.contacts
  }

  return []
}

const getApiErrorMessage = (error) => {
  const backendMessage = error?.response?.data?.message
  const backendErrors = error?.response?.data?.errors

  if (Array.isArray(backendErrors) && backendErrors.length > 0) {
    return backendErrors.join(', ')
  }

  if (typeof backendErrors === 'string') {
    return backendErrors
  }

  if (backendMessage && backendMessage !== 'Error') {
    return backendMessage
  }

  if (error?.response?.status === 400) {
    return 'No se pudo guardar el contacto. Verifica que la cuenta exista, que no sea tu propia cuenta y que no esté duplicada.'
  }

  if (error?.response?.status === 401) {
    return 'Tu sesión no es válida o expiró. Inicia sesión nuevamente.'
  }

  if (error?.response?.status === 404) {
    return 'No se encontró el contacto solicitado.'
  }

  return 'Ocurrió un error al procesar la solicitud.'
}

const loadContacts = async () => {
  isLoading.value = true
  apiError.value = ''

  try {
    const response = await contactService.getContacts()
    contacts.value = normalizeContactsResponse(response)
  } catch (error) {
    console.error('Error al cargar contactos:', error)
    apiError.value = getApiErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

const getInitials = (alias) => {
  const value = alias || 'Contacto'

  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

const formatDate = (date) => {
  if (!date) {
    return 'Sin fecha'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Sin fecha'
  }

  return parsedDate.toLocaleDateString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const resetForm = () => {
  contactForm.value = {
    alias: '',
    account_number: '',
    description: ''
  }

  formError.value = ''
}

const openCreateModal = () => {
  resetForm()
  selectedContact.value = null
  isEditing.value = false
  showContactModal.value = true
}

const openEditModal = (contact) => {
  selectedContact.value = contact
  isEditing.value = true
  formError.value = ''

  contactForm.value = {
    alias: contact.alias || '',
    account_number: contact.account_number || '',
    description: contact.description || ''
  }

  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
  selectedContact.value = null
  resetForm()
}

const validateForm = () => {
  if (!contactForm.value.alias) {
    formError.value = 'El alias del contacto es obligatorio.'
    return false
  }

  if (!isEditing.value && !contactForm.value.account_number) {
    formError.value = 'El número de cuenta es obligatorio.'
    return false
  }

  if (!isEditing.value && !/^\d{20}$/.test(contactForm.value.account_number)) {
    formError.value = 'El número de cuenta debe tener 20 dígitos numéricos.'
    return false
  }

  formError.value = ''
  return true
}

const saveContact = async () => {
  if (!validateForm()) return

  isSaving.value = true
  formError.value = ''

  try {
    if (isEditing.value && selectedContact.value) {
      await contactService.updateContact(selectedContact.value.id, {
        alias: contactForm.value.alias,
        description: contactForm.value.description
      })

      addToast?.('Contacto actualizado correctamente.', 'success')
    } else {
      await contactService.createContact({
        alias: contactForm.value.alias,
        account_number: contactForm.value.account_number,
        description: contactForm.value.description
      })

      addToast?.('Contacto creado correctamente.', 'success')
    }

    closeContactModal()
    await loadContacts()
  } catch (error) {
    console.error('Error al guardar contacto:', error)
    formError.value = getApiErrorMessage(error)
  } finally {
    isSaving.value = false
  }
}

const openDeleteModal = (contact) => {
  selectedContact.value = contact
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  selectedContact.value = null
  showDeleteModal.value = false
}

const deleteContact = async () => {
  if (!selectedContact.value) return

  isDeleting.value = true

  try {
    await contactService.deleteContact(selectedContact.value.id)

    addToast?.('Contacto eliminado correctamente.', 'success')
    closeDeleteModal()
    await loadContacts()
  } catch (error) {
    console.error('Error al eliminar contacto:', error)
    apiError.value = getApiErrorMessage(error)
    closeDeleteModal()
  } finally {
    isDeleting.value = false
  }
}

const transferToContact = (contact) => {
  addToast?.(`Contacto ${contact.alias} seleccionado para transferir.`, 'success')

  router.push({
    path: '/dashboard/transfers',
    query: {
      account: contact.account_number,
      alias: contact.alias
    }
  })
}

onMounted(() => {
  loadContacts()
})
</script>