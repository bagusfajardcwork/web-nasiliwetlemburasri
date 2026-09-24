<template>
  <div class="no-scrollbar relative z-20 max-h-[55vh] space-y-7 overflow-y-auto pb-16">
    <!-- User Message -->
    <div class="flex justify-end">
      <div :class="editing ? 'w-full' : 'max-w-[480px]'">
        <!-- View mode -->
        <div v-if="!editing" class="ml-auto w-full max-w-[480px]">
          <div
            class="shadow-theme-xs bg-gray-100 dark:bg-gray-800 rounded-xl rounded-tr-xs px-4 py-3"
          >
            <p class="text-left text-base leading-6 font-normal text-gray-800 dark:text-white/90">
              {{ userText }}
            </p>
          </div>
          <div class="mt-2 flex justify-end">
            <UiTooltip content="Edit" placement="top" variant="dark">
              <button @click="handleEdit" :class="BTN_CLASS">
                <EditIcon class="size-4" />
              </button>
            </UiTooltip>
            <UiTooltip :content="copiedUser ? 'Copied!' : 'Copy'" placement="top" variant="dark">
              <button @click="handleCopyUser" :class="BTN_CLASS">
                <CopySmIcon v-if="copiedUser" class="size-4" />
                <CheckSmIcon v-else class="size-4" />
              </button>
            </UiTooltip>
          </div>
        </div>

        <!-- Edit mode -->
        <div
          v-else
          class="w-full rounded-2xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-gray-900"
        >
          <textarea
            rows="3"
            v-model="draft"
            @keydown.esc="handleCancel"
            class="w-full resize-none border-0 bg-transparent p-0 text-base leading-6 text-gray-800 [scrollbar-width:none] outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white/90 [&::-webkit-scrollbar]:hidden"
          ></textarea>
          <div class="mt-2 flex items-center justify-end gap-2">
            <button
              @click="handleCancel"
              class="inline-flex h-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              @click="handleSend"
              class="inline-flex h-9 items-center justify-center rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-black dark:bg-white dark:text-gray-900"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Response -->
    <div class="flex lg:justify-start mb-6">
      <div>
        <div class="max-w-[480px]">
          <p class="mb-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <img src="/images/model/claude.svg" alt="model" />
            Claude Sonnet 4.6
          </p>
          <p class="mb-3 text-base leading-6 text-gray-800 dark:text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor.
            Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.
          </p>
        </div>
        <div class="flex-1 w-full">
          <div
            class="dark:bg-dark-primary shadow-theme-xs relative w-full rounded-[20px] border border-gray-200 bg-white lg:max-w-3xl dark:border-gray-800 dark:bg-white/3"
          >
            <!-- Code block header -->
            <div
              class="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800"
            >
              <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M5.0625 5.99976L2.0625 9.00003L5.0625 12M12.9375 5.99976L15.9375 9.00003L12.9375 12M10.3329 2.99994L7.66626 14.9999"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-sm text-gray-500 dark:text-gray-400">HTML</p>
              </div>
              <div class="flex gap-2">
                <UiTooltip
                  :content="copiedCode ? 'Copied!' : 'Copy'"
                  placement="top"
                  variant="dark"
                >
                  <button
                    @click="handleCopyCode"
                    class="inline-flex size-8 items-center justify-center rounded-full border border-gray-200 text-gray-700 dark:border-gray-800 dark:text-gray-400"
                  >
                    <CopySmIcon v-if="copiedCode" class="size-4" />
                    <CheckSmIcon v-else class="size-4" />
                  </button>
                </UiTooltip>
                <UiTooltip content="Edit" placement="top" variant="dark">
                  <button
                    class="inline-flex size-8 items-center justify-center rounded-full border border-gray-200 text-gray-700 dark:border-gray-800 dark:text-gray-400"
                  >
                    <EditIcon class="size-4" />
                  </button>
                </UiTooltip>
              </div>
            </div>
            <!-- Code content -->
            <div class="custom-scrollbar max-h-[350px] w-full overflow-y-auto px-5 py-4">
              <pre><code class="language-html" v-html="highlightedCode"></code></pre>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm leading-5 text-gray-500 dark:text-gray-400">
              Here is the code for login form with google and github authentication as described.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-markdown'
import UiTooltip from '@/components/ui/Tooltip.vue'
import { CheckSmIcon, CopySmIcon, EditIcon } from '@/icons'

const BTN_CLASS =
  'group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90'

const defaultUserMessage = 'Create a login form in HTML with Google and GitHub authentication.'

const userText = ref(defaultUserMessage)
const editing = ref(false)
const draft = ref('')
const copiedUser = ref(false)
const copiedCode = ref(false)

const reactComponentCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Form</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .login-container {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .login-header { text-align: center; margin-bottom: 2rem; }
    .login-header h1 { color: #333; font-size: 2rem; margin-bottom: 0.5rem; }
    .login-header p { color: #666; font-size: 0.9rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; color: #333; font-weight: 500; }
    .form-group input {
      width: 100%; padding: 0.75rem;
      border: 2px solid #e1e5e9; border-radius: 5px;
      font-size: 1rem; transition: border-color 0.3s ease;
    }
    .form-group input:focus { outline: none; border-color: #667eea; }
    .login-btn {
      width: 100%; padding: 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; border: none; border-radius: 5px;
      font-size: 1rem; font-weight: 600; cursor: pointer;
      transition: transform 0.2s ease; margin-bottom: 1rem;
    }
    .login-btn:hover { transform: translateY(-2px); }
    .social-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    .social-btn {
      padding: 0.75rem; border: 2px solid #e1e5e9; border-radius: 5px;
      background: white; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      gap: 0.5rem; transition: all 0.3s ease;
      text-decoration: none; color: #333; font-weight: 500;
    }
    .social-btn:hover { border-color: #667eea; transform: translateY(-2px); }
    .google-btn:hover { background: #db4437; color: white; border-color: #db4437; }
    .github-btn:hover { background: #333; color: white; border-color: #333; }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-header">
      <h1>Welcome Back</h1>
      <p>Please sign in to your account</p>
    </div>
    <form id="loginForm">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit" class="login-btn">Sign In</button>
    </form>
    <div class="social-buttons">
      <a href="#" class="social-btn google-btn">Google</a>
      <a href="#" class="social-btn github-btn">GitHub</a>
    </div>
  </div>
</body>
</html>`

const highlightedCode = computed(() => {
  try {
    return Prism.highlight(reactComponentCode, Prism.languages.html, 'html')
  } catch {
    return reactComponentCode
  }
})

const handleEdit = () => {
  draft.value = userText.value
  editing.value = true
}

const handleSend = () => {
  userText.value = draft.value.trim() || userText.value
  editing.value = false
}

const handleCancel = () => {
  editing.value = false
}

const handleCopyUser = async () => {
  try {
    await navigator.clipboard.writeText(userText.value)
    copiedUser.value = true
    setTimeout(() => {
      copiedUser.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const handleCopyCode = async () => {
  try {
    await navigator.clipboard.writeText(reactComponentCode)
    copiedCode.value = true
    setTimeout(() => {
      copiedCode.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code: ', err)
  }
}
</script>
