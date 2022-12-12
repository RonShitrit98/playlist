<template>
  <section>
    <form @submit.prevent="updateUser">
      <h1>{{ user.email }}</h1>
      <h3>User name</h3>
      <h4 v-if="isCheckingUser">Checking Username...</h4>
      <h4 v-if="isUsernameTaken">this user name is taken</h4>
      <input @input="checkUsername" type="text" v-model="user.username" />
      <h6 v-if="usernameMessage">{{ usernameMessage }}</h6>
      <img :src="user.imgUrl" />
      <button @click="toggleEditor">Update Image</button>
    </form>
    <img-edit v-if="isEditing" :img="user.imgUrl" />
  </section>
</template>

<script>
import { utilService } from "../../services/util-service";
import imgEdit from "../user/img-edit.vue";
export default {
  props: {
    user: {
      type: Object,
      reqired: false,
    },
    isUsernameTaken: {
      type: Boolean,
      required: true,
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
  },
  created() {
    this.$emit("auth", "loadUser");
  },
  components: { imgEdit },
};
</script>
