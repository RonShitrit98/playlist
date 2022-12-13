<template>
  <section v-if="user">
    <profile-title :user="user" />
  </section>
</template>

<script>
import { useUserStore } from "../stores/user.store";
import profileTitle from "../components/profile/profile-title.vue";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {};
  },
  async created() {
    try {
      if (!this.currUser) await this.userStore.loadUser();
      await this.userStore.findUserById(this.$route.params.id);
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    user() {
      return this.userStore.userToDisplay;
    },
    currUser() {
      return this.userStore.currUser;
    },
  },
  components: { profileTitle },
};
</script>
