<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Categories_CreateTitle' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{'Input_Category' | localize}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >{{'ErrorInputReq_Category' | localize}}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{
              invalid:
                $v.limit.$dirty && (!$v.limit.required || !$v.limit.minValue),
            }"
          />
          <label for="limit">{{'Input_Limit' | localize}}</label>
          <span
            v-if="$v.limit.$dirty && (!$v.limit.required || !$v.limit.minValue)"
            class="helper-text invalid"
            >{{'ErrorInputMin_Limit' | localize}} {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Categories_CreateBtn' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'CategoriesCreate',
  data: () => ({
    title: '',
    limit: 50,
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(50) },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const category = await this.$store.dispatch('createCategory', {
        title: this.title,
        limit: this.limit,
      });
      this.$message(localizeFilter('Message_CategoryAdded'))
      this.$emit('created', category)

      this.title = '';
      this.limit = 50;
      this.$v.$reset();
    },
  },
  mounted() {
    M.updateTextFields();
  },
};
</script>
