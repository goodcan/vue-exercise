<template>
  <el-row>
    <h3 class="my-title-h3">当前已有外包人员</h3>
    <el-row class="my-center-row">
      <el-form inline v-model="searchForm">
        <el-form-item label="昵称" prop="keyName">
          <el-input
            v-model="searchForm.keyName"
            @change="init"
            clearable
            prefix-icon="el-icon-search"
            type="text"
            placeholder="请输入关键字"/>
        </el-form-item>
        <el-form-item label="技能" prop="workClass">
          <el-select
            v-model="searchForm.workClass"
            @change="init"
            placeholder="请选择类型"
            style="width: 100px">
            <el-option key="" label="不区分" value=""/>
            <el-option
              v-for="item in workClasses"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchContacts"><i class="el-icon-refresh">刷新</i></el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      v-loading="loading"
      :data="contacts"
      :stripe="true"
      size="small"
      width="100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" class="table-expand">
            <el-col :span="12">
              <el-form-item label="昵称：">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="真实姓名：">
                <span>{{ props.row.realName? props.row.realName: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="创建人：">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="付款信息：">
                <p class="custom-p">{{ props.row.payInfo }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="技能：">
                <span>{{ props.row.workClass }}</span>
              </el-form-item>
              <el-form-item label="手机号码：">
                <span>{{ props.row.tel? props.row.tel: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="QQ：">
                <span>{{ props.row.qq? props.row.qq: '未设置' }}</span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <span>{{ props.row.email? props.row.email: '未设置' }}</span>
              </el-form-item>
            </el-col>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="昵称"
        prop="name">
      </el-table-column>
      <el-table-column
        align="center"
        label="真实姓名">
        <template slot-scope="scope">
          {{scope.row.realName? scope.row.realName: '未设置'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="技能"
        prop="workClass">
      </el-table-column>
      <el-table-column
        align="center"
        label="创建人"
        prop="createUser">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="confirmEdit(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delOrderOption(scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-style">
      <el-pagination
        @current-change="init()"
        layout="prev, pager, next, total"
        :current-page.sync="page"
        :page-size="pageSize"
        :total="totalCount">
      </el-pagination>
    </div>

    <h3 class="my-title-h3">添加新的外包人员</h3>
    <el-form
      :model="contactForm"
      ref="contactForm"
      :status-icon="true"
      label-width="100px">
      <div v-for="(contact, index) in contactForm.contacts">
        <el-form-item
          :label="'昵称' + index"
          :prop="'contacts.' + index + '.name'"
          :rules="{required: true, message: '昵称不能为空', trigger: 'blur'}">
          <el-input
            type="text"
            placeholder="请填写昵称"
            v-model="contact.name"/>
        </el-form-item>
        <el-form-item
          :label="'真实姓名'"
          :prop="'contacts.' + index + '.realName'"
          :rules="{required: true, message: '真实姓名不能为空', trigger: 'blur'}">
          <el-input
            type="text"
            placeholder="请填写真实姓名"
            v-model="contact.realName"/>
        </el-form-item>
        <el-form-item
          :label="'付款信息'"
          :prop="'contacts.' + index + '.payInfo'"
          :rules="{required: true, message: '付款信息不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请填写付款信息"
            v-model="contact.payInfo"/>
        </el-form-item>
        <el-form-item
          label="技能"
          :prop="'contacts.' + index + '.workClass'"
          :rules="{required: true, message: '技能不能为空', trigger: 'blur'}">
          <el-select
            v-model="contact.workClass"
            placeholder="请选择订单客户"
            style="width: 100%;">
            <el-option
              v-for="item in workClasses"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="'电话'"
          :prop="'contacts.' + index + '.tel'">
          <el-input
            type="text"
            placeholder="请填写电话号码"
            v-model="contact.tel"/>
        </el-form-item>
        <el-form-item
          :label="'邮箱'"
          :prop="'contacts.' + index + '.email'">
          <el-input
            type="text"
            placeholder="请填写邮箱地址"
            v-model="contact.email"/>
        </el-form-item>
        <el-form-item
          :label="'QQ'"
          :prop="'contacts.' + index + '.qq'">
          <el-input
            type="text"
            placeholder="请填写QQ号码"
            v-model="contact.qq"/>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="removeContact(contact)" v-if="index > 0">
            <i class="el-icon-delete"></i>
          </el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="addOrderOption('contactForm')">添加</el-button>
        <el-button @click="addContact">新增外包人员</el-button>
        <el-button @click="resetForm('contactForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :append-to-body="true"
      :title="editTitle"
      :visible.sync="editShow"
      width="60%">
      <el-form
        :model="editContact"
        ref="editContact"
        :status-icon="true"
        label-width="100px">
        <el-form-item
          label="昵称"
          prop="name"
          :rules="{required: true, message: '昵称不能为空', trigger: 'blur'}">
          <el-input type="text" v-model="editContact.name"/>
        </el-form-item>
        <el-form-item
          label="真实姓名"
          prop="realName"
          :rules="{required: true, message: '真实姓名不能为空', trigger: 'blur'}">
          <el-input type="text" v-model="editContact.realName"/>
        </el-form-item>
        <el-form-item
          label="付款信息"
          prop="payInfo"
          :rules="{required: true, message: '付款信息不能为空', trigger: 'blur'}">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请填写付款信息"
            v-model="editContact.payInfo"/>
        </el-form-item>
        <el-form-item
          label="技能"
          prop="workClass"
          :rules="{required: true, message: '技能不能为空', trigger: 'blur'}">
          <el-select
            v-model="editContact.workClass"
            placeholder="请选择订单客户"
            style="width: 100%;">
            <el-option
              v-for="item in workClasses"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="tel">
          <el-input
            type="text"
            placeholder="请填写电话号码"
            v-model="editContact.tel"/>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input
            type="text"
            placeholder="请填写邮箱地址"
            v-model="editContact.email"/>
        </el-form-item>
        <el-form-item
          label="QQ"
          prop="qq">
          <el-input
            type="text"
            placeholder="请填写QQ号码"
            v-model="editContact.qq"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeConfirmOrder('editContact')">取 消</el-button>
        <el-button type="primary" @click="editOrderOption('editContact')">提交</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>

  import axios from '../../axios'

  export default {
    data() {
      return {
        searchForm: {
          keyName: '',
          workClass: ''
        },
        loading: true,
        page: 1,
        pageSize: 0,
        totalCount: 0,
        editTitle: '修改外包人员信息',
        editShow: false,
        editContact: {},
        contactForm: {
          contacts: [{
            name: '',
            realName: '',
            tel: '',
            email: '',
            qq: '',
            payInfo: '',
            workClass: '',
            time: Date.now()
          }],
        },
        contacts: [],
        workClasses: '',
        optionType: 'contacts'
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.loading = true;
        axios.post('/api/orderOptionInitData', {
          optionType: this.optionType,
          page: this.page,
          keyName: this.searchForm.keyName,
          workClass: this.searchForm.workClass
        }).then(response => {
          let res = response.data;
          if (res.code === 1) {
            this.contacts = res.result.contacts;
            this.workClasses = res.result.workClasses;
            this.totalCount = res.result.totalCount;
            this.pageSize = res.result.pageSize;
            this.loading  = false
          }
        })
      },
      delOrderOption(option) {
        this.$confirm('此操作将永久删除' + option.name + '对接人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post('/api/delOrderOption', {
            opsUserId: this.$store.state.userObj.userId,
            optionType: this.optionType,
            name: option.name
          }).then(response => {
            let res = response.data;
            if (res.code === 1) {
              this.$message({
                showClose: true,
                message: '删除成功!',
                type: 'success'
              });
              this.clearSearch();
              this.init();
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      addOrderOption(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/addOrderContact', {
              opsUserId: this.$store.state.userObj.userId,
              contacts: this.contactForm.contacts,
              createUser: this.$store.state.userObj.username
            }).then((response) => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.contactForm.contacts = [{name: '', tel: '', email: '', qq: '', time: Date.now()}];
                this.$notify({
                  title: '添加成功',
                  message: '新的外包人员添加成功',
                  type: 'success'
                });
                this.clearSearch();
                this.init();
              } else {
                this.$notify.error({
                  title: '添加失败',
                  message: res.msg
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        // this.contactForm.contacts = [{name: '', time: Date.now()}]
      },
      removeContact(item) {
        console.log(item);
        let index = this.contactForm.contacts.indexOf(item);
        console.log(index);
        if (index !== -1) {
          this.contactForm.contacts.splice(index, 1)
        }
      },
      addContact() {
        this.contactForm.contacts.push({
          value: '',
          tel: '',
          email: '',
          qq: '',
          time: Date.now()
        });
      },
      confirmEdit(option) {
        this.editContact = option;
        this.editContact.oldName = option.name;
        this.editShow = true
      },
      closeConfirmOrder(formName) {
        this.$refs[formName].resetFields();
        this.editContact = {};
        this.editShow = false;
      },
      editOrderOption(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            axios.post('/api/editOrderOption', {
              opsUserId: this.$store.state.userObj.userId,
              option: this.editContact,
              createUser: this.$store.state.userObj.username,
              optionType: 'contacts'
            }).then(response => {
              let res = response.data;
              if (res.code === 1) {
                this.$refs[formName].resetFields();
                this.$notify({
                  title: '修改成功',
                  message: '外包人员信息修改成功',
                  type: 'success'
                });
                this.editContact = {};
                this.editShow = false;
                this.init();
              } else {
                this.$notify.error({
                  title: '修改失败',
                  message: res.msg
                });
                this.$refs[formName].resetFields();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      searchContacts() {
        this.page = 1;
        this.init()
      },
      clearSearch() {
        this.page = 1;
        this.searchForm.keyName = '';
        this.searchForm.workClass = '';
      }
    }
  }
</script>
