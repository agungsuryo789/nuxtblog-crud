<template>
  <div v-if="postsStore.loading">
    <div v-for="n in 10" :key="n">
      <LoaderListPost class="mx-auto" />
    </div>
  </div>

  <section
    v-if="!postsStore.loading"
    class="flex flex-col items-center gap-4 p-4 min-h-screen"
  >
    <h3 class="font-bold text-4xl">Your Dashboard</h3>
    <div class="flex flex-row w-full h-fit">
      <button
        @click="handleToggleAdd('open')"
        class="bg-green-400 shadow-lg px-4 py-2 rounded-md text-white hover:scale-105 duration-100 delay-100"
      >
        Create blog post!
      </button>
    </div>
    <ul class="flex flex-col gap-4 w-full">
      <li
        class="flex md:flex-row flex-col justify-between hover:bg-slate-200 p-2 border-b-2"
        v-for="post in postsStore.posts"
        :key="post.id"
      >
        <p class="text-lg">{{ post.title }}</p>
        <div class="flex gap-2">
          <button
            @click="handleToggleEdit('open', post)"
            class="hover:scale-105 duration-100 delay-100"
          >
            <img src="/public//icon/edit.svg" alt="edit blog" />
          </button>
          <button
            @click="handleOpenDel(post.id)"
            class="hover:scale-105 duration-100 delay-100"
          >
            <img src="/public//icon/trash-2.svg" alt="delete blog" />
          </button>
        </div>
      </li>
    </ul>
    <Modal :isOpen="isModalAddOpen" @close="handleToggleAdd('close')">
      <form @submit.prevent="handleSubmitForm" class="flex flex-col gap-2 p-2">
        <p>Title</p>
        <input
          v-model="blogTitle"
          type="text"
          class="border-2 border-slate-200 shadow-md rounded-lg"
          required
        />
        <p>Content</p>
        <textarea
          v-model="blogContent"
          class="border-2 border-slate-200 shadow-md rounded-lg"
          required
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
          @click="handleDeletePost"
          class="bg-red-400 shadow-md px-4 py-2 rounded-md text-white hover:scale-105 duration-100 delay-100"
        >
          Delete
        </button>
      </div>
    </Modal>
    <Modal :isOpen="isModalEditOpen" @close="handleToggleEdit('close')">
      <form @submit.prevent="handleEditPost" class="flex flex-col gap-2 p-2">
        <p>Title</p>
        <input
          v-model="editPostData.title"
          type="text"
          class="border-2 border-slate-200 shadow-md p-2 rounded-lg"
          required
        />
        <p>Content</p>
        <textarea
          v-model="editPostData.body"
          class="border-2 border-slate-200 shadow-md p-2 rounded-lg"
          required
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
    <Notification
      :isVisible="showNotification"
      :message="notificationMessage"
      :type="notificationType"
    />
  </section>
</template>

<script setup lang="ts">
onBeforeMount(async () => {
  await callOnce(postsStore.fetchPosts);
});

const postsStore = usePostsStore();

const blogTitle = ref("");

const blogContent = ref("");

const isModalAddOpen = ref(false);

const isModalDelOpen = ref(false);

const isModalEditOpen = ref(false);

const showNotification = ref(false);
const notificationMessage = ref("");
const notificationType = ref("");

const editPostData = ref<any>({});

const idDeletePost = ref<number | null>(null);

const handleResetNotif = () => {
  let timeoutID;

  timeoutID = setTimeout(() => {
    showNotification.value = false;
    notificationMessage.value = "";
    notificationType.value = "";
  }, 1500);
};

const handleNotifSuccess = () => {
  showNotification.value = true;
  notificationMessage.value = "Action was Success";
  notificationType.value = "success";
  handleResetNotif();
};

const handleOpenDel = (id: number) => {
  isModalDelOpen.value = true;
  idDeletePost.value = id;
};

const handleCloseDel = () => {
  isModalDelOpen.value = false;
};

const handleToggleEdit = (type: string, data?: {}) => {
  switch (type) {
    case "close":
      isModalEditOpen.value = false;
      break;
    case "open":
      isModalEditOpen.value = true;
      editPostData.value = data;
      break;
    default:
      break;
  }
};

const handleToggleAdd = (type: string) => {
  switch (type) {
    case "close":
      isModalAddOpen.value = false;
      break;
    case "open":
      isModalAddOpen.value = true;
      break;
    default:
      break;
  }
};

const handleEditPost = async () => {
  await postsStore.editPost({
    id: editPostData.value.id,
    title: editPostData.value.title,
    body: editPostData.value.body,
  });

  editPostData.value = {};
  isModalEditOpen.value = false;
  handleNotifSuccess();
};

const handleDeletePost = async () => {
  if (idDeletePost.value === null || idDeletePost.value === undefined) return;

  await postsStore.deletePost(idDeletePost.value);
  idDeletePost.value = null;
  isModalDelOpen.value = false;
  handleNotifSuccess();
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

  blogTitle.value = "";
  blogContent.value = "";

  await postsStore.createPost(newPost);
  handleToggleAdd("close");
  handleNotifSuccess();
};
</script>

<style scoped></style>
