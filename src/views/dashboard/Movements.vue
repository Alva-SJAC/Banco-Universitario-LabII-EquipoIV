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
import { ref, computed, inject } from 'vue'
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

const addToast = inject('addToast', () => {})

const selectedAccount = ref('all')
const filterType = ref('all')
const showReceiptModal = ref(false)
const selectedMovement = ref(null)

const accounts = [
  { id: 'all', name: 'Todas las cuentas' },
  { id: '1', name: 'Cuenta Corriente - ****1234' },
  { id: '2', name: 'Cuenta de Ahorros - ****5678' },
  { id: '3', name: 'Cuenta en Dólares - ****9012' }
]

const allMovements = [
  {
    id: 1,
    description: 'Transferencia a María',
    amount: -150.00,
    date: '2026-04-10',
    time: '14:30',
    icon: Send,
    iconBgColor: 'rgba(8, 95, 99, 0.2)',
    iconColor: '#49beb7',
    amountColor: '#0a9fa5',
    accountId: '1'
  },
  {
    id: 2,
    description: 'Depósito - Salario',
    amount: 2500.00,
    date: '2026-04-09',
    time: '08:00',
    icon: ArrowDownRight,
    iconBgColor: 'rgba(8, 95, 99, 0.2)',
    iconColor: '#49beb7',
    amountColor: '#49beb7',
    accountId: '1'
  },
  {
    id: 3,
    description: 'Pago - Servicios',
    amount: -89.50,
    date: '2026-04-08',
    time: '16:45',
    icon: Send,
    iconBgColor: 'rgba(73, 190, 183, 0.2)',
    iconColor: '#0a9fa5',
    amountColor: '#0a9fa5',
    accountId: '1'
  },
  {
    id: 4,
    description: 'Transferencia recibida',
    amount: 350.00,
    date: '2026-04-07',
    time: '11:20',
    icon: ArrowDownRight,
    iconBgColor: 'rgba(8, 95, 99, 0.2)',
    iconColor: '#49beb7',
    amountColor: '#49beb7',
    accountId: '2'
  },
  {
    id: 5,
    description: 'Transferencia a Carlos',
    amount: -200.00,
    date: '2026-04-06',
    time: '10:15',
    icon: Send,
    iconBgColor: 'rgba(8, 95, 99, 0.2)',
    iconColor: '#49beb7',
    amountColor: '#0a9fa5',
    accountId: '1'
  },
  {
    id: 6,
    description: 'Pago - CANTV',
    amount: -45.00,
    date: '2026-04-05',
    time: '09:30',
    icon: Wallet,
    iconBgColor: 'rgba(73, 190, 183, 0.2)',
    iconColor: '#0a9fa5',
    amountColor: '#0a9fa5',
    accountId: '2'
  },
  {
    id: 7,
    description: 'Transferencia de Ana',
    amount: 120.00,
    date: '2026-04-04',
    time: '15:00',
    icon: ArrowDownRight,
    iconBgColor: 'rgba(8, 95, 99, 0.2)',
    iconColor: '#49beb7',
    amountColor: '#49beb7',
    accountId: '3'
  },
  {
    id: 8,
    description: 'Transferencia a Pedro',
    amount: -80.00,
    date: '2026-04-03',
    time: '13:45',
    icon: Send,
    iconBgColor: 'rgba(8, 95, 99, 0.2)',
    iconColor: '#49beb7',
    amountColor: '#0a9fa5',
    accountId: '1'
  }
]

const filteredMovements = computed(() => {
  return allMovements.filter((movement) => {
    // Filtro de Cuenta
    if (selectedAccount.value !== 'all' && movement.accountId !== selectedAccount.value) {
      return false
    }
    // Filtro de Tipo
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
  return allMovements
    .filter((m) => m.amount > 0 && (selectedAccount.value === 'all' || m.accountId === selectedAccount.value))
    .reduce((sum, m) => sum + m.amount, 0)
})

const totalOutgoing = computed(() => {
  return allMovements
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
