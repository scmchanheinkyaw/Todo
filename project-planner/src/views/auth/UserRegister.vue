<template>
  <h1>Register</h1>
  <form @submit.prevent="registerUser">
    <label>User Name</label>
    <input type="name" v-model="name" />
    <span class="errMessage" v-if="error.name">{{ error.name[0] }}</span>
    <label>User Email</label>
    <input type="email" v-model="email" />
    <span class="errMessage" v-if="error.email">{{ error.email[0] }}</span>
    <label>User Password</label>
    <input type="password" v-model="password" />
    <span class="errMessage" v-if="error.password">{{
      error.password[0]
    }}</span>
    <button>Register</button>
  </form>
</template>

<script>
import axios from "axios";
import { api_url } from "@/config.js";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      emailError: "",
      error: {},
    };
  },
  methods: {
    async registerUser() {
      const res = await axios.post(`${api_url}/register`, {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      const { data, success } = res.data;
      if (success == false) {
        this.error = data;
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        this.$root.user = data;
        this.$router.push({
          name: "home",
        });
        window.toaster.success("Welcome! Register Success", {
          position: "top-right",
          duration: 3000,
        });
      }
    },
  },
};
</script>

<style></style>
