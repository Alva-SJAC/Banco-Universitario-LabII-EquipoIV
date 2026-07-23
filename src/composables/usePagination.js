import { computed, ref, watch } from 'vue'

export function usePagination({ totalItems = null, totalCount = null, initialPage = 1, initialPageSize = 10, pageSizes = [10, 20, 50] } = {}) {
  const currentPage = ref(initialPage)
  const pageSize = ref(initialPageSize)

  const totalItemsCount = computed(() => {
    if (totalCount?.value != null && typeof totalCount.value === 'number') {
      return totalCount.value
    }
    if (!totalItems) return 0
    if (typeof totalItems.value === 'number') return totalItems.value
    return Array.isArray(totalItems.value) ? totalItems.value.length : 0
  })

  const totalPages = computed(() => {
    return totalItemsCount.value > 0
      ? Math.max(1, Math.ceil(totalItemsCount.value / pageSize.value))
      : 1
  })

  const startIndex = computed(() => {
    return (currentPage.value - 1) * pageSize.value
  })

  const endIndex = computed(() => {
    return Math.min(startIndex.value + pageSize.value, totalItemsCount.value)
  })

  const setPage = (page) => {
    const normalized = Math.max(1, Math.min(page, totalPages.value))
    currentPage.value = normalized
  }

  const setPageSize = (size) => {
    pageSize.value = Number(size) || initialPageSize
    currentPage.value = 1
  }

  const pagedItems = (items) => {
    if (!items?.value || !Array.isArray(items.value)) return []
    return items.value.slice(startIndex.value, endIndex.value)
  }

  watch([totalItemsCount, pageSize], () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  })

  return {
    currentPage,
    pageSize,
    pageSizes,
    totalPages,
    startIndex,
    endIndex,
    totalItemsCount,
    setPage,
    setPageSize,
    pagedItems
  }
}
