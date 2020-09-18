<template>
  <div>
    <div class="page-title">
      <h3>{{'PlanningTitle' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <section>
      <Loader v-if="loading" />
      <p class="center" v-else-if="!categories.length">
        {{'NoCategories' | localize}}
        <router-link to="/categories">{{'NoCategories_Link' | localize}}</router-link>
      </p>
      <div v-else v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency('RUB')}} из {{cat.limit | currency('RUB')}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    try {
      const records = await this.$store.dispatch("fetchRecords");
      const categories = await this.$store.dispatch("fetchCategories");

      if (categories.length) {
        this.categories = categories.map(cat => {
          const spend = records
            .filter(r => r.categoryId === cat.id)
            .filter(r => r.type === "outcome")
            .reduce((total, r) => (total += +r.amount), 0);
          const percent = (100 * spend) / cat.limit;
          const progressPercent = percent > 100 ? 100 : percent;
          const progressColor =
            percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

          const tooltipValue = cat.limit - spend;
          const tooltipText = localizeFilter(
            tooltipValue < 0 ? "PlanningExcess" : "PlanningRemainder"
          );
          const tooltip =
            tooltipValue >= 0 && this.$store.getters.info.locale === "en-US"
              ? currencyFilter(Math.abs(tooltipValue)) + tooltipText
              : tooltipText + currencyFilter(Math.abs(tooltipValue));
          return { ...cat, spend, progressPercent, progressColor, tooltip };
        });
      }

      this.loading = false;
    } catch (e) {}
  }
};
</script>