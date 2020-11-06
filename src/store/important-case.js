import Vue from 'vue'
import { dbFirestore } from 'boot/firebase'


const state = {
    readyDownloaded: false, //資料下載完成前，先轉圈圈
    currentMeeting: "", //"18屆90次主管會報",
    ImportantCase: {},
    copyImCase: {},
}





const getters = {
    ImportantCaseSorted: (state) => {
        let SortArry = []
        let SortObj = {}

        let keysOrdered = Object.keys(state.ImportantCase)

        keysOrdered.sort((a, b) => {
            let taskAProp = parseInt(state.ImportantCase[a]['orderNumber'])
            let taskBProp = parseInt(state.ImportantCase[b]['orderNumber'])

            if (taskAProp > taskBProp) return 1
            else if (taskAProp < taskBProp) return -1
            else return 0
        })

        //輸出是Array
        keysOrdered.forEach((key) => {
            SortArry.push({ id: key, ...state.ImportantCase[key] })
        })
        //輸出是Object
        keysOrdered.forEach((key) => {
            SortObj[key] = state.ImportantCase[key]
        })
        return SortArry //SortObj //SortArry
    },
}


const mutations = {
    setReadyDownloaded(state, value) {
        state.readyDownloaded = value
    },


    setCurrentMeeting(state, value) {
        state.currentMeeting = value
        state.ImportantCase = {}
    },


    setCopyImCase(state, value) {
        state.copyImCase = value
    },

    //重要案件
    //Object
    updateImportantCase(state, payload) {
        Vue.set(state.ImportantCase, payload.id, payload.data)
    },
    deleteImportantCase(state, id) {
        Vue.delete(state.ImportantCase, id)
    },
    addImportantCase(state, payload) {
        Vue.set(state.ImportantCase, payload.id, payload.data)
    },
    clearImportantCase(state) {
        state.ImportantCase = {}
    },


}


const actions = {
    setOrderNumber({ commit, dispatch }, data) {
        // 因有監聽所以會更改 state.importantCase
        dispatch('updateOrderNumber', data)
    },
    updateOrderNumber({ state },data) {
        dbFirestore
            .collection("主管會報")
            .doc(state.currentMeeting)
            .collection("重要案件")
            .doc(data.id)
            .update(data)
            .then(() => {
                console.log("序號更改成功！");
            })
            .catch(error => {
                console.error("序號更改失敗！", error);
            });
    },
    //＝＝＝＝＝＝＝＝＝重要案件＝＝＝＝＝＝＝＝＝＝＝
    //增加一筆
    addImportantCase({ dispatch }, data) { //建議跟mutations同名，較好記
        // let cId = uid() //quasar產生的 uid              
        dbFirestore
            .collection("主管會報")
            .doc(state.currentMeeting)
            .collection("重要案件")
            .doc() //
            .set(data)
            .then(() => {
                console.log("資料庫新增成功！");
            })
            .catch(error => {
                // console.error("資料庫儲存失敗！", error);
            });
    },
    updateImportantCase({ }, data) {
        console.log(data)
        dbFirestore
            .collection("主管會報")
            .doc(state.currentMeeting)
            .collection("重要案件")
            .doc(data.id)
            .update(data)
            .then(() => {
                console.log("資料庫修改成功！");
            })
            .catch(error => {
                console.error("資料庫儲存失敗！", error);
            });

    },

    deleteImportantCase({ }, id) {
        dbFirestore
            .collection("主管會報")
            .doc(state.currentMeeting)
            .collection("重要案件")
            .doc(id)
            .delete()
            .then(() => {
                console.log("資料刪除成功！");
            })

    },



    //讀取重要案件資料庫
    fbReadDataImportantCase({ state, commit }) {
        commit('setReadyDownloaded', false)
        //監聽資料
        dbFirestore
            .collection("主管會報")
            .doc(state.currentMeeting)
            .collection("重要案件")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {

                    if (change.type === "added") {
                        let payload = {
                            id: change.doc.id,
                            data: change.doc.data()
                        }
                        // console.log(payload)
                        commit('addImportantCase', payload)
                    }
                    if (change.type === "modified") {
                        let payload = {
                            id: change.doc.id,
                            data: change.doc.data()
                        }
                        commit('updateImportantCase', payload)

                    }
                    if (change.type === "removed") {
                        let payload = change.doc.id

                        commit('deleteImportantCase', payload)
                    }

                });
            });

        //讀取一次，確定已經全部讀入，再做後續處理
        dbFirestore
            .collection("主管會報")
            .doc(state.currentMeeting)
            .collection("重要案件")
            .get()
            .then(qs => {
                // qs.forEach(doc => {
                // })
                commit('setReadyDownloaded', true)
            })
            .catch(err => {
                // showErrorMessage(err.message)
                console.error("主管會報資料庫讀取失敗！", error);
            });

    }

}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}