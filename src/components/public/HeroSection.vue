<template>
  <section class="relative flex items-center bg-bu-navy-deep overflow-hidden font-montserrat">
    <!-- Decoración de fondo -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border-[80px] border-bu-teal/30"></div>
      <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full border-[80px] border-bu-teal/30"></div>
    </div>

    <!-- Contenedor Principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Bloque de Texto -->
        <div class="text-white space-y-8 text-center lg:text-left">
          <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span class="w-2 h-2 bg-bu-teal rounded-full animate-pulse"></span>
            <span class="text-xs font-medium tracking-widest uppercase">Banco creado para ti</span>
          </div>

          <h1 class="text-4xl md:text-6xl font-bold leading-tight">
            Finanzas inteligentes para la <span class="text-bu-teal">comunidad universitaria</span>
          </h1>

          <p class="text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Banco Universitario nace para acompañar a estudiantes, docentes y personal académico en cada etapa de su vida financiera.
          </p>

          <div class="flex flex-row items-center justify-center lg:justify-start gap-4 max-w-md mx-auto lg:mx-0">
            <a href="#productos" class="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 bg-white text-bu-navy-deep font-bold rounded-xl hover:bg-bu-teal hover:text-white transition-all duration-300 shadow-lg text-center text-sm md:text-lg whitespace-nowrap">
              Explorar Productos
            </a>
            <a href="#nosotros" class="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 text-center text-sm md:text-lg whitespace-nowrap">
              Conocer Más
            </a>
          </div>
        </div>

        <!-- Bloque de Imagen y Estadísticas -->
        <div class="relative group">
          <!-- Contenedor del Marco Blanco -->
          <div class="bg-white p-3 md:p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-72 sm:h-96 lg:h-auto">
            
            <!-- Imagen con bordes redondeados internos -->
            <div class="w-full h-full overflow-hidden rounded-[1.8rem] relative">
              <img 
                src="../../assets/img/Hero.png" 
                alt="Biblioteca Universitaria" 
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" 
              />

              <!-- Overlay de Estadísticas: Centrado, rectangular y con bordes redondeados -->
              <div class="absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-xl p-4 md:p-6 flex justify-around items-center text-center">
                <div class="flex-1">
                  <p class="text-xl font-bold text-bu-teal-dark md:text-2xl">+50K</p>
                  <p class="text-xs text-gray-500 font-medium">Estudiantes</p>
                </div>
                <div class="w-px h-10 bg-gray-100 mx-2"></div>
                <div class="flex-1">
                  <p class="text-xl font-bold text-bu-teal-dark md:text-2xl">15+</p>
                  <p class="text-xs text-gray-500 font-medium">Universidades</p>
                </div>
                <div class="w-px h-10 bg-gray-100 mx-2"></div>
                <div class="flex-1">
                  <p class="text-xl font-bold text-bu-teal-dark md:text-2xl">98%</p>
                  <p class="text-xs text-gray-500 font-medium">Satisfacción</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Adorno decorativo posterior -->
          <div class="absolute -top-6 -right-6 w-32 h-32 bg-bu-teal/20 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>

    <!-- Indicador de Scroll Dinámico -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center space-y-2 opacity-60">
      <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
        <div class="w-1 h-2 bg-white rounded-full scroll-dot"></div>
      </div>
      <span class="text-[12px] text-white uppercase tracking-widest font-medium">Scroll</span>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
section {
  min-height: calc(100vh - 80px);
}

@media (max-width: 640px) {
  section {
    min-height: auto;
  }
}

.scroll-dot {
  animation: scroll-move 2s infinite;
}

@keyframes scroll-move {
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(15px); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>