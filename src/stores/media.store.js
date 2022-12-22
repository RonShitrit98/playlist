import { defineStore } from "pinia";
import { postService } from "../services/post-service";
import { spotifyService } from "../services/spotify-service";
export const useMediaStore = defineStore("media", {
  state: () => {
    return {
      playlists: null,
      posts: null,
    };
  },
  getters: {},
  actions: {
    async getPlaylists() {
      try {
        const playlists = await spotifyService.getPlaylists();
        this.playlists = playlists;
      } catch (error) {}
    },
    async createPost(post) {
      try {
        const newPost = await postService.createPost(post);
        console.log(newPost);
      } catch (error) {}
    },
    async loadPosts(id) {
      try {
        const posts = await postService.getPosts(id);
        this.posts = posts;
      } catch (error) {}
    },
  },
});
