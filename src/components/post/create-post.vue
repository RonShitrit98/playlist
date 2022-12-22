<template>
  <section class="create-post">
    <div class="post-nav">
      <h3>Pick placment</h3>
      <button @click="move('back')">Back</button>
      <button @click="move('next')">Next</button>
    </div>
    <component
      :playlists="playlists"
      :is="currCmp"
      :post="post"
      @update="updatePost"
      @getPlaylist="getPlaylist"
      @save="createPost"
    />
  </section>
</template>

<script>
import { useMediaStore } from "../../stores/media.store";
import { postService } from "../../services/post-service";
import playlistPreview from "./playlist-preview.vue";
import postPreview from "./post-preview.vue";
export default {
  components: { playlistPreview, postPreview },
  data() {
    return {
      post: postService.getNewPost(),
      cmps: ["playlist-preview", "post-preview"],
      currCmp: "playlist-preview",
    };
  },
  setup() {
    const mediaStore = useMediaStore();
    return { mediaStore };
  },
  methods: {
    updatePost(action, item) {
      if (action === "position") {
        const newPos = postService.handlePostPlacment(
          this.post.style.position,
          item
        );

        this.post.style.position = newPos;
      } else return;
    },
    move(direction) {
      const idx = this.cmps.findIndex((cmp) => cmp === this.currCmp);
      if (direction === "next") this.currCmp = this.cmps[idx + 1];
      else this.currCmp = this.cmps[idx - 1];
    },
    async getPlaylist() {
      try {
        await this.mediaStore.getPlaylists();
        console.log(this.mediaStore.playlists);
      } catch (error) {}
    },
    async createPost(post) {
      try {
        await this.mediaStore.createPost(post);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    playlists() {
      return this.mediaStore.playlists;
    },
  },
};
</script>
