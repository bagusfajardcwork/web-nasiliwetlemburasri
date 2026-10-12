<template>
  <div class="main-content-container overflow-hidden">
    <!-- Header -->
    <div class="mb-4">
      <h3 class="mb-1">Dashboard CMS</h3>
      <p class="text-secondary mb-0">
        Ringkasan dan akses cepat pengelolaan website.
      </p>
    </div>

    <!-- Welcome -->
    <div class="card border-0 rounded-3 mb-4">
      <div class="card-body p-4">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h4 class="mb-2">
              Selamat datang, {{ auth.user?.name || "Pengguna" }}!
            </h4>
            <p class="text-secondary mb-0">
              Kelola konten website dan pengguna melalui dashboard ini.
            </p>
          </div>

          <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
            {{ auth.roles.map((role) => role.name).join(", ") || "Pengguna" }}
          </span>
        </div>
      </div>
    </div>

    <!-- Quick Access -->
    <div class="mb-3">
      <h5 class="mb-3">Menu Utama</h5>

      <div class="row g-3">
        <div v-if="auth.hasPermission('users.read')" class="col-sm-6 col-xl-4">
          <div class="card h-100 border-0 rounded-3">
            <div class="card-body p-4">
              <div class="mb-3">
                <span class="material-symbols-outlined fs-1 text-primary">
                  group
                </span>
              </div>

              <h5>Pengguna</h5>
              <p class="text-secondary">
                Kelola akun pengguna yang memiliki akses ke CMS.
              </p>

              <RouterLink
                  to="/users/users-list"
                  class="btn btn-primary btn-sm"
              >
                Kelola Pengguna
              </RouterLink>
            </div>
          </div>
        </div>

        <div
            v-if="auth.hasPermission('roles.read')"
            class="col-sm-6 col-xl-4"
        >
          <div class="card h-100 border-0 rounded-3">
            <div class="card-body p-4">
              <div class="mb-3">
                <span class="material-symbols-outlined fs-1 text-success">
                  admin_panel_settings
                </span>
              </div>

              <h5>Roles</h5>
              <p class="text-secondary">
                Kelola role untuk mengatur akses pengguna.
              </p>

              <RouterLink to="/roles" class="btn btn-success btn-sm">
                Kelola Roles
              </RouterLink>
            </div>
          </div>
        </div>

        <div
            v-if="auth.hasPermission('permissions.read')"
            class="col-sm-6 col-xl-4"
        >
          <div class="card h-100 border-0 rounded-3">
            <div class="card-body p-4">
              <div class="mb-3">
                <span class="material-symbols-outlined fs-1 text-warning">
                  verified_user
                </span>
              </div>

              <h5>Permissions</h5>
              <p class="text-secondary">
                Lihat daftar hak akses yang tersedia di CMS.
              </p>

              <RouterLink
                  to="/permissions"
                  class="btn btn-warning btn-sm"
              >
                Lihat Permissions
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();
</script>