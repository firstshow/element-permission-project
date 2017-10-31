<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{name:'mechanism-list'}">机构列表 </el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'mechanism-power-list'}">权限列表</el-breadcrumb-item>
        <el-breadcrumb-item>缴费类型配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-body-content">
      <el-row>
        <el-col :span="12">
          <el-form label-position="right" label-width="130px" :model="formLabelAlign">
            <el-form-item label="缴费类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构名称">
              <el-input v-model="formLabelAlign.region" placeholder="机构名称"></el-input>
            </el-form-item>
            <el-form-item label="机构编号">
              <el-input v-model="formLabelAlign.region" placeholder="机构编号"></el-input>
            </el-form-item>
            <el-form-item label="条形码的识别规则">
              <el-input v-model="formLabelAlign.type" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="条形码总长度">
              <el-input v-model="formLabelAlign.type" type="number" placeholder="条形码总长度"></el-input>
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
        },
        options: [{
          value: '1',
          label: '电费'
        }, {
          value: '2',
          label: '水费'
        }, {
          value: '3',
          label: '燃气费'
        }],
        value: '1'
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
  @import "mechanism-power-edit.scss";
</style>
