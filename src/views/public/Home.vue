<template>
  <main class="landing-page">
    <!-- Navegación -->
    <Navbar />

    <!-- Sección de inicio -->
    <section id="inicio" class="h-[600px] bg-bu-navy-deep flex items-center justify-center text-white">
      <div class="text-center">
        <h1 class="text-5xl font-bold mb-4">Banco Universitario</h1>
        <p class="text-xl opacity-80">Tu aliado en cada etapa de tu formación.</p>
        <div class="mt-8 p-4 border border-dashed border-white/30 rounded italic opacity-50">
          Banner principal
        </div>
      </div>
    </section>

    <!-- Información institucional -->
    <section id="nosotros" class="bu-section bu-container text-center">
      <h2 class="text-3xl font-bold mb-8">Quiénes Somos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-12 bg-bu-offwhite rounded-3xl border border-bu-teal/10 italic text-bu-text-muted">
          Misión y Visión
        </div>
        <div class="p-12 bg-bu-offwhite rounded-3xl border border-bu-teal/10 italic text-bu-text-muted">
          Valores corporativos
        </div>
      </div>
    </section>

    <!-- Servicios y métricas -->
    <section id="productos" class="bu-section bg-gray-50">
      <div class="bu-container text-center">
        <h2 class="text-3xl font-bold mb-12 text-bu-navy">Nuestros Servicios</h2>
        <div class="p-20 border-2 border-dashed border-gray-200 rounded-3xl italic text-gray-400">
          Detalle de servicios y estadísticas
        </div>
      </div>
    </section>

    <!-- Pie de página -->
    <Footer />

    <!-- Botón de acceso rápido -->
    <FloatingBancaBtn />
  </main>
</template>

<script setup>
import Navbar from '../../components/layout/Navbar.vue'
import Footer from '../../components/layout/Footer.vue'
import FloatingBancaBtn from '../../components/layout/FloatingBancaBtn.vue'
/* Los componentes se importarán aquí */
</script>

<style scoped>
.landing-page {
  @apply min-h-screen bg-white overflow-x-hidden;
}
</style>
