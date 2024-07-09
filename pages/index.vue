<template>
  <div id="page-index">
    <h4>Network</h4>
    <form>
      <input
        type="radio"
        id="testnet"
        name="network"
        value="https://oauth2.staging.nuvosphere.io?app_id=663d9ca53d72720014449318&return_url=http://localhost:3000"
        checked
      />
      <label for="testnet">testnet</label><br />
      <input
        type="radio"
        id="mainnet"
        name="network"
        value="https://oauth2.nuvosphere.io?app_id=663d9ca53d72720014449318&return_url=http://localhost:3000"
      />
      <label for="mainnet">mainnet</label><br />
      <input
        type="radio"
        id="dev"
        name="network"
        value="http://localhost:1025?app_id=663d9ca53d72720014449318&return_url=http://localhost:3000"
      />
      <label for="dev">dev</label><br />
    </form>

    <h4>Login Type</h4>
    <form>
      <input type="radio" id="popup" name="login-type" value="popup" />
      <label for="popup">popup window</label><br />
      <input type="radio" id="iframe" name="login-type" value="iframe" checked />
      <label for="iframe">iframe</label><br />
    </form>
    <h1>Nuvo oauth2 SDK demo</h1>
    <button class="login">Login or Signup</button>

    <!-- iframe -->
    <div id="Oauth2">
      <iframe
        src="https://oauth2.staging.nuvosphere.io?app_id=663d9ca53d72720014449318&return_url=http://localhost:3000"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
#Oauth2 {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#Oauth2 iframe {
  border: none;
  border-radius: 20px;
  box-shadow: 0px 30px 56px 0px rgba(0, 0, 0, 0.35), 0px 4px 12px 0px rgba(0, 0, 0, 0.65);
  width: 480px;
  height: 551px;
}
</style>
