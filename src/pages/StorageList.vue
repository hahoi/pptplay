<template>
  <div>
    <q-btn @click="listDownloadUrl" label="Url"></q-btn>
    <pre>
    {{ allPath }}
    </pre>
    <pre>
      {{ allFile }}
    </pre>
    <pre>
      {{ allFileUrl }}
    </pre>
  </div>
</template>

<script>
import { dbFirestore, dbStorage } from "boot/firebase";
import { LocalStorage } from "quasar";
export default {
  name: "",
  data() {
    return {
      allPath: [],
      allFile: [],
      allFileUrl: [],
    };
  },
  components: {},
  created() {
    this.listAllFile();
  },
  mounted() {
    this.listDownloadUrl();
  },
  watch: {},
  computed: {},
  methods: {
    listAllFile() {
      const currentMeeting = LocalStorage.getItem("currentMeeting");
      const findKey = "/主管會報/" + currentMeeting + "/"; // +"07h5jz10N5oPCGMfDxIE" + "/"
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
            vm.allPath.push(folderRef.fullPath);
            // 用遞迴的方式列出全部目錄及檔案
            vm.listFile(folderRef.fullPath);
          });
          res.items.forEach(function (itemRef) {
            // 這個目錄下的檔案（foreach 列出全部）
            // console.log(itemRef.fullPath);
            vm.allFile.push(itemRef.fullPath);

            const fileRef = dbStorage.ref(itemRef.fullPath);
            // .ref() 指向已存在 storage 中的檔案位置後 可以透過 getDownloadURL 取得連結
            fileRef.getDownloadURL().then(function (url) {
              // console.log(url);
              vm.allFileUrl.push({
                file: itemRef.fullPath,
                url: url,
              });
            });
          });
        })
        .catch(function (error) {
          console.log(error);
          // Uh-oh, an error occurred!
        });
    },
    listDownloadUrl() {
      this.allFile.forEach((file) => {
        const fileRef = dbStorage.ref(file);
        // .ref() 指向已存在 storage 中的檔案位置後 可以透過 getDownloadURL 取得連結
        fileRef.getDownloadURL().then(function (url) {
          console.log(url);
          this.allFileUrl.push({
            file: file,
            url: url,
          });
        });
      });
    },
  },
};
</script>

<style>
</style>
