<template>
  <section v-if="user" class="profile-view">
    <profile-title :user="user" />
    <profile-nav @cmp="changeCmp" />
    <component :is="currCmp" />
  </section>
</template>

<script>
import { useUserStore } from "../stores/user.store";
import profileTitle from "../components/profile/profile-title.vue";
import profileNav from "../components/profile/profile-nav.vue";
import playlistCmp from "../components/profile/playlist-cmp.vue";
import timelineCmp from "../components/profile/timeline-cmp.vue";
import challengesCmp from "../components/profile/challenges-cmp.vue";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      currCmp: "playlist-cmp",
    };
  },
  async created() {
    try {
      if (!this.currUser) await this.userStore.loadUser();
      await this.userStore.findUserById(this.$route.params.id);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    changeCmp(cmp) {
      this.currCmp = cmp;
    },
  },
  computed: {
    user() {
      return this.userStore.userToDisplay;
    },
    currUser() {
      return this.userStore.currUser;
    },
  },
  components: {
    profileTitle,
    profileNav,
    playlistCmp,
    timelineCmp,
    challengesCmp,
  },
};
</script>
