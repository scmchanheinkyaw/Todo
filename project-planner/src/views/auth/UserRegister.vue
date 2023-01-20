<template>
  <h1>Register</h1>
  <form @submit.prevent="registerUser">
    <label>User Name</label>
    <input type="name" v-model="name" />
    <span class="errMessage" @show="nameError">{{ nameError }}</span>
    <label>User Email</label>
    <input type="email" v-model="email" />
    <span class="errMessage" @show="emailError">{{ emailError }}</span>
    <label>User Password</label>
    <input type="password" v-model="password" />
    <span class="errMessage" @show="passwordError">{{ passwordError }}</span>
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
      nameError: "",
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    async registerUser() {
      if (this.name == "" || this.email == "" || this.password == "") {
        if (this.name == "") {
          this.nameError = "The name field is required!";
        } else {
          this.nameError = "";
        }
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

      const res = await axios.post(`${api_url}/register`, {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      const { data } = res.data;

      if (data == "Email is already register") {
        this.emailError = "Email is already register";
        return;
      } else {
        this.emailError = "";
      }

      localStorage.setItem("auth", JSON.stringify(data));
      this.$root.user = data;
      this.$router.push({
        name: "home",
      });
      alert("Register Success");
    },
  },
};
</script>

<style></style>
