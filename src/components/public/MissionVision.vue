<template>
  <section id="proposito" class="py-20 bg-white font-montserrat">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Encabezado de la Sección -->
      <div class="text-center mb-16">
        <h3 class="text-bu-teal font-semibold tracking-[0.2em] uppercase text-sm mb-4">Nuestro Propósito</h3>
        <div class="w-12 h-1 bg-gradient-to-r from-[#3b9f9a] to-[#51cec8] rounded-full mx-auto mb-4"></div>       
        <h2 class="text-4xl md:text-5xl font-bold text-bu-navy-deep">
          Misión, Visión y <span class="text-bu-teal">Objetivos</span>
        </h2>
      </div>

      <!-- Grid de Misión y Visión -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <!-- Tarjeta Misión -->
        <div class="bg-white p-10 rounded-[2rem] border-none flex flex-col items-start transition-all duration-500 hover:-translate-y-4 shadow-[0_0_30px_rgba(0,0,0,0.08)] hover:shadow-[0_0_50px_rgba(73,190,183,0.25)] group">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 bg-gradient-to-br from-[#49beb7] to-[#085f63] shadow-lg shadow-bu-teal/20">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" stroke-width="2"/>
              <circle cx="12" cy="12" r="6" stroke-width="2"/>
              <circle cx="12" cy="12" r="9" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-bu-teal-dark mb-4">Nuestra Misión</h3>
          <p class="text-gray-500 leading-relaxed">
            Somos una confiable institución financiera comprometida con los estudiantes universitarios, brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión de sus recursos y contribuir al crecimiento económico y personal de nuestros clientes.
          </p>
        </div>

        <!-- Tarjeta Visión -->
        <div class="bg-white p-10 rounded-[2rem] border-none flex flex-col items-start transition-all duration-500 hover:-translate-y-4 shadow-[0_0_30px_rgba(0,0,0,0.08)] hover:shadow-[0_0_50px_rgba(73,190,183,0.25)] group">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 bg-gradient-to-br from-[#49beb7] to-[#085f63] shadow-lg shadow-bu-teal/20">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-bu-teal-dark mb-4">Nuestra Visión</h3>
          <p class="text-gray-500 leading-relaxed">
            Queremos ser la principal opción financiera para estudiantes universitarios en el país. Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al cliente y nuestro compromiso con la educación y el desarrollo social.
          </p>
        </div>
      </div>

      <!-- Sección de Objetivos con Proporción Equilibrada -->
      <div class="bg-white p-8 md:p-12 rounded-[3rem] border-none transition-all duration-700 hover:-translate-y-3 shadow-[0_0_40px_rgba(0,0,0,0.06)] hover:shadow-[0_0_60px_rgba(73,190,183,0.12)]">
        <div class="flex items-center gap-6 mb-12">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-[#49beb7] to-[#085f63] shadow-lg shadow-bu-teal/20">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <h3 class="text-3xl font-bold text-bu-teal-dark">Nuestros Objetivos</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <!-- Cuadros con balance de espacio y bordes extra claros -->
          <div v-for="(obj, index) in objetivos" :key="index" 
            class="flex items-start gap-6 p-7 rounded-2xl bg-[#f4fafa] border border-bu-teal/10 transition-all duration-300 hover:border-bu-teal/30 hover:bg-white shadow-[0_4px_15px_rgba(0,0,0,0.01)]">
            
            <!-- Círculo alineado a la primera línea de texto -->
            <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-[#49beb7] to-[#085f63] shadow-md mt-1">
              {{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}
            </div>

            <!-- Texto con padding ajustado para centrado óptico -->
            <div class="flex-1">
              <p class="text-gray-600 text-sm leading-relaxed pt-1.5">
                {{ obj }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const objetivos = [
  "Brindar a los estudiantes universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de nuestros canales digitales y nuestros puntos de atención presencial.",
  "Fomentar el uso de nuestras plataformas digitales para hacer transferencias entre estudiantes sin comisión, depósitos y retiros en efectivo, ofreciendo herramientas tecnológicas fáciles y seguras.",
  "Promover la educación financiera de los estudiantes universitarios, a través de charlas, talleres y capacitaciones sobre temas como el ahorro, la inversión y el uso responsable del crédito.",
  "Establecer alianzas estratégicas con universidades y empresas para ofrecer beneficios exclusivos a nuestros clientes, tales como descuentos en matrículas, becas, prácticas laborales, entre otros.",
  "Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios, para estar siempre a la vanguardia de las necesidades de nuestros clientes y del mercado."
];
</script>