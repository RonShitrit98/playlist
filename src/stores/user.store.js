import { defineStore } from "pinia";
import { userService } from "../services/user-service";
import { utilService } from "../services/util-service";
import { useMediaStore } from "./media.store";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null,
      userToDisplay: null,
      isProfileEditMode: false,
    };
  },
  getters: {
    currUser() {
      return utilService.copyItem(this.user);
    },
    mediaStore() {
      return useMediaStore();
    },
  },
  actions: {
    async signup(user) {
      try {
        const newUser = await userService.signup(user);
        this.user = newUser;
      } catch (error) {
        console.log(error);
      }
    },
    async login(creds) {
      const user = await userService.login(creds);
      this.currUser = user;
    },
    async loadUser() {
      try {
        const user = await userService.loadUser();
        this.user = user;
      } catch (error) {
        console.log(error);
      }
    },
    async findUserById(id) {
      try {
        if (this.user._id === id) {
          this.userToDisplay = this.user;
          this.isProfileEditMode = true;
          return;
        }
        console.log(this.user._id === id);
        const user = await userService.getUserById(id);
        this.userToDisplay = user;
        this.isProfileEditMode = false;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await userService.logout();
        this.user = null;
      } catch (error) {
        console.log(error);
      }
    },
    async saveUser(user) {
      try {
        const newUser = await userService.saveUser(user);
        this.user = newUser;
      } catch (error) {
        console.log(error);
      }
    },
  },
});



