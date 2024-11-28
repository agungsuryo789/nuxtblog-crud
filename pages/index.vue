<template>
  <div
    v-if="postsStore.loading"
    class="gap-4 grid grid-cols-1 md:grid-cols-6 xl:grid-cols-9 overflow-hidden"
  >
    <div class="col-span-1 md:col-span-3 xl:col-span-3" v-for="n in 6" :key="n">
      <LoaderCardPost />
    </div>
  </div>

  <section
    v-if="!postsStore.loading"
    class="gap-4 grid grid-cols-1 md:grid-cols-6 xl:grid-cols-9 overflow-hidden"
  >
    <article
      class="items-center content-center col-span-1 md:col-span-6 xl:col-span-9 min-h-80"
    >
      <p
        class="border-4 bg-red-200 px-2 border-red-600 rounded-xl max-w-36 text-red-800 text-sm"
      >
        Most liked article!
      </p>
      <NuxtLink :to="{ name: 'post-id', params: { id: mostLikedArticle.id } }"
        ><h3 class="font-bold text-5xl">
          {{ mostLikedArticle.title }}
        </h3></NuxtLink
      >
      <div class="flex flex-row gap-2 my-2 overflow-x-hidden">
        <BlogBadge
          v-for="(label, i) in mostLikedArticle.tags"
          :key="i"
          :label="label"
        />
      </div>
      <p class="text-sm">{{ mostLikedArticle.body }}</p>
    </article>
    <div
      v-for="post in postsStore.posts"
      :key="post.id"
      class="col-span-1 md:col-span-3 xl:col-span-3"
    >
      <BlogPostCard :post="post" />
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Home - Read all the blog post',
  meta: [
    { name: 'description', content: 'Read all the blog post.' },
    { name: 'keywords', content: 'blog, post, nuxt' }
  ]
});

const postsStore = usePostsStore();

await useAsyncData('posts', () => postsStore.fetchPosts());

const posts = toRaw(postsStore.posts);

const mostLikedArticle = posts.reduce((max, current) => {
  return current.reactions.likes > max.reactions.likes ? current : max;
}, posts[0]);
</script>

<style></style>
