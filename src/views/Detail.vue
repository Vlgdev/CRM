<template>
  <div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!record">
      {{'DetailNotFound' | localize}}
      <router-link to="/history">{{'DetailNotFound_Link' | localize}}</router-link>
    </p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Detail_BreadcrumbRoot' | localize}}</router-link>
        <a
          @click.prevent
          class="breadcrumb"
        >{{(record.type === 'income' ? 'Income' : 'Outcome') | loaclize}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>{{'Detail_Descr' | localize}} {{record.description}}</p>
              <p>{{'Detail_Amount' | localize}} {{record.amount}}</p>
              <p>{{'Detail_Category' | localize}} {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    try {
      const record = await this.$store.dispatch(
        "fetchRecordById",
        this.$route.params.id
      );
      if (record) {
        const category = await this.$store.dispatch(
          "fetchCategoryById",
          record.categoryId
        );
        this.record = {
          ...record,
          categoryName: category.title,
          typeClass: record.type === "income" ? "green" : "red"
        };
      }

      this.loading = false;
    } catch (e) {
      throw e;
    }
  }
};
</script>