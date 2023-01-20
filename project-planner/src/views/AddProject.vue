<template>
  <h1>Add Project</h1>
  <form @submit.prevent="addProject">
    <label>Project Title</label>
    <input type="text" v-model="title" />
    <span class="errMessage" @show="titleError">{{ titleError }}</span>
    <label>Project Detail</label>
    <input type="text" v-model="detail" />
    <span class="errMessage" @show="detailError">{{ detailError }}</span>
    <button>Add Project</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      detail: "",
      projects: [],
      titleError: "",
      detailError: "",
    };
  },
  mounted() {
    if (localStorage.getItem("projects")) {
      try {
        this.projects = JSON.parse(localStorage.getItem("projects"));
      } catch (e) {
        localStorage.removeItem("projects");
      }
    }
  },
  methods: {
    addProject() {
      if (this.title == "" || this.detail == "") {
        if (this.title == "") {
          this.titleError = "The title field is required!";
        } else {
          this.titleError = "";
        }
        if (this.detail == "") {
          this.detailError = "The detail field is required!";
        } else {
          this.detailError = "";
        }
        return;
      }
      this.saveProjects();
    },
    saveProjects() {
      this.projects.push({
        id: this.projects.length + 1,
        title: this.title,
        detail: this.detail,
        complete: false,
      });
      localStorage.setItem("projects", JSON.stringify(this.projects));
      this.$router.push("/");
    },
  },
};
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
.errMessage {
  color: crimson;
}
</style>
