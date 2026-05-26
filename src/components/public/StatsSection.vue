<template>
  <section ref="statsSection" class="relative overflow-hidden bg-gradient-to-r from-[#49beb7] to-[#1A6B7C] py-16 font-montserrat">
    <!-- Círculos decorativos de fondo con estilos en línea para evitar caché o problemas de compilación -->
    <div class="absolute -top-1/2 -left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none" style="border: 1px solid rgba(255, 255, 255, 0.08);"></div>
    <div class="absolute -bottom-1/2 -right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none" style="border: 1px solid rgba(255, 255, 255, 0.05);"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        
        <div v-for="(stat, index) in stats" :key="index" class="flex items-center w-full md:w-auto justify-center">
          <!-- Item de estadísticas -->
          <div class="text-center px-4 md:px-12 lg:px-20">
            <div class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
              {{ formatNumber(stat) }}<span class="text-white/85 text-[0.2em] font-medium ml-0.5">{{ stat.suffix }}</span>
            </div>
            <div class="text-[0.9rem] md:text-[1rem] font-medium text-white/80">
              {{ stat.label }}
            </div>
          </div>
          
          <!-- Divisor vertical (visible solo en pantallas medianas y grandes) -->
          <div v-if="index < stats.length - 1" class="hidden md:block w-px h-16 bg-white/20 self-center"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const statsSection = ref(null)
const hasAnimated = ref(false)

// Configuración de los ítems de estadística
const stats = ref([
  { value: 50000, displayValue: 0, suffix: '+', label: 'Usuarios Activos', format: true },
  { value: 15, displayValue: 0, suffix: '+', label: 'Universidades Aliadas', format: false },
  { value: 98, displayValue: 0, suffix: '%', label: 'Índice de Satisfacción', format: false }
])

// Formatea el número a formato local (ej. 50.000 para miles en español)
const formatNumber = (stat) => {
  if (stat.format) {
    return stat.displayValue.toLocaleString('es-ES')
  }
  return stat.displayValue
}

// Inicia animación de incremento progresivo
const animateCounters = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  const duration = 2000 // Duración total
  const steps = 60 // Cuadros por segundo aprox.
  const intervalTime = duration / steps

  stats.value.forEach(stat => {
    const increment = stat.value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        stat.displayValue = stat.value
        clearInterval(timer)
      } else {
        stat.displayValue = Math.floor(current)
      }
    }, intervalTime)
  })
}

// Observa visibilidad del elemento en pantalla
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect() // Solo anima una vez
        }
      })
    },
    { threshold: 0.2 }
  )

  if (statsSection.value) {
    observer.observe(statsSection.value)
  }
})
</script>
