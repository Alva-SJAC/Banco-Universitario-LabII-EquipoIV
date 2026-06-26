<template>
  <div class="space-y-6 font-montserrat">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Ingresos -->
      <div
        class="rounded-3xl p-6 border-none shadow-md"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center p-3"
            style="background-color: rgba(8, 95, 99, 0.2);"
          >
            <ArrowDownRight :size="20" style="color: #49beb7;" />
          </div>
          <p class="text-xs md:text-sm text-slate-400 mb-0 font-medium">Total Ingresos</p>
        </div>
        <p class="text-xl md:text-2xl font-bold text-white mb-0">
          Bs {{ formatCurrencyValue(totalIncoming) }}
        </p>
      </div>

      <!-- Total Egresos -->
      <div
        class="rounded-3xl p-6 border-none shadow-md"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center p-3"
            style="background-color: rgba(10, 159, 165, 0.2);"
          >
            <ArrowUpRight :size="20" style="color: #0a9fa5;" />
          </div>
          <p class="text-xs md:text-sm text-slate-400 mb-0 font-medium">Total Egresos</p>
        </div>
        <p class="text-xl md:text-2xl font-bold text-white mb-0">
          Bs {{ formatCurrencyValue(totalOutgoing) }}
        </p>
      </div>

      <!-- Balance Neto -->
      <div
        class="rounded-3xl p-6 border-none shadow-md"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center p-3"
            style="background-color: rgba(8, 95, 99, 0.2);"
          >
            <TrendingUp :size="20" style="color: #49beb7;" />
          </div>
          <p class="text-xs md:text-sm text-slate-400 mb-0 font-medium">Balance Neto</p>
        </div>
        <p class="text-xl md:text-2xl font-bold text-white mb-0">
          Bs {{ formatCurrencyValue(totalIncoming - totalOutgoing) }}
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
      <!-- Cuenta select -->
      <div>
        <label class="text-xs md:text-sm mb-2 block font-semibold text-slate-400">Cuenta</label>
        <div class="relative">
          <select
            v-model="selectedAccount"
            class="w-full bg-[#1a2a38] border border-[#2a3a48]/40 focus:border-[#49beb7]/50 rounded-xl py-3 px-4 text-white text-xs md:text-sm outline-none transition-all cursor-pointer appearance-none"
          >
            <option
              v-for="account in accounts"
              :key="account.id"
              :value="account.id"
            >
              {{ account.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
            <ChevronDown :size="16" />
          </div>
        </div>
      </div>

      <!-- Tipo select -->
      <div>
        <label class="text-xs md:text-sm mb-2 block font-semibold text-slate-400">Tipo</label>
        <div class="relative">
          <select
            v-model="filterType"
            class="w-full bg-[#1a2a38] border border-[#2a3a48]/40 focus:border-[#49beb7]/50 rounded-xl py-3 px-4 text-white text-xs md:text-sm outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="all">Todos</option>
            <option value="incoming">Ingresos</option>
            <option value="outgoing">Egresos</option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
            <ChevronDown :size="16" />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3">
        <button
          class="flex-1 flex items-center justify-center gap-2 hover:bg-[#1a2a38]/80 py-3 rounded-xl text-xs md:text-sm font-bold text-white focus:outline-none transition-colors"
          style="border: 1px solid #2a3a48; background-color: transparent;"
          @click="addToast('Filtros avanzados abiertos')"
        >
          <Filter :size="16" />
          Más Filtros
        </button>
        
        <button
          class="flex-1 flex items-center justify-center gap-2 hover:opacity-90 py-3 rounded-xl text-xs md:text-sm font-bold text-white focus:outline-none transition-colors border-none"
          style="background-color: #085f63;"
          @click="handleExport"
        >
          <Download :size="16" />
          Exportar
        </button>
      </div>
    </div>

    <!-- Movements List -->
    <div>
      <h2 class="text-xl md:text-2xl font-bold text-white mb-4">Transacciones Recientes</h2>

      <div v-if="isLoading" class="text-center py-6 text-slate-400 font-medium">
        Cargando transacciones en tiempo real...
      </div>

      <div class="space-y-3">
        <div
          v-for="movement in filteredMovements"
          :key="movement.id"
          class="rounded-2xl p-4 flex items-center justify-between border-none transition-all duration-300 hover:bg-[#1a2a38]/80 shadow-sm"
          style="background-color: #1a2a38;"
        >
          <div class="flex items-center gap-4 flex-1">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center p-3 flex-shrink-0"
              :style="{ backgroundColor: movement.iconBgColor }"
            >
              <component
                :is="movement.icon"
                :size="20"
                :style="{ color: movement.iconColor }"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white font-bold text-sm md:text-base mb-1 truncate">{{ movement.description }}</p>
              <p class="text-[11px] text-slate-400 mb-0 font-medium">
                {{ movement.date }} • {{ movement.time }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <p
              class="text-sm md:text-base font-extrabold mb-0 whitespace-nowrap"
              :style="{ color: movement.amountColor }"
            >
              {{ formatCurrency(movement.amount) }}
            </p>
            <button
              class="hover:bg-slate-700/30 p-2 rounded-lg text-bu-teal focus:outline-none transition-colors flex items-center justify-center"
              style="background-color: transparent;"
              @click="handleViewReceipt(movement)"
              title="Ver comprobante"
            >
              <FileText :size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Receipt Modal Component -->
    <TransferReceiptModal
      v-if="selectedMovement"
      :is-open="showReceiptModal"
      :transfer-data="selectedMovement"
      @close="handleCloseReceipt"
    />
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  Wallet,
  Download,
  Filter,
  FileText,
  ChevronDown
} from 'lucide-vue-next'
import TransferReceiptModal from '../../components/dashboard/TransferReceiptModal.vue'
import { movementService } from '../../services/movementService'

const addToast = inject('addToast', () => {})

const selectedAccount = ref('all')
const filterType = ref('all')
const showReceiptModal = ref(false)
const selectedMovement = ref(null)

// Variables de estado para la API
const allMovements = ref([])
const isLoading = ref(true)

const accounts = [
  { id: 'all', name: 'Todas las cuentas' },
  { id: '1', name: 'Cuenta Corriente - ****1234' },
  { id: '2', name: 'Cuenta de Ahorros - ****5678' },
  { id: '3', name: 'Cuenta en Dólares - ****9012' }
]

// Cargar movimientos desde el backend al montar el componente
onMounted(async () => {
  try {
    isLoading.value = true
    
    // Intentar obtener los datos reales del servidor de Go
    const data = await movementService.getMovements()
    
    // Mapeamos la respuesta del backend de Go al formato visual del frontend
    allMovements.value = data.map((mov) => {
      const realAmount = mov.amount * (mov.multiplier || 1)
      const isIncoming = realAmount > 0

      // Formatear fecha y hora provenientes de created_at (ej: "2026-04-10T14:30:00Z")
      const dateObj = new Date(mov.created_at)
      const formattedDate = dateObj.toISOString().split('T')[0]
      const formattedTime = dateObj.toTimeString().substring(0, 5)

      return {
        id: mov.id,
        description: mov.description || 'Transferencia',
        amount: realAmount,
        date: formattedDate,
        time: formattedTime,
        icon: isIncoming ? ArrowDownRight : Send,
        iconBgColor: isIncoming ? 'rgba(8, 95, 99, 0.2)' : 'rgba(73, 190, 183, 0.2)',
        iconColor: isIncoming ? '#49beb7' : '#0a9fa5',
        amountColor: isIncoming ? '#49beb7' : '#0a9fa5',
        accountId: mov.account_id || '1'
      }
    })
  } catch (error) {
    console.warn('Backend bloqueado (401) o desconectado. Cargando datos de simulación local para desarrollo.')
    
    const mockData = [
      { id: 101, amount: 4500.00, multiplier: 1, created_at: '2026-06-24T10:15:00Z', description: 'Depósito de Nómina Universitaria', account_id: '1' },
      { id: 102, amount: 350.00, multiplier: -1, created_at: '2026-06-25T14:20:00Z', description: 'Pago de Servicios (Luz/Internet)', account_id: '1' },
      { id: 103, amount: 1200.00, multiplier: 1, created_at: '2026-06-26T09:00:00Z', description: 'Transferencia Recibida - Alquiler', account_id: '2' },
      { id: 104, amount: 680.50, multiplier: -1, created_at: '2026-06-26T16:45:00Z', description: 'Compra de Libros de Ingeniería', account_id: '1' },
      { id: 105, amount: 150.00, multiplier: -1, created_at: '2026-06-26T19:30:00Z', description: 'Pago de Cena', account_id: '3' }
    ]

    allMovements.value = mockData.map(mov => {
      const realAmount = mov.amount * mov.multiplier
      const isIncoming = realAmount > 0
      const dateObj = new Date(mov.created_at)
      
      return {
        id: mov.id,
        description: mov.description,
        amount: realAmount,
        date: dateObj.toISOString().split('T')[0],
        time: dateObj.toTimeString().substring(0, 5),
        icon: isIncoming ? ArrowDownRight : Send,
        iconBgColor: isIncoming ? 'rgba(8, 95, 99, 0.2)' : 'rgba(73, 190, 183, 0.2)',
        iconColor: isIncoming ? '#49beb7' : '#0a9fa5',
        amountColor: isIncoming ? '#49beb7' : '#0a9fa5',
        accountId: mov.account_id
      }
    })
  } finally {
    isLoading.value = false
  }
})

const filteredMovements = computed(() => {
  return allMovements.value.filter((movement) => {
    if (selectedAccount.value !== 'all' && movement.accountId !== selectedAccount.value) {
      return false
    }
    if (filterType.value === 'incoming') return movement.amount > 0
    if (filterType.value === 'outgoing') return movement.amount < 0
    return true
  })
})

const formatCurrencyValue = (val) => {
  return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const formatCurrency = (amount) => {
  const absAmount = Math.abs(amount)
  const formatted = formatCurrencyValue(absAmount)
  return amount < 0 ? `-Bs ${formatted}` : `+Bs ${formatted}`
}

const totalIncoming = computed(() => {
  return allMovements.value
    .filter((m) => m.amount > 0 && (selectedAccount.value === 'all' || m.accountId === selectedAccount.value))
    .reduce((sum, m) => sum + m.amount, 0)
})

const totalOutgoing = computed(() => {
  return allMovements.value
    .filter((m) => m.amount < 0 && (selectedAccount.value === 'all' || m.accountId === selectedAccount.value))
    .reduce((sum, m) => sum + Math.abs(m.amount), 0)
})

const handleViewReceipt = (movement) => {
  const isIncoming = movement.amount > 0
  const myAccountNumber = accounts.find(a => a.id === movement.accountId)?.name.split(' - ')[1] || '****1234'

  const receiptData = {
    date: movement.date,
    time: movement.time,
    fromAccount: isIncoming ? 'Cuenta Externa / Tercero' : `Mi Cuenta (${myAccountNumber})`,
    toAccount: isIncoming ? `Mi Cuenta (${myAccountNumber})` : 'Cuenta Destino',
    recipientName: movement.description,
    amount: Math.abs(movement.amount),
    reference: movement.description,
    transactionId: `TXN${String(1000000000 + movement.id).substring(1)}`,
    status: 'completed'
  }

  selectedMovement.value = receiptData
  showReceiptModal.value = true
}

const handleCloseReceipt = () => {
  showReceiptModal.value = false
  selectedMovement.value = null
}

const handleExport = () => {
  addToast('Exportando historial de movimientos...', 'info')
  
  let content = `Historial de Movimientos - Banco Universitario\n`
  content += `Generado el: ${new Date().toLocaleDateString()}\n`
  content += `═══════════════════════════════════════════════════\n\n`
  content += `Fecha\t\tHora\tDescripción\t\tMonto\n`
  content += `───────────────────────────────────────────────────\n`
  
  filteredMovements.value.forEach(m => {
    content += `${m.date}\t${m.time}\t${m.description.padEnd(20, ' ')}\tBs ${m.amount.toFixed(2)}\n`
  })
  
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `movimientos-${selectedAccount.value}.txt`
  link.click()
  URL.revokeObjectURL(url)
  
  addToast('Reporte exportado exitosamente', 'success')
}
</script>