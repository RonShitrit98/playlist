<template>
  <section class="create-post">
    <h3>Pick placment</h3>
    <playlist-preview :post="post" />
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
};
</script>
