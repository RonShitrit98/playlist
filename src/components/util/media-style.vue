<template>
  <div
    :class="['media-style', media._id]"
  >
    <div class="txt-style" v-if="media.type === 'txt'">
      <textarea type="text" v-model="media.txt"></textarea>
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
  },
  data() {
    return {
    
    };
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
};
</script>
