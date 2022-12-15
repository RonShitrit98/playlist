import { defineStore } from "pinia";
import { spotifyService } from "../services/spotify-service";
export const useMediaStore = defineStore("media", {
  state: () => {
    return {
      playlists: null,
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
  },
});
