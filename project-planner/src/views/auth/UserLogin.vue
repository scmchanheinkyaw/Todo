<template>
  <h1>Login</h1>
  <form @submit.prevent="loginUser">
    <label>User Email</label>
    <input type="email" v-model="email" />
    <span class="errMessage" v-if="error.email">{{ error.email[0] }}</span>
    <label>User Password</label>
    <input type="password" v-model="password" />
    <span class="errMessage" v-if="error.password">{{
      error.password[0]
    }}</span>
    <button>Login</button>
  </form>
</template>

<script>
import axios from "axios";
import { api_url } from "@/config.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      error: {},
    };
  },
  methods: {
    async loginUser() {
      const res = await axios.post(`${api_url}/login`, {
        email: this.email,
        password: this.password,
      });
      const { data, success } = res.data;

      if (success == false) {
        this.error = data;
        if (data == "wrong_email" || data == "wrong_password") {
          window.toaster.error("You are not a valid user!.", {
            position: "top-right",
            duration: 3000,
          });
          return;
        }
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        this.$root.user = data;
        this.$router.push({
          name: "home",
        });
        window.toaster.success("Welcome! Login Success", {
          position: "top-right",
          duration: 3000,
        });
      }
    },
  },
};
</script>

<style></style>
