<template>
  <main class="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
    <section class="w-full max-w-6xl bg-white rounded-[2rem] overflow-hidden shadow-2xl grid lg:grid-cols-[0.95fr_1.35fr]">
      <aside class="bg-bu-teal px-8 md:px-12 py-12 flex flex-col justify-between min-h-[620px]">
        <div>

          <div class="bg-white rounded-2xl p-5 shadow-lg w-full max-w-[280px]">
            <img
              src="../../assets/img/logo-no-background.png"
              alt="Banco Universitario"
              class="w-full h-auto"
            />
          </div>

          <div class="mt-14 text-white">
            <h1 class="text-3xl md:text-4xl font-bold mb-5">
              Únete a nosotros
            </h1>

            <p class="text-white/95 leading-relaxed max-w-sm">
              Abre tu cuenta 100% digital en pocos minutos y prepárate para disfrutar los servicios del Banco Universitario.
            </p>
          </div>
        </div>

        <p class="text-white/90 text-sm font-semibold mt-10">
          Regulado por SUDEBAN
        </p>
      </aside>

      <section class="px-8 md:px-12 lg:px-16 py-12">
        <div class="flex border-b border-slate-200 mb-10">
          <RouterLink
            to="/?login=true"
            class="w-1/2 pb-4 text-center font-semibold text-slate-400 hover:text-bu-teal no-underline transition-colors block"
          >
            Ingresar
          </RouterLink>

          <button
            type="button"
            class="w-1/2 pb-4 text-center font-semibold text-bu-teal border-b-2 border-bu-teal"
          >
            Registrarse
          </button>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="auth-label">Nombre</label>

              <input
                v-model.trim="form.nombre"
                type="text"
                class="auth-input"
                placeholder="Ej: Rubén"
                @input="form.nombre = onlyLetters(form.nombre)"
              />

              <p v-if="errors.nombre" class="auth-error">
                {{ errors.nombre }}
              </p>
            </div>

            <div>
              <label class="auth-label">Apellido</label>

              <input
                v-model.trim="form.apellido"
                type="text"
                class="auth-input"
                placeholder="Ej: Silva"
                @input="form.apellido = onlyLetters(form.apellido)"
              />

              <p v-if="errors.apellido" class="auth-error">
                {{ errors.apellido }}
              </p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="auth-label">Cédula</label>

              <input
                v-model.trim="form.cedula"
                type="text"
                inputmode="numeric"
                class="auth-input"
                placeholder="Ej: 30554598"
                @input="form.cedula = onlyNumbers(form.cedula)"
              />

              <p v-if="errors.cedula" class="auth-error">
                {{ errors.cedula }}
              </p>
            </div>

            <div>
              <label class="auth-label">Fecha de nacimiento</label>

              <input
                v-model="form.fechaNacimiento"
                type="date"
                class="auth-input"
              />

              <p v-if="errors.fechaNacimiento" class="auth-error">
                {{ errors.fechaNacimiento }}
              </p>
            </div>
          </div>

          <div>
            <label class="auth-label">Correo electrónico</label>

            <input
              v-model.trim="form.correo"
              type="email"
              class="auth-input"
              placeholder="tu@universidad.edu"
            />

            <p v-if="errors.correo" class="auth-error">
              {{ errors.correo }}
            </p>
          </div>

          <div>
            <label class="auth-label">Teléfono</label>

            <input
              v-model.trim="form.telefono"
              type="tel"
              inputmode="numeric"
              class="auth-input"
              placeholder="Ej: 04120000000"
              @input="form.telefono = onlyNumbers(form.telefono)"
            />

            <p v-if="errors.telefono" class="auth-error">
              {{ errors.telefono }}
            </p>
          </div>

          <div>
            <label class="auth-label">Contraseña</label>

            <div class="relative">
              <input
                v-model.trim="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="auth-input pr-12"
                placeholder="Crea una contraseña segura"
              />

              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-bu-teal"
                aria-label="Mostrar u ocultar contraseña"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" :size="18" />
                <Eye v-else :size="18" />
              </button>
            </div>

            <p v-if="errors.password" class="auth-error">
              {{ errors.password }}
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 pt-4">
            <button
              type="submit"
              class="bg-bu-teal text-white rounded-full py-4 font-bold shadow-lg shadow-bu-teal/20 hover:bg-bu-teal-dark transition-all"
            >
              Crear cuenta
            </button>

            <RouterLink
              to="/"
              class="border-2 border-slate-200 text-bu-navy-deep rounded-full py-4 font-bold text-center hover:border-bu-teal hover:text-bu-teal transition-all no-underline"
            >
              Volver
            </RouterLink>
          </div>
        </form>
      </section>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const showPassword = ref(false)

const form = reactive({
  nombre: '',
  apellido: '',
  cedula: '',
  fechaNacimiento: '',
  correo: '',
  telefono: '',
  password: ''
})

const errors = reactive({
  nombre: '',
  apellido: '',
  cedula: '',
  fechaNacimiento: '',
  correo: '',
  telefono: '',
  password: ''
})

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

const onlyLetters = (value) => {
  return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '')
}

const onlyNumbers = (value) => {
  return value.replace(/\D/g, '')
}

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const handleSubmit = () => {
  clearErrors()

  const lettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
  const numbersRegex = /^[0-9]+$/

  if (!form.nombre) {
    errors.nombre = 'El nombre es obligatorio.'
  } else if (!lettersRegex.test(form.nombre)) {
    errors.nombre = 'El nombre solo debe contener letras.'
  }

  if (!form.apellido) {
    errors.apellido = 'El apellido es obligatorio.'
  } else if (!lettersRegex.test(form.apellido)) {
    errors.apellido = 'El apellido solo debe contener letras.'
  }

  if (!form.cedula) {
    errors.cedula = 'La cédula es obligatoria.'
  } else if (!numbersRegex.test(form.cedula)) {
    errors.cedula = 'La cédula solo debe contener números.'
  } else if (form.cedula.length < 6 || form.cedula.length > 10) {
    errors.cedula = 'La cédula debe tener entre 6 y 10 números.'
  }

  if (!form.fechaNacimiento) {
    errors.fechaNacimiento = 'La fecha de nacimiento es obligatoria.'
  }

  if (!form.correo) {
    errors.correo = 'El correo electrónico es obligatorio.'
  } else if (!isValidEmail(form.correo)) {
    errors.correo = 'Ingresa un correo electrónico válido.'
  }

  if (!form.telefono) {
    errors.telefono = 'El teléfono es obligatorio.'
  } else if (!numbersRegex.test(form.telefono)) {
    errors.telefono = 'El teléfono solo debe contener números.'
  } else if (form.telefono.length < 10 || form.telefono.length > 11) {
    errors.telefono = 'El teléfono debe tener entre 10 y 11 números.'
  }

  if (!form.password) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (form.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.'
  }

  const hasErrors = Object.values(errors).some(Boolean)
  if (hasErrors) return

  router.push('/dashboard')
}
</script>

<style scoped>
.auth-label {
  @apply block text-sm font-semibold text-slate-500 mb-2;
}

.auth-input {
  @apply w-full bg-slate-100 border border-transparent focus:border-bu-teal focus:bg-white outline-none rounded-xl py-4 px-4 text-bu-navy-deep transition-all;
}

.auth-error {
  @apply text-red-500 text-xs mt-2;
}
</style>