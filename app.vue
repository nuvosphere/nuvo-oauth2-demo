<template>
  <div id="app">
    <nuxt-page class="page" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
// global
// @use 'element-plus/theme-chalk/dark/css-vars.css' as *;
html,
body {
  height: 100%;
  height: 100%;
}
body {
  margin: 0;
  background: greenyellow;
  padding: 40px;
}

button {
  font-size: 16px;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:active {
  background-color: #004085;
  transform: translateY(0);
}
</style>
