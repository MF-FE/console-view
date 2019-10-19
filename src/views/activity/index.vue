<template>
  <div>
    <div class="head-section">
      <span class="title">选择活动</span>
      <el-select v-model="activityName" placeholder="请选择" size="small" @change="initEnrollData()">
        <el-option
          v-for="item in activityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        class="down-excel-btn"
        type="primary"
        icon="el-icon-download"
        size="small"
        @click="downExcel()"
        v-if="activityName"
      >下载 Excel</el-button>
    </div>
    <el-table :data="enrollData.lists" style="width: 100%">
      <el-table-column prop="activityName" label="活动名"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city" label="城市" ></el-table-column>
      <el-table-column prop="dealer" label="经销商" ></el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column prop="createdAt" label="提交时间" width="200"></el-table-column>
    </el-table>
    <div class="foot-section">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-count="enrollData.totalPage"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { findEnrollListApi, downEnrollExcelApi } from "@/api/activity";
import { findAllActivityApi } from "@/api/activity-edit";
import moment from "moment";

export default {
  data() {
    return {
      activityName: "",
      currentPage: 1,
      enrollData: {},
      activityList: [],
      value: ""
    };
  },
  mounted() {
    const adminRole = this.$store.getters.adminRole;
    const adminLimits = this.$store.getters.adminLimits;
    if (
      (adminRole === "USER" || adminRole === "ADMIN") &&
      adminLimits &&
      adminLimits.activity &&
      adminLimits.activity.length
    ) {
      this.activityList = adminLimits.activity.map((item, index) => {
        if (index === 0) {
          this.activityName = item;
        }
        return {
          value: item,
          label: item
        };
      });
      this.initEnrollData();
    } else if (adminRole === "SUPER_ADMIN") {
      findAllActivityApi().then(res => {
        this.activityList = res.data.map((item, index) => {
          if (index === 0) {
            this.activityName = item.name;
          }
          return {
            value: item.name,
            label: item.name
          };
        });
        this.initEnrollData();
      });
    }
  },
  methods: {
    initEnrollData() {
      this.currentPage = 1;
      this.findEnrollData();
    },
    changePage(pageNo) {
      this.currentPage = pageNo;
      this.findEnrollData();
    },
    findEnrollData() {
      findEnrollListApi(this.activityName, this.currentPage).then(res => {
        const enrollData = res.data;
        enrollData.lists.forEach(item => {
          item.createdAt = moment(new Date(item.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        this.enrollData = enrollData;
      });
    },
    downExcel() {
      downEnrollExcelApi(this.activityName).then(res => {
        window.open(res.data);
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
  .down-excel-btn {
    float: right;
  }
}

.foot-section {
  text-align: right;
  margin-top: 40px;
}
</style>