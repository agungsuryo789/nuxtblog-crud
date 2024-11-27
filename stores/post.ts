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
  }),
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {
    async fetchPosts() {
      const { posts }: PostsResponse = await $fetch(
        "https://dummyjson.com/posts"
      );

      //filter duplicate data
      const mergedPosts = [...this.posts, ...posts].filter(
        (post, index, self) => index === self.findIndex((p) => p.id === post.id)
      );

      this.posts = mergedPosts.sort((a, b) => b.id - a.id);
    },
    async fetchPostDetail(id: number) {
      const res: PostDetail = await $fetch("https://dummyjson.com/posts/" + id);
      this.detail = res;
    },
    async createPost(newPost: PostProps) {
      const createdPost = { ...newPost, id: Date.now() };
      this.posts.push(createdPost);
    },
    async deletePost(id: number) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
  },
});
