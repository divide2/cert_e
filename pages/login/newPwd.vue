<template>
  <view class="padding">
    <cu-custom is-back>
      <block slot="content">新密码</block>
    </cu-custom>
    <v-form :model="info" ref="form">
      <v-form-item class="cu-form-group" prop="phoneNumber">
        <view class="title">新密码</view>
        <input type="number" v-model="info.password" placeholder="新密码"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="verifyCode">
        <view class="title">确认密码</view>
        <input type="number" v-model="info.rePassword" placeholder="确认密码"/>
      </v-form-item>
      <button class="cu-btn block bg-blue margin-top lg" @tap="confirm">确认</button>
    </v-form>
  </view>

</template>

<script>
  import api from '@/api/api'
  import VFormItem from "../../components/form/VFormItem";
  import VForm from "../../components/form/VForm";
  import utils from "../../components/form/utils";

  let timer = 0
  export default {
    name: "newPwd",
    components: {VForm, VFormItem},
    data() {
      return {
        info: {
          password: '',
          rePassword: '',
        },
        codeDisabled: false,
        codeText: '获取验证码',
        rules: {
          password: [
            {required: true, message: '密码不能为空'},
            {min: 6, max: 20,message: '请输入6到20位数密码'}],
          rePassword: [
            {required: true, message: '确认密码不能为空'},
            {len: 6,message: '请输入6到20位数确认密码'}]
        }
      }
    },
    mounted() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      confirm() {
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            api.post('/v1/')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>