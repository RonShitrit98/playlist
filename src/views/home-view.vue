<template>
  <main-header :user="currUser" @logout="logout" />
  <main>
    <h1>Home</h1>
  </main>
</template>
<script>
import { useUserStore } from "../stores/user.store";
import mainHeader from "../components/main-header.vue";
export default {
  components: { mainHeader },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  async created() {
    await this.userStore.loadUser();
    console.log(this.userStore.currUser);
  },
  computed: {
    currUser() {
      return this.userStore.currUser;
    },
  },
  methods: {
    logout() {
      this.userStore.logout();
    },
  },
};
</script>
