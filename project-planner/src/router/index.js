import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddProject from "../views/AddProject.vue";
import EditProject from "../views/EditProject.vue";
import UserLogin from "@/views/auth/UserLogin.vue";
import UserRegister from "@/views/auth/UserRegister.vue";

const ifAuth = (to, from, next) => {
  const data = localStorage.getItem("auth");
  if (data) {
    return next({ name: "home" });
  }
  return next();
};

const ifNotAuth = (to, from, next) => {
  const data = localStorage.getItem("auth");
  if (!data) {
    window.toaster.info("You are not login user!", {
      position: "top-right",
      duration: 3000,
    });
    return next({
      name: "userLogin",
    });
  }
  return next();
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: ifNotAuth,
  },
  {
    path: "/addProject",
    name: "addProject",
    component: AddProject,
    beforeEnter: ifNotAuth,
  },
  {
    path: "/login",
    name: "userLogin",
    component: UserLogin,
    beforeEnter: ifAuth,
    props: true,
  },
  {
    path: "/register",
    name: "userRegister",
    component: UserRegister,
    beforeEnter: ifAuth,
  },
  {
    path: "/editProject/:id",
    name: "editProject",
    component: EditProject,
    props: true,
    beforeEnter: ifNotAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
