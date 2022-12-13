<template>
  <section class="profile-title">
    <img class="title-img" :src="user.imgUrl" />
    <div class="info">
      <h1 class="fullname">{{ user.fullname }}</h1>
      <h2 class="username">@{{ user.username }}</h2>
      <p class="description">
        {{ user.description }} Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Est laboriosam ea, quisquam aspernatur amet
      </p>
    </div>
    <div class="contacts">
      <h1 class="followers"><span class="numbers">8774</span>Followers</h1>
      <h1 class="following"><span class="numbers">12</span>Following</h1>
    </div>
    <div class="connect-btn">
      <button class="follow">Follow</button>
      <button class="message">Message</button>
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
