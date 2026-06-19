<template>
  <footer class="bg-bu-navy-deep text-white pt-10 md:pt-20 pb-6 md:pb-8 border-t border-white/5">
    <div class="bu-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-10 mb-8 md:mb-16">
        
        <!-- Columna 1: Identidad -->
        <div class="flex flex-col">
          <BancoLogo class="mb-4 md:mb-8 brightness-0 invert opacity-90" />
          <p class="hidden md:block text-slate-300 text-[0.85rem] leading-relaxed mb-8 max-w-[280px]">
            Institución financiera creada para la comunidad universitaria venezolana. Tu aliado en cada etapa de tu formación académica y profesional.
          </p>

          <!-- Redes Sociales -->
          <div class="flex gap-3 mb-0">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-bu-teal transition-all text-slate-300 hover:text-white">
              <component :is="social.icon" :size="16" />
            </a>
          </div>
        </div>

        <!-- Columna 2: Servicios -->
        <div class="hidden md:block">
          <h4 class="text-bu-teal font-bold text-xs uppercase tracking-[0.2em] mb-8">Servicios</h4>
          <ul class="flex flex-col gap-4 list-none p-0 text-[0.85rem] text-slate-300">
            <li><a href="#" class="hover:text-bu-teal no-underline transition-colors">Transferencias Sin Comisión</a></li>
            <li><a href="#" class="hover:text-bu-teal no-underline transition-colors">Depósitos en Efectivo</a></li>
            <li><a href="#" class="hover:text-bu-teal no-underline transition-colors">Retiros en Efectivo</a></li>
            <li><a href="#" class="hover:text-bu-teal no-underline transition-colors">Pago de Matrícula</a></li>
            <li><a href="#" class="hover:text-bu-teal no-underline transition-colors">Cobro de Becas</a></li>
          </ul>
        </div>

        <!-- Columna 3: Institución -->
        <div class="hidden md:block">
          <h4 class="text-bu-teal font-bold text-xs uppercase tracking-[0.2em] mb-8">Institución</h4>
          <ul class="flex flex-col gap-4 list-none p-0 text-[0.85rem] text-slate-300">
            <li><a href="#nosotros" class="hover:text-bu-teal no-underline transition-colors">Quiénes Somos</a></li>
            <li><a href="#proposito" class="hover:text-bu-teal no-underline transition-colors">Misión y Visión</a></li>
            <li><a href="#proposito" class="hover:text-bu-teal no-underline transition-colors">Objetivos</a></li>
            <li><a href="/?login=true" class="hover:text-bu-teal no-underline transition-colors">Banca en Línea</a></li>
            <li><router-link to="/registro" class="hover:text-bu-teal no-underline transition-colors">Registrarse</router-link></li>
          </ul>
        </div>

        <!-- Columna 4: Contacto -->
        <div class="flex flex-col gap-4 md:gap-6">
          <h4 class="text-bu-teal font-bold text-xs uppercase tracking-[0.2em] mb-2">Contacto</h4>
          <ul class="flex flex-col gap-3 md:gap-4 list-none p-0 text-[0.85rem] text-slate-300">
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Universidad,+Edificio+Banco+Universitario,+Caracas,+Venezuela"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-bu-teal transition-colors flex gap-3 no-underline text-slate-300"
              >
                <MapPin :size="18" class="text-bu-teal shrink-0" />
                <span>Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/582125555555"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-bu-teal transition-colors flex gap-3 no-underline text-slate-300"
              >
                <Phone :size="18" class="text-bu-teal shrink-0" />
                <span>+58 212-555-5555</span>
              </a>
            </li>
            <li class="flex gap-3">
              <Printer :size="18" class="text-bu-teal shrink-0" />
              <span>Fax: +58 212-555-5556</span>
            </li>
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@bancouniversitario.com.ve"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-bu-teal transition-colors flex gap-3 no-underline text-slate-300"
              >
                <Mail :size="18" class="text-bu-teal shrink-0" />
                <span>info@bancouniversitario.com.ve</span>
              </a>
            </li>
            <li class="flex gap-3">
              <Clock :size="18" class="text-bu-teal shrink-0" />
              <span>Lun-Vie 8:00am - 5:00pm (Banca digital 24/7)</span>
            </li>
          </ul>

          <!-- Box Banca Digital -->
          <div class="mt-4 p-4 border border-bu-teal/30 rounded-xl bg-white/5 hidden md:flex items-center gap-4">
            <div class="p-2 bg-bu-teal/10 rounded-lg">
              <Smartphone :size="24" class="text-bu-teal" />
            </div>
            <div class="flex flex-col">
              <span class="text-[0.7rem] text-slate-400">Banca digital disponible</span>
              <span class="text-[0.8rem] font-bold text-bu-teal">Accede a tu cuenta en línea</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="pt-6 md:pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4 md:gap-6">
        <p class="text-slate-500 text-[0.75rem]">
          © 2026 Banco Universitario C.A. Todos los derechos reservados. Regulado por SUDEBAN.
        </p>
        <div class="flex flex-wrap justify-center gap-6 text-[0.75rem] text-slate-500">
          <a href="#" class="hover:text-slate-300 no-underline transition-colors">Política de Privacidad</a>
          <a href="#" class="hover:text-slate-300 no-underline transition-colors">Términos de Uso</a>
          <a href="#" class="hover:text-slate-300 no-underline transition-colors">Seguridad</a>
          <a href="#" class="hover:text-slate-300 no-underline transition-colors">SUDEBAN</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  MapPin,
  Phone,
  Printer,
  Mail,
  Clock,
  Smartphone
} from 'lucide-vue-next'
import BancoLogo from '../ui/BancoLogo.vue'

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://www.x.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com' }
]
</script>
