<template>
  <div class="flex items-center select-none">
    <img 
      src="/src/assets/img/logo-no-background.png" 
      alt="Banco Universitario" 
      class="h-9 w-auto"
    />
  </div>
</template>

<script setup>
defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})
</script>
