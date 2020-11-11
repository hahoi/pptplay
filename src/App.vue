<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { firebaseAuth, dbFirestore } from "boot/firebase";
export default {
  name: "App",
  mounted() {
    firebaseAuth
      .signInWithEmailAndPassword("a000614@oa.pthg.gov.tw", "pthg@6390") //統一用這個帳號登入驗證
      .then((response) => {
        // console.log("login:", response);
        console.log(firebaseAuth.currentUser.uid);
      });
  },
};
</script>
