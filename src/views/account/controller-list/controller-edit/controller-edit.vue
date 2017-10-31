<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{name:'controller-list'}">管理员管理 </el-breadcrumb-item>
        <el-breadcrumb-item>管理员编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-body-content">
      <el-row>
        <el-col :span="12">
          <el-form label-position="right" label-width="80px" :model="formLabelAlign">
            <el-form-item label="用户名称">
              <el-input v-model="formLabelAlign.name" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formLabelAlign.region" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="formLabelAlign.region" type="password" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="formLabelAlign.type" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="formLabelAlign.type" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button @click="goBack()">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import publicMixin from 'src/mixins/publicMixin'
  export default {
    name: 'home',
    mixins: [publicMixin],
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      }
    },
    methods: {
      onSubmit() {
        alert("aaa");
      },
    },
  }
</script>

<style lang="scss">
  @import "controller-edit.scss";
</style>
