<template>
  <nav
    class="top-0 z-50 sticky flex md:flex-row flex-col justify-between items-center md:content-center gap-4 bg-white shadow-md py-4"
  >
    <p class="mx-2 font-bold font-serif text-xl">
      <NuxtLink to="/">NuxtBlog!</NuxtLink>
    </p>
    <div class="flex flex-row gap-2 border-2 p-2 rounded-lg hover:scale-105" v-show="isHomePage">
      <input
        type="text"
        placeholder="search posts..."
        class="focus:outline-none"
      />
    </div>
    <ul class="flex px-2 w-fit">
      <li
        v-show="!isLoginPage && !userStore.isAuthenticated"
        class="hover:scale-110 duration-100 delay-100"
      >
        <NuxtLink to="/login" class="font-bold">Login</NuxtLink>
      </li>
      <li v-show="userStore.isAuthenticated && !isDashboard" class="hover:scale-110 duration-100 delay-100">
        <NuxtLink to="/dashboard" class="font-bold">Dashboard</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const userStore = useAuthStore()
const route = useRoute();

const isLoginPage = computed(() => route.path === "/login");
const isDashboard = computed(() => route.path === "/dashboard");
const isHomePage = computed(() => route.path === "/");
</script>
