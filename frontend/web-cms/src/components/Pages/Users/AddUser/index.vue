<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Service } from "@/services";
// import { useAuthStore } from "@/stores/auth.store";
import { useToast } from "vue-toastification";
import {
  toastSuccess,
  toastError,
} from "@/utils/toast";

interface Role {
  id: number;
  name: string;
  description?: string | null;
}

interface RolesResponse {
  success: boolean;
  message: string;
  data: Role[];
}

interface UserPayload {
  name: string;
  email: string;
  password?: string;
  isActive: boolean;
  roleIds: number[];
}

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: number[];
}

interface UserDetailResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    roles: {
      id: number;
      name: string;
    }[];
  };
}

const router = useRouter();
const route = useRoute();
// const auth = useAuthStore();
const toast = useToast();

const loading = ref(false);
const loadingRoles = ref(false);
const errorMessage = ref("");

const roles = ref<Role[]>([]);
const selectedRoleIds = ref<number[]>([]);
const isEditMode = computed(() => route.params.id !== undefined);
const userId = computed(() => Number(route.params.id));

const pageTitle = computed(() =>
    isEditMode.value ? "Edit User" : "Tambah User",
);

const form = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  isActive: true,
});

const errors = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  roles: "",
});

const canSubmit = computed(() => {
  const passwordValid =
      isEditMode.value &&
      !form.password &&
      !form.passwordConfirmation
          ? true
          : form.password.length >= 8 &&
          form.passwordConfirmation.length > 0 &&
          form.password === form.passwordConfirmation;

  return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      passwordValid &&
      selectedRoleIds.value.length > 0 &&
      !loading.value &&
      !loadingRoles.value
  );
});

async function loadRoles() {
  loadingRoles.value = true;

  try {
    const response = await Service.get<RolesResponse>("/roles");

    roles.value = response.data.data;
  } catch (error: unknown) {
    console.error("Gagal memuat role:", error);
    errorMessage.value = "Gagal memuat daftar role.";
    toastError(toast, errorMessage.value);
  } finally {
    loadingRoles.value = false;
  }
}

async function loadUser() {
  if (!isEditMode.value) return;

  try {
    const response = await Service.get<UserDetailResponse>(
        `/users/${userId.value}`,
    );

    const user = response.data.data;

    form.name = user.name;
    form.email = user.email;
    form.isActive = user.isActive;

    // Pilih role yang sudah dimiliki user.
    selectedRoleIds.value = user.roles.map((role) => role.id);
  } catch (error) {
    console.error("Gagal mengambil detail user:", error);
    toastError(toast, "Gagal mengambil detail user.");
    await router.replace("/users");
  }
}

function validateForm(): boolean {
  errors.name = "";
  errors.email = "";
  errors.password = "";
  errors.passwordConfirmation = "";
  errors.roles = "";

  let valid = true;

  if (!form.name.trim()) {
    errors.name = "Nama wajib diisi.";
    valid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Email wajib diisi.";
    valid = false;
  }

  const passwordProvided =
      form.password.length > 0 ||
      form.passwordConfirmation.length > 0;

  if (!isEditMode.value && !passwordProvided) {
    errors.password = "Password wajib diisi.";
    valid = false;
  }

  if (!isEditMode.value || passwordProvided) {
    if (!form.password) {
      errors.password = "Password wajib diisi.";
      valid = false;
    } else if (form.password.length < 8) {
      errors.password = "Password minimal 8 karakter.";
      valid = false;
    }

    if (!form.passwordConfirmation) {
      errors.passwordConfirmation = "Konfirmasi password wajib diisi.";
      valid = false;
    } else if (form.password !== form.passwordConfirmation) {
      errors.passwordConfirmation = "Konfirmasi password tidak sama.";
      valid = false;
    }
  }

  if (selectedRoleIds.value.length === 0) {
    errors.roles = "Pilih minimal satu role.";
    valid = false;
  }

  return valid;
}

