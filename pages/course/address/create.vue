<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">添加地址</block>
    </cu-custom>
    <form @submit="confirm" ref="form">
      <view class="cu-form-group margin-top" @tap="chooseAddress">
        <view class="title">地址选择</view>
        <input placeholder="必选" v-model="info.address"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">地址补充</view>
        <input placeholder="请补充到具体的房号" v-model="info.detail"/>
      </view>
      <view class="cu-bar btn-group margin-top margin-bottom">
        <button class="cu-btn bg-green shadow-blur  lg" formType="submit">保存</button>
      </view>
    </form>
  </view>
</template>

<script>
import api from '@/api/api'
import utils from '../../../components/form/utils';

export default {
  name: 'addressCreate',
  data() {
    return {
      type: 'add',
      id: '',
      info: {
        address: '',
        longitude: '',
        latitude: '',
        detail: ''
      },
      rules: {
        address: [
          { required: true, message: '请选择地址' },
          { max: 100, message: '地址长度不超过100字' }
        ],
        detail: [
          { required: true, message: '请填写补充地址' },
          { max: 50, message: '补充地址在50字以内' },
        ]
      }
    }
  },
  onLoad(option) {
    this.type = option.type
    if (option.type === 'update') { //修改
      this.id = option.id
      this.getDetail(option.id)
    }
  },
  methods: {
    chooseAddress() {
      let that = this
      uni.chooseLocation({
        success(res) {
          that.info.address = res.address
          that.info.longitude = res.longitude
          that.info.latitude = res.latitude
        }
      })
    },
    confirm() {
      utils.validate(this.info, this.rules, (res, errors) => {
        if (res) {
          if (this.type === 'add') {
            api.post('/v1/address', this.info).then(data => {
              uni.redirectTo({ url: '/pages/course/address/index' });
            })
          } else {
            api.put(`/v1/address/${this.id}`, this.info).then(data => {
              uni.redirectTo({ url: '/pages/course/address/index' });
            })
          }
        }
      })
    },
    getDetail(id) {
      api.get(`/v1/address/${id}`).then(data => {
        this.info = data
      })
    }
  }
}
</script>

<style scoped>

</style>