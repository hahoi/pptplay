<template>
  <q-page>
    <div ref="ppt" id="ppt">
      <ppt-tamplate :data="currentData"></ppt-tamplate>

      <q-page-sticky position="bottom-left">
        <q-btn
          round
          color="grey"
          icon="keyboard_arrow_left"
          @click="prev"
          @keydown="renderKeydown($event)"
          tabindex="0"
        />
      </q-page-sticky>

      <q-page-sticky position="bottom">
        <q-btn round color="grey" icon="menu" size="10px" @click="indexMenu" />
      </q-page-sticky>

      <q-page-sticky position="bottom-right">
        <q-btn
          round
          color="grey"
          icon="keyboard_arrow_right"
          @click="next"
          @keydown="renderKeydown($event)"
          tabindex="1"
        />
      </q-page-sticky>
    </div>

    <!-- 從底部列出所有案件可選擇播放視窗 -->
    <q-dialog v-model="menuDialog" position="bottom">
      <q-card style="min-width: 300px">
        <q-card-actions align="center" class="text-primary">
          <div class="column items-left">
            <div v-for="(item, index) in ImportantCaseSorted">
              <div
                class="text-h6"
                v-html="`${item.orderNumber}.${item.title}`"
                @click="goIndex(index)"
              ></div>
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorage, Loading } from "quasar";
import { deepCopy } from "src/utils/function-tree";
import { dbFirestore } from 'boot/firebase'

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
    PptTamplate: require("components/PptTamplate.vue").default,
  },
  created() {},
  mounted() {
    // this.RDcurrentMeeting()
    this.getData();

    // document.getElementById("ppt");
    // this.$refs.ppt.onmousedown = (ev) => {
    //   var ev = ev || window.envent;
    //   //   console.log(ev);
    //   //   console.log(this.prevbtn)
    //   if (!this.prevbtn) {
    //     //避免按上一頁時，先跳下一頁再跳上一頁
    //     this.next();
    //   }
    // };
  },
  watch: {},
  computed: {
    ...mapGetters("ImportantCase", ["ImportantCaseSorted"]),
  },
  methods: {
    ...mapMutations("ImportantCase", ["setCurrentMeeting"]),
    ...mapActions("ImportantCase", ["fbReadDataImportantCase"]),

    async getData() {
      // let currentMeeting = await this.RDcurrentMeeting()
      // await this.setCurrentMeeting(currentMeeting);
      let currentMeeting = await LocalStorage.getItem("currentMeeting");
      await this.setCurrentMeeting(currentMeeting);

      await this.fbReadDataImportantCase();
      await setTimeout(() => {
        this.currentData = this.ImportantCaseSorted[0];
        // console.log(this.ImportantCaseSorted);
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
      // console.log("e.keyCode", e.keyCode);
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
      this.cIndex = index;
      this.currentData = this.ImportantCaseSorted[index];
    },
    dowork() {
      // console.log(this.cIndex);

      // // this.currentData = this.ImportantCaseSorted[index];
      this.dialog = true;
      this.copyData = deepCopy(this.currentData);
    },
    RDcurrentMeeting() {
      return dbFirestore
        .collection("主管會報Setting")
        .doc("currentMeeting")
        .get()
        .then((doc) => {         
            // console.log(doc.data())
            return doc.data().currentMeeting
        })
        .catch((err) => {
          // showErrorMessage(err.message)
          console.error("主管會報Seting資料庫讀取失敗！", error);
        });
    },
  },
};
</script>

<style>
</style>
