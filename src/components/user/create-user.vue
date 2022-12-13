<template>
  <section v-if="user">
    <form @submit.prevent="saveUser">
      <h1>{{ user.email }}</h1>
      <h3>User name</h3>
      <h4 v-if="isCheckingUser">Checking Username...</h4>
      <h4 v-if="isUsernameTaken">this user name is taken</h4>
      <input @input="checkUsername" type="text" v-model="user.username" />
      <h6 v-if="usernameMessage">{{ usernameMessage }}</h6>
      <img :src="user.imgUrl" />
      <input type="submit" value="save" />
    </form>
    <button @click="toggleEditor">Update Image</button>
    <img-edit
      v-if="isEditing"
      :img="user.imgUrl"
      @save="updateUser"
      @close="toggleEditor"
    />
  </section>
</template>

<script>
import imgEdit from "./img-edit.vue";
export default {
  props: {
    user: {
      type: Object,
      reqired: false,
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
    checkUsername() {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
      if (format.test(this.user.username)) {
        this.usernameMessage = "user name cant contain special characters";
        return;
      }
      if (this.isCheckingUser) return;
      this.usernameMessage = null;
      this.isCheckingUser = true;
      setTimeout(() => {
        this.$emit("checkUsername", this.user.username);
        this.isCheckingUser = false;
      }, 3000);
    },
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
  components: { imgEdit },
};
</script>
