<template>
  <div>
    <div class="app-main-layout">
      <Navbar @toggle-nav="navOpen = !navOpen" />
      <Sidebar :isOpen="navOpen" />

      <main class="app-content" :class="{full: !navOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    navOpen: true
  })
};
</script>