<template>
  <section id="nosotros" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Título de la sección centrado -->
      <div class="text-center mb-12">
        <h3 class="font-bold tracking-[0.2em] uppercase text-sm mb-3 bg-gradient-to-r from-[#3b9f9a] to-[#51cec8] bg-clip-text text-transparent inline-block">QUIÉNES SOMOS</h3>
        <div class="w-12 h-1 bg-gradient-to-r from-[#3b9f9a] to-[#51cec8] rounded-full mx-auto"></div>
      </div>

      <!-- Contenedor principal para la imagen y el texto -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Espacio para la imagen y el badge -->
        <div class="relative rounded-[2rem] h-[450px]">
          <!-- Placeholder de la imagen -->
          <img src="../../assets/img/AboutUs.png" alt="Equipo de trabajo del Banco Universitario" class="w-full h-full object-cover rounded-[2rem] shadow-lg" />
          
          <!-- Badge flotante -->
          <div class="absolute bottom-8 -left-4 sm:left-8 bg-white rounded-3xl py-4 px-6 shadow-2xl flex items-center space-x-4 border border-gray-50">
            <div class="w-12 h-12 bg-[#2b8682] rounded-xl flex items-center justify-center text-white shadow-sm">
              <!-- Icono de casa relleno (solid) -->
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.47 3.84a.75.75 0 011.06 0l8.99 9a.75.75 0 11-1.06 1.06l-1.46-1.46V20a2 2 0 01-2 2h-3a2 2 0 01-2-2v-4h-2v4a2 2 0 01-2 2h-3a2 2 0 01-2-2v-7.56l-1.46 1.46a.75.75 0 01-1.06-1.06l8.99-9z"></path></svg>
            </div>
            <div>
              <p class="text-xl font-bold text-bu-navy-deep leading-tight">5 años</p>
              <p class="text-xs text-gray-500 font-medium">de trayectoria bancaria</p>
            </div>
          </div>
        </div>

        <!-- Contenido de texto y lista -->
        <div class="lg:pl-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-bu-navy-deep mb-5 leading-tight">
            Más que un banco, <br/><span class="text-bu-teal">tu aliado universitario</span>
          </h2>
          <p class="text-gray-500 mb-8 text-base leading-relaxed font-normal">
            Banco Universitario es una institución financiera creada especialmente para la comunidad universitaria venezolana. Estamos dando el salto a la banca electrónica para ofrecerte los mejores servicios digitales: transferencias, consulta de saldos, movimientos y mucho más, desde cualquier lugar y a cualquier hora.
          </p>

          <div class="space-y-6 mb-8">
            <!-- Item 1 -->
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-10 h-10 bg-[#eaf7f6] rounded-xl flex items-center justify-center text-bu-teal mt-0.5">
                <!-- Icono de graduación/educación -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
              </div>
              <div>
                <h4 class="text-base font-semibold text-bu-navy-deep mb-1">5 Años de Trayectoria</h4>
                <p class="text-gray-500 text-sm leading-relaxed font-normal">El Banco Universitario tiene 5 años en el mercado, prestando servicios financieros a estudiantes mediante sucursales y cajeros electrónicos.</p>
              </div>
            </div>
            
            <!-- Item 2 -->
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-10 h-10 bg-[#eaf7f6] rounded-xl flex items-center justify-center text-bu-teal mt-0.5">
                <!-- Icono de manos estrechándose / compromiso -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
                  <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
                  <path d="M21 3 15 9"/>
                  <path d="m8 16-2-2a1 1 0 1 0-3 3l3.88 3.88a3 3 0 0 0 4.24 0l.88-.88a1 1 0 1 1 3 3l-2.81 2.81a5.79 5.79 0 0 1-7.06.87l-.47-.28a2 2 0 0 0-1.42-.25L3 21"/>
                </svg>
              </div>
              <div>
                <h4 class="text-base font-semibold text-bu-navy-deep mb-1">Compromiso con la Educación</h4>
                <p class="text-gray-500 text-sm leading-relaxed font-normal">Creemos en la educación financiera como herramienta de transformación. Ofrecemos charlas, talleres y capacitaciones gratuitas para nuestra comunidad.</p>
              </div>
            </div>
            
            <!-- Item 3 -->
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-10 h-10 bg-[#eaf7f6] rounded-xl flex items-center justify-center text-bu-teal mt-0.5">
                <!-- Icono de escudo/seguridad -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div>
                <h4 class="text-base font-semibold text-bu-navy-deep mb-1">Seguridad y Confianza</h4>
                <p class="text-gray-500 text-sm leading-relaxed font-normal">Operamos bajo estrictas normas regulatorias con tecnología de punta para proteger tu patrimonio y garantizar la seguridad de tus transacciones.</p>
              </div>
            </div>
          </div>

          <a href="#productos" class="inline-block bg-gradient-to-r from-bu-teal to-[#2b8682] text-white font-medium text-sm py-3 px-6 rounded-full hover:opacity-90 transition-opacity shadow-sm">
            Ver nuestros servicios
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Lógica del componente Quiénes Somos
</script>
