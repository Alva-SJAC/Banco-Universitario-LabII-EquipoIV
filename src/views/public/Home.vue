<template>
  <main class="landing-page">
    <!-- Navegación -->
    <Navbar />

    <!-- Sección de inicio -->
    <section id="inicio" class="h-[600px] bg-bu-navy-deep flex items-center justify-center text-white relative overflow-hidden">
      <!-- Decoración de fondo -->
      <div class="absolute inset-0 opacity-20 pointer-events-none">
        <div class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border-[80px] border-bu-teal/30"></div>
        <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full border-[80px] border-bu-teal/30"></div>
      </div>
      
      <div class="text-center relative z-10 px-4">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Banco <span class="text-bu-teal">Universitario</span>
        </h1>
        <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10 font-light">
          Tu aliado en cada etapa de tu formación profesional y financiera.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
           <router-link to="/banking/login" class="bg-bu-teal hover:bg-bu-teal-dark text-white font-semibold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
             Ingresa a Banca en Línea
           </router-link>
           <a href="#nosotros" class="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-4 px-8 rounded-full transition-all backdrop-blur-sm">
             Conoce más
           </a>
        </div>
      </div>
    </section>

    <!-- Información institucional -->
    <AboutSection />

    <!-- Servicios y métricas -->
    <ServicesSection />

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
import AboutSection from '../../components/public/AboutSection.vue'
import ServicesSection from '../../components/public/ServicesSection.vue'
</script>

<style scoped>
.landing-page {
  @apply min-h-screen bg-white overflow-x-hidden;
  scroll-behavior: smooth;
}
</style>
