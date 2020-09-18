<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'RegisterTitle' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: $v.email.$dirty && (!$v.email.email || !$v.email.required)}"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >{{'ErrorInputReq_Email' | localize}}</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >{{'ErrorInputUncorrect_Email' | localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: $v.password.$dirty && (!$v.password.required || !$v.password.minLength)}"
        />
        <label for="password">{{'Input_Password' | localize}}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >{{'ErrorInputReq_Password' | localize}}</small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >{{'ErrorInputMin_Password_1' | localize}} {{$v.password.$params.minLength.min}} {{'ErrorInputMin_Password_2' | localize}} {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && (!$v.name.required || !$v.name.onlyLetters)}"
        />
        <label for="name">{{'Input_Name' | localize}}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >{{'ErrorInputReq_Name' | localize}}</small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.onlyLetters"
          class="helper-text invalid"
        >{{'ErrorInputUncorrect_Name' | localize}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="rules" />
          <span>{{'Register_Rules' | localize}}</span>
        </label>
      </p>
      <small
        v-if="$v.rules.$dirty && !$v.rules.truthy"
        class="helper-text invalid"
      >{{'Register_RulesError' | localize}}</small>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'RegisterBtn' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'haveAccount' | localize}}
        <router-link to="/login">{{'haveAccount_Link' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    rules: false
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    name: {
      required,
      onlyLetters: value => /^[a-zA-Zа-яА-Я]*$/.test(value)
    },
    rules: {
      truthy: value => value
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>