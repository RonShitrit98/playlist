<template>
  <section class="main-header">
    <h1 class="main-logo">Playlist</h1>
    <nav class="main-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="!user" to="/auth/signup">Sign up</router-link>
      <router-link v-if="!user" to="/auth/login">Log in</router-link>
      <button v-else @click="toggleUserModal">
        <img :src="user.imgUrl" />
      </button>
    </nav>

    <div v-if="isUserModal && this.user" class="user-modal">
      <h1>{{ user.fullname }}</h1>
      <h2>{{ user.email }}</h2>
      <router-link :to="`profile/${user._id}`">Profile</router-link>
      <button @click="logout">Log out</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isUserModal: false,
    };
  },
  methods: {
    toggleUserModal() {
      this.isUserModal = !this.isUserModal;
    },
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
