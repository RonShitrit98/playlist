<template>
  <section class="create-post">
    <div class="post-nav">
      <h3>Pick placment</h3>
      <button>Back</button>
      <button>Next</button>
    </div>
    <playlist-preview :post="post" @update="updatePost" />
  </section>
</template>

<script>
import { postService } from "../../services/post-service";
import playlistPreview from "./playlist-preview.vue";
export default {
  components: { playlistPreview },
  data() {
    return {
      post: postService.getNewPost(),
    };
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
  },
};
</script>
