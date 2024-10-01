<script setup>
import { ref } from 'vue';

const user = useState('user', () => {
  return {
    email: '',
    password: '',
    subscribed: false,
  };
});

const errors = useState('errors', () => {
  return {
    email: '',
    password: '',
  };
});

const showPass = ref(true);

const setUser = ($event, field) => {
  user.value[field] = $event.target.value;
  if (!user.value[field].length) {
    errors.value[field] = 'Field is required';
  } else {
    delete errors.value[field];
  }

  if (field === 'email') {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.value.email)) {
      delete errors.value[field];
    } else {
      errors.value.email = 'Please enter a valid email address';
    }
  }
};

const submitForm = () => {
  if (!errors.value.password || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.value.email)) {
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
          v-bind="errors.email ? { error: errors.email } : ''"
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
          v-bind="errors.password ? { error: errors.password } : ''"
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
          label=" I want to receive occasional product updates and announcements"
          @change="user.subscribed = !user.subscribed"
        >
        </nord-checkbox>

        <nord-button expand variant="primary" type="submit" size="l">Sign up</nord-button>
      </nord-stack>
    </form>
  </nord-card>
</template>

<style>
.nh-card {
  max-width: 500px;
}
</style>
