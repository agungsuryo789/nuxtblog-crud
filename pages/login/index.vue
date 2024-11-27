<template>
  <section class="grid grid-cols-4 min-h-screen">
    <div class="lg:block content-center hidden lg:col-span-2">
      <img
        src="https://account.asus.com/img/login_img02.png"
        alt=""
        class="m-auto"
      />
    </div>
    <div
      class="flex flex-col justify-center items-center col-span-4 lg:col-span-2 text-center"
    >
      <p class="my-6 font-bold text-4xl">Welcome!</p>
      <form class="flex flex-col gap-4 w-fit" @submit.prevent="handleLogin">
        <input
          type="text"
          class="border-2 shadow-md px-4 py-2 rounded-md focus:outline-sky-400 duration-100 delay-100"
          placeholder="username"
          v-model="username"
        />
        <input
          type="password"
          class="border-2 shadow-md px-4 py-2 rounded-md focus:outline-sky-400 duration-100 delay-100"
          placeholder="password"
          v-model="password"
        />
        <button
          type="submit"
          class="bg-sky-500 shadow-lg px-4 py-2 rounded-md text-white focus:outline-sky-400 duration-100 delay-100"
        >
          Login
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const router = useRouter();

const userStore = useAuthStore();
const username = ref("admin");
const password = ref("admin123");

const handleLogin = async () => {
  if (username.value && password.value) {
    await userStore.login(username.value, password.value);
    if (userStore.isAuthenticated) {
      router.push("/");
    }
  } else {
    alert("Please enter valid credentials");
  }
};
</script>

<style></style>
