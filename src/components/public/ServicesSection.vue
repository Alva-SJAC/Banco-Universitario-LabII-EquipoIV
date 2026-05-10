<template>
  <section id="productos" class="py-24 bg-bu-offwhite relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Encabezado de la sección -->
      <div class="text-center mb-16">
        <h3 class="text-bu-teal font-semibold tracking-[0.2em] uppercase text-sm mb-4">PRODUCTOS Y SERVICIOS</h3>
        <div class="w-12 h-1 bg-bu-teal mx-auto mb-8 rounded-full"></div>
        <h2 class="text-4xl md:text-5xl font-bold text-bu-navy-deep mb-6">
          Servicios financieros <span class="text-bu-teal">para la comunidad universitaria</span>
        </h2>
        <p class="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
          Banco Universitario ofrece soluciones financieras diseñadas especialmente para las necesidades de estudiantes y personal académico.
        </p>
      </div>

      <!-- Grid de tarjetas de servicios -->
      <div class="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="bg-white rounded-[2rem] p-8 md:p-10 w-full max-w-[380px] flex flex-col shadow-sm hover:shadow-2xl hover:shadow-bu-teal/20 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
        >
          <!-- Expanding Top Border (Aparece desde el centro) -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 bg-bu-teal-dark transition-all duration-500 ease-out w-0 group-hover:w-full"></div>

          <!-- Icon Container -->
          <div class="relative w-16 h-16 mb-8 flex-shrink-0">
             <!-- Default background -->
             <div class="absolute inset-0 rounded-2xl bg-bu-teal/10 transition-opacity duration-500 group-hover:opacity-0"></div>
             
             <!-- Hover gradient background (Usa colores corporativos) -->
             <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-bu-teal-dark to-bu-navy-deep opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-lg"></div>
             
             <!-- Dynamically render the SVG based on service.icon -->
             <div class="absolute inset-0 flex items-center justify-center z-10 transform transition-transform duration-500 group-hover:scale-110">
               <template v-if="service.icon === 'transfer'">
                  <svg class="w-8 h-8 transition-colors duration-500 group-hover:text-white text-bu-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
               </template>
               <template v-else-if="service.icon === 'deposit'">
                  <svg class="w-8 h-8 transition-colors duration-500 group-hover:text-white text-bu-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
               </template>
               <template v-else-if="service.icon === 'withdrawal'">
                  <svg class="w-8 h-8 transition-colors duration-500 group-hover:text-white text-bu-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 10h3v4h-3z"></path>
                  </svg>
               </template>
               <template v-else-if="service.icon === 'tuition'">
                  <svg class="w-8 h-8 transition-colors duration-500 group-hover:text-white text-bu-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.5L3 9l9 4.5L21 9l-9-4.5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.5 10.25v4.5C5.5 16 8.5 18 12 18s6.5-2 6.5-3.25v-4.5"></path>
                  </svg>
               </template>
               <template v-else-if="service.icon === 'scholarship'">
                  <svg class="w-8 h-8 transition-colors duration-500 group-hover:text-white text-bu-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 13a4 4 0 100-8 4 4 0 000 8z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 12.5l-2 7 4-2 4 2-2-7"></path>
                  </svg>
               </template>
             </div>
          </div>

          <h3 class="text-xl font-bold text-bu-navy-deep mb-4">{{ service.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6">
            {{ service.description }}
          </p>

          <ul class="space-y-3 mb-8 flex-grow">
            <li v-for="(feature, index) in service.features" :key="index" class="flex items-start text-sm text-gray-500">
              <div class="w-5 h-5 rounded-full bg-bu-teal/10 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-bu-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <a href="#" class="inline-flex items-center text-bu-teal font-medium hover:text-bu-teal-dark transition-colors mt-auto text-sm group/link">
            Más información 
            <svg class="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    id: 1,
    title: 'Transferencias Sin Comisión',
    description: 'Ofrecemos un servicio de transferencias entre estudiantes sin costo alguno, facilitando el intercambio de dinero de manera rápida, segura y eficiente.',
    features: ['Sin costo entre estudiantes', 'Transferencias inmediatas', 'Disponible 24/7'],
    icon: 'transfer'
  },
  {
    id: 2,
    title: 'Depósitos en Efectivo',
    description: 'Realiza depósitos en efectivo de manera sencilla y cómoda en cualquiera de nuestras sucursales, disponible las 24 horas del día, los 7 días de la semana.',
    features: ['Disponible 24/7', 'En todas las sucursales', 'Sin límite de horario'],
    icon: 'deposit'
  },
  {
    id: 3,
    title: 'Retiros en Efectivo',
    description: 'Realiza retiros en efectivo de manera rápida y segura en cualquiera de nuestras sucursales, con la tranquilidad de que tus fondos están seguros y protegidos.',
    features: ['Fondos seguros y protegidos', 'Retiros rápidos', 'Red de sucursales'],
    icon: 'withdrawal'
  },
  {
    id: 4,
    title: 'Pago de Matrícula Estudiantil',
    description: 'Paga tu matrícula universitaria de forma rápida y sencilla desde nuestra plataforma en línea, disponible las 24 horas del día sin necesidad de filas.',
    features: ['Pago 100% en línea', 'Disponible las 24 horas', 'Comprobante inmediato'],
    icon: 'tuition'
  },
  {
    id: 5,
    title: 'Cobro de Becas Estudiantiles',
    description: 'Cobra tus becas estudiantiles de manera sencilla y eficiente en cualquiera de nuestras sucursales, accediendo a tus fondos de forma rápida y segura.',
    features: ['Acceso rápido a fondos', 'En todas las sucursales', 'Proceso simplificado'],
    icon: 'scholarship'
  }
]);
</script>
