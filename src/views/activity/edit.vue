<template>
  <div>
    <div class="head-section">
      <span class="title">活动管理</span>
      <el-button
        class="add-btn"
        type="primary"
        icon="el-icon-circle-plus"
        size="small"
        @click="addActivityModalVisible = true"
      >添加活动</el-button>
    </div>
    <el-table :data="activityList" style="width: 100%">
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column prop="name" label="活动名称"></el-table-column>
      <el-table-column prop="customer" label="客户"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加活动" :visible.sync="addActivityModalVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="form.customer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addActivityModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveActivity">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑活动" :visible.sync="editActivityModalVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="form.customer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editActivityModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="editActivity">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  findAllActivityApi,
  saveActivityApi,
  deleteActivityApi,
  updateActivityApi
} from "@/api/activity-edit";
export default {
  data() {
    return {
      form: {},
      addActivityModalVisible: false,
      editActivityModalVisible: false,
      activityList: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.form = {};
      findAllActivityApi().then(res => {
        this.activityList = res.data.map(item => {
          item.createdAt = moment(new Date(item.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          return item;
        });
      });
    },
    handleEdit(index, row) {
      this.editAcitivityId = row.id;
      this.editActivityModalVisible = true;
      this.form = row;
    },
    handleDelete(index, row) {
      this.$confirm("确定删除此活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteActivityApi(row.id).then(res => {
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
    saveActivity() {
      if (!this.form.name) {
        return this.$message({
          message: "请输入活动名称!",
          type: "error"
        });
      }
      if (!this.form.customer) {
        return this.$message({
          message: "请输入客户名称!",
          type: "error"
        });
      }
      saveActivityApi(this.form).then(res => {
        console.log(res);
        if (res.data) {
          this.$message({
            message: "添加成功!",
            type: "success"
          });
          this.addActivityModalVisible = false;
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
    editActivity() {
      if (!this.form.name) {
        return this.$message({
          message: "请输入活动名称!",
          type: "error"
        });
      }
      if (!this.form.customer) {
        return this.$message({
          message: "请输入客户名称!",
          type: "error"
        });
      }
      const { name, customer, remark } = this.form;
      updateActivityApi(this.editAcitivityId, { name, customer, remark }).then(
        res => {
          console.log(res);
          if (res.data) {
            this.$message({
              message: "修改成功!",
              type: "success"
            });
            this.editActivityModalVisible = false;
            this.initData();
            return;
          } else {
            return this.$message({
              message: "系统繁忙，稍后再试!",
              type: "warning"
            });
          }
        }
      );
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