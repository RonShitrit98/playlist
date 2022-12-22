<template>
  <div class="post-preview">
    <button @click="savePost">Save</button>
    <div
      class="post-container"
      ref="postPrev"
      :style="`height:${postHeight}px;background-color:${post.style.bcg}`"
    >
      <div
        class="media-item"
        v-for="item in mediaToDisplay"
        draggable="true"
        @dragstart="dragMouseDown($event, item)"
        @drag="elementDrag($event, item)"
        :style="getItemPos(item.style.position)"
        @click="editMedia(item._id)"
      >
        <img :src="item.imgUrl" alt="" draggable="false" />
        <media-style
          v-if="item._id === editingItemId"
          @update="updateMedia"
          :media="item"
        />
        <div class="txt-display" v-else>
          <p
            :style="`font-size:${
              ((item.style.size * 50) / postWidth) * 100
            }px;color:${item.style.color};`"
            v-for="txt in getTxtToDisplay(item.txt)"
          >
            {{ txt }}
          </p>
        </div>
      </div>
      <button @click="toggleMenu">Add..</button>
    </div>
    <div v-if="isMenu" class="prev-menu">
      <ul>
        <li @click="addMedia('txt')">Text</li>
        <li @click="toggleSpotifyModal">Spotify</li>
        <!-- <li @click="addMedia('img')">Image</li> -->
      </ul>
      <spotify-modal v-if="isSpotifyModal" @selectMedia="addMedia" />
    </div>
    <div class="style-modal">
      <input type="color" v-model="post.style.bcg" />
    </div>
    <button @click="getPlaylists">Add Playlist</button>
  </div>
</template>

<script>
import { postService } from "../../services/post-service";
import mediaStyle from "../util/media-style.vue";
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
      postRef: null,
      editingItemId: null,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  methods: {
    savePost() {
      this.$emit("save", this.post);
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
      if (type === "txt") {
        item = postService.getEmptyMedia("txt");
      } else {
        const media = postService.getEmptyMedia(type);
        item._id = media._id;
        item.style = media.style;
      }
      this.post.media.push(item);
    },
    updateMedia(id, type, item) {
      console.log(id, type, item);
    },
    getTxtToDisplay(txt) {
      if (!txt) return;
      return txt.split("\n");
    },
    editMedia(id) {
      this.editingItemId = id;
    },
    dragMouseDown(event) {
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
    },
    elementDrag(event, item) {
      if (event.clientX === 0 && event.clientY === 0) return;
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;

      if (
        event.target.offsetTop - this.positions.movementY >
          this.postHeight - 10 ||
        event.target.offsetTop - this.positions.movementY < -10 ||
        event.target.offsetLeft - this.positions.movementX >
          this.postWidth - 10 ||
        event.target.offsetLeft - this.positions.movementX < -10
      )
        return;
      item.style.position.top =
        ((event.target.offsetTop - this.positions.movementY) /
          this.postHeight) *
        100;
      item.style.position.left =
        ((event.target.offsetLeft - this.positions.movementX) /
          this.postWidth) *
        100;
    },
    getItemPos(itemPos) {
      return `top:${itemPos.top}%;left:${itemPos.left}%`;
    },
  },
  computed: {
    mediaToDisplay() {
      const media = this.post.media.map((item) => {
        if (item.type === "txt") return item;
        else {
          item.imgUrl = item.images[0].url;
          item.url = item.external_urls.spotify;
          return item;
        }
      });
      return media;
    },
    postHeight() {
      if (!this.postRef) return;
      return this.postRef.clientWidth / this.post.style.position.cols.length;
    },
    postWidth() {
      if (!this.postRef) return;
      return this.postRef.clientWidth;
    },
  },
  mounted() {
    this.postRef = this.$refs.postPrev;
  },
  components: { spotifyModal, mediaStyle },
};
</script>
