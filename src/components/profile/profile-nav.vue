<template>
  <nav class="profile-nav">
    <button class="nav-btn" @click="showCmp('playlist-cmp')">Playlist</button>
    <button class="nav-btn" @click="showCmp('timeline-cmp')">Timeline</button>
    <button class="nav-btn" @click="showCmp('challenges-cmp')">
      Challenges
    </button>
  </nav>
</template>

<script>
export default {
  methods: {
    showCmp(cmp) {
      this.$emit("cmp", cmp);
    },
  },
};
</script>
