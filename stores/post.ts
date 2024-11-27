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
  actions: {
    async fetchPosts() {
      const { posts }: PostsResponse = await $fetch(
        "https://dummyjson.com/posts"
      );
      this.posts = posts;
    },
    async fetchPostDetail(id: number) {
      const res: PostDetail = await $fetch("https://dummyjson.com/posts/" + id);
	  this.detail = res
    },
  },
});
