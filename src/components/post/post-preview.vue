<template>
  <div class="post-preview">
    <div
      class="post-container"
      ref="postPrev"
      :style="`height:${postHeight}px;`"
    >
      <button @click="toggleMenu">Add..</button>
    </div>
    <div v-if="isMenu" class="prev-menu">
      <ul>
        <li @click="addMedia('txt')">Text</li>
        <li @click="toggleSpotifyModal">Spotify</li>
        <li @click="addMedia('img')">Image</li>
      </ul>
      <!-- <input
        @input="updatePost($event.target.value, 'title')"
        type="text"
        :value="post.title"
      />
      <label for="img-input">Upload Image</label>
      <button @click="toggleSpotifyModal">Add from spotify</button> -->
      <div v-if="isSpotifyModal" class="spotify-modal">
        <h1>Spotify Modal</h1>
        <input type="text" v-model="searchValue" @input="searchSpotify" />
        <button @click="type = 'albums'">Albums</button>
        <button @click="type = 'tracks'">Tracks</button>
        <button @click="type = 'artists'">Artists</button>
        <ul v-if="searchResult">
          <li v-for="item in searchResult[type].items">
            <img :src="item.images[0].url" alt="" />
            {{ item.name }}
          </li>
        </ul>
        <div class="user-playlists">
          <h1>Your playlists:</h1>
          <ul>
            <li v-for="playlist in playlists">{{ playlist.name }}</li>
          </ul>
        </div>
      </div>
    </div>
    <button @click="getPlaylists">Add Playlist</button>
  </div>
</template>

<script>
import { spotifyService } from "../../services/spotify-service";
export default {
  props: {
    post: {
      type: Object,
      reqired: true,
    },
    playlists: {
      type: Array,
      reqired: false,
    },
  },
  data() {
    return {
      isMenu: false,
      isSpotifyModal: false,
      postHeight: null,
      searchValue: null,
      isSearching: false,
      searchResult: null,
      type: "albums",
    };
  },
  methods: {
    savePost() {
      console.log("saving post...");
    },
    updatePost(type, item) {
      console.log(type, item);
    },
    toggleMenu() {
      this.isMenu = !this.isMenu;
    },
    toggleSpotifyModal() {
      this.isSpotifyModal = !this.isSpotifyModal;
    },
    getPlaylists() {
      this.$emit("getPlaylist");
    },
    addMedia(type) {
      console.log(type);
    },
    searchSpotify() {
      if (this.isSearching) return;
      this.isSearching = true;
      setTimeout(async () => {
        this.searchResult = await spotifyService.search(this.searchValue);
        this.isSearching = false;
      }, 1000);
    },
  },
  computed: {
    getPostSize() {
      // console.log(this.postWidth)
    },
  },
  mounted() {
    this.postHeight =
      this.$refs.postPrev.clientWidth / this.post.style.position.cols.length;
  },
};
</script>
