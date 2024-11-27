<template>
  <section class="flex flex-col items-center gap-4 p-4 min-h-screen">
    <h3 class="font-bold text-4xl">Your Dashboard</h3>
    <div class="flex flex-row w-full h-fit">
      <button
        @click="handleOpenModal"
        class="bg-green-400 shadow-lg px-4 py-2 rounded-md text-white hover:scale-105 duration-100 delay-100"
      >
        Create blog post!
      </button>
    </div>
    <ul class="flex flex-col gap-4 w-full">
      <li
        class="flex flex-row justify-between hover:bg-slate-200 p-2 border-b-2"
        v-for="post in postsStore.posts"
        :key="post.id"
      >
        <p class="text-lg">{{ post.title }}</p>
        <div class="flex gap-2">
          <button class="hover:scale-105 duration-100 delay-100">
            <img src="/public//icon/edit.svg" alt="edit blog" />
          </button>
          <button
            @click="handleOpenDel"
            class="hover:scale-105 duration-100 delay-100"
          >
            <img src="/public//icon/trash-2.svg" alt="delete blog" />
          </button>
        </div>
      </li>
    </ul>
    <Modal :isOpen="isModalAddOpen" @close="handleCloseModal">
      <form @submit.prevent="handleSubmitForm" class="flex flex-col gap-2 p-2">
        <p>Title</p>
        <input
          v-model="blogTitle"
          type="text"
          class="border-2 border-slate-200 shadow-md rounded-lg"
        />
        <p>Content</p>
        <textarea
          v-model="blogContent"
          class="border-2 border-slate-200 shadow-md rounded-lg"
        />
        <div class="flex justify-end w-full">
          <button
            type="submit"
            class="bg-teal-400 shadow-md px-4 py-2 rounded-lg text-white hover:scale-105 duration-100 delay-100"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
    <Modal :isOpen="isModalDelOpen" @close="handleCloseDel">
      <h4 class="my-4 font-bold text-2xl text-center">
        Are you sure want to delete?
      </h4>
      <div class="flex flex-row justify-center gap-2 my-2 w-full">
        <button
          @click="handleCloseDel"
          class="shadow-md px-4 py-2 rounded-md hover:scale-105 duration-100 delay-100"
        >
          Cancel
        </button>
        <button
          class="bg-red-400 shadow-md px-4 py-2 rounded-md text-white hover:scale-105 duration-100 delay-100"
        >
          Delete
        </button>
      </div>
    </Modal>
  </section>
</template>

<script setup lang="ts">
const postsStore = usePostsStore();

const blogTitle = ref("");

const blogContent = ref("");

const isModalAddOpen = ref(false);

const isModalDelOpen = ref(false);

const handleOpenDel = () => {
  isModalDelOpen.value = true;
};

const handleCloseDel = () => {
  isModalDelOpen.value = false;
};

const handleOpenModal = () => {
  isModalAddOpen.value = true;
};

const handleCloseModal = () => {
  isModalAddOpen.value = false;
};

const handleSubmitForm = async () => {
  if (blogTitle.value === "" || blogContent.value === "")
    alert("Please fill the field");

  const newPost = {
    id: Date.now(),
    title: blogTitle.value,
    body: blogContent.value,
    tags: [],
    reactions: {
      likes: 0,
      dislike: 0,
    },
  };

  await postsStore.createPost(newPost);
  handleCloseModal();
};

onBeforeMount(async () => {
  await callOnce(postsStore.fetchPosts);
});
</script>

<style scoped></style>
