<template>
  <div
    v-if="isVisible"
    :class="notificationClasses"
    class="right-4 bottom-4 z-50 fixed shadow-lg p-4 rounded-lg w-72"
  >
    <div class="flex items-center">
      <div v-if="type === 'success'" class="mr-3 text-green-500">
        <!-- Success icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.293 9.293a1 1 0 011.414 0L10 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div v-if="type === 'error'" class="mr-3 text-red-500">
        <!-- Error icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 5a1 1 0 112 0v5a1 1 0 11-2 0V5zM9 11a1 1 0 112 0v2a1 1 0 11-2 0v-2z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="flex-1 font-medium text-sm">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const notificationClasses = computed(() => {
  return {
    "bg-green-100 border-l-4 border-green-500": props.type === "success",
    "bg-red-100 border-l-4 border-red-500": props.type === "error",
  };
});
</script>
