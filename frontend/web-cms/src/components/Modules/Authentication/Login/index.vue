<template>
  <div class="m-auto m-1230">
    <div class="row align-items-center">
      <!-- Login Illustration -->
      <div class="col-lg-6 d-none d-lg-block">
        <img
            src="@/assets/images/login.jpg"
            class="rounded-3"
            alt="Login illustration"
        />
      </div>

      <!-- Login Form -->
      <div class="col-lg-6">
        <div class="mw-480 ms-lg-auto">
          <!-- Logo -->
          <div class="d-inline-block mb-4">
            <img
                src="@/assets/images/logo.svg"
                class="rounded-3 for-light-logo"
                alt="Logo"
            />

            <img
                src="@/assets/images/white-logo.svg"
                class="rounded-3 for-dark-logo"
                alt="Logo"
            />
          </div>

          <h3 class="fs-18 mb-2">
            WEBSITE CONTENT MANAGEMENT SYSTEM (CMS)
          </h3>

          <p class="fw-medium fs-16 mb-4">
            Sign In untuk manajemen sistem website
            <a href="#" @click.prevent>xyz.com</a>
          </p>

          <form @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="form-group mb-4">
              <label for="email" class="label text-secondary">
                Email / Username
              </label>

              <input
                  id="email"
                  v-model.trim="form.email"
                  type="email"
                  class="form-control h-55"
                  placeholder="example@email.com"
                  autocomplete="username"
                  required
                  :disabled="auth.loading"
              />
            </div>

            <!-- Password -->
            <div class="form-group mb-4">
              <label for="password" class="label text-secondary">
                Password
              </label>

              <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  class="form-control h-55"
                  placeholder="Ketikkan password"
                  autocomplete="current-password"
                  required
                  :disabled="auth.loading"
              />
            </div>

            <!-- Submit -->
            <div class="form-group mb-4">
              <button
                  type="submit"
                  class="btn btn-primary fw-medium py-2 px-3 w-100"
                  :disabled="auth.loading || !canSubmit"
              >
                <div
                    class="d-flex align-items-center justify-content-center py-1"
                >
                  <span
                      class="material-symbols-outlined text-white fs-20 me-2"
                      aria-hidden="true"
                  >
                    {{ auth.loading ? "progress_activity" : "login" }}
                  </span>

                  <span>
                    {{ auth.loading ? "Mohon tunggu..." : "Masuk" }}
                  </span>
                </div>
              </button>
            </div>

            <!-- Error -->
            <div
                v-if="errorMessage"
                class="alert alert-danger"
                role="alert"
                aria-live="polite"
            >
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const errorMessage = ref("");

const canSubmit = computed(() => {
  return form.email.trim().length > 0 && form.password.length > 0;
});

async function handleLogin() {
  if (!canSubmit.value || auth.loading) return;

  errorMessage.value = "";

  try {
    await auth.login({
      email: form.email.trim(),
      password: form.password,
    });

    await router.push("/dashboard");
  } catch (error: unknown) {
    console.error("Login error:", error);
    console.log(error.status);
    if (error.status === 403) {
      errorMessage.value = "User tidak aktif. Hubungi admin!";
    } else if (error.status === 401) {
      errorMessage.value = "Username (email) atau password salah!";
    }

  }
}
</script>