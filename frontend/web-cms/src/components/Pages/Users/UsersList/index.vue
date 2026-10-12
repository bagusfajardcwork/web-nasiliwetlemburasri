<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Service } from "@/services";
import { useAuthStore } from "@/stores/auth.store";
import BasePagination from "@/components/Common/BasePagination.vue";

interface UserRole {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  roles: UserRole[];
  createdAt: string;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: Pagination;
}

const router = useRouter();
const auth = useAuthStore();

const users = ref<User[]>([]);
const loading = ref(false);
const errorMessage = ref("");
const searchTerm = ref("");
const deletingId = ref<number | null>(null);

const pagination = ref<Pagination>({
  page: 1,
  perPage: 10,
  total: 0,
  totalPages: 0,
});

const fields = [
  { key: "id", label: "ID", class: "text-center" },
  { key: "name", label: "Nama" },
  { key: "email", label: "Email" },
  { key: "roles", label: "Role" },
  { key: "isActive", label: "Status", class: "text-center" },
  { key: "createdAt", label: "Tanggal Dibuat", class: "text-center" },
  { key: "actions", label: "Aksi", class: "text-center" },
];

async function loadUsers() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await Service.get<UsersResponse>("/users", {
      params: {
        page: pagination.value.page,
        perPage: pagination.value.perPage,
        search: searchTerm.value.trim(),
      },
    });

    users.value = response.data.data;
    pagination.value = response.data.pagination;
  } catch (error: unknown) {
    console.error("Gagal memuat user:", error);
    errorMessage.value = "Gagal memuat data user.";
  } finally {
    loading.value = false;
  }
}

function changePage(page: number) {
  if (
      page < 1 ||
      page > pagination.value.totalPages ||
      page === pagination.value.page
  ) {
    return;
  }

  pagination.value.page = page;
  loadUsers();
}

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function goToCreate() {
  router.push("/users/add-user");
}

function goToEdit(user: User) {
  router.push(`/users/edit-user/${user.id}`);
}

async function deleteUser(user: User) {
  const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus user "${user.name}"?`,
  );

  if (!confirmed) return;

  deletingId.value = user.id;
  errorMessage.value = "";

  try {
    await Service.delete(`/users/${user.id}`);

    if (users.value.length === 1 && pagination.value.page > 1) {
      pagination.value.page -= 1;
    }

    await loadUsers();
  } catch (error: unknown) {
    console.error("Gagal menghapus user:", error);
    errorMessage.value = "Gagal menghapus user.";
  } finally {
    deletingId.value = null;
  }
}

let searchTimeout: ReturnType<typeof setTimeout> | undefined;

watch(searchTerm, () => {
  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    pagination.value.page = 1;
    loadUsers();
  }, 350);
});

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div class="card border-0 rounded-3 bg-white">
    <div
        class="card-header bg-white border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3 p-4"
    >
      <div>
        <h3 class="mb-1 fs-18 fw-semibold">Manajemen User</h3>
        <p class="text-secondary mb-0">
          Kelola pengguna CMS dan hak aksesnya.
        </p>
      </div>

      <button
          v-if="auth.hasPermission('users.create')"
          type="button"
          class="btn btn-primary d-inline-flex align-items-center gap-2"
          @click="goToCreate"
      >
        <i class="material-symbols-outlined fs-20">add</i>
        Tambah User
      </button>
    </div>

    <div class="card-body p-4">
      <!-- Search -->
      <div class="row mb-4">
        <div class="col-md-6 col-lg-4">
          <label for="user-search" class="form-label">
            Cari pengguna
          </label>

          <div class="input-group">
            <span class="input-group-text bg-transparent">
              <i class="material-symbols-outlined fs-20">search</i>
            </span>

            <input
                id="user-search"
                v-model="searchTerm"
                type="search"
                class="form-control"
                placeholder="Cari nama atau email..."
            />
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
        <button
            type="button"
            class="btn btn-sm btn-outline-danger ms-2"
            @click="loadUsers"
        >
          Coba lagi
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Memuat data...</span>
        </div>
        <p class="text-secondary mt-2 mb-0">Memuat data pengguna...</p>
      </div>

      <!-- Table -->
      <div v-else class="table-responsive">
        <BTable
            :items="users"
            :fields="fields"
            responsive
            hover
            outlined
            striped
            show-empty
            empty-text="Belum ada data pengguna"
            class="align-middle mb-0"
        >
          <template #cell(id)="{ item }">
            <span class="text-secondary">{{ item.id }}</span>
          </template>

          <template #cell(name)="{ item }">
            <span class="fw-semibold">{{ item.name }}</span>
          </template>

          <template #cell(roles)="{ item }">
            <template v-if="item.roles?.length">
              <span
                  v-for="role in item.roles"
                  :key="role.id"
                  class="badge bg-primary bg-opacity-10 text-primary me-1 mb-1"
              >
                {{ role.name }}
              </span>
            </template>
            <span v-else class="text-secondary">-</span>
          </template>

          <template #cell(isActive)="{ item }">
            <span
                class="badge rounded-pill"
                :class="
                item.isActive
                  ? 'bg-success bg-opacity-10 text-success'
                  : 'bg-secondary bg-opacity-10 text-secondary'
              "
            >
              {{ item.isActive ? "Aktif" : "Nonaktif" }}
            </span>
          </template>

          <template #cell(createdAt)="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <template #cell(actions)="{ item }">
            <div class="d-flex align-items-center gap-2">

              <b-button
                  v-if="auth.hasPermission('users.update')"
                  variant="outline-primary" size="md" class="me-2" @click="goToEdit(item)"
              >
                <i class="ri-ball-pen-fill" />
              </b-button>

              <b-button
                  v-if="auth.hasPermission('users.delete')"
                  variant="outline-danger"
                  size="md"
                  :disabled="deletingId === item.id"
                  @click="deleteUser(item)"
              >
                <i :class="deletingId === item.id ? 'ri-loader-4-line' : 'ri-delete-bin-line'"/>
              </b-button>

              <span v-if="!auth.hasPermission('users.update') && !auth.hasPermission('users.delete')" class="text-secondary">
                -
              </span>
            </div>
          </template>
        </BTable>
      </div>

      <!-- Pagination -->
      <BasePagination
          :page="pagination.page"
          :per-page="pagination.perPage"
          :total="pagination.total"
          :limit="5"
          size="sm"
          class="mt-4"
          @update:page="changePage"
      />

    </div>
  </div>
</template>