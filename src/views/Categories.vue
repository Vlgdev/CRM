<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoriesCreate @created="addNewCategory" />
        <CategoriesUpdate
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
        />
        <p class="center" v-else>Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from "@/components/categories/CategoriesCreate";
import CategoriesUpdate from "@/components/categories/CategoriesUpdate";

export default {
  name: "Categories",
  data: () => ({
    categories: [],
    updateCount: 0,
    loading: true
  }),
  components: {
    CategoriesCreate,
    CategoriesUpdate
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const i = this.categories.findIndex(c => c.id === category.id);
      this.categories[i] = category;
      this.updateCount++;
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;
    } catch (e) {
      throw e
    }
  }
};
</script>