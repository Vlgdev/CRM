<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
    v-for="item of items"
    :key="item.url"
    :to="item.url"
    tag="li"
    active-class="active"
    :exact="item.exact"
    >
      <a class="waves-effect waves-orange pointer">{{item.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'Sidebar',
  props: ['isOpen'],
  data: () => ({
    items: [
      {title: localizeFilter('Menu_Bill'), url: '/', exact: true},
      {title: localizeFilter('Menu_History'), url: '/history'},
      {title: localizeFilter('Menu_Planning'), url: '/planning'},
      {title: localizeFilter('Menu_Record'), url: '/record'},
      {title: localizeFilter('Menu_Categories'), url: '/categories'},
    ]
  }),
}
</script>