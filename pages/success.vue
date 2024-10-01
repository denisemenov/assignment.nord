<script setup>
const user = useState('user', () => {
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
  </nord-card>
</template>

<style>
.nh-card {
  max-width: 500px;
}
</style>
