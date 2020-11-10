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
        <q-btn
          round
          color="grey"
          icon="menu"
          size="10px"
          @click="FunMmenuDialog = true"
        />
        <!-- <q-fab color="grey" direction="up" class="q-fab-mini">
          <q-fab-action color="primary" @click="indexMenu" />
          <q-fab-action color="secondary" @click="dowork" />
          <q-fab-action
            color="accent"
            @click="ImportantCaseMenuDialog = true"
          />
        </q-fab> -->
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
        <q-card-actions align="right">
          <q-btn label="關閉" v-close-popup class="text-h6" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 功能表視窗 -->
    <q-dialog v-model="FunMmenuDialog" position="bottom" v-if="Authority">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">功能選擇：</div>
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <div class="column items-center">
            <q-btn-group push>
              <q-btn
                push
                color="orange"
                text-color="black"
                label="總表編輯"
                icon="timeline"
                @click="
                  ImportantCaseMenuDialog = true;
                  FunMmenuDialog = false;
                "
                class="text-h6"
              />
              <q-btn
                push
                color="amber"
                text-color="black"
                label="編輯目前案件"
                icon="edit"
                class="text-h6"
                @click="dowork"
              />
              <q-btn
                push
                color="yellow"
                text-color="black"
                label="選擇投影片"
                icon="done"
                class="text-h6"
                @click="indexMenu"
              />
            </q-btn-group>

            <q-btn flat label="關閉" v-close-popup class="text-h6" />
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
      Authority: false,
      cIndex: 0,
      currentData: {}, //一頁投影片的資料
      prevbtn: false,
      data: [], //全部的資料
      menuDialog: false,
      FunMmenuDialog: true,
      item: {},

      dialog: false,
      maximizedToggle: true,
      copyData: {},

      ImportantCaseMenuDialog: false,

      inpswd: "",
    };
  },
  components: {
    PptTamplate: require("components/PptTamplate.vue").default,
    Maintenance: require("components/Maintenance.vue").default,
    ImportantCaseMenu: require("components/ImportantCaseMenu.vue").default,
    SupMeetingSelect: require("components/SupMeetingSelect.vue").default,
  },
  created() {
    this.checkPswd()
  },
  mounted() {
    // console.log(this.ImportantCase);

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
    async checkPswd() {
      let rdpswd = await this.RdPassword();
      console.log(rdpswd);
      this.$q
        .dialog({
          title: "輸入編輯密碼",
          // message: '輸入編輯密碼',
          prompt: {
            inpswd: "",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          // console.log('>>>> OK, received',rdpswd, data)
          if(rdpswd == data){
              this.Authority = true
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    async getData() {
      let currentMeeting = await LocalStorage.getItem("currentMeeting");
      await this.setCurrentMeeting(currentMeeting);
      await this.fbReadDataImportantCase();
      await setTimeout(() => {
        this.currentData = this.ImportantCaseSorted[0];
        // console.log(this.ImportantCaseSorted);
      }, 2000);
    },
    RdPassword() {
      return dbFirestore
        .collection("主管會報Setting")
        .doc("Edit")
        .get()
        .then((doc) => {
          // console.log(doc.data())
          return doc.data().password;
        })
        .catch((err) => {
          // showErrorMessage(err.message)
          console.error("主管會報Seting資料庫讀取失敗！", error);
        });
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
      this.FunMmenuDialog = false;
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

      this.FunMmenuDialog = false;
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
