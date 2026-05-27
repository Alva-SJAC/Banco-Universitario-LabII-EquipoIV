<template>
  <section id="contacto" class="relative py-20 overflow-hidden font-montserrat">
    <div class="absolute inset-0 bg-[url('/image_65893e.jpg')] bg-cover bg-center">
      <div class="absolute inset-0 bg-gradient-to-r from-[#085f63]/95 via-[#2c9197]/90 to-[#49beb7]/85 md:to-[#49beb7]/75"></div>
    </div>

    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute -right-20 -top-20 w-96 h-96 rounded-full border-[1px] border-white"></div>
      <div class="absolute -left-20 bottom-10 w-64 h-64 rounded-full border-[20px] border-white/40"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <div class="lg:col-span-6 text-white space-y-8">
          <div class="space-y-4">
            <h3 class="text-[#51cec8] font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">Únete Hoy</h3>
            <h2 class="text-4xl sm:text-5xl font-bold leading-tight">
              Abre tu cuenta en<br class="hidden sm:inline" /> menos de <span class="text-[#51cec8]">5 minutos</span>
            </h2>
            <p class="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
              Sólo necesitas tu cédula de identidad y carné universitario vigente. Sin filas, sin papeleo, todo 100% digital desde tu dispositivo.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#" class="inline-flex items-center justify-center gap-2 bg-[#49beb7] hover:bg-[#3b9f9a] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-[#085f63]/20 transition-all duration-300 transform hover:-translate-y-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Abrir Cuenta Digital
            </a>
            <a href="tel:+582125555555" class="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-300 backdrop-blur-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +58 212-555-5555
            </a>
          </div>

          <div class="space-y-4 pt-4 border-t border-white/10 max-w-md">
            <div v-for="(step, index) in pasos" :key="index" class="flex items-center gap-4">
              <div class="flex-shrink-0 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs font-bold bg-white/5">
                {{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}
              </div>
              <p class="text-white/80 text-sm font-medium">{{ step }}</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 lg:ml-auto w-full max-w-lg">
          <div class="bg-[#085f63]/40 border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl backdrop-blur-md">
            <div class="mb-6">
              <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">¿Tienes alguna pregunta?</h3>
              <p class="text-white/70 text-xs sm:text-sm">Escríbenos y un asesor se comunicará contigo a la brevedad.</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="space-y-1.5">
                <label class="text-white/80 text-xs font-medium tracking-wide">Nombre completo</label>
                <input type="text" v-model="form.nombre" placeholder="Ej. Juan Pérez" required
                  class="w-full bg-[#085f63]/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#49beb7] focus:bg-[#085f63]/50 transition-all duration-300" />
              </div>

              <div class="space-y-1.5">
                <label class="text-white/80 text-xs font-medium tracking-wide">Correo electrónico</label>
                <input type="email" v-model="form.correo" placeholder="tu@universidad.edu" required
                  class="w-full bg-[#085f63]/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#49beb7] focus:bg-[#085f63]/50 transition-all duration-300" />
              </div>

              <div class="space-y-1.5">
                <label class="text-white/80 text-xs font-medium tracking-wide">Universidad</label>
                <div class="relative">
                  <select v-model="form.universidad" required
                    class="w-full bg-[#085f63]/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#49beb7] focus:bg-[#085f63]/50 transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" disabled class="bg-[#085f63] text-white/50">Selecciona tu universidad</option>
                    <option v-for="univ in universidades" :key="univ" :value="univ" class="bg-[#085f63] text-white">
                      {{ univ }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/60">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-white/80 text-xs font-medium tracking-wide">Mensaje</label>
                <textarea v-model="form.mensaje" rows="3" placeholder="¿En qué podemos ayudarte?" required
                  class="w-full bg-[#085f63]/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#49beb7] focus:bg-[#085f63]/50 transition-all duration-300 resize-none"></textarea>
              </div>

              <button type="submit" 
                class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#49beb7] to-[#2c9197] hover:from-[#3b9f9a] hover:to-[#227277] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#085f63]/40 mt-2 transform hover:-translate-y-0.5">
                Enviar Mensaje
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const pasos = [
  "Ingresa a la banca en línea o visita nuestras sucursales",
  "Completa tus datos y verifica tu identidad universitaria",
  "Empieza a usar tus servicios bancarios al instante"
];

const universidades = [
  "Universidad Central de Venezuela (UCV)",
  "Universidad de Carabobo (UC)",
  "Universidad de Los Andes (ULA)",
  "Universidad del Zulia (LUZ)",
  "Universidad Centroccidental Lisandro Alvarado (UCLA)",
  "Universidad Católica Andrés Bello (UCAB)"
];

const form = ref({
  nombre: '',
  correo: '',
  universidad: '',
  mensaje: ''
});

const handleSubmit = () => {
  console.log('Datos enviados con éxito:', form.value);
  alert('¡Gracias por escribirnos! Procesaremos tu mensaje a la brevedad.');
  
  form.value = { nombre: '', correo: '', universidad: '', mensaje: '' };
};
</script>