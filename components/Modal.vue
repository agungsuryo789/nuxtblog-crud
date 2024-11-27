<template>
  <div
    v-show="isOpen"
    class="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
    :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }"
  >
    <div class="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
      <button
        @click="closeModal"
        class="top-4 right-4 absolute text-2xl text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}
</script>

<style scoped></style>
