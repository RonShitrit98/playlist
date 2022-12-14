<template>
  <div class="username-check">
    <h3>User name</h3>
    <h4 v-if="isChecking">Checking Username...</h4>
    <h4 v-if="isUsernameTaken">this user name is taken</h4>
    <input @input="checkUsername($event)" type="text" :value="newUsername" />
    <h6 v-if="usernameMessage">{{ usernameMessage }}</h6>
  </div>
</template>

<script>
import { userService } from "../../services/user-service";
import { utilService } from "../../services/util-service";
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      usernameMessage: null,
      isChecking: false,
      isUsernameTaken: false,
      newUsername: this.username,
    };
  },
  methods: {
    checkUsername(ev) {
      const username = ev.target.value;
      if (!utilService.checkString(username)) {
        this.usernameMessage =
          "User name can contain only number, letter and _, ., - characters.";
        return;
      }
      this.newUsername = username;
      if (this.isChecking) return;
      this.usernameMessage = null;
      this.isChecking = true;
      setTimeout(async () => {
        try {
          this.isUsernameTaken = await userService.checkUsername(
            this.newUsername
          );
          this.isChecking = false;
          this.$emit("save", "username", this.newUsername);
        } catch (error) {
          console.log(error);
        }
      }, 2000);
    },
  },
};
</script>
