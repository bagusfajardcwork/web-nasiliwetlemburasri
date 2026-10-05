<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import TableDropdown from '@/components/common/TableDropdown.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

import { getUsers, type User } from '@/services/users.service'

const currentPageTitle = ref('Pengguna')

const users = ref<User[]>([])

const loading = ref(false)
const error = ref<string | null>(null)

const search = ref('')

const currentPage = ref(1)
const itemsPerPage = 10

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

const loadUsers = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await getUsers({
      page: currentPage.value,
      perPage: itemsPerPage,
      search: search.value || undefined,
    })

    users.value = response.data
    total.value = response.pagination.total
    totalPages.value = response.pagination.totalPages
  } catch (err) {
    console.error('Gagal mengambil users:', err)

    error.value = 'Gagal mengambil data pengguna.'
    users.value = []
  } finally {
    loading.value = false
  }
}

const searchUsers = async () => {
  currentPage.value = 1
  await loadUsers()
}

const prevPage = async () => {
  if (currentPage.value <= 1) {
    return
  }

  currentPage.value--
  await loadUsers()
}

const nextPage = async () => {
  if (currentPage.value >= totalPages.value) {
    return
  }

  currentPage.value++
  await loadUsers()
}

const goToPage = async (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return
  }

  currentPage.value = page
  await loadUsers()
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div
      class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <!-- Header -->
      <div
        class="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Table Pengguna</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Daftar pengguna yang terdaftar di sistem.
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <!-- Search -->
          <form class="flex items-center gap-2" @submit.prevent="searchUsers">
            <input
              v-model="search"
              type="text"
              placeholder="Cari pengguna..."
              class="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 sm:w-64 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />

            <button
              type="submit"
              class="h-10 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              Cari
            </button>
          </form>

          <!-- Add User -->
          <button
            type="button"
            class="h-10 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            + Tambah Pengguna
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-800">
              <th
                class="px-5 py-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
              >
                Nama
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
              >
                Email
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
              >
                Role
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
              >
                Status
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
              >
                Aksi
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <!-- Loading -->
            <tr v-if="loading">
              <td
                colspan="5"
                class="px-5 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Memuat data pengguna...
              </td>
            </tr>

            <!-- Error -->
            <tr v-else-if="error">
              <td colspan="5" class="px-5 py-10 text-center text-sm text-red-500">
                {{ error }}
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="users.length === 0">
              <td
                colspan="5"
                class="px-5 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Tidak ada data pengguna.
              </td>
            </tr>

            <!-- Data -->
            <tr
              v-for="user in users"
              v-else
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <!-- Name -->
              <td class="px-5 py-4">
                <div class="font-medium text-gray-800 dark:text-white/90">
                  {{ user.name }}
                </div>
              </td>

              <!-- Email -->
              <td class="px-5 py-4">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ user.email }}
                </div>
              </td>

              <!-- Role -->
              <td class="px-5 py-4">
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  {{ user.roles?.map((role) => role.name).join(', ') || '-' }}
                </div>
              </td>

              <!-- Status -->
              <td class="px-5 py-4">
                <span
                  v-if="user.isActive"
                  class="inline-flex rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500"
                >
                  Aktif
                </span>

                <span
                  v-else
                  class="inline-flex rounded-full bg-error-50 px-2.5 py-1 text-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500"
                >
                  Tidak Aktif
                </span>
              </td>

              <!-- Actions -->
              <td class="px-5 py-4">
                <TableDropdown>
                  <template #dropdown>
                    <button
                      type="button"
                      class="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/[0.05]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      class="flex w-full items-center px-4 py-2 text-left text-sm text-error-500 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                    >
                      Hapus
                    </button>
                  </template>
                </TableDropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800"
      >
        <!-- Info -->
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Total:
          <span class="font-medium text-gray-700 dark:text-gray-300">
            {{ total }}
          </span>
          pengguna
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center gap-1">
          <!-- Previous -->
          <button
            type="button"
            :disabled="currentPage === 1 || loading"
            class="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-white/[0.05]"
            @click="prevPage"
          >
            Previous
          </button>

          <!-- Pages -->
          <template v-for="(page, index) in displayedPages" :key="`${page}-${index}`">
            <!-- Number -->
            <button
              v-if="typeof page === 'number'"
              type="button"
              :disabled="loading"
              class="min-w-9 rounded-lg px-3 py-2 text-sm transition"
              :class="
                page === currentPage
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/[0.05]'
              "
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <!-- Dots -->
            <span v-else class="px-2 text-gray-400"> ... </span>
          </template>

          <!-- Next -->
          <button
            type="button"
            :disabled="currentPage === totalPages || loading"
            class="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-white/[0.05]"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
