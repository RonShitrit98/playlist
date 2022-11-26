<template>
  <div>
    <h1>Sign up to Playlist</h1>
    <form @submit.prevent="signup">
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Full name" />
      <input type="password" placeholder="Password" />
      <input type="submit" value="Sign up" />
    </form>
    <h2>OR</h2>
    <a :href="googleUrl">Sign up with Google</a>
  </div>
</template>

<script>
import { userService } from "../services/user-service";
import { getGoogleUrl } from "../services/google-service";
export default {
  data() {
    return {
      newUser: userService.getEmptyUser(),
      googleUrl: getGoogleUrl(),
    };
  },
  methods: {
    signup() {
      this.$emit("signup", this.newUser);
    },
  },
};
</script>
