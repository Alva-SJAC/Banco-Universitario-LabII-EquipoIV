<template>
  <main class="landing-page">
    <!-- Navegación -->
    <Navbar />

    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Información institucional -->
    <AboutSection />

    <!-- Misión y Visión -->
    <MissionVision />

    <!-- Estadísticas -->
    <StatsSection />

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
import HeroSection from '../../components/public/HeroSection.vue'
import AboutSection from '../../components/public/AboutSection.vue'
import MissionVision from '../../components/public/MissionVision.vue'
import StatsSection from '../../components/public/StatsSection.vue'
import ServicesSection from '../../components/public/ServicesSection.vue'
</script>

<style scoped>
.landing-page {
  @apply min-h-screen bg-white overflow-x-hidden;
  scroll-behavior: smooth;
}
</style>
