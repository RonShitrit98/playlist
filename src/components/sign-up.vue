<template>
  <div>
    <a :href="googleUrl">Sign up with Google</a>
  </div>
</template>

<script>
import { userService } from "../services/user-service";
import { getGoogleUrl } from "../services/google-service";
export default {
  data() {
    return {
      newUser: userService.getEmptyUser(),
      googleUrl: getGoogleUrl(),
    };
  },
};
</script>
