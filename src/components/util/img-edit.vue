<template>
  <section class="img-edit">
    <h1 class="edit-title">Edit photo</h1>
    <img class="img-display" :src="currImg" />
    <label for="img-input">Upload image</label>
    <div class="btn-container">
      <button @click="saveImg">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <input
      id="img-input"
      @input="uploadImg($event)"
      type="file"
      accept="image/png, image/jpeg"
    />
  </section>
</template>

<script>
import { imgService } from "../../services/imgUpload.service";
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currImg: this.image,
    };
  },
  methods: {
    async uploadImg(ev) {
      const url = await imgService.uploadImg(ev.target.files);
      this.currImg = url;
    },
    saveImg() {
      this.$emit("save", "imgUrl", this.currImg);
      this.closeModal();
    },
    cancelEdit() {
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
