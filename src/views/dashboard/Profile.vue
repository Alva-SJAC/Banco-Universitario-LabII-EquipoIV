<template>
  <div class="space-y-6 font-montserrat">
    <div
      class="rounded-3xl p-8 border-none"
      style="background-color: #1a2a38;"
    >
      <div class="flex items-center gap-4 mb-6">
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center p-3"
          style="background-color: rgba(8, 95, 99, 0.2);"
        >
          <User :size="24" style="color: #49beb7;" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-white mb-0">Mi Perfil</h2>
          <p class="text-xs text-slate-400 mb-0">Gestiona tus datos personales y credenciales de seguridad</p>
        </div>
      </div>
      <p class="text-sm text-slate-300 leading-relaxed mb-0 font-semibold text-bu-teal">
        Pronto...
      </p>
    </div>
  </div>
</template>

<script setup>
import { User } from 'lucide-vue-next'
</script>
