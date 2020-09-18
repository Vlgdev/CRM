<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Categories_EditTitle' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
          </select>
          <label>{{'Categories_Select' | localize}}</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model.trim="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'Input_Category' | localize}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >{{'ErrorInputReq_Category' | localize}}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && (!$v.limit.required || !$v.limit.minValue)}"
          />
          <label for="limit">{{'Input_Limit' | localize}}</label>
          <span
            v-if="$v.limit.$dirty && (!$v.limit.required || !$v.limit.minValue)"
            class="helper-text invalid"
          >{{'ErrorInputMin_Limit' | localize}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Categories_EditBtn' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "CategoriesUpdate",
  props: ["categories"],
  data: () => ({
    title: "",
    limit: 50,
    current: null,
    select: null
  }),
  validations: {
    title: { required },
    limit: { required, minValue: minValue(50) }
  },
  created() {
    const c = this.categories[0];
    this.current = c.id;
    this.title = c.title;
    this.limit = c.limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  watch: {
    current(id) {
        const c = this.categories.find(c => c.id === id)
        this.title = c.title;
        this.limit = c.limit;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const categoryData = {
        title: this.title,
        limit: this.limit,
        id: this.current
      }
      try {
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('Message_CategoryUpdated'))
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  destroyed() {
    if (this.select && this.select.destroy){
      this.select.destroy()
    }
  },
};
</script>