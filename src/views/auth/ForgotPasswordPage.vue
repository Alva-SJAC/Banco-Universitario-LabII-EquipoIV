<template>
  <main class="min-h-screen bg-gradient-to-br from-bu-navy-deep via-bu-teal-dark to-bu-teal flex items-center justify-center px-4 py-10 relative overflow-hidden">
    <RouterLink
      to="/"
      class="absolute top-6 left-6 inline-flex items-center gap-2 text-white bg-white/10 border border-white/20 rounded-full px-5 py-3 no-underline font-bold text-sm hover:bg-white/20 transition-all"
    >
      <ArrowLeft :size="17" />
      Volver
    </RouterLink>

    <section class="w-full max-w-[430px] rounded-[1.8rem] overflow-hidden shadow-2xl bg-white">
      <div class="bg-gradient-to-br from-bu-teal to-bu-teal-dark px-8 py-10 text-center text-white">
        <div class="bg-white rounded-2xl p-4 shadow-lg w-[230px] mx-auto mb-8">
          <img
            src="../../assets/img/logo-no-background.png"
            alt="Banco Universitario"
            class="w-full h-auto"
          />
        </div>

        <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
          <Mail :size="30" />
        </div>

        <h1 class="text-2xl md:text-3xl font-bold mb-3">
          Recuperar contraseña
        </h1>

        <p class="text-white/90 text-sm leading-relaxed">
          Ingresa tu correo electrónico para visualizar el flujo de recuperación de credenciales.
        </p>
      </div>

      <div class="px-8 py-8">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-semibold text-bu-navy-deep mb-2">
              Correo electrónico
            </label>

            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-bu-teal" :size="18" />
              <input
                v-model.trim="email"
                type="email"
                placeholder="tu@universidad.edu"
                class="w-full bg-slate-100 border border-transparent focus:border-bu-teal focus:bg-white outline-none rounded-xl py-4 pl-12 pr-4 text-bu-navy-deep transition-all"
              />
            </div>

            <p v-if="error" class="text-red-500 text-xs mt-2">
              {{ error }}
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-bu-teal text-white rounded-xl py-4 font-bold shadow-lg shadow-bu-teal/20 hover:bg-bu-teal-dark transition-all flex items-center justify-center gap-2"
          >
            Enviar instrucciones
            <ArrowRight :size="18" />
          </button>

          <RouterLink
            to="/?login=true"
            class="block text-center text-sm text-bu-teal hover:text-bu-teal-dark no-underline font-semibold"
          >
            ¿Recordaste tu contraseña? Inicia sesión
          </RouterLink>
        </form>
      </div>

      <footer class="bg-slate-50 px-8 py-5 text-center border-t border-slate-100">
        <p class="text-xs text-slate-500 mb-0">
          ¿Necesitas ayuda? Contacta a soporte.
        </p>
      </footer>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-vue-next'

const email = ref('')
const error = ref('')

const handleSubmit = () => {
  error.value = ''

  if (!email.value) {
    error.value = 'El correo electrónico es obligatorio.'
    return
  }

  alert('Flujo visual de recuperación. La funcionalidad real dependerá de la API en la siguiente entrega.')
}
</script>