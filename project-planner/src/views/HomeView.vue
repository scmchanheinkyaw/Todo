<template>
  <div class="home">
    <h1>Home</h1>
    <FilterNav @filterValue="current = $event" :current="current"></FilterNav>
    <div v-for="project in filteredProjects" :key="project.id">
      <SingleProject
        :project="project"
        @delete="deleteProject"
        @complete="completeProject"
        @removeProject="removeProject"
      ></SingleProject>
    </div>
  </div>
</template>

<script>
import FilterNav from "../components/FilterNav";
import SingleProject from "../components/SingleProject";
export default {
  name: "HomeView",
  data() {
    return {
      projects: [],
      current: "all",
    };
  },
  methods: {
    removeProject(id) {
      this.projects.splice(this.projects.indexOf(id), 1);
      localStorage.setItem("projects", JSON.stringify(this.projects));
    },
    deleteProject(id) {
      this.projects = this.projects.filter((project) => {
        return project.id != id;
      });
    },
    completeProject(id) {
      let findProject = this.projects.find((project) => {
        return project.id === id;
      });

      findProject.complete = !findProject.complete;
    },
  },
  components: {
    FilterNav,
    SingleProject,
  },
  computed: {
    filteredProjects() {
      if (localStorage.getItem("projects")) {
        if (this.current === "complete") {
          return this.projects.filter((project) => {
            return project.complete;
          });
        }
        if (this.current === "ongoing") {
          return this.projects.filter((project) => {
            return !project.complete;
          });
        }
        return this.projects;
      }
    },
  },
  mounted() {
    let datas = localStorage.getItem("projects");
    this.projects = JSON.parse(datas);
  },
};
</script>
