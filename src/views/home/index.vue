<template>
  <div>
    <div class="filter-box">活动每天总报名人数:</div>
    <ve-line :data="chartData"></ve-line>
    <el-row>
      <el-col :sm="12" :xs="24">
        <div class="filter-box">
          报名详情：
          <el-select
            v-model="activityName"
            placeholder="请选择"
            size="small"
            @change="findEnorllList()"
          >
            <el-option
              v-for="item in activityList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <ve-histogram :data="chartData1"></ve-histogram>
      </el-col>
      <el-col :sm="12" :xs="24">
        <div class="filter-box">活动报名总人数:</div>
        <ve-pie :data="chartData2"></ve-pie>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from "moment";
import { findEnorllAllApi } from "@/api/activity.js";
import { findAllActivityApi } from "@/api/activity-edit.js";

export default {
  data() {
    return {
      activityList: [],
      activityName: "",
      chartData: {
        columns: ["日期", "报名人数"],
        rows: []
      },
      chartData1: {
        columns: ["日期", "报名人数"],
        rows: []
      },
      chartData2: {
        columns: ["活动", "报名人数"],
        rows: []
      }
    };
  },
  mounted() {
    findAllActivityApi().then(res => {
      const activityList = res.data;
      this.activityList = activityList;
      this.activityName = activityList[0].name;
      this.findEnorllList();
      let activityListReq = [];
      activityList.forEach(item => {
        activityListReq.push(findEnorllAllApi(item.name));
      });

      Promise.all(activityListReq).then(allActivityData => {
        console.log(allActivityData);
        const rows2 = [];
        activityList.forEach((item, index) => {
          rows2.push({
            活动: item.name,
            报名人数: allActivityData[index].data.length
          });
          this.chartData2.rows = rows2;
        });

        const numbers = {};
        allActivityData.forEach(item => {
          item.data.forEach(i => {
            let date = moment(new Date(i.create_time)).format("MM/DD");
            if (numbers[date]) {
              numbers[date] = numbers[date] + 1;
            } else {
              numbers[date] = 1;
            }
          });
        });
        let rows = [];
        Object.keys(numbers).forEach(d => {
          rows.push({
            日期: d,
            报名人数: numbers[d]
          });
        });
        this.chartData.rows = rows;
      });
    });
  },
  methods: {
    findEnorllList() {
      findEnorllAllApi(this.activityName).then(res => {
        console.log(res);
        let numbers = {};
        res.data.forEach(item => {
          let date = moment(new Date(item.create_time)).format("MM/DD");
          if (numbers[date]) {
            numbers[date] = numbers[date] + 1;
          } else {
            numbers[date] = 1;
          }
        });
        let rows = [];
        Object.keys(numbers).forEach(d => {
          rows.push({
            日期: d,
            报名人数: numbers[d]
          });
        });
        this.chartData1.rows = rows;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.head-section {
  position: relative;
  margin-bottom: 20px;
  .title {
    font-size: 14px;
    color: #333;
    margin-right: 10px;
    font-weight: 500;
  }
  .add-btn {
    float: right;
  }
}

.filter-box {
  margin: 10px 0 10px;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
}
</style>