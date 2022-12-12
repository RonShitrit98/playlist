<template>
  <section>
    <h1>Log in</h1>
    <form @submit.prevent="login">
      <h3>Email</h3>
      <input type="email" v-model="creds.email" />
      <h3>Password</h3>
      <input type="password" v-model="creds.password" />
      <input type="submit" value="Login" />
    </form>
    <div>
      <a :href="googleUrl">Log in with Google</a>
    </div>
  </section>
</template>

<script>
import { getGoogleUrl } from "../../services/google-service";
export default {
  data() {
    return {
      creds: {
        email: null,
        password: null,
      },
      googleUrl: getGoogleUrl(),
    };
  },
  methods: {
    login() {
      this.$emit("auth", "login", this.creds);
    },
  },
};
</script>
