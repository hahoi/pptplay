<template>
  <div class="q-ma-md q-gutter-md column">
    <q-card class="my-card col-4">
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
    </q-card>

    <!-- <q-card>
      <q-card-section class="row">
        <div class="col-6">
          <q-select
            v-model="selected"
            :options="SupervisorMeetingSort"
            label="選擇："
          />
        </div>
        <div class="q-ma-md">
          <q-btn color="deep-orange" @click="pptPlay">選擇</q-btn>
        </div>
      </q-card-section>
    </q-card> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorage, Loading, openURL } from "quasar";

export default {
  name: "",
  data() {
    return {
      model: "18屆?次主管會報",
      selected: "",
      options: [],
    };
  },
  mounted() {
    this.ReadSupervisorMeeting();
      this.selected = LocalStorage.getItem("currentMeeting");
  },
  computed: {
    ...mapGetters("SupMeeting", ["SupervisorMeetingSort"]),
  },
  methods: {
    ...mapMutations("ImportantCase", ["setCurrentMeeting"]),
    ...mapActions("SupMeeting", [
      "ReadSupervisorMeeting",
      "addSupervisorMeeting",
      "deleteSupervisorMeeting",
    ]), 
    ...mapActions("ImportantCase", ["fbReadDataImportantCase"]),


    async getData() {
      let currentMeeting = await LocalStorage.getItem("currentMeeting");
      this.selected = currentMeeting
      await this.setCurrentMeeting(currentMeeting);
      await this.fbReadDataImportantCase();
      await setTimeout(() => {
        this.currentData = this.ImportantCaseSorted[0];
        console.log(this.ImportantCaseSorted);
      }, 2000);
    },
    editImportantCase() {
      this.setCurrentMeeting(this.selected);
      LocalStorage.set("currentMeeting", this.selected);      
      this.getData();
    },
    supMeetAdd() {
      this.$q
        .dialog({
          title: "新增",
          message: "輸入主管會報名稱？",
          prompt: {
            model: "18屆？次主管會報",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          //資料庫新增
          this.addSupervisorMeeting(data);
        });
    },
    supMeetDel() {
      if (this.selected == "") {
        return false;
      }
      this.$q
        .dialog({
          title: "刪除確認",
          message: `要刪除${this.selected}嗎？`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q
            .dialog({
              title: "警告",
              message: "再次確認？",
              cancel: true,
            })
            .onOk(() => {
              console.log(">>>>", this.selected);
              let id = this.selected;
              this.selected = ""; //刪除後讓選擇欄位清空
              this.deleteSupervisorMeeting(id);
            });
        });
    },
    pptPlay() {
      this.setCurrentMeeting(this.selected);
      LocalStorage.set("currentMeeting", this.selected);
      //   //開啟新視窗
      //   let routeUrl = this.$router.resolve({
      //     path: "/PptPlay",
      //   });
      //   window.open(routeUrl.href, "_blank");
    },
  }, //methods
};
</script>
