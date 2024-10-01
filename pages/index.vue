<script setup lang="ts">
import { ref } from 'vue';

interface User {
  email: string;
  password: string;
  subscribed: boolean;
}

interface Errors {
  email: string;
  password: string;
}

const user = useState<User>('user', () => {
  return {
    email: '',
    password: '',
    subscribed: false,
  };
});

const errors = useState<Errors>('errors', () => {
  return {
    email: '',
    password: '',
  };
});

const showPass = ref<boolean>(false);

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateField = (field: keyof Errors) => {
  if (!user.value[field].trim()) {
    errors.value[field] = 'Field is required';
  } else {
    errors.value[field] = '';
    if (field === 'email' && !emailRegex.test(user.value.email)) {
      errors.value.email = 'Please enter a valid email address';
    }
  }
};

const setUser = ($event: Event, field: keyof Errors) => {
  const target = $event.target as HTMLInputElement;
  user.value[field] = target.value;
  validateField(field);
};

const validateForm = (): boolean => {
  validateField('email');
  validateField('password');

  return !Object.values(errors.value).some((error) => error);
};

const submitForm = () => {
  if (validateForm()) {
    navigateTo('/success');
  }
};
</script>

<template>
  <nord-card class="nh-card">
    <h1 slot="header" class="n-typescale-xl">Sign in to Nord</h1>
    <form @submit.prevent="submitForm">
      <nord-stack gap="xl">
        <nord-input
          required
          name="email"
          id="email"
          label="E-mail"
          expand
          type="email"
          size="l"
          :value="user.email"
          @input="setUser($event, 'email')"
          v-bind="errors.email ? { error: errors.email } : {}"
        ></nord-input>

        <nord-input
          required
          name="password"
          id="password"
          label="Password"
          expand
          :type="showPass ? 'text' : 'password'"
          size="l"
          :value="user.password"
          @input="setUser($event, 'password')"
          v-bind="errors.password ? { error: errors.password } : {}"
        >
          <nord-button
            slot="end"
            aria-describedby="password-tooltip"
            square
            size="l"
            @click.prevent="showPass = !showPass"
          >
            <nord-icon v-if="showPass" name="interface-edit-on"></nord-icon>
            <nord-icon v-else name="interface-edit-off"></nord-icon>
          </nord-button>
        </nord-input>

        <nord-checkbox
          label="I want to receive occasional product updates and announcements"
          v-bind="user.subscribed ? { checked: true } : {}"
          @change="user.subscribed = !user.subscribed"
        >
        </nord-checkbox>

        <nord-button expand variant="primary" type="submit" size="l">Sign up</nord-button>
      </nord-stack>
    </form>
  </nord-card>
</template>

<style scoped>
.nh-card {
  max-width: 500px;
}
</style>
