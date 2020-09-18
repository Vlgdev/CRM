<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'LoginTitle' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: $v.email.$dirty && (!$v.email.email || !$v.email.required),
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >{{'ErrorInputUncorrect_Email' | localize}}</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >{{'ErrorInputReq_Email' | localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              $v.password.$dirty &&
              (!$v.password.required || !$v.password.minLength),
          }"
        />
        <label for="password">{{'Input_Password' | localize}}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >{{'ErrorInputReq_Password' | localize}}</small>
        <small v-else-if="$v.password.$dirty && !$v.password.minLength" class="helper-text invalid">
          {{'ErrorInputMin_Password_1' | localize}}
          {{ $v.password.$params.minLength.min }} {{'ErrorInputMin_Password_2' | localize}}
          {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'LoginBtn' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'NoAccount' | localize}}
        <router-link to="/register">{{'NoAccount_Link' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  mounted() {
    if (this.$route.query.message) {
      this.$message(messages[this.$route.query.message]);
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
        password: this.password
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>
