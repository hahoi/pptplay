<template>
  <q-page style="max-width: 600px; margin: auto">
    <div class="q-ma-md q-gutter-md column">
      <!-- <q-card class="my-card col-4">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">內容維護</div>
        </q-card-section>

        <q-separator />

        <q-card-section></q-card-section>
        <q-card-section class="row">
          <div class="col-6">
            <q-select
              v-model="selected"
              :options="SupervisorMeetingSort"
              label="選擇："
            />
          </div>
          <div class="q-ma-md">
            <q-btn color="primary" @click="editImportantCase">編輯</q-btn>

            <q-btn>
              <q-icon name="more_vert" />
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section @click="supMeetAdd">新增</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="supMeetDel">刪除</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-card-section>
      </q-card> -->

      <q-card class="my-card col-4">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">主管會報列管重要案件報告</div>
        </q-card-section>

        <q-separator />

        <q-card-section></q-card-section>
        <q-card-section class="row">
          <div class="col-6">
            <q-select
              v-model="selected"
              :options="SupervisorMeetingSort"
              label="選擇："
            />
          </div>
          <div class="col-3">
            <q-radio v-model="playModel" val="play" label="播放" />
            <q-radio v-model="playModel" val="print" label="列印" />
          </div>
          <div class="q-ma-md">
            <q-btn color="deep-orange" @click="go">開始</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorage, Loading, openURL } from "quasar";
import { dbFirestore } from "boot/firebase";
export default {
  name: "PageIndex",
  data() {
    return {
      model: "18屆?次主管會報",
      selected: "",
      options: [],
      playModel: "",
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("SupMeeting", ["SupervisorMeetingSort"]),
    ...mapState("SupMeeting", ["CurrentMeeting"]),
    ...mapState("ImportantCase", ["currentMeeting"]),
  },
  methods: {
    ...mapMutations("ImportantCase", ["setCurrentMeeting"]),
    ...mapActions("SupMeeting", ["ReadSupervisorMeeting"]),
    async getData() {
      // this.ReadSupervisorMeeting();
      this.selected = await this.RDcurrentMeeting();
    },

    go() {
      if (this.selected === "" || this.playModel === "") {
        this.$q
          .dialog({
            title: "請選擇主管會報及模式",
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
        return;
      }
      this.setCurrentMeeting(this.selected);
      LocalStorage.set("currentMeeting", this.selected);
      if (this.playModel === "play") {
        this.$router.push("/PptPlay").catch((err) => {});
      }      
      if (this.playModel === "print") {
        this.$router.push("/PptPrint").catch((err) => {});
      }

      // console.log(this.currentMeeting)
      // console.log(LocalStorage.getItem("currentMeeting"))

      // //開啟新視窗
      // let routeUrl = this.$router.resolve({
      //   path: "/PptPlay",
      // });
      // window.open(routeUrl.href, "_blank");
    },
    RDcurrentMeeting() {
      return dbFirestore
        .collection("主管會報Setting")
        .doc("currentMeeting")
        .get()
        .then((doc) => {
          // console.log(doc.data())
          return doc.data().currentMeeting;
        })
        .catch((error) => {
          // showErrorMessage(err.message)
          console.error("主管會報Seting資料庫讀取失敗！", error);
        });
    },
  }, //methods
};
</script>
