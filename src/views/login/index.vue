<template>
  <div class="login-container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
      <div class="title">wesion console</div>
      <el-form-item prop="username">
        <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          type="password"
          v-model.number="ruleForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button @click="resetForm('ruleForm')" size="small" icon="el-icon-error">重置</el-button>
        <el-button
          icon="el-icon-success"
          type="primary"
          @click="submitForm('ruleForm')"
          size="small"
          plain
        >登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      return !value ? callback(new Error("请输入账号")) : callback();
    };
    var validatePass = (rule, value, callback) => {
      return !value ? callback(new Error("请输入密码")) : callback();
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this);
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.$store.dispatch("login", this.ruleForm).then(result => {
          console.log(result);
          const { data } = result;
          if (!data) {
            return this.$message({
              message: "账号密码不正确!",
              type: "error"
            });
          }
          this.$router.push({ path: "/" });
          this.$message({
            message: "登陆成功",
            type: "success"
          });
        });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 80%;
  max-width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .title {
    font-size: 20px;
    color: #333;
    text-align: center;
    margin-bottom: 40px;
  }
  .btn-wrap {
    text-align: center;
  }
}
</style>