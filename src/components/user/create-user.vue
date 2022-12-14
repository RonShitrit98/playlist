<template>
  <section class="create-user" v-if="user">
    <h1 class="title">Create profile</h1>
    <div class="img-options">
      <h3>Photo</h3>
      <img :src="user.imgUrl" />
      <button @click.stop="toggleEditor">Image</button>
    </div>
    <form class="user-info" @submit.prevent="saveUser">
      <username-check :username="user.username" @save="updateUser" />
      <div class="input-container">
        <h3>Display name</h3>
        <input type="text" v-model="user.fullname" />
      </div>
      <div class="input-container">
        <h3>Description</h3>
        <input type="text" v-model="user.description" />
      </div>
      <input type="submit" value="Create profile" />
    </form>
    <img-edit
      v-if="isEditing"
      :image="user.imgUrl"
      @save="updateUser"
      @close="toggleEditor"
    />
  </section>
</template>

<script>
import usernameCheck from "../util/username-check.vue";
import imgEdit from "../util/img-edit.vue";
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
