<template>
  <div class="space-y-6">
    <!-- Balance Total Card -->
    <div
      class="rounded-3xl p-8 shadow-xl"
      style="background-color: #085f63;"
    >
      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div>
          <p class="text-xs md:text-sm mb-2 text-slate-200/80 font-medium">
            Balance Total
          </p>
          <div class="flex items-center gap-3">
            <h2 v-if="showBalance" class="text-3xl md:text-4xl font-bold text-white mb-0">
              Bs {{ formatCurrencyValue(balanceData.total) }}
            </h2>
            <h2 v-else class="text-3xl md:text-4xl font-bold text-white mb-0">•• •••.••</h2>
            <button
              @click="showBalance = !showBalance"
              class="text-white/80 hover:text-white transition-colors focus:outline-none"
            >
              <Eye v-if="showBalance" :size="20" />
              <EyeOff v-else :size="20" />
            </button>
          </div>
        </div>
        <div class="text-right">
          <p class="text-white font-bold text-sm md:text-base mb-1">
            {{ balanceData.percentage }} este mes
          </p>
          <p class="text-xs text-slate-200/70 mb-0 font-medium">
            Actualizado hoy
          </p>
        </div>
      </div>

      <!-- Card Info -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <div>
            <p class="text-[10px] md:text-xs text-slate-200/70 mb-1 font-medium">
              Tarjeta
            </p>
            <p class="text-white font-bold text-xs md:text-sm mb-0 font-mono tracking-wider">{{ balanceData.cardNumber }}</p>
          </div>
          <div>
            <p class="text-[10px] md:text-xs text-slate-200/70 mb-1 font-medium">
              Exp.
            </p>
            <p class="text-white font-bold text-xs md:text-sm mb-0 font-mono">{{ balanceData.cardExpiry }}</p>
          </div>
        </div>
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/15"
        >
          <CreditCard :size="24" class="text-white" />
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        v-for="(action, index) in quickActions"
        :key="index"
        @click="navigate(action.path)"
        class="rounded-3xl p-6 text-left transition-all duration-300 hover:scale-[1.01] hover:opacity-90 focus:outline-none border-none shadow-md"
        style="background-color: #1a2a38;"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 p-3"
            style="background-color: rgba(8, 95, 99, 0.3);"
          >
            <component :is="action.icon" :size="24" style="color: #49beb7;" />
          </div>
          <div>
            <p class="text-white font-bold text-sm md:text-base mb-0 leading-tight">{{ action.title }}</p>
            <p class="text-white font-bold text-sm md:text-base mb-0 leading-tight">{{ action.subtitle }}</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Mis Cuentas -->
    <div>
      <h2 class="text-xl md:text-2xl font-bold text-white mb-4">Mis Cuentas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="account in accounts"
          :key="account.id"
          class="rounded-3xl p-6 border-none transition-all duration-300 hover:scale-[1.01] shadow-md"
          style="background-color: #1a2a38;"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-white font-bold text-sm md:text-base mb-1">
                {{ account.name }}
              </h3>
              <!-- Tamaño aumentado a text-xs / md:text-sm y mejor contraste con text-slate-300 -->
              <p class="text-xs md:text-sm text-slate-300 mb-0 font-mono tracking-wider font-medium break-all">
                {{ account.number }}
              </p>
            </div>
            <CreditCard :size="20" style="color: #49beb7;" />
          </div>
          <div>
            <p class="text-xs text-slate-400 mb-1 font-medium">
              Saldo Disponible
            </p>
            <p v-if="showBalance" class="text-xl md:text-2xl font-bold text-white mb-0">
              Bs {{ formatCurrencyValue(account.balance) }}
            </p>
            <p v-else class="text-xl md:text-2xl font-bold text-white mb-0">•• •••.••</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Transacciones Recientes -->
    <div>
      <h2 class="text-xl md:text-2xl font-bold text-white mb-4">Transacciones Recientes</h2>
      <div class="space-y-3">
        <div
          v-for="transaction in recentTransactions"
          :key="transaction.id"
          @click="navigate('/dashboard/movements')"
          class="rounded-2xl p-4 flex items-center justify-between border-none transition-all duration-300 hover:bg-[#1a2a38]/80 hover:scale-[1.005] cursor-pointer shadow-sm"
          style="background-color: #1a2a38;"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center p-3 flex-shrink-0"
              :style="{ backgroundColor: transaction.iconBgColor }"
            >
              <component :is="transaction.icon" :size="20" :style="{ color: transaction.iconColor }" />
            </div>
            <div>
              <p class="text-white font-bold text-sm md:text-base mb-1 leading-tight">{{ transaction.description }}</p>
              <p class="text-[11px] text-slate-400 mb-0 font-medium">
                {{ transaction.date }} • {{ transaction.time }}
              </p>
            </div>
          </div>
          <p
            class="text-sm md:text-base font-extrabold mb-0"
            :style="{ color: transaction.amountColor }"
          >
            {{ formatCurrency(transaction.amount) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Eye,
  EyeOff,
  CreditCard,
  Send,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-vue-next'
import { authService } from '../../services/authService'
import { movementService } from '../../services/movementService'

const router = useRouter()
const showBalance = ref(true)

// Configuración reactiva inicial
const balanceData = ref({
  total: 0.00,
  percentage: '+100%',
  cardNumber: '•••• •••• •••• 4890',
  cardExpiry: '12/29'
})

const quickActions = [
  {
    title: 'Nueva',
    subtitle: 'Transferencia',
    icon: Send,
    path: '/dashboard/transfers'
  },
  {
    title: 'Ver',
    subtitle: 'Movimientos',
    icon: TrendingUp,
    path: '/dashboard/movements'
  }
]

const recentTransactions = ref([])
const accounts = ref([])

onMounted(async () => {
  const currentUser = authService.getCurrentUser()
  const realAccountNumber = currentUser?.account_number || '0123-4567-89-1234567890'
  
  // Inicializar cuenta con datos reales del usuario
  accounts.value = [
    {
      id: '1',
      name: 'Cuenta Corriente',
      number: realAccountNumber,
      balance: 0.00
    }
  ]

  try {
    const responseData = await movementService.getMovements()
    const movementsArray = Array.isArray(responseData) ? responseData : (responseData?.data || [])

    if (movementsArray.length > 0) {
      // El saldo actual es la columna balance del movimiento más reciente (primer elemento)
      const currentBalance = Number(movementsArray[0].balance)
      balanceData.value.total = currentBalance
      accounts.value[0].balance = currentBalance

      // Mapeamos los primeros 4 movimientos coincidiendo exactamente con la paleta de Movements.vue
      recentTransactions.value = movementsArray.slice(0, 4).map((mov) => {
        const realAmount = mov.amount * (mov.multiplier || 1)
        const isIncoming = realAmount > 0
        const dateObj = new Date(mov.created_at)

        return {
          id: mov.id,
          description: mov.description || 'Transferencia',
          amount: realAmount,
          date: dateObj.toISOString().split('T')[0],
          time: dateObj.toTimeString().substring(0, 5),
          icon: isIncoming ? ArrowDownRight : ArrowUpRight,
          iconBgColor: isIncoming ? 'rgba(34, 197, 94, 0.12)' : 'rgba(248, 113, 113, 0.15)',
          iconColor: isIncoming ? '#22c55e' : '#f87171',
          amountColor: isIncoming ? '#22c55e' : '#f87171'
        }
      })
    } else {
      balanceData.value.total = 0.00
      accounts.value[0].balance = 0.00
      recentTransactions.value = []
    }
  } catch (error) {
    console.warn('Error al cargar movimientos en Inicio, usando datos locales de respaldo:', error)
    
    // Datos de respaldo en caso de error o backend offline
    balanceData.value.total = 5000.00
    accounts.value[0].balance = 5000.00
    
    recentTransactions.value = [
      {
        id: 1,
        description: 'Bono de bienvenida',
        amount: 5000.00,
        date: new Date().toISOString().split('T')[0],
        time: '12:00',
        icon: ArrowDownRight,
        iconBgColor: 'rgba(34, 197, 94, 0.12)',
        iconColor: '#22c55e',
        amountColor: '#22c55e'
      }
    ]
  }
})

const formatCurrencyValue = (val) => {
  return typeof val === 'number' ? val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0.00'
}

const formatCurrency = (amount) => {
  const absAmount = Math.abs(amount)
  const formatted = formatCurrencyValue(absAmount)
  return amount < 0 ? `-Bs ${formatted}` : `+Bs ${formatted}`
}

const navigate = (path) => {
  router.push(path)
}
</script>