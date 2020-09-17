<template>
  <div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!record">
      Не удалось найти запись
      <router-link to="/history">Обратно на страницу истории</router-link>
    </p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">{{record.typeText}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount}}</p>
              <p>Категория: {{record.categoryName}}</p>

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
        "fetchRecord",
        this.$route.params.id
      );
      const categories = await this.$store.dispatch("fetchCategories");
      if (record) {
        this.record = {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход"
        };
      }

      this.loading = false;
    } catch (e) {
      throw e;
    }
  }
};
</script>