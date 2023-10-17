import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import DashboardView from "../view/DashboardView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  //Scroll behavior ot handle new route positions
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