async function handleSubmit() {
  errorMessage.value = "";

  if (!validateForm()) return;

  const payload: UserPayload = {
    name: form.name.trim(),
    email: form.email.trim(),
    isActive: form.isActive,
    roleIds: selectedRoleIds.value,
  };

  if (form.password) {
    payload.password = form.password;
  }

  loading.value = true;

  try {
    if (isEditMode.value) {
      await Service.put(`/users/${userId.value}`, payload);
      toastSuccess(toast, "User berhasil diperbarui.");
    } else {
      await Service.post("/users", payload);
      toastSuccess(toast, "User berhasil ditambahkan.");
    }
    await router.push("/users");
  } catch (error: unknown) {
    console.error("Gagal menambahkan user:", error);

    errorMessage.value = "Gagal menambahkan user.";
    toastError(toast, errorMessage.value);
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push("/users");
}

onMounted(async () => {
  await Promise.all([
    loadRoles(),
    loadUser(),
  ]);
});
</script>

<template>
  <div class="card border-0 rounded-3 bg-white">
    <!-- Header -->
    <div
        class="card-header bg-white border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3 p-4"
    >
      <div>
        <h3 class="mb-1 fs-18 fw-semibold">{{ pageTitle }}</h3>
<!--        <p class="text-secondary mb-0">-->
<!--          Tambahkan pengguna baru ke dalam CMS.-->
<!--        </p>-->
      </div>

      <BButton variant="dark" @click="goBack">
        <i class="ri-arrow-left-line me-1" />
        Kembali
      </BButton>
    </div>

    <!-- Form -->
    <div class="card-body p-4">
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="row g-4">
          <!-- Name -->
          <div class="col-md-6">
            <label for="name" class="form-label">
              Nama lengkap <span class="text-danger">*</span>
            </label>

            <BFormInput
                id="name"
                v-model="form.name"
                placeholder="Masukkan nama lengkap"
                :disabled="loading"
                :state="errors.name ? false : null"
            />

            <div v-if="errors.name" class="text-danger small mt-1">
              {{ errors.name }}
            </div>
          </div>

          <!-- Email -->
          <div class="col-md-6">
            <label for="email" class="form-label">
              Email <span class="text-danger">*</span>
            </label>

            <BFormInput
                id="email"
                v-model="form.email"
                type="email"
                placeholder="nama@example.com"
                autocomplete="email"
                :disabled="loading"
                :state="errors.email ? false : null"
            />

            <div v-if="errors.email" class="text-danger small mt-1">
              {{ errors.email }}
            </div>
          </div>

          <!-- Password -->
          <div class="col-md-6">
            <label for="password" class="form-label">
              Password
              <span v-if="!isEditMode" class="text-danger">*</span>
            </label>

            <BFormInput
                id="password"
                v-model="form.password"
                type="password"
                :placeholder="isEditMode ? 'Kosongkan jika tidak ingin mengubah password' : 'Masukkan password'"
                autocomplete="new-password"
                :disabled="loading"
                :state="errors.password ? false : null"
            />

            <div v-if="errors.password" class="text-danger small mt-1">
              {{ errors.password }}
            </div>
          </div>

          <!-- Password Confirmation -->
          <div class="col-md-6">
            <label for="passwordConfirmation" class="form-label">
              Konfirmasi password
              <span v-if="!isEditMode" class="text-danger">*</span>
            </label>

            <BFormInput
                id="passwordConfirmation"
                v-model="form.passwordConfirmation"
                type="password"
                :placeholder="isEditMode ? 'Kosongkan jika tidak ingin mengubah password' : 'Ulangi password'"
                autocomplete="new-password"
                :disabled="loading"
                :state="errors.passwordConfirmation ? false : null"
            />

            <div
                v-if="errors.passwordConfirmation"
                class="text-danger small mt-1"
            >
              {{ errors.passwordConfirmation }}
            </div>
          </div>

          <!-- Roles -->
          <div class="col-12">
            <label class="form-label">
              Role pengguna <span class="text-danger">*</span>
            </label>

            <div v-if="loadingRoles" class="text-secondary small">
              Memuat daftar role...
            </div>

            <div
                v-else-if="roles.length === 0"
                class="alert alert-warning mb-0"
            >
              Belum ada role yang tersedia.
            </div>

            <div v-else class="border rounded-3 p-3">
              <div
                  v-for="role in roles"
                  :key="role.id"
                  class="form-check mb-2"
              >
                <input
                    :id="`role-${role.id}`"
                    v-model="selectedRoleIds"
                    class="form-check-input"
                    type="checkbox"
                    :value="role.id"
                    :disabled="loading"
                />

                <label
                    class="form-check-label fw-medium"
                    :for="`role-${role.id}`"
                >
                  {{ role.name }}

                  <span
                      v-if="role.description"
                      class="d-block text-secondary small fw-normal"
                  >
                    {{ role.description }}
                  </span>
                </label>
              </div>
            </div>

            <div v-if="errors.roles" class="text-danger small mt-1">
              {{ errors.roles }}
            </div>

            <div class="form-text">
              Pilih satu atau lebih role untuk pengguna ini.
            </div>
          </div>

          <!-- Status -->
          <div class="col-12">
            <div class="form-check form-switch">
              <input
                  id="isActive"
                  v-model="form.isActive"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :disabled="loading"
              />

              <label class="form-check-label fw-medium" for="isActive">
                Pengguna aktif
              </label>

              <div class="form-text">
                Pengguna yang nonaktif tidak dapat menggunakan akun jika
                backend menerapkan pemeriksaan status aktif.
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="col-12">
            <hr />

            <div class="d-flex flex-wrap justify-content-end gap-2">
              <BButton
                  type="button"
                  variant="outline-secondary"
                  :disabled="loading"
                  @click="goBack"
              >
                Batal
              </BButton>

              <BButton
                  type="submit"
                  variant="primary"
                  :disabled="!canSubmit || loadingRoles"
              >
                <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                />

                <i v-else class="ri-save-line me-1" />

                {{ loading ? "Menyimpan..." : "Simpan Pengguna" }}
              </BButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>