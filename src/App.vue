<template>
  <div>
    <router-link to="/about">about</router-link>
    <router-link to="/home">home</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log('1111')
  }
}
</script>
