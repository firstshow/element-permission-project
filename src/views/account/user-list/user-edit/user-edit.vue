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
          <el-form label-position="right" label-width="100px" :model="formLabelAlign">
            <el-form-item label="用户名称：">
              <el-input v-model="formLabelAlign.name" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="formLabelAlign.region" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input v-model="formLabelAlign.region" type="password" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input v-model="formLabelAlign.type" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input v-model="formLabelAlign.type" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item label="权限配置：">
              <el-tree
                ref="auth_tree"
                :data="data4"
                :props="defaultProps"
                show-checkbox
                node-key="menu_id"
                default-expand-all
                :default-checked-keys="selectedList"
                :expand-on-click-node="false"
                :render-content="renderContent">
              </el-tree>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">立即创建</el-button>
              <el-button @click="goBack()">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <!-- 新增节点弹出框 -->
    <el-dialog title="新增菜单节点" width="500px" :visible.sync="addDialogShow">
      <el-form :model="form">
        <el-form-item label="菜单节点名称" label-width="120px">
          <el-input v-model="form.menu_name" placeholder="请输入菜单节点名称" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddMenu()">确 定</el-button>
      </div>
    </el-dialog>
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
        selectedList:[1,5],
        addDialogShow:false,
        addData:null,
        form: {
          menu_name: '',
        },
        data4: [{
          menu_id: 1,
          menu_name: '一级 1',
          children: [{
            menu_id: 4,
            menu_name: '二级 1-1',
            children: [{
              menu_id: 9,
              menu_name: '三级 1-1-1'
            }, {
              menu_id: 10,
              menu_name: '三级 1-1-2'
            }]
          }]
        }, {
          menu_id: 2,
          menu_name: '一级 2',
          children: [{
            menu_id: 5,
            menu_name: '二级 2-1'
          }, {
            menu_id: 6,
            menu_name: '二级 2-2'
          }]
        }, {
          menu_id: 3,
          menu_name: '一级 3',
          children: [{
            menu_id: 7,
            menu_name: '二级 3-1'
          }, {
            menu_id: 8,
            menu_name: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'menu_name'
        }
      }
    },
    methods: {
      onSubmit(){
        // 获取选中节点的数据， 函数中可以加入参数，true表示返回选中的叶子节点；默认false，选中的所有节点都返回
        console.log(this.$refs.auth_tree.getCheckedNodes());

      },
      /**
       * 新增一个菜单节点
       * */
      append(id) {
        const newChild = { menu_id: id, menu_name: this.form.menu_name, children:[]};
        if (!this.addData.children) {
          this.$set(this.addData, 'children', []);
        }
        this.addData.children.push(newChild);
        this.addDialogShow = false;
      },
      /**
       * 移除一个节点
       * */
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      /**
       * 当新增节点的时候，打开新增节点弹框
       * */
      openAddDialog(data){
        this.addDialogShow = true;
        this.addData = data;
        console.log(data);
      },
      /**
       * 新增节点弹框，点击确认调接口新增菜单，获取菜单id;
       * 获取到后 调用append方法 将新菜单加入
       * */
      confirmAddMenu(){
        this.append(12314);
      },
      /**
       * 渲染新增删除
       * */
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
        </span>
        <span>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.openAddDialog(data) } >{node.level > 2 ? '' : '新增'}</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
        </span>
        </span>);
      }
    }
  }
</script>

<style lang="scss">
  @import "user-edit.scss";
</style>
