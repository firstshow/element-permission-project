<template>
  <div class="x-main-body">
    <div class="x-body-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{name:'user-list'}">用户管理 </el-breadcrumb-item>
        <el-breadcrumb-item>用户编辑</el-breadcrumb-item>
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
              <el-button type="primary" @click="onSubmit()">立即创建</el-button>
              <el-button @click="goBack()">返回</el-button>
            </el-form-item>
          </el-form>

          <el-tree
            ref="auth_tree"
            :data="data4"
            :props="defaultProps"
            show-checkbox
            node-key="role_id"
            default-expand-all
            :default-checked-keys="selectedList"
            :expand-on-click-node="false">
          </el-tree>


        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import publicMixin from 'src/mixins/publicMixin'
  let id = 1000;
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
        selectedList:[1,5],
        data4: [{
          role_id: 1,
          role_name: '一级 1',
          children: [{
            role_id: 4,
            role_name: '二级 1-1',
            children: [{
              role_id: 9,
              role_name: '三级 1-1-1'
            }, {
              role_id: 10,
              role_name: '三级 1-1-2'
            }]
          }]
        }, {
          role_id: 2,
          role_name: '一级 2',
          children: [{
            role_id: 5,
            role_name: '二级 2-1'
          }, {
            role_id: 6,
            role_name: '二级 2-2'
          }]
        }, {
          role_id: 3,
          role_name: '一级 3',
          children: [{
            role_id: 7,
            role_name: '二级 3-1'
          }, {
            role_id: 8,
            role_name: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'role_name'
        }
      }
    },
    methods: {
      onSubmit(){
        console.log(this.$refs.auth_tree.getCheckedNodes())
      }
//      append(data) {
//        const newChild = { id: id++, label: 'testtest', children: [] };
//        if (!data.children) {
//          this.$set(data, 'children', []);
//        }
//        data.children.push(newChild);
//      },
//
//      remove(node, data) {
//        const parent = node.parent;
//        const children = parent.data.children || parent.data;
//        const index = children.findIndex(d => d.id === data.id);
//        children.splice(index, 1);
//      },
//
//      renderContent(h, { node, data, store }) {
//        return (
//          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
//          <span>
//          <span>{node.label}</span>
//        </span>
//        <span>
//        <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>Append</el-button>
//        <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
//        </span>
//        </span>);
//      }
    }
  }
</script>

<style lang="scss">
  @import "user-edit.scss";
</style>
