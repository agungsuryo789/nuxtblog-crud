<template>
  <article
    class="flex flex-col justify-between shadow-lg hover:shadow-sky-400 p-3 rounded-xl h-64 text-ellipsis break-words whitespace-normal transition duration-100 delay-75 overflow-hidden"
  >
    <NuxtLink :to="{ name: 'post-id', params: { id: post.id } }"
      ><p class="my-2 font-bold text-2xl">{{ post.title }}</p></NuxtLink
    >
    <div class="flex flex-row gap-2 my-2 overflow-x-hidden">
      <BlogBadge v-for="(label, i) in post.tags" :key="i" :label="label" />
    </div>
    <p class="my-2 text-sm">{{ truncateText(post.body) }}</p>
  </article>
</template>

<script setup lang="ts">
interface Reactions {
  likes: number;
  dislike: number;
}

interface PostProps {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
}

defineProps<{
  post: PostProps;
}>();

function truncateText(text: string, length = 150) {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
}
</script>

<style lang="scss" scoped></style>
