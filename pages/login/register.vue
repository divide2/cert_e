<template>
  <view class="padding">
    <cu-custom is-back>
      <block slot="content">注册</block>
    </cu-custom>
    <v-form :model="info" ref="form">
      <v-form-item class="cu-form-group">
        <view class="title">机构名称</view>
        <input placeholder="请输入机构名称" name="username"/>
      </v-form-item>
      <v-form-item class="cu-form-group">
        <view class="title">密码</view>
        <input type="password" placeholder="请输入至少6位的密码" name="password"/>
      </v-form-item>
      <v-form-item class="cu-form-group">
        <view class="title">联系人</view>
        <input placeholder="请输入联系人姓名" name="contactUser"/>
      </v-form-item>
      <v-form-item class="cu-form-group">
        <view class="title">手机号</view>
        <input type="number" placeholder="请输入手机号" name="contactWay"/>
      </v-form-item>
      <v-form-item class="cu-form-group">
        <view class="title">邮箱</view>
        <input placeholder="邮箱" name="email"/>
      </v-form-item>
      <v-form-item class="cu-form-group">
        <view class="title">公司地址</view>
        <input placeholder="请输入公司办公地址" name="address"/>
      </v-form-item>
      <view class="cu-bar bg-white margin-top">
        <view class="action">
          营业执照
        </view>
        <view class="action">
          只需一张即可
        </view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in imgList"  @tap="viewImage">
            <image :src='imgList[index]' mode='aspectFill'></image>
            <view class="cu-tag bg-red" @catchtap="delImg">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @tap="chooseImage" v-if="imgList.length<4">
            <text class="cuIcon-cameraadd"></text>
          </view>
        </view>
      </view>
      <button class="cu-btn block bg-blue margin-top lg" @tap="register">注册</button>
    </v-form>
  </view>

</template>

<script>
  import api from '@/api/api'
  import VFormItem from "../../components/form/VFormItem";
  import VForm from "../../components/form/VForm";
  import utils from "../../components/form/utils";
  export default {
    name: "login",
    components: {VForm, VFormItem},
    data() {
      return {
        info: {
          username: '',
          password: '',
          contactUser: '',
          contactWay: '',
          email: '',
          address: '',
          license: ''
        },
        imgList: [],
        rules: {
          username: [
            {required: true, message: '请填写账号'},
            {min: 4, max: 20, message: '账号长度在4到20之间'}],
          password: [
            {required: true, message: '请填写密码'},
            {min: 6, max: 20, message: '密码长度在6到20之间'}],
          contactUser: [
            {required: true, message: '请填写联系人'},
            {min: 1, max: 10, message: '联系人长度在1到5之间'}],
          contactWay: [
            {required: true, message: '请填写手机号'},
            {tel: true, message: '请填写正确的手机号'}],
          email: [
            {required: true, message: '请填写邮箱'},
            {email: true, message: '请填写正确的邮箱'}],
          address: [
            {required: true, message: '请填写地址'},
            {min: 2, max: 100, message: '地址长度在2到100'}],
          license: [
            {required: true, message: '请上传营业执照'},
            {url: true, message: '请上传营业执照'}]
        }
      }
    },
    mounted() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      viewImage() {

      },
      delImg() {

      },
      chooseImage() {

      },
      register() {
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            api.post('/v1/reg', data).then(res => {
              wx.navigateTo({url: '/pages/login/index'})
            }).catch(e => {
              wx.showToast({
                icon: "none",
                title: '请完善全部信息'
              })
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>