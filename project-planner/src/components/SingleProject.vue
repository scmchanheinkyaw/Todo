<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="flexing">
      <div>
        <h3 @click="showDetail = !showDetail">{{ project.title }}</h3>
      </div>
      <div>
        <span class="material-icons" @click="deleteProject"> delete </span>
        <router-link :to="{ name: 'editProject', params: { id: project.id } }">
          <span class="material-icons"> edit </span>
        </router-link>
        <span class="material-icons" @click="completeProject"> done </span>
      </div>
    </div>
    <p v-if="showDetail">{{ project.detail }}</p>
  </div>
</template>

<script>
export default {
  props: ["project"],
  data() {
    return {
      showDetail: false,
      projects: [],
    };
  },
  methods: {
    deleteProject() {
      this.$emit("removeProject", this.project.id);
    },
    completeProject() {
      this.complete();
    },
    complete() {
      let data = this.projects.find((project) => {
        return project.id == this.project.id;
      });

      data.complete = !data.complete;
      this.$emit("complete", this.project.id);

      localStorage.setItem("projects", JSON.stringify(this.projects));
      this.$router.push("/");
    },
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
};
</script>

<style>
.project {
  padding: 20px;
  background-color: #f2f2f2;
  margin: 10px;
  border-left: 6px solid crimson;
  border-radius: 8px;
}

.flexing {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  cursor: pointer;
  margin-left: 10px;
}

span:hover {
  color: #777;
}

.complete {
  border-left-color: green;
}

h3 {
  cursor: pointer;
  color: indigo;
}
</style>
