<template>
  <section>
    <img :src="currImg" />
    <input
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
    img: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currImg: this.img,
    };
  },
  methods: {
    async uploadImg(ev) {
      const url = await imgService.uploadImg(ev.target.files);
      this.currImg = url;
    },
  },
};
</script>
