<template>
  <div class="spotify-modal">
    <div :class="['playlist-display', isPlaylists ? 'show' : 'hide']">
      <div v-if="isPlaylists" class="title">
        <h3>Playlists</h3>
        <button @click="isPlaylists = false">{{ "<" }}</button>
      </div>
      <button v-else @click="isPlaylists = true">{{ ">" }}</button>
      <div v-if="isPlaylists">
        <h4
          v-for="playlist in playlists"
          :key="playlist.name"
          @click="selectItem(playlist)"
        >
          {{ playlist.name }}
        </h4>
      </div>
    </div>
    <div class="spotify-search">
      <div class="search-bar">
        <h3>Search</h3>
        <input type="text" v-model="searchVal" @input="search" />
        <div class="type-bar">
          <button
            v-for="opt in resOpts"
            @click="type = opt"
            :class="['res-btn', opt === type ? 'selected' : '']"
          >
            {{ opt.charAt(0).toUpperCase() + opt.slice(1).toLowerCase() }}
          </button>
        </div>
      </div>
      <div class="search-res">
        <div
          class="media-display"
          v-if="searchRes"
          v-for="res in searchResDisplay"
          @click="selectItem(res)"
        >
          <img v-if="res.images[0]" :src="res.images[0].url" alt="" />
          <h4>{{ res.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { spotifyService } from "../../services/spotify-service";
import { useMediaStore } from "../../stores/media.store";
export default {
  setup() {
    const mediaStore = useMediaStore();
    return { mediaStore };
  },
  data() {
    return {
      isSearching: false,
      searchRes: null,
      searchVal: null,
      type: "artist",
      resOpts: ["artist", "album", "track", "playlist"],
      isPlaylists: true,
    };
  },
  methods: {
    search() {
      if (this.isSearching) return;
      this.isSearching = true;
      setTimeout(async () => {
        this.searchRes = await spotifyService.search(this.searchVal);
        console.log(this.searchRes);
        this.isSearching = false;
      }, 1000);
    },
    selectItem(item) {
      console.log("selecting..");
      this.$emit("selectMedia", this.type, item);
    },
  },
  computed: {
    playlists() {
      return this.mediaStore.playlists;
    },
    searchResDisplay() {
      console.log(this.type);
      if (!this.searchRes) return;
      if (this.type === "track") {
        this.searchRes[this.type + "s"].items.forEach((item) => {
          item.images = item.album.images;
        });
      }
      return this.searchRes[this.type + "s"].items;
    },
  },
};
</script>
