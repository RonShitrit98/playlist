<template>
  <section class="auth-view">
    <router-view
      @checkUsername="checkUsername"
      :isUsernameTaken="isUsernameTaken"
      @auth="auth"
    />
  </section>
</template>

<script>
import { useUserStore } from "../stores/user.store";
import { userService } from "../services/user-service";
export default {
  data() {
    return {
      isUsernameTaken: false,
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    async checkUsername(username) {
      try {
        this.isUsernameTaken = await userService.checkUsername(username);
      } catch (error) {
        console.log(error);
      }
    },
    async auth(type, user) {
      try {
        if (type === "signup") {
          console.log(user)
          await this.userStore.signup(user);
        }
      } catch (error) {}
    },
  },
};
</script>
