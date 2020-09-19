<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && (!$v.name.required || !$v.name.onlyLetters)}"
        />
        <label for="description">{{'Input_Name' | localize}}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >{{'ErrorInputReq_Name' | localize}}</span>
        <span
          v-else-if="$v.name.$dirty && !$v.name.onlyLetters"
          class="helper-text invalid"
        >{{'ErrorInputUncorrect_Name' | localize}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="locale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'ProfileBtn' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Profile",
  metaInfo() {
    return {
      title: this.$title('PageTitle_Profile')
    };
  },
  data: () => ({
    name: "",
    locale: true
  }),
  validations: {
    name: { required, onlyLetters: v => /^[a-zA-Zа-яА-Я]*$/.test(v) }
  },
  computed: { ...mapGetters(["info"]) },
  mounted() {
    this.name = this.info.name;
    this.locale = this.info.locale === "ru-RU";

    setTimeout(M.updateTextFields, 0);
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const updateData = {
        name: this.name,
        locale: this.locale ? "ru-RU" : "en-US"
      };

      try {
        await this.$store.dispatch("updateInfo", updateData);
        this.$message("Данные успешно изменены");
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>