<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div class="row" v-else>
      <HomeBill :rates="currencies.rates" />
      <HomeCurrency
        :rates="currencies.rates"
        :date="new Date(currencies.date)"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/home/HomeBill';
import HomeCurrency from '@/components/home/HomeCurrency';

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currencies: null,
  }),
  components: {
    HomeBill,
    HomeCurrency,
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currencies = await this.$store.dispatch('fetchCurrencies');
      this.loading = false;
    },
  },
  async mounted() {
    this.currencies = await this.$store.dispatch('fetchCurrencies');
    this.loading = false;
  },
};
</script>
