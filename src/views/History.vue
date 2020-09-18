<template>
  <div>
    <div class="page-title">
      <h3>{{'HistoryTitle' | localize}}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{'NoCategories' | localize}}
      <router-link to="/categories">{{'NoCategories_Link' | localize}}</router-link>
    </p>

    <p class="center" v-else-if="!records.length">
      {{'EmptyHistory' | localize}}
      <router-link to="/record">{{'EmptyHistory_Link' | localize}}</router-link>
    </p>

    <div v-else>
      <div class="history-chart">
        <Chart :data="dataChart" />
      </div>

      <section>
        <HistoryTable :records="items" />
        <Pagination
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'PaginationPrev' | localize"
          :prev-class="'waves-effect'"
          :next-text="'PaginationNext' | localize"
          :next-class="'waves-effect'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        />
      </section>
    </div>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/history/HistoryTable";
import Chart from "@/components/Chart";

export default {
  name: "History",
  mixins: [paginationMixin],
  components: {
    HistoryTable,
    Chart
  },
  data: () => ({
    records: [],
    categories: [],
    loading: true,
    dataChart: {}
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");

    if (this.categories.length && records.length) {
      this.setup(records);
    }

    this.loading = false;
  },
  methods: {
    setup(records) {
      this.records = records
        .map(r => ({
          ...r,
          category: this.categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === "income" ? "green" : "red",
        }))
        .reverse();
      this.setupPagination(this.records);
      this.dataChart = {
        labels: this.categories.map(c => c.title),
        datasets: [
          {
            label: "График расходов",
            data: this.categories.map(c => {
              return records.reduce((total, r) => {
                return r.categoryId === c.id && r.type === "outcome"
                  ? (total += +r.amount)
                  : total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      };
    }
  }
};
</script>

<style>
.pagination li a {
  outline: none;
}
</style>