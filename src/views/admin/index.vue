<template>
  <div>
    <div class="head-section">
      <span class="title">账号管理</span>
      <el-button
        class="add-btn"
        type="primary"
        icon="el-icon-circle-plus"
        size="small"
        @click="addAdminModalVisible = true"
      >添加账号</el-button>
    </div>
    <el-table :data="adminsList" style="width: 100%">
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="roleStr" label="权限"></el-table-column>
      <el-table-column prop="activity" label="已关联活动"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加账号" :visible.sync="addAdminModalVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="昵称" label-width="40px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="40px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="40px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <br />
          <el-radio-group v-model="form.role">
            <el-radio label="USER">用户</el-radio>
            <el-radio label="ADMIN">管理员</el-radio>
            <!-- <el-radio label="SUPER_ADMIN" v-if="$store.getters.adminRole == 'SUPER_ADMIN'">超级管理员</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联活动">
          <br />
          <el-checkbox v-for="a in activityList" :key="a.id" v-model="a.checked">{{a.name}}</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdminModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdmin">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑账号" :visible.sync="editAdminModalVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="昵称" label-width="40px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="40px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="40px">
          <el-input v-model="form.password" autocomplete="off" placeholder="留空,为不修改密码"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <br />
          <el-radio-group v-model="form.role">
            <el-radio label="USER">用户</el-radio>
            <el-radio label="ADMIN">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联活动">
          <br />
          <el-checkbox v-for="a in activityList" :key="a.id" v-model="a.checked">{{a.name}}</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAdminModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { findAllActivityApi } from "@/api/activity-edit";
import {
  findAdminListApi,
  saveAdminApi,
  deleteAdminApi,
  updateAdminApi
} from "@/api/admin";
export default {
  data() {
    return {
      checked: true,
      form: {},
      addAdminModalVisible: false,
      editAdminModalVisible: false,
      adminsList: [],
      activityList: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.form = {};
      findAdminListApi().then(res => {
        this.adminsList = res.data.map(item => {
          item.createdAt = moment(new Date(item.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const roleMap = {
            ADMIN: "管理员",
            USER: "客户"
          };
          item.roleStr = roleMap[item.role];
          item.activity =
            (item.limits &&
              item.limits.activity &&
              item.limits.activity.join(" \n ")) ||
            [];
          return item;
        });
        findAllActivityApi().then(res => {
          this.activityList = res.data.map(item => {
            return {
              id: item.id,
              name: item.name,
              checked: false
            };
          });
        });
      });
    },
    handleEdit(index, row) {
      console.log(row);
      this.editAdminId = row.id;
      this.editAdminModalVisible = true;
      const selectActivityMap = {};
      if (row.limits && row.limits.activity) {
        row.limits.activity.forEach(item => {
          selectActivityMap[item] = true;
        });
      }
      this.activityList.forEach(item => {
        item.checked = selectActivityMap[item.name];
      });
      this.form.role = row.role;

      this.form = row;
    },
    handleDelete(index, row) {
      this.$confirm("确定删除此账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteAdminApi(row.id).then(res => {
          if (res.data) {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.initData();
          } else {
            this.$message({
              message: "系统繁忙，稍后再试!",
              type: "warning"
            });
          }
        });
      });
    },
    saveAdmin() {
      if (!this.form.username) {
        return this.$message({
          message: "请输入账号！",
          type: "error"
        });
      }
      if (!this.form.password) {
        return this.$message({
          message: "请输入密码!",
          type: "error"
        });
      }
      if (!this.form.role) {
        return this.$message({
          message: "请选择权限!",
          type: "error"
        });
      }
      const selectActivity = [];
      this.activityList.forEach(item => {
        if (item.checked) {
          selectActivity.push(item.name);
        }
      });
      this.form.limits = { activity: selectActivity };
      saveAdminApi(this.form, this.form).then(res => {
        console.log(res);
        if (res.data) {
          this.$message({
            message: "添加成功!",
            type: "success"
          });
          this.addAdminModalVisible = false;
          this.initData();
          return;
        } else {
          return this.$message({
            message: "系统繁忙，稍后再试!",
            type: "warning"
          });
        }
      });
    },
    editAdmin() {
      if (!this.form.username) {
        return this.$message({
          message: "请输入账号！",
          type: "error"
        });
      }
      if (!this.form.role) {
        return this.$message({
          message: "请选择权限!",
          type: "error"
        });
      }
      const selectActivity = [];
      this.activityList.forEach(item => {
        if (item.checked) {
          selectActivity.push(item.name);
        }
      });
      this.form.limits = { activity: selectActivity };
      updateAdminApi(this.editAdminId, this.form).then(res => {
        console.log(res);
        if (res.data) {
          this.$message({
            message: "修改成功!",
            type: "success"
          });
          this.editAdminModalVisible = false;
          this.initData();
          return;
        } else {
          return this.$message({
            message: "系统繁忙，稍后再试!",
            type: "warning"
          });
        }
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

.foot-section {
  text-align: right;
  margin-top: 40px;
}
</style>