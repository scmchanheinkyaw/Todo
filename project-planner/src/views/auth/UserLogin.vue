<template>
  <h1>Login</h1>
  <form @submit.prevent="loginUser">
    <label>User Email</label>
    <input type="email" v-model="email" />
    <span class="errMessage" @show="emailError">{{ emailError }}</span>
    <label>User Password</label>
    <input type="password" v-model="password" />
    <span class="errMessage" @show="passwordError">{{ passwordError }}</span>
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
    };
  },
  methods: {
    async loginUser() {
      const res = await axios.post(`${api_url}/login`, {
        email: this.email,
        password: this.password,
      });
      const { data } = res.data;

      if (this.email == "" || this.password == "") {
        if (this.email == "") {
          this.emailError = "The email field is required!";
        } else {
          this.emailError = "";
        }
        if (this.password == "") {
          this.passwordError = "The password field is required!";
        } else {
          this.passwordError = "";
        }
        return;
      }

      if (data == "wrong_email" || data == "wrong_password") {
        if (data == "wrong_email") {
          this.emailError = "Wrong Email";
        } else {
          this.emailError = "";
        }

        if (data == "wrong_password") {
          this.passwordError = "Wrong Password";
        } else {
          this.passwordError = "";
        }
        return;
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        this.$root.user = data;
        this.$router.push({
          name: "home",
        });
        alert("Login Success");
      }
    },
  },
};
</script>

<style></style>
