<template>
<div>
  <!-- {{data}}  height: 649px; -->
  <div class="importantPrint" style="width: 978px; ">
    <div class="grid-container-print">
      <div class="ptitle" v-html="`${data.orderNumber}.${data.title}`"></div>
      <div class="image1">
        <q-img
          :src="data.image.img1.linkURL"
          spinner-color="white"
          style="height: 250px;max-width: 500px;"
        />
      </div>
      <div class="image2">
        <q-img
          :src="data.image.img2.linkURL"
          spinner-color="white"
          style="height: 250px;max-width: 500px;"
        />
      </div>

      <div class="pstep step1" v-html="data.step1.text"></div>
      <div class="pstep step2" v-html="data.step2.text"></div>
      <div class="pstep step3" v-html="data.step3.text"></div>
      <div class="pstep step4" v-html="data.step4.text"></div>
      <div class="pstep step5" v-html="data.step5.text"></div>

      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step1.progress1"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step1.schedule1)"></div>
          <div class="pitem2"></div>
        </div>
      </div>

      <div class="grid-item-print">
        <div class="pitem1 leftLine">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step2.progress1"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step2.schedule1)"></div>
          <div class="pitem2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step2.progress2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step2.schedule2)"></div>
          <div class="pitem2"></div>
        </div>
      </div>

      <div class="grid-item-print">
        <div class="pitem1 leftLine">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step3.progress1">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step3.schedule1)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step3.progress2">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step3.schedule2)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step3.progress3">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step3.schedule3)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>

      <div class="grid-item-print">
        <div class="pitem1 leftLine">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step4.progress1">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step4.schedule1)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step4.progress2">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step4.schedule2)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step4.progress3">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step4.schedule3)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step4.progress4">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step4.schedule4)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step4.progress5">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step4.schedule5)">1</div>
          <div class="pitem2"></div>
        </div>
      </div>

      <div class="grid-item-print">
        <div class="pitem1 leftLine">
          <div class="pitem2"></div>
          <div class="pitem2 progress-print" v-html="data.step5.progress1">2</div>
        </div>
      </div>
      <div class="grid-item-print">
        <div class="pitem1">
          <div class="pitem2 schedule-print" v-html="df(data.step5.schedule1)"></div>
          <div class="pitem2"></div>
        </div>
      </div>

      <div class="plan-print">
        <div
          class="planBar-print"
          :style="{width: data.plan.width + '%'}"
          v-html="`${data.plan.text}　${data.plan.percent}`"
        ></div>
      </div>

      <div class="Actual-print">
        <div
          class="ActualBar-print"
          :style="{width: data.Actual.width + '%'}"
          v-html="`${data.Actual.text}　${data.Actual.percent}`"
        ></div>
        <div class="memo q-ml-lg" v-html="`${data.Actual.memo}`"></div>
      </div>
      <div class="situation">
        <div class="text-left" v-html="`${data.situation}`">          
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["data"],
  data() {
    return {
      gColor: "green"
    };
  },
  components: {},
  created() {},
  mounted() {
  },
  watch: {},
  computed: {},
  methods: {
    df(date) {
      let re = /\./gi;
      return date.replace(re, "<br/>");
    },
  },
};
</script>

<style>
* {
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  margin: 0px;
  padding: 0px;
}
.importantPrint {
  text-align: center;
  /* vertical-align: middle; */
  /* height:100%; */
}
.grid-container-print {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
  /* justify-content: space-between; */
  /* align-content: space-between; */
  /* align-items: center;
  align-content: center; */

  grid-template-rows: 40px 250px 30px 100px 30px 30px 156px;
  /* background-color: #2196f3; */
  grid-row-gap: 10px;
  margin: 5px;
}

.grid-item-print {
  /* background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
 */
  text-align: center;
  /* vertical-align: middle; */
  width: 100%;
  /* height: 100%; */
  /* justify-content: center; */
}

.ptitle {
  grid-column-start: 1;
  grid-column-end: 25;
  font-size: 2em;
}
.progress-print {
  font-size: 22px;
  text-align: center;
  /* vertical-align: sub; */
  writing-mode: vertical-lr;
  /* letter-spacing: 5px; */
}
.schedule-print {
  /* text-align: center; */
  /* vertical-align: justify; */

  font-size: 18px;
  color: firebrick;
  font-weight: 1000;
  line-height: 1.2em;
  /* height: 100%; */
  /* width: 100%; */
  /* writing-mode:horizontal-tb; */
}
.image {
  margin: auto;
}
.image1 {
  grid-column-start: 1;
  grid-column-end: 13;
  /* grid-column: 2 / 12; */
}
.image2 {
  grid-column-start: 13;
  grid-column-end: 25;
  /* grid-column: 13 / 24; */
}

.pstep {
  font-size: 20px;
}
.step1 {
  grid-column: 1 / 3;
  background: -webkit-gradient(
    linear,
    0% 20%,
    51% 38%,
    from(#94d0ff),
    to(#0098ff)
  );
  color: white;
  text-shadow: 2px 2px 2px #000000;
}
.step2 {
  background: -webkit-gradient(
    linear,
    0% 20%,
    51% 38%,
    from(#94d0ff),
    to(#0098ff)
  );
  grid-column: 3 / 7;
  color: white;
  text-shadow: 2px 2px 2px #000000;
}
.step3 {
  grid-column: 7/ 13;
  background: -webkit-gradient(
    linear,
    0% 20%,
    51% 38%,
    from(#94d0ff),
    to(#0098ff)
  );
  color: white;
  text-shadow: 2px 2px 2px #000000;
}
.step4 {
  grid-column: 13 / 23;
  background: -webkit-gradient(
    linear,
    0% 20%,
    51% 38%,
    from(#94d0ff),
    to(#0098ff)
  );
  color: white;
  text-shadow: 2px 2px 2px #000000;
}
.step5 {
  grid-column: 23 / 25;
  background: -webkit-gradient(
    linear,
    0% 20%,
    51% 38%,
    from(#94d0ff),
    to(#0098ff)
  );
  color: white;
  text-shadow: 2px 2px 2px #000000;
}
.leftLine {
  border-left: 1px solid rgba(133, 135, 136, 0.8);
}
.plan-print {
  grid-column: 1 / 25;
  display: flex;
  align-items: flex-end;
}
.planBar-print {
  display: flex;
  justify-content: center;
  align-items: center;

  /* width: 70%; */
  height: 25px;
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  background: linear-gradient(
    50deg,
    rgba(129, 250, 99, 1) 0.14%,
    rgba(8, 89, 31, 0.96) 99.61%
  );
  font-size: 1.2em;
  color: white;
  text-shadow: 2px 2px 2px #000000;
}
.Actual-print {
  grid-column: 1 / 25;
  display: flex;
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
  /* justify-content: space-around; */
  align-items: center;
  /* align-content: center; */
}
.Actual-print .memo {
  font-size: 1.2em;
}
.ActualBar-print {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 50%; */
  height: 25px;
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  background: linear-gradient(
    50deg,
    rgba(204, 110, 0, 1) 0.85%,
    rgba(255, 0, 0, 0.96) 99.89%
  );
  font-size: 1.2em;
  color: white;
  text-shadow: 2px 2px 2px #000000;
}

.situation {
  grid-column-start: 1;
  grid-column-end: 25;
  font-size: 1.2em;
}

.pitem1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  height: 100%;
  line-height: 1.6em;
}
.pitem2 {
  flex: auto;
}
</style>
