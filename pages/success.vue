<script setup lang="ts">
interface User {
  email: string;
  password: string;
  subscribed: boolean;
}

const user = useState<User>('user', () => {
  return {
    email: '',
    password: '',
    subscribed: false,
  };
});
</script>

<template>
  <nord-card class="nh-card">
    <h1 slot="header" class="n-typescale-xl">Welcome to Nord</h1>
    <pre>{{ user }}</pre>
    <nord-button variant="primary" type="submit" size="l" @click="navigateTo('/')">Go back</nord-button>
  </nord-card>
</template>

<style scoped>
.nh-card {
  max-width: 500px;
}
</style>
