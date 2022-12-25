<template>
  <div :class="['media-style', media._id]" @click.stop>
    <div class="style-bar">
      <textarea
        v-if="media.type === 'txt'"
        ref="txt"
        :cols="getCols"
        :rows="getRows"
        :style="`font-size:${media.style.size * postWidth}px;color:${
          media.style.color
        };`"
        v-model="media.txt"
      ></textarea>
      <div class="btns">
        <button @click="changeSize(0.02)">+</button>
        <button @click="changeSize(-0.02)">-</button>
        <div>
          <label for="clr">#</label>
          <input
            class="color-input"
            type="color"
            id="clr"
            v-model="media.style.color"
          />
        </div>
      </div>
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
      type: Number,
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
      console.log(longest.length.toString(), 1);
      return longest.length.toString();
    },
    getRows() {
      if (!this.media.txt) return "1";
      const txt = this.media.txt.split("\n");
      console.log(txt.length);
      return txt.length.toString();
    },
  },
  mounted() {
    if (this.media.type === "txt") {
      this.$refs.txt.focus();
    }
  },
};
</script>
