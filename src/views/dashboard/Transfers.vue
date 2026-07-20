<template>
  <div class="space-y-6 font-montserrat max-w-3xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-2">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center p-3 shadow-lg"
        style="background-color: rgba(8, 95, 99, 0.25);"
      >
        <Send :size="24" style="color: #49beb7;" />
      </div>
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-1">Transferencias</h2>
        <p class="text-xs text-slate-400 mb-0">Envía dinero de forma rápida y segura</p>
      </div>
    </div>

    <!-- Formulario de Transferencia -->
    <div class="rounded-3xl p-8 border border-[#223446] shadow-xl relative overflow-hidden" style="background-color: #1a2a38;">
      <!-- Decorative element -->
      <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none" style="background-color: #49beb7;"></div>
      
      <form @submit.prevent="handleTransfer" class="space-y-6 relative z-10">
        <!-- Cuenta Destino -->
        <div>
          <label class="block text-xs font-bold text-white mb-2 uppercase tracking-wide">
            Cuenta Destino <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User :size="18" class="text-slate-400" />
            </div>
            <input
              v-model.trim="transferForm.toAccount"
              type="text"
              class="w-full rounded-xl border border-[#2a3a48] bg-[#132333] pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#49beb7] focus:ring-1 focus:ring-[#49beb7] transition-all"
              placeholder="Ej: 0108-1234-56-7891234567"
              :disabled="isLoading"
              required
            />
          </div>
        </div>

        <!-- Monto -->
        <div>
          <label class="block text-xs font-bold text-white mb-2 uppercase tracking-wide">
            Monto a Transferir (Bs) <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span class="text-slate-400 font-bold">Bs</span>
            </div>
            <input
              v-model.number="transferForm.amount"
              type="number"
              step="0.01"
              min="0.01"
              class="w-full rounded-xl border border-[#2a3a48] bg-[#132333] pl-11 pr-4 py-3.5 text-lg font-semibold text-white placeholder-slate-500 outline-none focus:border-[#49beb7] focus:ring-1 focus:ring-[#49beb7] transition-all"
              placeholder="0.00"
              :disabled="isLoading"
              required
            />
          </div>
        </div>

        <!-- Referencia / Concepto -->
        <div>
          <label class="block text-xs font-bold text-white mb-2 uppercase tracking-wide">
            Concepto
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FileText :size="18" class="text-slate-400" />
            </div>
            <input
              v-model.trim="transferForm.description"
              type="text"
              class="w-full rounded-xl border border-[#2a3a48] bg-[#132333] pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#49beb7] focus:ring-1 focus:ring-[#49beb7] transition-all"
              placeholder="Ej: Pago de deuda"
              :disabled="isLoading"
              maxlength="100"
            />
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3">
          <AlertCircle :size="18" class="text-red-400 flex-shrink-0" />
          <p class="text-sm text-red-400 font-medium mb-0">{{ errorMessage }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white shadow-lg shadow-[#085f63]/30 transition-all focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
          :class="isLoading ? 'bg-[#0a9fa5]' : 'bg-[#085f63] hover:bg-[#0a9fa5] hover:scale-[1.01]'"
        >
          <Loader2 v-if="isLoading" :size="20" class="animate-spin" />
          <Send v-else :size="20" />
          {{ isLoading ? 'Procesando transferencia...' : 'Realizar Transferencia' }}
        </button>
      </form>
    </div>

    <!-- Comprobante Modal -->
    <TransferReceiptModal
      :is-open="showReceiptModal"
      :transfer-data="receiptData"
      @close="closeReceiptModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Send, User, FileText, Loader2, AlertCircle } from 'lucide-vue-next'
import { transferService } from '../../services/transferService'
import { authService } from '../../services/authService'
import TransferReceiptModal from '../../components/dashboard/TransferReceiptModal.vue'

const route = useRoute()
const router = useRouter()
const addToast = inject('addToast', () => {})

const currentUser = authService.getCurrentUser()
const fromAccount = currentUser?.account_number || '0108-****-****-****'

const transferForm = ref({
  toAccount: '',
  amount: '',
  description: ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const showReceiptModal = ref(false)
const receiptData = ref({})

// Check query parameters to prefill account
onMounted(() => {
  if (route.query.account) {
    transferForm.value.toAccount = route.query.account
  }
})

const handleTransfer = async () => {
  errorMessage.value = ''
  
  if (!transferForm.value.toAccount || transferForm.value.toAccount.length < 20) {
    errorMessage.value = 'El número de cuenta destino es inválido (20 dígitos)'
    return
  }

  if (!transferForm.value.amount || transferForm.value.amount <= 0) {
    errorMessage.value = 'El monto debe ser mayor a 0'
    return
  }

  try {
    isLoading.value = true
    const response = await transferService.createTransfer(transferForm.value)
    
    // Asumimos que response.data (el payload del backend) retorna los datos de la creación
    const responseData = response?.data || response || {}
    
    // Preparar datos para el comprobante
    const dateObj = new Date()
    receiptData.value = {
      transactionId: responseData.id || `TXN${Math.floor(Math.random() * 1000000000)}`,
      date: dateObj.toLocaleDateString('es-VE'),
      time: dateObj.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      fromAccount: fromAccount,
      recipientName: route.query.name || 'Titular de Cuenta',
      toAccount: transferForm.value.toAccount,
      amount: transferForm.value.amount,
      reference: transferForm.value.description || 'Transferencia'
    }

    addToast('Transferencia realizada con éxito', 'success')
    showReceiptModal.value = true
    
    // Limpiar form
    transferForm.value = {
      toAccount: '',
      amount: '',
      description: ''
    }
    
    // Limpiar query params si existían
    if (route.query.account) {
      router.replace({ query: {} })
    }
  } catch (error) {
    console.error('Error al transferir:', error)
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Ha ocurrido un error al procesar la transferencia. Verifica tu saldo.'
    }
    addToast('Error al procesar la transferencia', 'error')
  } finally {
    isLoading.value = false
  }
}

const closeReceiptModal = () => {
  showReceiptModal.value = false
}
</script>
