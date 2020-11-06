<template>
  <q-page>
    <div ref="ppt" id="ppt">
      <ppt-tamplate :data="currentData"></ppt-tamplate>

      <!-- <q-page-sticky position="top-left" :offset="[0, 0]">
        <q-btn
          round
          color="grey"
          icon="menu"
          size="4px"
          class=""
          @click="ImportantCaseMenuDialog = true"
        />
      </q-page-sticky>

      <q-page-sticky position="top-right" :offset="[0, 0]">
        <q-btn
          round
          color="grey"
          icon="edit"
          size="4px"
          class=""
          @click="dowork()"
        />
      </q-page-sticky> -->

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
        <!-- <q-btn
          round
          color="grey"
          icon="menu"
          size="10px"
          @click="indexMenu"
        /> -->
        <q-fab color="grey" direction="up" class="q-fab-mini">
          <q-fab-action color="primary" @click="indexMenu" />
          <q-fab-action color="secondary" @click="dowork" />
          <q-fab-action
            color="accent"
            @click="ImportantCaseMenuDialog = true"
          />
        </q-fab>
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

      <!-- {{currentData}} -->
      <!-- {{ImportantCaseSorted}} -->
    </div>

    <!-- 從底部列出所有案件可選擇播放視窗 -->
    <q-dialog v-model="menuDialog" position="bottom">
      <q-card style="min-width: 300px">
        <q-card-actions align="center" class="text-primary">
          <div class="column items-left">
            <div v-for="(item, index) in ImportantCaseSorted">
              <div>
                <span
                  class="text-h6"
                  v-html="`${item.orderNumber}.${item.title}`"
                  @click="goIndex(index)"
                >
                </span>
                <!-- <span>
                  <q-btn
                    size="10px"
                    flat
                    dense
                    round
                    icon="edit"
                    color="grey"
                    @click="dowork(index)"
                  />
                </span> -->
              </div>
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 目前案件編輯維護視窗 -->
    <q-dialog
      v-model="dialog"
      :maximized="maximizedToggle"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        class="bg-primary text-white"
        style="max-width: 800px; margin: auto"
      >
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup @click="renew">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <!-- 編輯維護視窗 -->
          <maintenance
            :data="copyData"
            @listenToChild="getChildMsg"
          ></maintenance>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- 重要案件內容維護主視窗 -->
    <q-dialog
      v-model="ImportantCaseMenuDialog"
      :maximized="maximizedToggle"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="" style="max-width: 700px; margin: auto">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup @click="renew">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <sup-meeting-select></sup-meeting-select>
        </q-card-section>

        <q-card-section>
          <important-case-menu></important-case-menu>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
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

      ImportantCaseMenuDialog: false,
    };
  },
  components: {
    PptTamplate: require("components/PptTamplate.vue").default,
    Maintenance: require("components/Maintenance.vue").default,
    ImportantCaseMenu: require("components/ImportantCaseMenu.vue").default,
    SupMeetingSelect: require("components/SupMeetingSelect.vue").default,
  },
  created() {},
  mounted() {
    // console.log(this.ImportantCase);
    // this.currentData = this.data[this.cIndex];

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
      this.cIndex = index;
      this.currentData = this.ImportantCaseSorted[index];
    },
    dowork() {
      // console.log(this.cIndex);

      // // this.currentData = this.ImportantCaseSorted[index];
      this.dialog = true;
      this.copyData = deepCopy(this.currentData);
    },
    renew() {
      this.currentData = this.ImportantCaseSorted[this.cIndex];
    },
    getChildMsg(val) {
      // console.log(val)
      // this.prev();
      // this.next();
      this.currentData = this.ImportantCaseSorted[this.cIndex];
    },
  },
};
</script>

<style>
.q-fab--form-rounded {
  width: 24px;
  height: 24px;
  /* border-radius:999em; */
}
</style>
