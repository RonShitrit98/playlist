<template>
  <section v-if="user">
    <img :src="user.imgUrl" />
    <button @click.stop="toggleEditor">Update Image</button>
    <form @submit.prevent="saveUser">
      <username-check :username="user.username" @save="updateUser" />
      <h3>Display name</h3>
      <input type="text" v-model="user.fullname" />
      <h3>Description</h3>
      <input type="text" v-model="user.description" />
      <input type="submit" value="save" />
    </form>
    <img-edit
      v-if="isEditing"
      :img="user.imgUrl"
      @save="updateUser"
      @close="toggleEditor"
    />
  </section>
</template>

<script>
import usernameCheck from "../util/username-check.vue";
import imgEdit from "./img-edit.vue";
export default {
  props: {
    user: {
      type: Object,
      reqired: true,
    },
    isUsernameTaken: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      confirmPassword: null,
      usernameMessage: null,
      isCheckingUser: false,
      isEditing: false,
    };
  },
  methods: {
    toggleEditor() {
      this.isEditing = !this.isEditing;
    },
    updateUser(type, entity) {
      console.log(type, entity);
      this.user[type] = entity;
    },
    async saveUser() {
      this.$emit("auth", "saveUser", this.user);
    },
  },
  created() {
    if (!this.user) {
      this.$emit("auth", "loadUser");
    }
  },
  components: { imgEdit, usernameCheck },
};
</script>
