import { defineStore } from "pinia";

interface PostProps {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislike: number;
  };
}

interface PostDetail {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface PostsResponse {
  posts: PostProps[];
}

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as PostProps[],
    detail: {} as PostDetail,
    loading: false,
  }),
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {
    async fetchPosts() {
      this.loading = true;

      try {
        const { posts }: PostsResponse = await $fetch(
          "https://dummyjson.com/posts"
        );
        //filter duplicate data
        const mergedPosts = [...this.posts, ...posts].filter(
          (post, index, self) =>
            index === self.findIndex((p) => p.id === post.id)
        );

        this.posts = mergedPosts.sort((a, b) => b.id - a.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPostDetail(id: number) {
      this.loading = true;

      try {
        const res: PostDetail = await $fetch(
          "https://dummyjson.com/posts/" + id
        );
        this.detail = res;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async searchPost(param: string) {
      this.loading = true;

      try {
        const { posts }: PostsResponse = await $fetch(
          `https://dummyjson.com/posts/search?q=${param}`
        );
        this.posts = posts;
      } catch (error) {
        console.error("Failed to search posts", error);
      } finally {
        this.loading = false;
      }
    },

    async createPost(newPost: PostProps) {
      this.loading = true;

      try {
        const createdPost = { ...newPost, id: Date.now() };
        this.posts.push(createdPost);
      } catch (error) {
        console.error("Failed to create post", error);
      } finally {
        this.loading = false;
      }
    },

    async deletePost(id: number | null) {
      this.loading = true;

      try {
        this.posts = this.posts.filter((post) => post.id !== id);
      } catch (error) {
        console.error("Failed to delete post", error);
      } finally {
        this.loading = false;
      }
    },

    async editPost(data: { id: number; title: string; body: string }) {
      this.loading = true;

      try {
        this.posts = this.posts.map((post) =>
          post.id === data.id
            ? { ...post, title: data.title, body: data.body }
            : post
        );
      } catch (error) {
        console.error("Failed to update post", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
