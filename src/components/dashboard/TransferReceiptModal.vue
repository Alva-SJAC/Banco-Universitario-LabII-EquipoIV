<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        @click="close"
      >
        <div
          class="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl"
          @click.stopPropagation
        >
          <!-- Close Button -->
          <button
            @click="close"
            class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-[#334155] focus:outline-none"
            style="background-color: #1e293b;"
          >
            <X :size="16" class="text-white" />
          </button>

          <!-- Card Content -->
          <div
            class="border rounded-3xl shadow-2xl p-6 space-y-4"
            style="background-color: #1e293b; border-color: #334155;"
          >
            <!-- Header -->
            <div class="text-center space-y-2 mt-4">
              <div class="flex justify-center">
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center bg-bu-teal/10"
                >
                  <Check :size="28" style="color: #49beb7;" />
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white mb-1">
                  ¡Transferencia Exitosa!
                </h3>
                <p style="color: #94a3b8;" class="text-xs mb-0">
                  El dinero será acreditado en pocos minutos
                </p>
              </div>
            </div>

            <!-- Divider -->
            <div style="border-top: 1px solid #334155;" />

            <!-- Receipt Details -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span style="color: #94a3b8;" class="text-xs md:text-sm">
                  ID Transacción
                </span>
                <span class="text-white font-mono text-xs md:text-sm">
                  {{ transferData.transactionId }}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span style="color: #94a3b8;" class="text-xs md:text-sm">
                  Fecha y Hora
                </span>
                <span class="text-white text-xs md:text-sm">
                  {{ transferData.date }} {{ transferData.time }}
                </span>
              </div>

              <div style="border-top: 1px dashed #334155;" />

              <div>
                <span style="color: #94a3b8;" class="text-xs block mb-1">
                  Cuenta Origen
                </span>
                <span class="text-white text-xs md:text-sm font-medium">
                  {{ transferData.fromAccount }}
                </span>
              </div>

              <div>
                <span style="color: #94a3b8;" class="text-xs block mb-1">
                  Beneficiario
                </span>
                <span class="text-white text-xs md:text-sm font-medium">
                  {{ transferData.recipientName }}
                </span>
              </div>

              <div>
                <span style="color: #94a3b8;" class="text-xs block mb-1">
                  Cuenta Destino
                </span>
                <span class="text-white text-xs md:text-sm font-medium">
                  {{ transferData.toAccount }}
                </span>
              </div>

              <div style="border-top: 1px dashed #334155;" />

              <div>
                <span style="color: #94a3b8;" class="text-xs block mb-1">
                  Monto Transferido
                </span>
                <span class="text-lg md:text-xl font-bold" style="color: #49beb7;">
                  Bs {{ formatCurrencyValue(transferData.amount) }}
                </span>
              </div>

              <div v-if="transferData.reference">
                <span style="color: #94a3b8;" class="text-xs block mb-1">
                  Referencia
                </span>
                <span class="text-white text-xs md:text-sm">
                  {{ transferData.reference }}
                </span>
              </div>
            </div>

            <!-- Divider -->
            <div style="border-top: 1px solid #334155;" />

            <!-- Actions -->
            <div class="space-y-2">
              <button
                class="w-full flex items-center justify-center gap-2 hover:opacity-90 py-2.5 rounded-xl font-bold text-sm text-white focus:outline-none transition-colors border-0"
                style="background-color: #49beb7;"
                @click="handleDownloadPDF"
              >
                <Download :size="16" />
                Descargar PDF
              </button>

              <div class="grid grid-cols-2 gap-2">
                <button
                  class="flex items-center justify-center gap-1.5 hover:bg-slate-700 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none transition-colors"
                  style="border: 1px solid #334155; background-color: transparent;"
                  @click="handlePrint"
                >
                  <Printer :size="16" />
                  Imprimir
                </button>

                <button
                  class="flex items-center justify-center gap-1.5 hover:bg-slate-700 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none transition-colors"
                  style="border: 1px solid #334155; background-color: transparent;"
                  @click="handleShare"
                >
                  <Share2 :size="16" />
                  Compartir
                </button>
              </div>
            </div>

            <!-- Footer Note -->
            <div
              class="p-3 rounded-xl text-center"
              style="background-color: rgba(73, 190, 183, 0.1);"
            >
              <p class="text-[10px] mb-0" style="color: #94a3b8;">
                Este comprobante es válido como prueba de la transacción realizada
              </p>
            </div>

            <!-- Bottom Close Button -->
            <div class="pt-2">
              <button
                class="w-full py-2.5 rounded-xl font-semibold text-xs text-white focus:outline-none transition-colors hover:bg-slate-700"
                style="border: 1px solid #334155; background-color: #1e293b;"
                @click="close"
              >
                Cerrar y volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { inject } from 'vue'
import { Download, Check, Share2, Printer, X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  transferData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const addToast = inject('addToast', () => {})

const close = () => {
  emit('close')
}

const formatCurrencyValue = (val) => {
  return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const generateReceiptContent = () => {
  return `
BANCO UNIVERSITARIO
Comprobante de Transferencia
═══════════════════════════════════

ID Transacción: ${props.transferData.transactionId}
Fecha: ${props.transferData.date}
Hora: ${props.transferData.time}
Estado: EXITOSA

DATOS DE LA TRANSFERENCIA
─────────────────────────────────

Cuenta Origen:
${props.transferData.fromAccount}

Beneficiario:
${props.transferData.recipientName}

Cuenta Destino:
${props.transferData.toAccount}

Monto:
Bs ${formatCurrencyValue(props.transferData.amount)}

Referencia:
${props.transferData.reference || "Sin referencia"}

═══════════════════════════════════
Este comprobante es válido como
prueba de la transacción realizada.

Banco Universitario
www.bancouniversitario.com
  `.trim()
}

const handleDownloadPDF = () => {
  addToast('Comprobante descargado exitosamente', 'success')
  
  const content = generateReceiptContent()
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `comprobante-${props.transferData.transactionId}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

const handlePrint = () => {
  addToast('Preparando impresión...', 'info')
  window.print()
}

const handleShare = async () => {
  const content = generateReceiptContent()
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Comprobante de Transferencia',
        text: content
      })
      addToast('Comprobante compartido', 'success')
    } catch (error) {
      // Ignorar abortado por usuario, de lo contrario reportar error
      if (error.name !== 'AbortError') {
        addToast('Error al compartir', 'error')
      }
    }
  } else {
    // Fallback: copiar al portapapeles
    try {
      await navigator.clipboard.writeText(content)
      addToast('Comprobante copiado al portapapeles', 'success')
    } catch (err) {
      addToast('Error al copiar comprobante', 'error')
    }
  }
}
</script>
