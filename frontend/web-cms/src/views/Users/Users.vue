<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TableDropdown from '@/components/common/TableDropdown.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import Pagination from '@/components/common/Pagination.vue'
import { getUsers, type User } from '@/services/users.service'
import { PlusAltIcon, SearchIcon } from '@/icons'
import Button from '@/components/ui/Button.vue'

import ModalUsers from './modal/ModalUsers.vue'

// reference
const currentPageTitle = ref('Pengguna')
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const total = ref(0)
const totalPages = ref(1)
const modal = ref({
  isopen: false,
  id: null,
  title: '',
})

// function
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
    total.value = 0
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const changePage = async (page: number) => {
  currentPage.value = page

  await loadUsers()
}

const searchUsers = async () => {
  currentPage.value = 1

  await loadUsers()
}

const openModal = (param1: number | null = null) => {
  modal.value.isopen = true
  if (param1 !== null) {
    modal.value.title = 'Form Ubah Pengguna'
    modal.value.id = param1
  } else {
    modal.value.title = 'Form Tambah Pengguna'
    modal.value.id = null // Reset ID jika tambah baru
  }
}

const deleteUser = (user: User) => {
  console.log('Delete user:', user)
}

const closeModal = () => {
  modal.value.isopen = false
  console.log('Modal berhasil ditutup oleh emit!')
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
          <form class="flex items-center gap-2" @submit.prevent="searchUsers">
            <!--            <div class="relative">-->
            <!--              <button-->
            <!--                type="submit"-->
            <!--                :disabled="loading"-->
            <!--                :onClick="searchUsers"-->
            <!--                class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400"-->
            <!--              >-->
            <!--                <svg-->
            <!--                  class="fill-current"-->
            <!--                  width="20"-->
            <!--                  height="20"-->
            <!--                  viewBox="0 0 20 20"-->
            <!--                  fill="none"-->
            <!--                  xmlns="http://www.w3.org/2000/svg"-->
            <!--                >-->
            <!--                  <path-->
            <!--                    fill-rule="evenodd"-->
            <!--                    clip-rule="evenodd"-->
            <!--                    d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"-->
            <!--                    fill=""-->
            <!--                  />-->
            <!--                </svg>-->
            <!--              </button>-->

            <!--              <input-->
            <!--                type="text"-->
            <!--                placeholder="Cari pengguna..."-->
            <!--                v-model="search"-->
            <!--                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-3.5 text-sm-->
            <!--                text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3-->
            <!--                focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30-->
            <!--                dark:focus:border-brand-800 xl:w-[300px]"-->
            <!--              />-->
            <!--            </div>-->

            <input
              v-model="search"
              type="text"
              placeholder="Cari pengguna..."
              class="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 sm:w-64 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />

            <Button
              size="sm"
              variant="primary"
              type="submit"
              :disabled="loading"
              :startIcon="SearchIcon"
            >
              Cari
            </Button>
          </form>
          <!-- Add User -->
          <Button size="sm" variant="primary" :startIcon="PlusAltIcon" @click="openModal(null)">
            Pengguna
          </Button>
        </div>
      </div>

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
              v-else
              v-for="user in users"
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <!-- Name -->
              <td class="px-5 py-4">
                <div class="text-sm text-gray-800 dark:text-white/90">
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
                      @click="editUser(user)"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      class="flex w-full items-center px-4 py-2 text-left text-sm text-error-500 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                      @click="deleteUser(user)"
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
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total="total"
        :loading="loading"
        @update:current-page="changePage"
      />
    </div>
    <ModalUsers
      v-if="modal.isopen"
      :fullScreenBackdrop="true"
      :isOpen="modal.isopen"
      :modalData="modal"
      @close="closeModal"
    />
  </AdminLayout>
</template>
