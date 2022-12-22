<template>
  <section class="create-post">
    <div class="post-nav">
      <h3>
        {{ currCmp === "playlist-preview" ? "Pick placment" : "Post-preview" }}
      </h3>
      <button
        v-if="currCmp === 'playlist-preview'"
        @click="moveTo('post-preview')"
      >
        Next
      </button>
      <div v-else>
        <button @click="moveTo('playlist-preview')">Back</button>
      </div>
    </div>
    <component
      :playlists="playlists"
      :is="currCmp"
      :post="post"
      :posts="posts"
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
    moveTo(cmp) {
      this.currCmp = cmp;
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
    posts(){
      return this.mediaStore.posts
    }
  },
};
</script>
