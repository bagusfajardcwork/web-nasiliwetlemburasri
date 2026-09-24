<template>
  <div>
    <!-- Backdrop -->
    <div
      v-show="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 z-99999 bg-black/50 xl:hidden dark:bg-black/80"
      :class="{ 'opacity-100': isSidebarOpen, 'opacity-0': !isSidebarOpen }"
      style="transition: opacity 0.3s ease-in-out"
    >
      <div class="absolute top-4 right-[300px]">
        <button
          @click="closeSidebar"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white/90 dark:hover:bg-white/3 hover:dark:text-white"
        >
          <CloseIcon class="size-5" />
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <aside
      :class="
        isSidebarOpen
          ? 'flex fixed xl:static  z-999999 h-screen bg-white dark:bg-gray-900'
          : 'hidden xl:flex relative'
      "
      class="z-50 w-70 h-full top-0 right-0 flex-col border-l border-gray-200 bg-white p-6 ease-in-out dark:border-gray-800 dark:bg-gray-900"
    >
      <button
        @click="startNewChat"
        class="bg-brand-500 hover:bg-brand-600 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 10.0002H15.0006M10.0002 5V15.0006"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        New Chat
      </button>

      <div class="mt-5">
        <div class="relative">
          <span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              class="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                fill=""
              />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-3.5 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
        </div>
      </div>

      <!-- Chat Items -->
      <div class="custom-scrollbar mt-6 h-full flex-1 space-y-3 overflow-y-auto pb-6 text-sm">
        <!-- Today Section -->
        <div>
          <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Today</p>
          <ul class="space-y-1">
            <ChatHistoryItem
              v-for="chat in chats.today"
              :key="chat.id"
              :chat="chat"
              :open-dropdown="openDropdown"
              @toggle-dropdown="toggleDropdown"
              @toggle-star="handleToggleStar"
              @rename="handleOpenRename"
              @delete="deleteChat"
            />
          </ul>
        </div>

        <!-- Yesterday Section -->
        <div>
          <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Yesterday</p>
          <ul class="space-y-1">
            <ChatHistoryItem
              v-for="chat in chats.yesterday"
              :key="chat.id"
              :chat="chat"
              :open-dropdown="openDropdown"
              @toggle-dropdown="toggleDropdown"
              @toggle-star="handleToggleStar"
              @rename="handleOpenRename"
              @delete="deleteChat"
            />
          </ul>
        </div>

        <!-- Last Week Section (collapsible) -->
        <div>
          <button
            @click="showMore = !showMore"
            :class="showMore ? 'hidden' : 'block'"
            class="mb-3 flex w-full items-center justify-between pl-3 text-xs text-gray-400 uppercase hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span>Last Week</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.83331 6.41669L7.99998 10.5834L12.1666 6.41669"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div v-show="showMore">
            <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Last Week</p>
            <ul class="space-y-1">
              <ChatHistoryItem
                v-for="chat in chats.lastWeek"
                :key="chat.id"
                :chat="chat"
                :open-dropdown="openDropdown"
                @toggle-dropdown="toggleDropdown"
                @toggle-star="handleToggleStar"
                @rename="handleOpenRename"
                @delete="deleteChat"
              />
            </ul>
          </div>

          <button
            @click="showMore = !showMore"
            v-show="showMore"
            class="mt-3 flex w-full items-center justify-center pl-3 text-xs text-gray-400 uppercase hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span>Show Less</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="ml-1 rotate-180"
            >
              <path
                d="M3.83331 6.41669L7.99998 10.5834L12.1666 6.41669"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <RenameModal
      :isOpen="renameModalOpen"
      @close="closeRenameModal"
      :currentTitle="chatToRenameTitle"
      @save="handleSaveRename"
    />
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, computed } from 'vue'
import RenameModal from '../modals/RenameModal.vue'
import ChatHistoryItem from './ChatHistoryItem.vue'
import { CloseIcon } from '@/icons/index.ts'

// Inject sidebar state from parent AiLayout
const aiSidebar = inject('aiSidebar')
const { isSidebarOpen, closeSidebar } = aiSidebar || {
  isSidebarOpen: ref(false),
  closeSidebar: () => {},
}

// Local reactive state
const searchQuery = ref('')
const showMore = ref(false)
const openDropdown = ref(null)

// Chat data
const chats = ref({
  today: [
    { id: 1, title: 'Write a follow-up email to a client' },
    { id: 2, title: 'Generate responsive login form layout' },
    { id: 3, title: 'Create a warning state modal' },
    { id: 4, title: 'Suggest color palette for dark theme' },
  ],
  yesterday: [
    { id: 5, title: 'Improve login page accessibility' },
    { id: 6, title: 'Create a warning state modal with animation' },
    { id: 7, title: 'Add password visibility toggle' },
    { id: 8, title: 'Write validation logic for login form...' },
    { id: 9, title: 'Fix mobile responsiveness of login UI...' },
  ],
  lastWeek: [
    { id: 10, title: 'Improve login page accessibility' },
    { id: 11, title: 'Build a dashboard component' },
  ],
})

// Methods
const startNewChat = () => {
  console.log('Starting new chat...')
  closeDropdown() // Close any open dropdown
  // Add logic to start a new chat
}

const toggleDropdown = (id) => {
  openDropdown.value = openDropdown.value === id ? null : id
}

const closeDropdown = () => {
  openDropdown.value = null
}

const renameModalOpen = ref(false)
const chatToRenameId = ref(null)

const chatToRenameTitle = computed(() => {
  if (!chatToRenameId.value) return ''
  let found = null
  Object.keys(chats.value).forEach((period) => {
    const chat = chats.value[period].find((c) => c.id === chatToRenameId.value)
    if (chat) found = chat
  })
  return found ? found.title : ''
})

const handleToggleStar = (chat) => {
  chat.starred = !chat.starred
  closeDropdown()
}

const handleOpenRename = (chat) => {
  chatToRenameId.value = chat.id
  renameModalOpen.value = true
  closeDropdown()
  closeSidebar()
}

const closeRenameModal = () => {
  renameModalOpen.value = false
  chatToRenameId.value = null
}

const handleSaveRename = (newName) => {
  Object.keys(chats.value).forEach((period) => {
    const chat = chats.value[period].find((c) => c.id === chatToRenameId.value)
    if (chat) chat.title = newName
  })
  closeRenameModal()
}

const deleteChat = (id) => {
  console.log('Deleting chat:', id)
  closeDropdown()
  // Add delete logic here

  // Remove chat from appropriate array
  Object.keys(chats.value).forEach((period) => {
    chats.value[period] = chats.value[period].filter((chat) => chat.id !== id)
  })
}

// Handle click outside to close dropdown
const handleClickOutside = (event) => {
  // Check if the click is outside any dropdown
  const dropdowns = document.querySelectorAll('.dropdown-menu')
  const dropdownButtons = document.querySelectorAll('.dropdown-button')

  let isOutside = true

  // Check if click is on dropdown button or inside dropdown
  dropdownButtons.forEach((button) => {
    if (button.contains(event.target)) {
      isOutside = false
    }
  })

  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(event.target)) {
      isOutside = false
    }
  })

  if (isOutside) {
    closeDropdown()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Remove the old v-click-outside directive as we're handling it differently
</script>
