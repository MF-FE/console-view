<template>
  <div
    v-loading="showLoading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <el-row>
      <el-col :sm="12" :xs="24">
        <div class="filter-box">活动每天总报名人数:</div>
        <ve-line :data="chartData"></ve-line>
      </el-col>
      <el-col :sm="12" :xs="24">
        <div class="filter-box">
          报名详情：
          <el-select
            v-model="activityName"
            placeholder="请选择"
            size="small"
            @change="findEnrollList()"
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
    </el-row>
    <el-row>
      <el-col :sm="12" :xs="24">
        <div class="filter-box">所在省份</div>
        <div style="width:80%;margin:0 auto">
          <ve-map :data="chartData3"></ve-map>
        </div>
      </el-col>
      <el-col :sm="12" :xs="24">
        <div class="filter-box">活动报名总人数({{totalEnroll}}人):</div>
        <ve-pie :data="chartData2"></ve-pie>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from "moment";
import { findEnrollAllByNameApi, findEnrollAllApi } from "@/api/activity.js";
import { findAllActivityApi } from "@/api/activity-edit.js";

export default {
  data() {
    return {
      totalEnroll: 0,
      activityList: [],
      showLoading: true,
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
      },
      chartData3: {
        columns: ["位置", "报名人数"],
        rows: []
      }
    };
  },
  mounted() {
    findEnrollAllApi().then(res => {
      const allActivityData = res.data;

      // 报名总人数
      this.totalEnroll = allActivityData.length;

      let cityNumber = [];

      const dateNumber = [];
      // 每天所有报名
      allActivityData.forEach(item => {
        let date = moment(new Date(item.create_time)).format("MM/DD");
        if (dateNumber[date]) {
          dateNumber[date] = dateNumber[date] + 1;
        } else {
          dateNumber[date] = 1;
        }
        if (cityNumber[item.user_province]) {
          cityNumber[item.user_province] = cityNumber[item.user_province] + 1;
        } else {
          cityNumber[item.user_province] = 1;
        }
      });
      let rows = [];
      Object.keys(dateNumber).forEach(d => {
        rows.push({
          日期: d,
          报名人数: dateNumber[d]
        });
      });
      let rows3 = [];
      console.log(cityNumber);
      Object.keys(cityNumber).forEach(d => {
        rows3.push({
          位置: d.slice(0, d.length - 1),
          报名人数: cityNumber[d]
        });
      });

      // 线性图数据
      this.chartData.rows = rows;
      // 地图数据
      this.chartData3.rows = rows3;

      findAllActivityApi().then(res => {
        const activityList = res.data;
        this.activityList = activityList;
        this.activityName = activityList[0].name;
        this.findEnrollList();

        // 饼状图数据
        let rows2 = [];
        activityList.forEach(item => {
          rows2.push({
            活动: item.name,
            报名人数: allActivityData.filter(i => i.name == item.name).length
          });
        });
        this.chartData2.rows = rows2;
        this.showLoading = false;
      });
    });
  },
  methods: {
    findEnrollList() {
      // 柱状图
      findEnrollAllByNameApi(this.activityName).then(res => {
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