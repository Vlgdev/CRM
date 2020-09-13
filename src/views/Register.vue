<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
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
        >Введите Email</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: $v.password.$dirty && (!$v.password.required || !$v.password.minLength)}"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >Введите пароль</small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >Должно быть не меньше {{$v.password.$params.minLength.min}} символов. Сейчас {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && (!$v.name.required || !$v.name.minLength || !$v.name.onlyLetters)}"
        />
        <label for="name">Имя</label>
        <small v-if="$v.name.$dirty && !$v.name.required" class="helper-text invalid">Введите имя</small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.onlyLetters"
          class="helper-text invalid"
        >В имени присутствуют недопустимые символы</small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
        >Должно быть не меньше {{$v.name.$params.minLength.min}} символов. Сейчас {{name.length}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="rules" />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small
        v-if="$v.rules.$dirty && !$v.rules.truthy"
        class="helper-text invalid"
      >Поставьте галочку, если вы согласны с правилами</small>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
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
      minLength: minLength(2),
      onlyLetters: value => /^[a-zA-Zа-яА-Я]*$/.test(value)
    },
    rules: {
      truthy: value => value
    }
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };
      console.log(formData);
      this.$router.push("/login?message=registered");
    }
  }
};
</script>