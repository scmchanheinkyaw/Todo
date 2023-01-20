import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const myGlobalVariable = {
  data() {
    return {
      user: null,
    };
  },
  created() {
    const data = localStorage.getItem("auth");
    if (data == null) {
      this.user = null;
    } else {
      this.user = JSON.parse(data).user;
    }
  },
};
const app = createApp(App).use(router);
app.mixin(myGlobalVariable);
app.mount("#app");
