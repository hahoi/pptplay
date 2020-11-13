import Vue from 'vue'
import {firebaseAuth, dbFirestore } from 'boot/firebase'

const state = {
    SupervisorMeeting: [],
    CurrentMeeting: ""
}

const getters = {
    SupervisorMeetingSort: (state) => {
        let SortArry = []  //SupervisorMeeting雖然是陣列宣告，但實際是類陣列，所以要用Object.keys處理
        let keysOrdered = Object.keys(state.SupervisorMeeting).sort((a, b) => {
            let sA = state.SupervisorMeeting[a],
                sB = state.SupervisorMeeting[b]
            // if (sA > sB) return 1
            // else if (sA < sB) return -1
            // else return 0
            return sB.localeCompare(sA, "zh-hant"); //適合中文的排序

        })
        // console.log(keysOrdered)
        keysOrdered.forEach((key) => {
            SortArry.push(state.SupervisorMeeting[key])
        })
        return SortArry
    },
}


const mutations = {
    setSupervisorMeeting(state, value) {
        state.SupervisorMeeting = value
    },
    setCurrentMeeting(state, value) {
        state.CurrentMeeting = value
    },
    setData(state, value) {
        state.data = value
    },

    //＝＝＝＝＝＝＝以下測試用＝＝＝＝＝＝＝＝＝＝＝＝＝
    //Object
    updateSupervisorMeetingObject(state, payload) {
        // Object.assign(state.SupervisorMeetingObject[payload.id], payload.data)
        Vue.set(state.SupervisorMeetingObject, payload.id, payload.data)
    },
    deleteSupervisorMeetingObject(state, id) {
        Vue.delete(state.SupervisorMeetingObject, id)
    },
    addSupervisorMeetingObject(state, payload) {
        Vue.set(state.SupervisorMeetingObject, payload.id, payload.data)
    },
    //array
    updateSupervisorMeetingArray(state, payload) {
        // Object.assign(state.SupervisorMeetingArray[payload.id], payload.data)
        state.SupervisorMeetingArray.splice(payload.id, 1, payload.data)
    },
    deleteSupervisorMeetingArray(state, id) {
        state.SupervisorMeetingArray.splice(id, 1)
    },
    addSupervisorMeetingArray(state, payload) {
        state.SupervisorMeetingArray.push(payload)
    },
    //＝＝＝＝＝＝＝＝以上測試用＝＝＝＝＝＝＝＝＝＝＝＝


    //正式用
    //array
    updateSupervisorMeeting(state, payload) {
        state.SupervisorMeeting.splice(payload.id, 1, payload.data)
    },
    deleteSupervisorMeeting(state, id) {
        const xIndex = state.SupervisorMeeting.indexOf(id)
        // console.log(xIndex)
        if (xIndex > -1) {
            // Vue.delete(state.SupervisorMeeting, xIndex)  //這個也適用於陣列
            state.SupervisorMeeting.splice(xIndex, 1)
            console.log("delete ok")
        }
    },
    addSupervisorMeeting(state, payload) {
        state.SupervisorMeeting.push(payload)
    },
    clearSupervisorMeeting(state) {
        state.SupervisorMeeting = []
    },




}

const actions = {
    //＝＝＝＝＝＝＝＝＝主管會報＝＝＝＝＝＝＝＝＝＝＝
    //增加一筆
    addSupervisorMeeting({ commit }, payload) { //建議跟mutations同名，較好記
        // let cId = uid() //quasar產生的 uid              
        dbFirestore
            .collection("主管會報")
            .doc(payload) //會議名稱就是ID
            .set({})
            .then(() => {
                commit('addSupervisorMeeting', payload)
                console.log("主管會報資料庫新增成功！");
            })
            .catch(error => {
                console.error("主管會報資料庫儲存失敗！", error);
            });
    },
    //更新
    updateSupervisorMeeting({ commit }, payload) {
        console.log(payload)
        dbFirestore
            .collection("主管會報")
            .doc(payload.id)
            .update(payload.data)
            .then(() => {
                commit('updateSupervisorMeeting', payload)
                console.log("主管會報資料庫修改成功！");
            })
            .catch(error => {
                console.error("主管會報資料庫儲存失敗！", error);
            });

    },
    // 刪除
    deleteSupervisorMeeting({ commit }, id) {
        dbFirestore
            .collection("主管會報")
            .doc(id)
            .delete()
            .then(() => {
                commit('deleteSupervisorMeeting', id)
                console.log("主管會報資料刪除成功！");
            })

    },




    //讀取
    ReadSupervisorMeeting({ state, commit }) {
        commit('clearSupervisorMeeting')
        dbFirestore
            .collection("主管會報")
            .get()
            .then(qs => {
                qs.forEach(doc => {
                    // console.log(doc.id)
                    commit('addSupervisorMeeting', doc.id)
                })
            }).catch(err => {
                // showErrorMessage(err.message)
                console.error("主管會報資料庫讀取失敗！", error);
            });
    },
    RDcurrentMeeting({ state, commit }) {
      dbFirestore
        .collection("主管會報Setting")
        .doc("currentMeeting")
        .get()
        .then((doc) => {
        //   console.log(doc.data().currentMeeting)
        //   return doc.data().currentMeeting;
          commit("setCurrentMeeting",doc.data().currentMeeting)
        })
        .catch((error) => {
          // showErrorMessage(err.message)
          console.error("主管會報Seting資料庫讀取失敗！", error);
        });
    },
    auth({ commit, dispatch }) {
        firebaseAuth
            .signInWithEmailAndPassword("a000614@oa.pthg.gov.tw", "pthg@6390") //統一用這個帳號登入驗證
            .then((response) => {
                // console.log("login:", response);
                console.log(firebaseAuth.currentUser.uid);
                dispatch("ReadSupervisorMeeting")
                dispatch("RDcurrentMeeting")
                // this.$router.push("/").catch((err) => { });
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