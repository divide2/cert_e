<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">注册</block>
    </cu-custom>
    <v-form :model="info" ref="form">
      <view class="cu-form-group">
        <view class="title">机构名称</view>
        <input placeholder="请输入机构名称" v-model="info.username" name="username"/>
      </view>
      <view class="cu-form-group">
        <view class="title">密码</view>
        <input type="password" placeholder="请输入至少6位的密码" v-model="info.password"/>
      </view>
      <view class="cu-form-group">
        <view class="title">联系人</view>
        <input placeholder="请输入联系人姓名" v-model="info.contactUser"/>
      </view>
      <view class="cu-form-group">
        <view class="title">手机号</view>
        <input type="number" placeholder="请输入手机号" v-model="info.contactWay"/>
      </view>
      <view class="cu-form-group">
        <view class="title">验证码</view>
        <input type="number" v-model="info.verifyCode" placeholder="验证码"/>
        <button class="cu-btn block bg-green shadow" :disabled="codeDisabled" @tap="retrieveVerifyCode" type="">
          {{codeText}}
        </button>
      </view>
      <view class="cu-form-group">
        <view class="title">邮箱</view>
        <input placeholder="邮箱" v-model="info.email"/>
      </view>
      <view class="cu-form-group">
        <view class="title">公司地址</view>
        <input placeholder="请输入公司办公地址" v-model="info.address"/>
      </view>
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
          <view class="bg-img" v-for="(item,index) in imgList" :key="item" @tap="viewImage(item)">
            <image :src='item' mode='aspectFill'></image>
            <view class="cu-tag bg-red" @tap.stop="delImg(index)">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @tap="chooseImage" v-if="imgList.length<1">
            <text class="cuIcon-cameraadd"></text>
          </view>
        </view>
      </view>
      <button class="cu-btn block bg-blue margin-top lg" @tap="register">注册</button>
    </v-form>
  </view>

</template>

<script>
  import api from '../../api/api'
  import VFormItem from "../../components/form/VFormItem";
  import VForm from "../../components/form/VForm";
  import utils from "../../components/form/utils";

  let timer
  const app = getApp()
  export default {
    name: "register",
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
        codeDisabled: false,
        codeText: '获取验证码',
        imgList: [],
        rules: {
          username: [
            {required: true, message: '请输入机构名称'},
            {min: 4, max: 20, message: '机构名称长度在4到20之间'}],
          password: [
            {required: true, message: '请填写密码'},
            {min: 6, max: 20, message: '密码长度在6到20之间'}],
          verifyCode:[
            {required: true, message: '请填写验证码'},
            {len: 6, message: '请填写6位数验证码'}
          ],
          contactUser: [
            {required: true, message: '请填写联系人'},
            {min: 1, max: 10, message: '联系人长度在1到5之间'}],
          contactWay: [
            {required: true, message: '请填写手机号'},
            {
              validator: (rule, value, callback) => {
                console.log(value)
                if (/^1\d{10}$/.test(value)) {
                  callback()
                } else {
                  callback(new Error('请填写正确的手机'))
                }
              }
            }
          ],
          email: [
            {required: true, message: '请填写邮箱'},
            {type: 'email', message: '请填写正确的邮箱'}],
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
      chooseImage() {
        const that = this
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: `${app.globalData.baseUrl}/v1/upload/image`,
              filePath: res.tempFilePaths[0],
              name: 'file',
              success(res) {
                that.imgList = [res.data]
              }
            })
          }
        });
      },
      viewImage(url) {
        uni.previewImage({
          urls: this.imgList,
          current: url
        });
      },
      delImg(index) {
        uni.showModal({
          title: '删除',
          content: '确认删除么？',
          success: res => {
            if (res.confirm) {
              this.imgList.splice(index, 1);
            }
          }
        })
      },
      register() {
        this.info.license = this.imgList[0]
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            api.post('/v1/reg', this.info).then(res => {
              uni.redirectTo({url: '/pages/login/index'})
            }).catch(e => {
              if (e.statusCode === 409) {
                uni.showToast({
                  icon: "none",
                  title: '验证码错误'
                });
              }
            })
          }
        })
      },
      retrieveVerifyCode() {
        if (!/^1\d{10}$/.test(this.info.contactWay)) {
          uni.showToast({
            title: '请输入有效的手机号',
            icon: 'none'
          })
          return
        }
        this.codeDisabled = true
        this.codeText = 60
        timer = setInterval(() => {
          this.codeText--
          if (this.codeText === 0) {
            this.codeDisabled = false
            this.codeText = '获取验证码'
            clearInterval(timer)
          }
        }, 1000);
        api.post('/v1/outside/verify/code', {phoneNumber: this.info.contactWay}).then(data => {

        }).catch(er => {

        })
      }
    },
  }
</script>

<style scoped>

</style>