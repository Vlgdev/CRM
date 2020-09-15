<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >Введите название</span
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
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && (!$v.limit.required || !$v.limit.minValue)"
            class="helper-text invalid"
            >Минимальная величина {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

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
      this.$message('Категория была создана')
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
