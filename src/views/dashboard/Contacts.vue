<template>
  <div class="space-y-6 font-montserrat">
    <!-- Encabezado de la sección -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-1">
          Mis Contactos
        </h2>
        <p class="text-sm text-slate-400 mb-0">
          Gestiona tus contactos para transferencias rápidas
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none"
        @click="openCreateModal"
      >
        <UserPlus :size="18" />
        Nuevo Contacto
      </button>
    </div>

    <!-- Tarjetas de estadísticas -->
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
            <p class="text-3xl font-bold text-white mb-0">{{ contacts.length }}</p>
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
            <Send :size="22" style="color: #49beb7;" />
          </div>
          <div>
            <p class="text-xs text-slate-400 mb-3">Transferencias Este Mes</p>
            <p class="text-3xl font-bold text-white mb-0">{{ transfersThisMonth }}</p>
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
            <User :size="22" style="color: #49beb7;" />
          </div>
          <div>
            <p class="text-xs text-slate-400 mb-3">En Banco Universitario</p>
            <p class="text-3xl font-bold text-white mb-0">{{ sameBankContacts }}</p>
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
        placeholder="Buscar por nombre, correo, cuenta o cédula..."
      />
    </div>

    <p class="text-xs text-slate-400 mb-0">
      {{ filteredContacts.length }} contactos encontrados
    </p>

    <!-- Lista de contactos -->
    <div
      v-if="filteredContacts.length > 0"
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
            {{ getInitials(contact.name) }}
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="text-xl font-bold text-white mb-1 truncate">
              {{ contact.name }}
            </h3>

            <div class="space-y-1 mb-4">
              <p class="flex items-center gap-2 text-xs text-slate-400 mb-0">
                <Mail :size="14" />
                <span class="truncate">{{ contact.email }}</span>
              </p>

              <p class="flex items-center gap-2 text-xs text-slate-400 mb-0">
                <Phone :size="14" />
                <span>{{ contact.phone }}</span>
              </p>
            </div>

            <div
              class="rounded-xl p-4 mb-4"
              style="background-color: #0f1e2e;"
            >
              <p class="text-xs text-slate-400 mb-2">
                Cédula: {{ contact.documentNumber }}
              </p>
              <p class="text-sm text-white font-semibold mb-1">
                {{ contact.accountNumber }}
              </p>
              <p class="text-xs text-slate-400 mb-0">
                {{ contact.bank }}
              </p>
            </div>

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
      <h3 class="text-white font-bold text-lg mb-2">No se encontraron contactos</h3>
      <p class="text-sm text-slate-400 mb-5">
        Intenta con otro criterio de búsqueda o registra un nuevo contacto.
      </p>
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none"
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
                {{ isEditing ? 'Actualiza la información del contacto' : 'Registra un nuevo destinatario frecuente' }}
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
              Nombre Completo <span class="text-orange-400">*</span>
            </label>
            <input
              v-model.trim="contactForm.name"
              type="text"
              class="w-full rounded-md border border-white/80 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7]"
              placeholder="Ej: María González"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Cédula de Identidad <span class="text-orange-400">*</span>
            </label>
            <input
              v-model.trim="contactForm.documentNumber"
              type="text"
              class="w-full rounded-md border border-white/80 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7]"
              placeholder="Ej: V-12345678"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Banco <span class="text-orange-400">*</span>
            </label>
            <select
              v-model="contactForm.bank"
              class="w-full rounded-md border border-white/80 bg-[#132333] px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7]"
            >
              <option
                v-for="bank in banks"
                :key="bank"
                :value="bank"
              >
                {{ bank }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Número de Cuenta <span class="text-orange-400">*</span>
            </label>
            <input
              v-model.trim="contactForm.accountNumber"
              type="text"
              class="w-full rounded-md border border-white/80 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7]"
              placeholder="Ej: 0108-1234-56-7891234567"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Correo Electrónico
            </label>
            <input
              v-model.trim="contactForm.email"
              type="email"
              class="w-full rounded-md border border-white/80 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7]"
              placeholder="Ej: correo@email.com"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-2">
              Teléfono
            </label>
            <input
              v-model.trim="contactForm.phone"
              type="text"
              class="w-full rounded-md border border-white/80 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-[#49beb7]"
              placeholder="Ej: 0412-1234567"
            />
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
              @click="closeContactModal"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-bold transition-colors focus:outline-none"
            >
              <Check :size="16" />
              {{ isEditing ? 'Guardar Cambios' : 'Crear Contacto' }}
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
          <span class="font-bold text-white">{{ selectedContact?.name }}</span>.
          Esta acción no se puede deshacer.
        </p>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="border border-white/80 text-slate-200 hover:bg-white/10 px-4 py-3 text-sm font-semibold transition-colors focus:outline-none"
            @click="closeDeleteModal"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-bold transition-colors focus:outline-none"
            @click="deleteContact"
          >
            <Trash2 :size="16" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Users,
  User,
  UserPlus,
  Search,
  Send,
  Edit3,
  Trash2,
  X,
  Check,
  Phone,
  Mail
} from 'lucide-vue-next'

