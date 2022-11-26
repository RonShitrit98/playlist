<template>
  <section class="main-header">
    <h1 class="main-logo">Playlist</h1>
    <nav class="main-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="!user" to="/auth/signup">Signup</router-link>
      <img v-else :src="user.imgUrl" @click="toggleUserModal" />
    </nav>

    <div v-if="isUserModal && this.user" class="user-modal">
      <h1>{{ user.fullname }}</h1>
      <h2>{{ user.email }}</h2>
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
