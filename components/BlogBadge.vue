<template>
  <span class="bg-slate-200 p-2 rounded-md text-slate-600 text-sm">{{ label }}</span>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<style scoped></style>
