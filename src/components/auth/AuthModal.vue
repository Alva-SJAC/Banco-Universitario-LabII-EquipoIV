<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <main
        v-if="modelValue"
        class="fixed inset-0 z-[100] min-h-screen bg-slate-100 px-4 py-8 overflow-y-auto"
      >
        <section class="min-h-full flex items-center justify-center">
          <div
            class="w-full max-w-5xl bg-white shadow-2xl grid lg:grid-cols-[0.9fr_1.4fr] relative overflow-hidden"
          >
            <button
              type="button"
              class="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white text-bu-navy-deep shadow-md flex items-center justify-center hover:bg-bu-teal hover:text-white transition-all"
              aria-label="Cerrar login"
              @click="closeModal"
            >
              <X :size="20" />
            </button>

            <aside
              class="bg-bu-teal px-8 md:px-12 py-10 md:py-12 flex flex-col justify-between min-h-[340px] lg:min-h-[430px]"
            >
              <div>
                <div class="bg-white rounded-2xl p-5 shadow-lg w-full max-w-[280px]">
                  <img
                    src="../../assets/img/logo-no-background.png"
                    alt="Banco Universitario"
                    class="w-full h-auto"
                  />
                </div>

                <div class="mt-10 md:mt-14 text-white">
                  <h2 class="text-2xl md:text-3xl font-bold mb-5 leading-tight">
                    Únete a nosotros
                  </h2>

                  <p class="text-white/95 leading-relaxed max-w-sm text-sm md:text-base">
                    Abre tu cuenta 100% digital en pocos minutos y disfruta de beneficios exclusivos.
                  </p>
                </div>
              </div>

              <p class="text-white/90 text-xs md:text-sm font-semibold mt-10 mb-0">
                Regulado por SUDEBAN
              </p>
            </aside>

            <section class="px-7 md:px-12 lg:px-16 py-10 md:py-12">
              <div class="flex border-b border-slate-200 mb-9">
                <button
                  type="button"
                  class="w-1/2 pb-4 text-center font-semibold text-bu-teal border-b-2 border-bu-teal"
                >
                  Ingresar
                </button>

                <RouterLink
                  to="/registro"
                  class="w-1/2 pb-4 text-center font-semibold text-slate-400 hover:text-bu-teal no-underline transition-colors"
                  @click="closeModal"
                >
                  Registrarse
                </RouterLink>
              </div>

              <form class="space-y-5" @submit.prevent="handleSubmit">
                <div>
                  <label class="block text-sm font-semibold text-slate-500 mb-2">
                    Correo electrónico
                  </label>

                  <div class="relative">
                    <Mail
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-bu-teal"
                      :size="18"
                    />

                    <input
                      v-model.trim="form.email"
                      type="email"
                      placeholder="tu@universidad.edu"
                      class="w-full bg-slate-100 border border-transparent focus:border-bu-teal focus:bg-white outline-none rounded-xl py-4 pl-12 pr-4 text-bu-navy-deep transition-all"
                    />
                  </div>

                  <p v-if="errors.email" class="text-red-500 text-xs mt-2">
                    {{ errors.email }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-500 mb-2">
                    Contraseña
                  </label>

                  <div class="relative">
                    <LockKeyhole
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-bu-teal"
                      :size="18"
                    />

                    <input
                      v-model.trim="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Ingresa tu contraseña"
                      class="w-full bg-slate-100 border border-transparent focus:border-bu-teal focus:bg-white outline-none rounded-xl py-4 pl-12 pr-12 text-bu-navy-deep transition-all"
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

                  <p v-if="errors.password" class="text-red-500 text-xs mt-2">
                    {{ errors.password }}
                  </p>
                </div>

                <div class="flex justify-end">
                  <RouterLink
                    to="/recuperar-contrasena"
                    class="text-sm font-semibold text-bu-teal hover:text-bu-teal-dark no-underline"
                    @click="closeModal"
                  >
                    ¿Olvidaste tu contraseña?
                  </RouterLink>
                </div>

                <div class="grid sm:grid-cols-2 gap-4 pt-5">
                  <button
                    type="submit"
                    class="bg-bu-teal text-white rounded-full py-4 font-bold shadow-lg shadow-bu-teal/20 hover:bg-bu-teal-dark transition-all"
                  >
                    Ingresar
                  </button>

                  <button
                    type="button"
                    class="border-2 border-slate-200 text-bu-navy-deep rounded-full py-4 font-bold hover:border-bu-teal hover:text-bu-teal transition-all"
                    @click="closeModal"
                  >
                    Volver
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </main>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Eye, EyeOff, LockKeyhole, Mail, X } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleSubmit = () => {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'El correo electrónico es obligatorio.'
  }

  if (!form.password) {
    errors.password = 'La contraseña es obligatoria.'
  }

  if (errors.email || errors.password) return

  alert('Formulario visual de inicio de sesión.')
}
</script>