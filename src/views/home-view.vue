<template>
  <main>
    <h1>Home</h1>
  </main>
</template>
<script>
import { useUserStore } from "../stores/user.store";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>
