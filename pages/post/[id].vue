<template>
  <div v-if="postsStore.loading" class="mx-auto px-auto w-full min-h-screen">
    <LoaderDetailPost class="mx-auto" />
  </div>
  
  <section v-if="!postsStore.loading" class="grid grid-cols-9 p-2 min-h-screen">
    <article
      class="flex flex-col items-center gap-4 col-span-9 xl:col-span-5 col-start-1 xl:col-start-3 text-left"
    >
      <h3 class="font-bold text-5xl">{{ postsStore.detail.title }}</h3>
      <div class="flex flex-row gap-3">
        <BlogBadge
          v-for="(tag, i) in postsStore.detail.tags"
          :label="tag"
          :key="i"
        />
      </div>
      <div class="flex flex-row gap-2">
        <p>likes: {{ postsStore.detail.reactions?.likes }}</p>
        <p>dislike: {{ postsStore.detail.reactions?.dislikes }}</p>
      </div>
      <p class="text-sm">October, 25 2024</p>
      <p class="my-8">
        {{ postsStore.detail.body }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
const postsStore = usePostsStore();
const { id } = useRoute().params;

await useAsyncData('posts-detail', () => postsStore.fetchPostDetail(Number(id)));
</script>