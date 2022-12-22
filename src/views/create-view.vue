<template>
  <section class="create-view">
    <h1>Create {{ title }}</h1>
    <router-view />
  </section>
</template>

<script>
export default {
  created() {},
  computed: {
    title() {
      return this.$route.path.split("/")[2];
    },
  },
};
</script>
