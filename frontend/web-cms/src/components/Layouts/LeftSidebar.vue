```vue
<template>
  <div class="sidebar-area">
    <div class="logo position-relative">
      <RouterLink
          to="/dashboard"
          class="d-block text-decoration-none position-relative"
      >
        <img src="@/assets/images/logo-icon.png" alt="logo-icon" />
        <span class="logo-text fw-bold text-dark">CMS Admin</span>
      </RouterLink>

      <button
          class="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y"
          id="sidebar-burger-menu"
          @click="stateStoreInstance.onChange"
      >
        <i data-feather="x"></i>
      </button>
    </div>

    <div class="layout-menu menu-vertical menu hover-scroll-bar">
      <ul class="menu-inner">
        <li class="menu-title small text-uppercase">
          <span class="menu-title-text">DASHBOARD</span>
        </li>

        <li class="menu-item">
          <RouterLink to="/dashboard" class="menu-link">
            <span class="material-symbols-outlined menu-icon">
              dashboard
            </span>
            <span class="title">Beranda</span>
          </RouterLink>
        </li>

        <li class="menu-title small text-uppercase">
          <span class="menu-title-text">MANAJEMEN CMS</span>
        </li>

        <li v-if="auth.hasPermission('users.read')" class="menu-item">
          <RouterLink to="/users/users-list" class="menu-link">
            <span class="material-symbols-outlined menu-icon">group</span>
            <span class="title">Pengguna</span>
          </RouterLink>
        </li>

        <li v-if="auth.hasPermission('roles.read')" class="menu-item">
          <RouterLink to="/roles" class="menu-link">
            <span class="material-symbols-outlined menu-icon">
              admin_panel_settings
            </span>
            <span class="title">Roles</span>
          </RouterLink>
        </li>

        <li v-if="auth.hasPermission('permissions.read')" class="menu-item" >
          <RouterLink to="/permissions" class="menu-link">
            <span class="material-symbols-outlined menu-icon">
              verified_user
            </span>
            <span class="title">Permissions</span>
          </RouterLink>
        </li>

        <li class="menu-title small text-uppercase">
          <span class="menu-title-text">AKUN</span>
        </li>

        <li class="menu-item">
          <a href="#" class="menu-link" @click.prevent="handleLogout">
            <span class="material-symbols-outlined menu-icon">logout</span>
            <span class="title">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import feather from "feather-icons";
import stateStore from "@/utils/store";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const auth = useAuthStore();
const stateStoreInstance = stateStore;

function handleLogout() {
  auth.logout();
  router.push("/authentication/login");
}

onMounted(() => {
  feather.replace();
});
</script>
```