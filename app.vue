<template>
  <nord-layout>
    <nord-stack class="nh-stack" direction="horizontal" justify-content="center" align-items="center">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </nord-stack>
  </nord-layout>
</template>

<style>
body {
  min-height: 100vh;
  padding: 0;
  margin: 0;
}
main {
  min-height: 100vh;
}

.nh-stack {
  min-height: 100vh;
}
</style>
