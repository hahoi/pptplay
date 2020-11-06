<template>
  <!-- 
  A4 尺寸 width: 978px; height: 649px;
  顯示頁面只設寬度
  按滑鼠右鍵列印，背景圖形要打勾
  印表強迫換頁，{page-break-after: always}
  -->
  <div style="width: 978px; margin: auto">
    <!-- <q-btn v-print="'#printContent'" label="列印" size="xl" /> -->
    <div ref="ppt" id="printContent" v-for="item in ImportantCaseSorted">
      <print-tamplate :data="item"></print-tamplate>
      <div style="page-break-after: always"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorage, Loading } from "quasar";
import { deepCopy } from "src/utils/function-tree";
export default {
  name: "",
  data() {
    return {
      cIndex: 0,
      currentData: {}, //一頁投影片的資料
      prevbtn: false,
      data: [], //全部的資料
      menuDialog: false,
      item: {},

      dialog: false,
      maximizedToggle: true,
      copyData: {},
    };
  },
  components: {
    PrintTamplate: require("components/PrintTamplate.vue").default,
  },
  created() {},
  mounted() {
    this.getData();
  },
  watch: {},
  computed: {
    ...mapGetters("ImportantCase", ["ImportantCaseSorted"]),
  },
  methods: {
    ...mapMutations("ImportantCase", ["setCurrentMeeting"]),
    ...mapActions("ImportantCase", ["fbReadDataImportantCase"]),

    async getData() {
      let currentMeeting = await LocalStorage.getItem("currentMeeting");
      await this.setCurrentMeeting(currentMeeting);
      await this.fbReadDataImportantCase();
      await setTimeout(() => {
        this.currentData = this.ImportantCaseSorted[0];
        console.log(this.ImportantCaseSorted);
      }, 2000);
    },
    next() {
      this.prevbtn = false;
      let dataLength = this.ImportantCaseSorted.length;
      this.cIndex =
        this.cIndex < this.ImportantCaseSorted.length
          ? this.cIndex + 1
          : this.cIndex;
      if (this.cIndex == this.ImportantCaseSorted.length) {
        //到最後一張，因index已加1要減回來
        --this.cIndex;
      }
      this.currentData = this.ImportantCaseSorted[this.cIndex];
      //   console.log(this.currentData, this.cIndex);
    },
    prev() {
      this.prevbtn = true;
      let dataLength = this.ImportantCaseSorted.length;
      this.cIndex = this.cIndex == 0 ? this.cIndex : this.cIndex - 1;
      this.currentData = this.ImportantCaseSorted[this.cIndex];
      //   console.log(this.currentData, this.cIndex);
    },

    renderKeydown(e) {
      console.log("e.keyCode", e.keyCode);
      if (e.keyCode == 40 || e.keyCode == 34 || e.keyCode == 39) {
        this.next();
      }
      if (e.keyCode == 33 || e.keyCode == 38 || e.keyCode == 37) {
        this.prev();
      }
    },
    indexMenu() {
      this.menuDialog = true;
    },
    goIndex(index) {
      this.menuDialog = false;
      // console.log(index);
      this.currentData = this.ImportantCaseSorted[index];
    },
    dowork(index) {
      // console.log(index);
      this.currentData = this.ImportantCaseSorted[index];
      this.dialog = true;
      this.copyData = deepCopy(this.currentData);
    },
  },
};
</script>

<style>
@media print {
  #printContent {
    margin: 5mm; /* this affects the margin in the printer settings */
  }
}
</style>
