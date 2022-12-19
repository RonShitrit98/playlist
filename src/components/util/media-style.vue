<template>
  <div
    :class="['media-style', media._id]"
    draggable="true"
    @dragstart="dragMouseDown($event)"
    @drag="elementDrag($event)"
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
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
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
    dragMouseDown(event) {
      console.log("fkgdfjghdfjg");
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
    },
    elementDrag(event) {
      if (event.clientX === 0 && event.clientY === 0) return;
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      event.target.style.top =
        event.target.offsetTop - this.positions.movementY + "px";
      event.target.style.left =
        event.target.offsetLeft - this.positions.movementX + "px";
    },
  },
};
</script>
