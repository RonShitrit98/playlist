<template>
  <div :class="['media-style', media._id]" @click.stop>
    <div class="txt-style">
      <textarea
        @click.stop
        :cols="getCols"
        :rows="getRows"
        :style="`font-size:${
          ((media.style.size * 50) / postWidth) * 100
        }px;color:${media.style.color};`"
        v-model="media.txt"
      ></textarea>
      <button @click="changeSize(1)">+</button>
      <button @click="changeSize(-1)">-</button>
      <input type="color" v-model="media.style.color" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      reqired: true,
    },
    postWidth: {
      type: String,
      reqired: true,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.media);
  },
  methods: {
    updateMedia(item, type) {
      this.$emit("update", type, item);
    },
    changeSize(amount) {
      if (amount === -1 && this.media.style.size === 1) return;
      this.media.style.size += amount;
    },
  },
  computed: {
    getTxtStyle() {
      return `font`;
    },
    getCols() {
      if (!this.media.txt) return "1";
      const txt = this.media.txt.split("\n");
      const longest = txt.sort(function (a, b) {
        return b.length - a.length;
      })[0];
      console.log(longest);
      return longest.length;
    },
    getRows() {
      if (!this.media.txt) return "1";
      const txt = this.media.txt.split("\n");
      return txt.length;
    },
  },
};
</script>
