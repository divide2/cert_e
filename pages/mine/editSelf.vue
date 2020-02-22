<template>
  <view class="padding">
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">修改信息</block>
    </cu-custom>
    <v-form :model="userInfo" ref="form">
      <v-form-item class="cu-form-group margin-top" prop="avatar" @tap="chooseImage">
        <view class="title">头像</view>
        <view class="cu-avatar radius bg-gray">
          <image class="cu-avatar radius" :src="userInfo.avatar"></image>
        </view>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="email">
        <view class="title">邮箱</view>
        <input name="nickname" v-model="userInfo.email"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="contanctUse">
        <view class="title">联系人</view>
        <input name="nickname" v-model="userInfo.contanctUse"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="contanctWay">
        <view class="title">手机号</view>
        <input name="nickname" v-model="userInfo.contanctWay"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="address">
        <view class="title">地址</view>
        <input name="nickname" v-model="userInfo.address"/>
      </v-form-item>
      <v-form-item class="cu-form-group" prop="license">
        <view class="title">营业执照</view>
        <input name="nickname" v-model="userInfo.license"/>
      </v-form-item>
    </v-form>
    <button class="cu-btn block bg-blue margin-top lg" @tap="edit">保存</button>
  </view>

</template>

<script>
  import api from '@/api/api'
  const app = getApp()
  export default {
    data() {
      return {
        userInfo: uni.getStorageSync('userInfo'),
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
    methods: {
      chooseImage() {
        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: `${app.globalData.baseUrl}/v1/upload/image`,
              filePath: res.tempFilePaths[0],
              header: {
                Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
              },
              name: 'file',
              success(res) {
                this.userInfo.avatar = res.data
              }
            })
          }
        });
      },
      edit() {
        api.put(`/v1/org`, this.userInfo).then(data => {
          uni.navigateTo({url: '/pages/index/index?pageCur=mine'})
        })
      }
    }
  }
</script>