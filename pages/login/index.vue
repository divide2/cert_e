<template>
  <view>
    <cu-custom bg-color="bg-blue">
      <block slot="content">登录</block>
    </cu-custom>
    <v-form :model="info" ref="form">
      <v-form-item class="cu-form-group" prop="username">
        <view class="title">账号</view>
        <input placeholder="请输入机构名称" v-model="info.username"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="password">
        <view class="title">密码</view>
        <input type="password" placeholder="请输入密码" v-model="info.password"/>
      </v-form-item>
    </v-form>
    <view class="flex justify-between  padding-sm">
      <view class="text-blue" @tap="findPwd">忘记密码</view>
      <view class="text-blue" @tap="register">去注册</view>
    </view>
    <button class="cu-btn block bg-blue margin-top lg" @tap="login">登录</button>
  </view>

</template>

<script>
  import api from '@/api/api'
  import VForm from "../../components/form/VForm";
  import VFormItem from "../../components/form/VFormItem";
  import utils from "../../components/form/utils";

  export default {
    name: "login",
    components: {VFormItem, VForm},
    data() {
      return {
        info: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '用户名不能为空'},
            {min: 4, max: 20, message: '用户名在4到20个字之间'}],
          password: [
            {required: true, message: '密码不能为空'},
            {min: 6, max: 20, message: '密码在6到20个字之间'}],
        }
      }
    },
    mounted() {
      this.$refs.form.setRules(this.rules)
      if (uni.getStorageSync('userInfo')) {
        uni.redirectTo({
          url: '/pages/index/index'
        })
      }
    },
    methods: {
      login() {
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            api.post('/v1/login/org', this.info).then(res => {
              uni.setStorageSync('accessToken', res.accessToken)
              api.get('/v1/user').then(data => {
                uni.setStorageSync('userInfo', data)
                //登录成功后跳转
                uni.showToast({
                  title: '登录成功',
                })
                uni.redirectTo({url: '/pages/index/index?curPage=mine'})
              })
            }).catch(e => {
              uni.showToast({
                icon: 'none',
                title: '用户名或密码错误',
              })
            })
          }
        })

      },
      register() {
        uni.navigateTo({url: '/pages/login/register'})
      },
      findPwd() {
        uni.navigateTo({url: '/pages/login/findPwd'})
      }
    }
  }
</script>

<style scoped>

</style>