<template>
  <section>
    <h1>Sign up</h1>
    <form @submit.prevent="signup">
      <h3>User name</h3>
      <h4 v-if="isCheckingUser">Checking Username...</h4>
      <h4 v-if="isUsernameTaken">this user name is taken</h4>
      <input @input="checkUsername" type="text" v-model="newUser.username" />
      <h6 v-if="usernameMessage">{{ usernameMessage }}</h6>
      <h3>Email</h3>
      <input type="email" required v-model="newUser.email" />
      <h3>Password</h3>
      <input
        type="password"
        minlength="8"
        required
        v-model="newUser.password"
      />
      <h3>confirm password</h3>
      <input type="password" required v-model="confirmPassword" />
      <input type="submit" value="Sign Up" />
    </form>
    <div>
      <a :href="googleUrl">Sign up with Google</a>
    </div>
  </section>
</template>

<script>
import { userService } from "../../services/user-service";
import { getGoogleUrl } from "../../services/google-service";
export default {
  props: {
    isUsernameTaken: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newUser: userService.getEmptyUser(),
      googleUrl: getGoogleUrl(),
      confirmPassword: null,
      usernameMessage: null,
      isCheckingUser: false,
    };
  },
  methods: {
    signup() {
      this.$emit("auth", "signup", this.newUser);
    },
    checkUsername() {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
      if (format.test(this.newUser.username)) {
        this.usernameMessage = "user name cant contain special characters";
        return;
      }
      if (this.isCheckingUser) return;
      this.usernameMessage = null;
      this.isCheckingUser = true;
      setTimeout(() => {
        this.$emit("checkUsername", this.newUser.username);
        this.isCheckingUser = false;
      }, 3000);
    },
  },
};
</script>
