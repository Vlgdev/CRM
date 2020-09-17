<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      У вас еще нет ни одной категории.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <p class="center" v-else-if="!records.length">
      В истории ничего нет.
      <router-link to="/record">Добавить новую запись</router-link>
    </p>

    <div v-else>
      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <HistoryTable :records="records"/>
      </section>
    </div>
  </div>
</template>

<script>
import HistoryTable from "@/components/history/HistoryTable";

export default {
  name: "History",
  components: {
    HistoryTable
  },
  data: () => ({
    records: [],
    categories: [],
    loading: true
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");

    if (this.categories.length && records.length) {
      this.records = records.map(r => ({
        ...r,
        category: this.categories.find(c => c.id === r.categoryId).title,
        typeClass: r.type === "income" ? "green" : "red",
        typeText: r.type === "income" ? "Доход" : "Расход"
      })).reverse();
    }

    this.loading = false;
  }
};
</script>