<script setup lang="ts">
const route = useRoute()
const domain = useDomain();
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <hr>
    <p>expect: site.local</p>
    <p>useDomain: {{ domain }}</p>
    <p>Current route: {{ route.path }}</p>
    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
    >Learn more about Nuxt Routing</a>
  </div>
</template>
