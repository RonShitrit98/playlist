<template>
  <div class="post-preview">
    <div class="post-container">
      <input
        @input="updatePost($event.target.value, 'title')"
        type="text"
        :value="post.title"
      />
      <button @click="toggleMenu">Add..</button>
    </div>
    <div v-if="isMenu" class="prev-menu">
      <label for="img-input">Upload Image</label>
      <button @click="toggleSpotifyModal">Add from spotify</button>
      <div v-if="isSpotifyModal" class="spotify-modal">
        <button @click="getPlaylists">Add Playlist</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      reqired: true,
    },
  },
  data() {
    return {
      isMenu: false,
      isSpotifyModal: false,
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
    getPlaylists(){
      this.$emit('getPlaylist')
    }
  },
};
</script>
