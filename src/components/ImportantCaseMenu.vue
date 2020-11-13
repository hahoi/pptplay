<template>
  <div style="max-width: 600px; margin: auto">
    <div class="q-pa-md">
      <div class="text-h6 text-center">{{ currentMeeting }}</div>
      <q-list bordered separator>
        <list-item
          v-for="(currentData, key) in ImportantCaseSorted"
          :key="currentData.id"
          :data="currentData"
        ></list-item>
      </q-list>
      <div class="q-ma-md">
        <q-input v-model="title" label="新增標題" class="" />
      </div>
      <div class="q-ma-md q-gutter-md">
        <q-btn
          class=""
          label="新增"
          icon="add"
          @click="addImCase"
          v-if="title.length > 0"
        />
        <q-btn
          class=""
          label="貼上"
          icon="note_add"
          @click="paste"
          v-if="copyImCase != null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorage, Loading } from "quasar";

export default {
  name: "",
  data() {
    return {
      title: "",
    };
  },
  components: {
    ListItem: require("components/ListItem.vue").default,
  },
  created() {},
  mounted() {
    LocalStorage.remove("CopyImCase")
    this.getData();
    // console.log(this.copyImCase);
  },
  watch: {},
  computed: {
    ...mapState("ImportantCase", ["currentMeeting", "copyImCase"]),
    ...mapGetters("ImportantCase", ["ImportantCaseSorted"]),
  },
  methods: {
    ...mapMutations("ImportantCase", ["setCurrentMeeting", "setCopyImCase"]),
    ...mapActions("ImportantCase", [
      "fbReadDataImportantCase",
      "addImportantCase",
      "deleteImportantCase",
    ]),
    getData() {
      let currentMeeting = LocalStorage.getItem("currentMeeting");
      this.setCurrentMeeting(currentMeeting);
      this.fbReadDataImportantCase();

      let copyImCase = LocalStorage.getItem("CopyImCase");
      this.setCopyImCase(copyImCase);
    },
    paste() {
      let copyImCase = LocalStorage.getItem("CopyImCase");
      this.setCopyImCase(copyImCase);
      delete this.copyImCase.id;

      // console.log(this.copyImCase);

      //寫入資料庫
      this.addImportantCase(this.copyImCase);
      //清空
      this.title = "";
      this.setCopyImCase({});
    },
    addImCase() {
      let data = {
        orderNumber: "",
        title: this.title,
        image: {
          img1: {findKey: "" ,linkURL:""},
          img2: {findKey: "" ,linkURL:""},
        },
        step1: {
          text: "計畫",
          progress1: "計畫核定",
          schedule1: "",
        },
        step2: {
          text: "先期作業",
          progress1: "行政作業",
          schedule1: "",
          progress2: "發包訂約",
          schedule2: "",
        },
        step3: {
          text: "規劃設計",
          progress1: "行政作業",
          schedule1: "",
          progress2: "初步規劃",
          schedule2: "",
          progress3: "細部設計",
          schedule3: "",
        },
        step4: {
          text: "工程施工",
          progress1: "行政作業",
          schedule1: "",
          progress2: "發包開工",
          schedule2: "",
          progress3:
            "施工<span style='writing-mode:horizontal-tb;letter-spacing:-2px;'> 25 </span> ％",
          schedule3: "",
          progress4:
            "施工<span style='writing-mode:horizontal-tb;letter-spacing:-2px'>50</span> ％",
          schedule4: "",
          progress5:
            "施工<span style='writing-mode:horizontal-tb;letter-spacing:-2px'>75</span> ％",
          schedule5: "",
        },
        step5: {
          text: "結案",
          progress1: "工程完工",
          schedule1: "",
        },
        plan: {
          text: "預定進度",
          width: "50",
          percent: "",
        },
        Actual: {
          text: "實際進度",
          width: "50",
          percent: "",
          memo: "",
        },
        situation: ""
      };
      //寫入資料庫
      this.addImportantCase(data);
      this.title = "";
    },
  },
};
</script>

<style>
</style>
