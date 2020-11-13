<template>
  <div class="q-pa-md text-h6">
    <div class="q-gutter-y-md" style="max-width: 700px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="text-center">{{ data.title }}</div>
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-black"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="title" label="標題" />
            <q-tab name="step1" label="開始" />
            <q-tab name="step2" label="先期作業" />
            <q-tab name="step3" label="規劃設計" />
            <q-tab name="step4" label="工程施工" />
            <q-tab name="step5" label="完成" />
            <q-tab name="schedule" label="進度" />
            <q-tab name="situation" label="執行情形" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="title">
              <q-input
                v-model="data.orderNumber"
                label="序號"
                style="width: 40px"
              />
              <q-input v-model="data.title" label="標題" />
              <div class="row q-ma-md">
                <q-uploader :factory="factoryFn1" style="max-width: 250px" />
                <q-space></q-space>
                <q-uploader :factory="factoryFn2" style="max-width: 250px" />
              </div>
              <div
                class="fit row wrap justify-start items-start content-start q-gutter-md q-ma-md text-black"
              >
                <!-- {{data.id}}<br/>
              {{data.image.img1.findKey.split("/")[3]}}<br/> -->
                <div v-if="data.id !== data.image.img1.findKey.split('/')[3]">
                  檔案是拷貝的，檔案若要獨立，請重新上傳。
                </div>
                <div>
                  <img
                    :src="data.image.img1.linkURL"
                    style="height: 100px; max-width: 100px; overflow: auto"
                  />
                  <img
                    :src="data.image.img2.linkURL"
                    style="height: 100px; max-width: 100px; overflow: auto"
                  />
                </div>
                <q-separator />
                <div v-for="(url, key) in allFileUrl">
                  <!-- {{url.url}} -->
                  <span @click="delImg(url.file, key)">
                    <q-icon name="delete" color="black" /><q-icon
                      name="close"
                      color="black" /></span
                  ><br />
                  <img
                    :src="url.url"
                    style="height: 100px; max-width: 100px; overflow: auto"
                  />
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="step1">
              <div class="q-gutter-md row items-start q-mb-xl">
                <q-input v-model="data.step1.text" label="區塊" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step1.progress1" label="檢核點" />
                <q-input v-model="data.step1.schedule1" label="日期" />
              </div>
            </q-tab-panel>
            <q-tab-panel name="step2">
              <div class="q-gutter-md row items-start q-mb-xl">
                <q-input v-model="data.step2.text" label="區塊" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step2.progress1" label="檢核點1" />
                <q-input v-model="data.step2.schedule1" label="日期1" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step2.progress2" label="檢核點2" />
                <q-input v-model="data.step2.schedule2" label="日期2" />
              </div>
            </q-tab-panel>
            <q-tab-panel name="step3">
              <div class="q-gutter-md row items-start q-mb-xl">
                <q-input v-model="data.step3.text" label="區塊" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step3.progress1" label="檢核點1" />
                <q-input v-model="data.step3.schedule1" label="日期1" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step3.progress2" label="檢核點2" />
                <q-input v-model="data.step3.schedule2" label="日期2" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step3.progress3" label="檢核點3" />
                <q-input v-model="data.step3.schedule3" label="日期3" />
              </div>
            </q-tab-panel>
            <q-tab-panel name="step4">
              <div class="q-gutter-md row items-start q-mb-xl">
                <q-input v-model="data.step4.text" label="區塊" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step4.progress1" label="檢核點1" />
                <q-input v-model="data.step4.schedule1" label="日期1" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step4.progress2" label="檢核點2" />
                <q-input v-model="data.step4.schedule2" label="日期2" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step4.progress3" label="檢核點3" />
                <q-input v-model="data.step4.schedule3" label="日期3" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step4.progress4" label="檢核點4" />
                <q-input v-model="data.step4.schedule4" label="日期4" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step4.progress5" label="檢核點5" />
                <q-input v-model="data.step4.schedule5" label="日期5" />
              </div>
            </q-tab-panel>
            <q-tab-panel name="step5">
              <div class="q-gutter-md row items-start q-mb-xl">
                <q-input v-model="data.step5.text" label="區塊" />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.step5.progress1" label="檢核點" />
                <q-input v-model="data.step5.schedule1" label="日期" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="schedule">
              <div class="q-gutter-md row items-start q-mb-xl">
                <q-input v-model="data.plan.text" label="標題" />
                <q-input
                  v-model="data.plan.width"
                  style="width: 100px"
                  type="number"
                  label="畫圖(bar長度)"
                />
                <q-input
                  v-model="data.plan.percent"
                  label="文字(百分比)"
                  style="width: 100px"
                />
              </div>
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.Actual.text" label="標題" />
                <q-input
                  v-model="data.Actual.width"
                  style="width: 100px"
                  type="number"
                  label="畫圖(bar長度)"
                />

                <q-input
                  v-model="data.Actual.percent"
                  label="文字(百分比)"
                  style="width: 100px"
                />
                <q-input v-model="data.Actual.memo" label="重點備註" />
              </div>
            </q-tab-panel>
            <q-tab-panel name="situation">
              <p class="text-black text-body2">
                文字不要超過5行，每行不要超過45個字。
              </p>
              <q-editor
                v-model="data.situation"
                max-height="5rem"
                class="text-black"
              />
            </q-tab-panel>
          </q-tab-panels>
          <q-card-section>
            <div class="flex q-pa-md">
              <q-btn label="存檔" type="submit" color="primary" />
              <q-btn
                label="離開"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
                v-close-popup
                @click="$emit('listenToChild', 'close')"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<script>
