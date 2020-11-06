<template>
  <div>
    <!-- 重要案件列表顯示  v-ripple -->
    <q-item clickable>
      <q-item-section avatar>
        <q-input
          v-model="orderNumber"
          style="width: 24px"
          v-autofocus="{ delayCordova: 700 }"
          v-select-all
          @keydown="renderKeydown($event)"
        />
      </q-item-section>

      <q-item-section
        ><q-item-label
          @click="dowork"
          lines="1"
          class="q-mt-xs text-body2 text-weight-bold text-primary"
        >
          <span
            class="cursor-pointer"
            v-html="`${data.orderNumber}.${data.title}`"
            >{{ data.title }}</span
          >
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="content_copy"
            @click="CopyImCaseFun"
          />
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="delImCase"
          />
        </div>
      </q-item-section>
    </q-item>

    <!-- 編輯維護視窗 -->
    <q-dialog
      v-model="dialog"
      :maximized="maximizedToggle"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        class="bg-primary text-white"
        style="max-width: 700px; margin: auto"
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
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <!-- 編輯維護視窗 -->
          <maintenance :data="copyData"></maintenance>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { deepCopy } from "src/utils/function-tree";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorage } from "quasar";

import { selectAll } from "src/directives/directive-select-all";
import { autofocus } from "src/directives/directive-autofocus";

export default {
  name: "",
  props: ["data"],
  directives: {
    selectAll,
    autofocus,
  },
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      currentData: {},
      copyData: {},
      orderNumber: "",
    };
  },
  components: {
    Maintenance: require("components/Maintenance.vue").default,
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    // orderNumber: {
    //   get() {
    //     return this.data.orderNumber;
    //   },
    //   set(value) {
    //     let payload = {
    //       id: this.data.id,
    //       orderNumber: value,
    //     };
    //       // console.log(value)
    //     this.setOrderNumber(payload);
    //   },
    // },
  },
  methods: {
    ...mapMutations("ImportantCase", ["setCopyImCase"]),
    ...mapActions("ImportantCase", ["deleteImportantCase", "setOrderNumber"]),

    renderKeydown(e) {
      // console.log("e.keyCode", e.keyCode);
      if (e.keyCode == 13) {
        let payload = {
          id: this.data.id,
          orderNumber: this.orderNumber,
        };
        // 寫入資料庫
        this.setOrderNumber(payload);
      }
    },
    dowork() {
      // console.log(this.id, this.index);
      this.dialog = true;
      this.copyData = deepCopy(this.data);
    },
    CopyImCaseFun() {
      this.setCopyImCase(this.data);
      LocalStorage.set("CopyImCase", this.data);
    },
    delImCase() {
      // console.log(this.data);
      this.$q
        .dialog({
          title: "刪除確認",
          message: `要刪除${this.data.title}嗎？`,
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
              console.log(">>>>", this.data.title);
              this.deleteImportantCase(this.data.id);
            });
        });
    },
  },
};
</script>

<style>
</style>
