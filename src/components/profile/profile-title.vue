<template>
  <section class="profile-title">
    <div>
      <img :src="user.imgUrl" />
      <h1>{{ user.fullname }}</h1>
      <h2>{{ user.username }}</h2>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      reqired: true,
    },
  },
  created() {},
};
</script>
