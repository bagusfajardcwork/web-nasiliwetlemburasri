import { ref, computed } from 'vue'

export function usePagination(initialPage = 1, initialPerPage = 10) {
  const currentPage = ref(initialPage)
  const itemsPerPage = ref(initialPerPage)

  const total = ref(0)
  const totalPages = ref(1)

  const displayedPages = computed(() => {
    const range: (number | string)[] = []

    for (let i = 1; i <= totalPages.value; i++) {
      if (
        i === 1 ||
        i === totalPages.value ||
        (i >= currentPage.value - 1 && i <= currentPage.value + 1)
      ) {
        range.push(i)
      } else if (range[range.length - 1] !== '...') {
        range.push('...')
      }
    }

    return range
  })

  const setPagination = (pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }) => {
    currentPage.value = pagination.page
    itemsPerPage.value = pagination.perPage
    total.value = pagination.total
    totalPages.value = pagination.totalPages
  }

  const resetPage = () => {
    currentPage.value = 1
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    currentPage,
    itemsPerPage,
    total,
    totalPages,
    displayedPages,

    setPagination,
    resetPage,
    nextPage,
    prevPage,
    goToPage,
  }
}
