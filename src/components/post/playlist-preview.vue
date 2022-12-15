<template>
  <div class="playlist-preview">
    <div class="playlist-tile" v-for="tile in grid" @click="placePost(tile)">
      {{ tile }}
    </div>
    <div class="post-container" :style="getContainerStyle">
      <div class="post-tile" :style="getPostStyle"></div>
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
  },
  methods: {
    placePost(tile) {
      const newPos = postService.handlePostPlacment(
        this.post.style.position,
        tile
      );
      // this.post.style.position = newPos;
      
      // const row = this.post.style.position.row;
      // const cols = this.post.style.position.cols;
      // if (!row || tile.row !== row) {
      //   this.post.style.position.row = tile.row;
      //   this.post.style.position.cols.push(tile.col);
      // } else if (cols[0] > tile.col) {
      //   cols.unshift(tile.col);
      // } else cols.push(tile.col);
    },
  },
  computed: {
    grid() {
      return postService.getPlaylistGrid();
    },
    getContainerStyle() {
      return ` grid-template-columns: repeat(3, auto);
      grid-template-rows: repeat(${this.grid.length / 3}, auto);
      `;
    },
    getPostStyle() {
      const row = this.post.style.position.row;
      const cols = this.post.style.position.cols;
      if (!row || !cols) return;
      console.log(cols[cols.length - 1]);
      const lastCol = cols[cols.length - 1];
      console.log(lastCol);
      console.log(`grid-row:${row}; grid-cloumn:${cols[0]}/${lastCol + 1};`);
      return `grid-row:${row}; grid-column:${cols[0]}/${lastCol + 1};`;
    },
  },
};
</script>
