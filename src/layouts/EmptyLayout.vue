<template>
  <div>
    <div class="grey darken-1 empty-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      const message = fbError && fbError.code ? fbError.code : 'Что-то пошло не так'
      this.$error(message)
      console.log(fbError);
    }
  }
}
</script>