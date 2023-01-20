import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toaster from "@meforma/vue-toaster";
import { createToaster } from "@meforma/vue-toaster";
window.toaster = createToaster({});

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
const app = createApp(App).use(Toaster).use(router);
app.mixin(myGlobalVariable);
app.mount("#app");
