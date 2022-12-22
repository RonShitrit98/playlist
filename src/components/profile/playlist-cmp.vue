<template>
  <div class="playlist-cmp" :style="getGridStyle">
    <div class="post-prev"
      v-for="post in posts"
      :key="post._id"
      :style="getPostStyle(post.style)"
    >
      Post
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      reqired: true,
    },
  },
  computed: {
    getGridStyle() {
      return `grid-template:repeat(6, 200px)/repeat(3, 200px);`;
    },
  },
  methods: {
    getPostStyle(style) {
      console.log(style);
      const lastCol = style.position.cols[style.position.cols.length - 1];
      return `grid-row:${style.position.row};grid-column:${
        style.position.cols[0]
      }/${lastCol + 1}; background-color:${style.bcg}`;
    },
  },
};
</script>