const router = useRouter()
const addToast = inject('addToast', null)

const searchTerm = ref('')
const showContactModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedContact = ref(null)
const formError = ref('')

const banks = [
  'Banco Universitario',
  'Banco de Venezuela',
  'Banesco',
  'Mercantil',
  'Banco Provincial',
  'Banco Nacional de Crédito'
]

const contacts = ref([
  {
    id: 1,
    name: 'María González',
    documentNumber: 'V-12345678',
    bank: 'Banco Universitario',
    accountNumber: '0108-1234-56-7891234567',
    email: 'maria.gonzalez@email.com',
    phone: '0412-1234567'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    documentNumber: 'V-87654321',
    bank: 'Banco de Venezuela',
    accountNumber: '0102-9876-54-3210987654',
    email: 'carlos.rodriguez@email.com',
    phone: '0424-2345678'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    documentNumber: 'V-55555555',
    bank: 'Banesco',
    accountNumber: '0134-5555-66-7777888899',
    email: 'ana.martinez@email.com',
    phone: '0414-3456789'
  },
  {
    id: 4,
    name: 'Pedro Sánchez',
    documentNumber: 'V-33333333',
    bank: 'Mercantil',
    accountNumber: '0105-1111-22-3333444455',
    email: 'pedro.sanchez@email.com',
    phone: '0426-4567890'
  },
  {
    id: 5,
    name: 'Laura Fernández',
    documentNumber: 'V-11111111',
    bank: 'Banco Universitario',
    accountNumber: '0108-6666-77-8888999900',
    email: 'laura.fernandez@email.com',
    phone: '0416-5678901'
  }
])

const contactForm = ref({
  name: '',
  documentNumber: '',
  bank: 'Banco Universitario',
  accountNumber: '',
  email: '',
  phone: ''
})

const transfersThisMonth = computed(() => 12)

const sameBankContacts = computed(() => {
  return contacts.value.filter((contact) => contact.bank === 'Banco Universitario').length
})

const filteredContacts = computed(() => {
  const search = searchTerm.value.trim().toLowerCase()

  if (!search) {
    return contacts.value
  }

  return contacts.value.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      contact.documentNumber.toLowerCase().includes(search) ||
      contact.accountNumber.toLowerCase().includes(search) ||
      contact.bank.toLowerCase().includes(search)
    )
  })
})

const getInitials = (name) => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

const resetForm = () => {
  contactForm.value = {
    name: '',
    documentNumber: '',
    bank: 'Banco Universitario',
    accountNumber: '',
    email: '',
    phone: ''
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
    name: contact.name,
    documentNumber: contact.documentNumber,
    bank: contact.bank,
    accountNumber: contact.accountNumber,
    email: contact.email,
    phone: contact.phone
  }

  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
  selectedContact.value = null
  resetForm()
}

const validateForm = () => {
  if (!contactForm.value.name) {
    formError.value = 'El nombre completo es obligatorio.'
    return false
  }

  if (!contactForm.value.documentNumber) {
    formError.value = 'La cédula de identidad es obligatoria.'
    return false
  }

  if (!contactForm.value.bank) {
    formError.value = 'El banco es obligatorio.'
    return false
  }

  if (!contactForm.value.accountNumber) {
    formError.value = 'El número de cuenta es obligatorio.'
    return false
  }

  formError.value = ''
  return true
}

const saveContact = () => {
  if (!validateForm()) return

  if (isEditing.value && selectedContact.value) {
    contacts.value = contacts.value.map((contact) => {
      if (contact.id === selectedContact.value.id) {
        return {
          ...contact,
          ...contactForm.value
        }
      }

      return contact
    })

    addToast?.('Contacto actualizado correctamente.', 'success')
  } else {
    const newContact = {
      id: Date.now(),
      ...contactForm.value
    }

    contacts.value.unshift(newContact)
    addToast?.('Contacto creado correctamente.', 'success')
  }

  closeContactModal()
}

const openDeleteModal = (contact) => {
  selectedContact.value = contact
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  selectedContact.value = null
  showDeleteModal.value = false
}

const deleteContact = () => {
  if (!selectedContact.value) return

  contacts.value = contacts.value.filter((contact) => contact.id !== selectedContact.value.id)
  addToast?.('Contacto eliminado correctamente.', 'success')
  closeDeleteModal()
}

const transferToContact = (contact) => {
  addToast?.(`Contacto ${contact.name} seleccionado para transferir.`, 'success')

  router.push({
    path: '/dashboard/transfers',
    query: {
      account: contact.accountNumber,
      name: contact.name
    }
  })
}
</script>