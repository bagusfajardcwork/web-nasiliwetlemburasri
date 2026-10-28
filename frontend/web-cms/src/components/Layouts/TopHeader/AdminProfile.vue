<template>
  <div class="dropdown admin-profile">
    <div
        class="d-xxl-flex align-items-center bg-transparent border-0 text-start p-0 cursor dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
      <div class="flex-shrink-0">
        <img
            class="rounded-circle wh-40 administrator"
            src="@/assets/images/administrator.jpg"
            alt="admin"
        />
      </div>

      <div class="flex-grow-1 ms-2">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-none d-xxl-block">
            <div class="d-flex align-content-center">
              <h3>{{ authStore.user?.name ?? "Administrator" }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dropdown-menu border-0 bg-white dropdown-menu-end">
      <div class="d-flex align-items-center info">
        <div class="flex-shrink-0">
          <img
              class="rounded-circle wh-30 administrator"
              src="@/assets/images/administrator.jpg"
              alt="admin"
          />
        </div>

        <div class="flex-grow-1 ms-2">
          <h3 class="fw-medium">
            {{ authStore.user?.name ?? "Administrator" }}
          </h3>
          <span class="fs-12">
            {{ authStore.user?.email ?? "" }}
          </span>
        </div>
      </div>

      <ul class="admin-link ps-0 mb-0 list-unstyled">
        <li>
          <RouterLink
              class="dropdown-item d-flex align-items-center text-body"
              to="/my-profile"
          >
            <i class="material-symbols-outlined">account_circle</i>
            <span class="ms-2">My Profile</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
              class="dropdown-item d-flex align-items-center text-body"
              to="/apps/chat"
          >
            <i class="material-symbols-outlined">chat</i>
            <span class="ms-2">Messages</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
              class="dropdown-item d-flex align-items-center text-body"
              to="/apps/to-do-list"
          >
            <i class="material-symbols-outlined">format_list_bulleted</i>
            <span class="ms-2">My Task</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
              class="dropdown-item d-flex align-items-center text-body"
              to="/my-profile"
          >
            <i class="material-symbols-outlined">credit_card</i>
            <span class="ms-2">Billing</span>
          </RouterLink>
        </li>
      </ul>

      <ul class="admin-link ps-0 mb-0 list-unstyled">
        <li>
          <RouterLink
              class="dropdown-item d-flex align-items-center text-body"
              to="/social/settings"
          >
            <i class="material-symbols-outlined">settings</i>
            <span class="ms-2">Settings</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
              class="dropdown-item d-flex align-items-center text-body"
              to="/help-desk/tickets"
          >
            <i class="material-symbols-outlined">support</i>
            <span class="ms-2">Support</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
              class="dropdown-item d-flex align-items-center text-body"
              to="/authentication/lock-screen"
          >
            <i class="material-symbols-outlined">lock</i>
            <span class="ms-2">Lock Screen</span>
          </RouterLink>
        </li>

        <li>
          <button
              type="button"
              class="dropdown-item d-flex align-items-center text-body"
              :disabled="isLoggingOut"
              @click="handleLogout"
          >
            <i class="material-symbols-outlined">logout</i>
            <span class="ms-2">
              {{ isLoggingOut ? "Logging out..." : "Logout" }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

export default defineComponent({
  name: "AdminProfile",

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    return {
      router,
      authStore,
    };
  },

  data() {
    return {
      isLoggingOut: false,
    };
  },

  methods: {
    async handleLogout() {
      if (this.isLoggingOut) return;

      this.isLoggingOut = true;

      try {
        await this.authStore.logout();
      } finally {
        // Store sudah membersihkan token lokal.
        // Tetap arahkan pengguna ke halaman login.
        await this.router.replace("/authentication/login");
        this.isLoggingOut = false;
      }
    },
  },
});
</script>