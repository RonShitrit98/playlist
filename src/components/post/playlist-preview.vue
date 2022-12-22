<template>
  <div class="playlist-preview">
    <div class="post-container" :style="getContainerStyle">
      <div class="tile-container">
        <div
          class="playlist-tile"
          v-for="tile in grid"
          @click="placePost(tile)"
        ></div>
      </div>
      <div class="post-prev" :style="getPrevStyle(prev.style)" v-for="prev in posts" :key="prev._id">prev</div>
      <div class="post-tile" :style="getPostStyle">New Post</div>
    </div>
  </div>
</template>

<script>
import { postService } from "../../services/post-service";
export default {
  props: {
    post: {
      type: Object,
      reqired: true,
    },
    posts: {
      type: Array,
      reqired: false,
    },
  },
  methods: {
    placePost(tile) {
      this.$emit("update", "position", tile);
    },
    getPrevStyle(style) {
      const lastCol = style.position.cols[style.position.cols.length - 1];
      return `grid-row:${style.position.row};grid-column:${
        style.position.cols[0]
      }/${lastCol + 1}; background-color:${style.bcg}`;
    },
  },
  computed: {
    grid() {
      return postService.getPlaylistGrid();
    },
    getContainerStyle() {
      return ` grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(${this.grid.length / 3}, 100px);
      `;
    },
    getPostStyle() {
      const row = this.post.style.position.row;
      const cols = this.post.style.position.cols;
      if (!row || !cols) return;
      const lastCol = cols[cols.length - 1];
      return `grid-row:${row}; grid-column:${cols[0]}/${lastCol + 1};`;
    },
  },
};
</script>
