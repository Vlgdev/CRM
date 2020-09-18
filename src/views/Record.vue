<template>
  <div>
    <div class="page-title">
      <h3>{{'RecordTitle' | localize}}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{'NoCategories' | localize}}
      <router-link to="/categories">{{'NoCategories_Link' | localize}}</router-link>
    </p>

    <form class="form" @submit.prevent="sumbitHandler" v-else>
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label>{{'Record_Category' | localize}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{'Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{'Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && (!$v.amount.required || !$v.amount.minValue)}"
        />
        <label for="amount">{{'Input_Amount' | localize}}</label>
        <span
          v-if="$v.amount.$dirty && (!$v.amount.required || !$v.amount.minValue)"
          class="helper-text invalid"
        >{{'ErrorInputMin_Amount' | localize}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">{{'Input_Descr' | localize}}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >{{'ErrorInputReq_Descr' | localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'RecordBtn' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import localizeFilter from '../filters/localize.filter'

export default {
  name: "Record",
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    category: null,
    type: "outcome",
    amount: 1,
    description: ""
  }),
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required }
  },
  methods: {
    async sumbitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canBeCreated) {
        const recordData = {
          type: this.type,
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          date: new Date().toJSON()
        }
        try {
          await this.$store.dispatch("createRecord", recordData);
          this.$message(localizeFilter('Message_RecordAdded'))
          this.amount = 1
          this.description = ''
          this.$v.$reset()
        } catch (e) {}
      } else {
        this.$error(
          `${localizeFilter('Message_InsufficientFunds')} ${this.amount - this.info.bill}`
        );
      }
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canBeCreated() {
      if (this.type === 'income') return true

      return this.info.bill >= this.amount;
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;

      if (this.categories.length) this.category = this.categories[0].id;

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      }, 0);
    } catch (e) {}
  },
  destroyed() {
    if (this.select && this.select.destroy) this.select.destroy();
  }
};
</script>