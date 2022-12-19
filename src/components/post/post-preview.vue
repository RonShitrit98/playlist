<template>
  <div class="post-preview">
    <div
      class="post-container"
      ref="postPrev"
      :style="`height:${postHeight}px;`"
    >
      <div v-for="item in mediaToDisplay">
        {{ item.name }}
        <img :src="item.imgUrl" alt="" />
      </div>
      <button @click="toggleMenu">Add..</button>
    </div>
    <div v-if="isMenu" class="prev-menu">
      <ul>
        <li @click="addMedia('txt')">Text</li>
        <li @click="toggleSpotifyModal">Spotify</li>
        <li @click="addMedia('img')">Image</li>
      </ul>
      <spotify-modal v-if="isSpotifyModal" @selectMedia="addMedia" />
    </div>
    <button @click="getPlaylists">Add Playlist</button>
  </div>
</template>

<script>
import spotifyModal from "../util/spotify-modal.vue";
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
    addMedia(type, item = {}) {
      if (type === "txt" || type === "img") {
        return;
        // item.type=type,
        // item[]
      }
      this.post.media.push(item);
    },
  },
  computed: {
    getPostSize() {
      // console.log(this.postWidth)
    },
    mediaToDisplay() {
      const media = this.post.media.map((item) => {
        if (item.type === "txt")
          return {
            txt: item.txt,
          };
        else
          return {
            type: item.type,
            name: item.name,
            imgUrl: item.images[0].url,
            url: item.external_urls.spotify,
          };
      });
      return media;
    },
  },
  mounted() {
    this.postHeight =
      this.$refs.postPrev.clientWidth / this.post.style.position.cols.length;
  },
  components: { spotifyModal },
};
</script>