import { dbFirestore, dbStorage } from "boot/firebase";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { LocalStorage } from "quasar";
export default {
  name: "",
  props: ["data"],
  data() {
    return {
      tab: "title", // tab 預設顯示
      allFileUrl: [],
    };
  },
  components: {},
  created() {},
  mounted() {
    this.listAllFile();
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions("ImportantCase", [
      "updateImportantCase",
      "fbReadDataImportantCase",
    ]),

    onSubmit() {
      console.log(this.data);
      this.updateImportantCase(this.data);
    },
    onReset() {},
    // 上傳第一個圖檔
    factoryFn1(files) {
      const vm = this;
      console.log(vm.data, vm.data.id);
      const currentMeeting = LocalStorage.getItem("currentMeeting");
      const findKey =
        "/主管會報/" + currentMeeting + "/" + vm.data.id + "/" + files[0].name;
      console.log(files[0].name);
      const uploadTask = dbStorage.ref().child(findKey).put(files[0]);
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          //非同步處理
          // vm.uploadProgress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function (error) {
          console.log(error);
          alert("上傳圖片有錯誤！");
        },
        function () {
          //成功
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            let src = {
              linkURL: downloadURL,
              findKey: findKey,
            };
            vm.data.image.img1 = src;

            console.log(vm.data);

            //=============存入資料庫======================
            return vm.updateImportantCase(vm.data);
          });
        }
      );
    },
    // 上傳第二個圖檔
    factoryFn2(files) {
      const vm = this;
      console.log(vm.data, vm.data.id);
      const currentMeeting = LocalStorage.getItem("currentMeeting");
      const findKey =
        "/主管會報/" + currentMeeting + "/" + vm.data.id + "/" + files[0].name;
      console.log(files[0].name);
      const uploadTask = dbStorage.ref().child(findKey).put(files[0]);
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          //非同步處理
          // vm.uploadProgress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function (error) {
          console.log(error);
          alert("上傳圖片有錯誤！");
        },
        function () {
          //成功
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            let src = {
              linkURL: downloadURL,
              findKey: findKey,
            };
            vm.data.image.img2 = src;

            console.log(vm.data);

            //=============存入資料庫======================
            return vm.updateImportantCase(vm.data);
          });
        }
      );
    },
    delImg(findKey, key) {
      let vm = this;

      this.$q
        .dialog({
          title: "刪除確認",
          message: `要刪除這張照片嗎？`,
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
              // console.log(vm.data.id, vm.data.title);
              // console.log(findKey, key, vm.allFileUrl);
              console.log(vm.allFileUrl[key].file.split("/")[3]);
              console.log(vm.data.image.img1.findKey.split("/")[4]);
              console.log(vm.data.image.img2.findKey.split("/")[4]);

              let attr = vm.allFileUrl[key].file.split("/")[3];
              let attr1 = vm.data.image.img1.findKey.split("/")[4];
              let attr2 = vm.data.image.img2.findKey.split("/")[4];

              //從遠端儲存空間刪除
              let uploadTask = dbStorage.ref().child(findKey).delete();

              //刪除photo陣列中的刪除項目
              vm.allFileUrl.splice(key, 1);

              //更新資料庫中 image 屬性
              let att = {
                linkURL: "",
                findKey: "",
              };
              if (attr == attr1) {
                console.log("img1");
                vm.data.image.img1 = attr;
                console.log(vm.data);
                vm.updateImportantCase(vm.data);
              }
              if (attr == attr2) {
                console.log("img2");
                vm.data.image.img2 = att;
                console.log(vm.data);
                vm.updateImportantCase(vm.data);
              }
              
            });
        });
    },

    listAllFile() {
      const currentMeeting = LocalStorage.getItem("currentMeeting");
      const findKey = "/主管會報/" + currentMeeting + "/" + this.data.id;
      this.listFile(findKey);
    },
    listFile(findKey) {
      let vm = this;
      // Create a reference under which you want to
      // console.log(findKey)
      if (!findKey) {
        return;
      }
      var listRef = dbStorage.ref().child(findKey);

      // Find all the prefixes and items.
      listRef
        .listAll()
        .then(function (res) {
          res.prefixes.forEach(function (folderRef) {
            // 這個目錄底下的目錄（foreach 列出全部）
            // console.log(folderRef.fullPath)
            // vm.allPath.push(folderRef.fullPath);
            // 用遞迴的方式列出全部目錄及檔案
            vm.listFile(folderRef.fullPath);
          });
          res.items.forEach(function (itemRef) {
            // 這個目錄下的檔案（foreach 列出全部）
            // console.log(itemRef.fullPath);
            // vm.allFile.push(itemRef.fullPath);

            const fileRef = dbStorage.ref(itemRef.fullPath);
            // .ref() 指向已存在 storage 中的檔案位置後 可以透過 getDownloadURL 取得連結
            fileRef.getDownloadURL().then(function (url) {
              // console.log(url);
              vm.allFileUrl.push({
                file: itemRef.fullPath,
                url: url,
              });
            });
            // console.log(vm.allFileUrl);
          });
        })
        .catch(function (error) {
          console.log(error);
          // Uh-oh, an error occurred!
        });
    },
  }, //methods
};
</script>

<style>
</style>
