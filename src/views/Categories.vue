<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesCreate @created="addNewCategory"/>
        <CategoriesUpdate />
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/categories/CategoriesCreate'
import CategoriesUpdate from '@/components/categories/CategoriesUpdate'

export default {
  name: 'Categories',
  data: () => ({
    categories: []
  }),
  components: {
    CategoriesCreate, CategoriesUpdate
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories);
    }
  }
}
</script>