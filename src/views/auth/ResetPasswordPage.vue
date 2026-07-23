<template>
  <main class="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
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
          <ShieldCheck :size="30" />
        </div>

        <h1 class="text-2xl md:text-3xl font-bold mb-3">
          Restablecer contraseña
        </h1>

        <p class="text-white/90 text-sm leading-relaxed max-w-xs mx-auto">
          Ingresa tu correo, el código recibido y la nueva contraseña.
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
          </div>

          <div>
            <label class="block text-sm font-semibold text-bu-navy-deep mb-2">
              Código de verificación
            </label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-bu-teal" :size="18" />
              <input
                v-model.trim="code"
                type="text"
                maxlength="6"
                placeholder="000000"
                class="w-full bg-slate-100 border border-transparent focus:border-bu-teal focus:bg-white outline-none rounded-xl py-4 pl-12 pr-4 text-bu-navy-deep transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-bu-navy-deep mb-2">
              Nueva contraseña
            </label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-bu-teal" :size="18" />
              <input
                v-model="newPassword"
                type="password"
                placeholder="Nueva contraseña"
                class="w-full bg-slate-100 border border-transparent focus:border-bu-teal focus:bg-white outline-none rounded-xl py-4 pl-12 pr-4 text-bu-navy-deep transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-bu-navy-deep mb-2">
              Confirmar contraseña
            </label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-bu-teal" :size="18" />
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                class="w-full bg-slate-100 border border-transparent focus:border-bu-teal focus:bg-white outline-none rounded-xl py-4 pl-12 pr-4 text-bu-navy-deep transition-all"
              />
            </div>
          </div>

          <div v-if="error" class="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-600">
            {{ error }}
          </div>

          <div v-if="successMessage" class="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-sm text-green-700">
            {{ successMessage }}
          </div>

          <button
            type="submit"
            class="w-full bg-bu-teal text-white rounded-xl py-4 font-bold shadow-lg shadow-bu-teal/20 hover:bg-bu-teal-dark transition-all flex items-center justify-center gap-2"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Procesando...' : 'Restablecer contraseña' }}
            <ArrowRight :size="18" />
          </button>

          <div class="space-y-3 pt-1">
            <RouterLink
              to="/recuperar-contrasena"
              class="block w-full text-center text-sm text-bu-teal hover:text-bu-teal-dark font-semibold bg-transparent border-0 p-0"
            >
              Enviar código nuevamente
            </RouterLink>

            <RouterLink
              to="/"
              class="block text-center text-sm text-slate-500 hover:text-bu-teal no-underline font-semibold"
            >
              ← Volver al inicio
            </RouterLink>
          </div>
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
import { RouterLink, useRouter } from 'vue-router'
import { ArrowRight, Mail, ShieldCheck, Lock } from 'lucide-vue-next'
import { authService } from '../../services/authService'

const router = useRouter()
const email = ref('')
const code = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  successMessage.value = ''

  if (!email.value) {
    error.value = 'El correo electrónico es obligatorio.'
    return
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  if (!isValidEmail) {
    error.value = 'Ingresa un correo electrónico válido.'
    return
  }

  if (!code.value) {
    error.value = 'El código de verificación es obligatorio.'
    return
  }

  if (!newPassword.value) {
    error.value = 'La nueva contraseña es obligatoria.'
    return
  }

  if (newPassword.value.length < 8) {
    error.value = 'La contraseña debe tener al menos 8 caracteres.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  try {
    isLoading.value = true
    await authService.resetPassword(email.value, code.value, newPassword.value)
    successMessage.value = 'Contraseña restablecida correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.'
    email.value = ''
    code.value = ''
    newPassword.value = ''
    confirmPassword.value = ''

    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (err) {
    error.value = err?.response?.data?.message || 'No se pudo restablecer la contraseña. Verifica el código e intenta nuevamente.'
    console.error('Error resetting password:', err)
  } finally {
    isLoading.value = false
  }
}
</script>
