<template>
  <div class="playlist-cmp" :style="getGridStyle">
    <post-preview
      v-for="post in posts"
      :key="post._id"
      :style="getPostStyle(post.style)"
      :post="post"
      :postSize="getPostSize(post._id)"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import postPreview from "../post/post-preview.vue";
export default {
  props: {
    posts: {
      type: Array,
      reqired: true,
    },
  },
  mounted() {
  },
  computed: {
    getGridStyle() {
      return `grid-template:repeat(6, 200px)/repeat(3, 200px);`;
    },
  },
  methods: {
    getPostStyle(style) {
      const lastCol = style.position.cols[style.position.cols.length - 1];
      return `grid-row:${style.position.row};grid-column:${
        style.position.cols[0]
      }/${lastCol + 1}; background-color:${style.bcg}`;
    },
    getPostSize(id) {
      return "sfsdf";
    },
  },
  components: { postPreview },
};
</script>
