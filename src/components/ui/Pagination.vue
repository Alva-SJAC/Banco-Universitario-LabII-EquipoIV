<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-300">
    <div class="flex items-center gap-2">
      <span>Mostrar</span>
      <select
        v-model.number="internalPageSize"
        @change="emitPageSize(internalPageSize)"
        class="rounded-xl bg-[#1a2a38] border border-[#2a3a48]/40 px-3 py-2 text-white outline-none cursor-pointer"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
      <span>de {{ totalItems }} movimientos</span>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="rounded-xl px-3 py-2 bg-[#0f1e2e] hover:bg-[#152534] disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage <= 1"
        @click="prevPage"
      >
        Anterior
      </button>
      <span class="whitespace-nowrap">Página {{ currentPage }} / {{ totalPages }}</span>
      <button
        class="rounded-xl px-3 py-2 bg-[#0f1e2e] hover:bg-[#152534] disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  pageSize: { type: Number, required: true },
  pageSizes: { type: Array, default: () => [10, 20, 50] },
  totalItems: { type: Number, required: true }
})

const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const internalPageSize = ref(props.pageSize)

watch(
  () => props.pageSize,
  (newSize) => {
    internalPageSize.value = newSize
  }
)

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}

const emitPageSize = (size) => {
  emit('update:pageSize', size)
}
</script>
