<template>
  <main-header />
  <router-view />
  <main-nav :user="currUser" @logout="logout" />
</template>
<script>
import { useUserStore } from "./stores/user.store";
import mainNav from './components/main-nav.vue'
import mainHeader from "./components/main-header.vue";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  components: { mainHeader, mainNav },
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
  async created() {
    await this.userStore.loadUser();
    console.log(this.userStore.currUser);
  },
};
</script>
