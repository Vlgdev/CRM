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
export default {
  name: 'Sidebar',
  props: ['isOpen'],
  data: () => ({
    items: [
      {title: 'Счет', url: '/', exact: true},
      {title: 'История', url: '/history'},
      {title: 'Планирование', url: '/planning'},
      {title: 'Новая запись', url: '/record'},
      {title: 'Категории', url: '/categories'},
    ]
  })
}
</script>