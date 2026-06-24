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

        <div v-if="apiError" class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-600">
          <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p class="text-sm font-medium">{{ apiError }}</p>
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

          <div class="grid md:grid-cols-2 gap-5">
            <div>
              <label class="auth-label">Contraseña</label>

              <div class="relative">
                <input
                  v-model.trim="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="auth-input pr-12"
                  placeholder="Crea una contraseña"
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

            <div>
              <label class="auth-label">Confirmar Contraseña</label>

              <div class="relative">
                <input
                  v-model.trim="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="auth-input pr-12"
                  placeholder="Repite tu contraseña"
                />

                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-bu-teal"
                  aria-label="Mostrar u ocultar confirmar contraseña"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <EyeOff v-if="showConfirmPassword" :size="18" />
                  <Eye v-else :size="18" />
                </button>
              </div>

              <p v-if="errors.confirmPassword" class="auth-error">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 pt-4">
            <button
              type="submit"
              :disabled="isLoading"
              class="bg-bu-teal text-white rounded-full py-4 font-bold shadow-lg shadow-bu-teal/20 hover:bg-bu-teal-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Creando cuenta...' : 'Crear cuenta' }}</span>
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

    <!-- Modal de Éxito -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div class="bg-bu-teal py-8 px-6 text-center relative">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle class="w-8 h-8 text-bu-teal" />
          </div>
          <h2 class="text-2xl font-bold text-white">¡Registro Exitoso!</h2>
          <p class="text-teal-50 mt-2 text-sm">Tu cuenta ha sido creada correctamente.</p>
        </div>
        
        <div class="p-8 text-center">
          <p class="text-slate-500 font-medium mb-3 text-sm">Tu número de cuenta asignado es:</p>
          
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:border-bu-teal transition-colors">
            <span class="text-lg font-bold tracking-widest text-bu-navy-deep select-all">{{ assignedAccountNumber }}</span>
            <button 
              type="button"
              @click="copyToClipboard" 
              class="text-slate-400 hover:text-bu-teal transition-colors p-2 rounded-lg hover:bg-teal-50"
              title="Copiar número de cuenta"
            >
              <Check v-if="copied" class="w-5 h-5 text-green-500" />
              <Copy v-else class="w-5 h-5" />
            </button>
          </div>
          <p v-if="copied" class="text-xs font-semibold text-green-500 mt-2 text-right transition-opacity">¡Copiado al portapapeles!</p>
          
          <button 
            type="button"
            @click="closeModal"
            class="mt-8 w-full bg-bu-navy-deep text-white rounded-full py-3.5 font-bold shadow-lg hover:bg-slate-800 transition-all flex justify-center items-center gap-2"
          >
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Eye, EyeOff, CheckCircle, Copy, Check, AlertCircle } from 'lucide-vue-next'
import { authService } from '../../services/authService'

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

const apiError = ref('')
const showSuccessModal = ref(false)
const assignedAccountNumber = ref('')
const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(assignedAccountNumber.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error al copiar al portapapeles', err)
  }
}

const closeModal = () => {
  showSuccessModal.value = false
  router.push(`/?login=true&email=${encodeURIComponent(form.correo)}`)
}

const form = reactive({
  nombre: '',
  apellido: '',
  cedula: '',
  fechaNacimiento: '',
  correo: '',
  telefono: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  nombre: '',
  apellido: '',
  cedula: '',
  fechaNacimiento: '',
  correo: '',
  telefono: '',
  password: '',
  confirmPassword: ''
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

const handleSubmit = async () => {
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
  } else if (form.password.length < 8 || form.password.length > 16) {
    errors.password = 'La contraseña debe tener entre 8 y 16 caracteres.'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Debes confirmar tu contraseña.'
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Las contraseñas no coinciden.'
  }

  const hasErrors = Object.values(errors).some(Boolean)
  if (hasErrors) {
    setTimeout(() => {
      document.querySelector('.auth-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
    return
  }

  const payload = {
    first_name: form.nombre,
    last_name: form.apellido,
    document_number: form.cedula,
    birth_date: `${form.fechaNacimiento}T00:00:00Z`,
    phone_number: form.telefono,
    email: form.correo,
    password: form.password
  }

  try {
    isLoading.value = true
    apiError.value = ''
    
    const response = await authService.register(payload)
    
    assignedAccountNumber.value = response?.data?.account_number || 'Número de cuenta no disponible'
    showSuccessModal.value = true
    
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    
    if (error.response) {
      const status = error.response.status
      const errorMsg = error.response.data?.message || ''
      
      if (status === 409) {
        apiError.value = 'El correo o la cédula ya se encuentran registrados.'
        errors.correo = 'Verifica tu correo.'
        errors.cedula = 'Verifica tu cédula.'
      } else if (status === 400) {
        apiError.value = 'Por favor, revisa los errores en el formulario devueltos por el servidor.'
        const errorText = errorMsg.toLowerCase()
        if (errorText.includes('first_name') || errorText.includes('firstname')) errors.nombre = 'Nombre inválido.'
        if (errorText.includes('last_name') || errorText.includes('lastname')) errors.apellido = 'Apellido inválido.'
        if (errorText.includes('document_number')) errors.cedula = 'Cédula inválida.'
        if (errorText.includes('email')) errors.correo = 'Correo inválido.'
        if (errorText.includes('password')) errors.password = 'Contraseña inválida.'
        if (errorText.includes('phone_number')) errors.telefono = 'Teléfono inválido.'
      } else {
        apiError.value = errorMsg || 'Error inesperado al conectar con el servidor.'
      }
    } else {
      apiError.value = 'No se pudo establecer conexión con el servidor bancario. Por favor, intente más tarde.'
    }
    
    setTimeout(() => {
      if (apiError.value) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        document.querySelector('.auth-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  } finally {
    isLoading.value = false
  }
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