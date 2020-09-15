<template>
  <div>
    <div class="grey darken-1 empty-layout">
      <router-view />
    </div>
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  name: 'EmptyLayout',
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error({code}) {
      this.$error(messages[code] || messages['default'])
    }
  }
}
</script>