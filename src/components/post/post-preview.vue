<template>
  <div class="post-preview" ref="post">
    <div
      v-if="postWidth"
      ref="media"
      class="media-item"
      v-for="media in post.media"
      :key="media.id"
      :style="`top:${media.style.position.top}%;left:${media.style.position.left}%`"
    >
      <p
        v-for="txt in getTxtToDisplay(media.txt)"
        :key="txt"
        :style="`font-size:${media.style.size * postWidth}px; color:${
          media.style.color
        };`"
      >
        {{ txt }}
      </p>
      <a :href="media.url" v-if="media.imgUrl">
        <img
          :src="media.imgUrl"
          :style="`width:${media.style.size * postWidth}px;height:${
            media.style.size * postWidth
          }px;`"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    data() {
      return {
        postWidth: null,
      };
    },
  },
  methods: {
    getTxtToDisplay(txt) {
      if (!txt) return;
      return txt.split("\n");
    },
    getMediaStyle(style) {
      if (!this.postWidth) return;
      console.log(this.postWidth);
      return;
    },
  },
  computed: {
    // postHeight() {
    //   if (!this.postRef) return;
    //   return this.postRef.clientWidth / this.post.style.position.cols.length;
    // },
    // postWidth() {
    //   //   this.postRef = this.$refs.post;
    //   //   console.log(this.$refs);
    //   if (!this.postRef) return;
    //   return this.postRef.clientWidth;
    // },
  },
  mounted() {
    this.postWidth = this.$refs.post.clientWidth;
    this.$forceUpdate();
    // console.log(this.postWidth);
    // console.log(this.postWidth);
    // this.postRef = this.$refs.post;

    // this.postWidth.$watch()
    //   this.$watch(this.postWidth, () => {
    //     // this.$refs.media.load();
    //   });
  },
};
</script>
