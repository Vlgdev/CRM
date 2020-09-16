<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @toggle-nav="navOpen = !navOpen" />
      <Sidebar :isOpen="navOpen" />

      <main class="app-content" :class="{full: !navOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import messages from '@/utils/messages'

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    navOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('getUserInfo')
    }

    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    error() {
      this.$error(messages['default'])
    }
  },
};
</script>