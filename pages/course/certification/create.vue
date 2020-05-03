<template>
  <form @submit="confirm" ref="form">
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">证书</block>
    </cu-custom>
    <view class="cu-form-group margin-top">
      <view class="title">证书名字</view>
      <input placeholder="必填" v-model="info.name"/>
    </view>
    <view class="cu-form-group">
      <view class="title">证书机构</view>
      <input placeholder="必填" v-model="info.licensor"/>
    </view>

    <view class="cu-bar bg-white margin-top">
      <view class="action">
        证书图片
      </view>
      <view class="action">
        {{imgList.length}}/1
      </view>
    </view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in imgList" :key="item.id" @tap="viewImage(item)"
        >
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

    <view class="cu-bar btn-group margin-top margin-bottom">
      <button class="cu-btn bg-green shadow-blur round lg" formType="submit">保存</button>
    </view>
  </form>
</template>

<script>
  import api from '@/api/api'
  import utils from "../../../components/form/utils";

  const app = getApp()

  export default {
    name: "certificationCreate",
    onLoad(option) {
      this.type = option.type
      if (option.type === 'update') { //修改
        this.id = option.id
        this.getDetail(option.id)
      }
    },
    data() {
      return {
        imgList: [],
        type: 'add',
        id: '',
        info: {
          name: '',
          licensor: ''
        },
        rules: {
          name: [
            {required: true, message: '请填写证书名字'},
            {max: 20, message: '证书名字在20字以内'},
          ],
          licensor: [
            {required: true, message: '请填写发证机构'},
            {max: 30, message: '发证机构不超过50字'}
          ],
          image: [
            {required: true, message: '请上传证书图片'},
            {type: 'url', message: '请上传证书图片'}
          ]
        }
      }
    },
    methods: {
      chooseImage() {
        let that = this
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: `${app.globalData.baseUrl}/v1/upload/image`,
              filePath: res.tempFilePaths[0],
              header: {
                Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
              },
              name: 'file',
              success(res) {
                that.imgList.push(res.data)
              }
            })
          }
        });
      },
      viewImage(item) {
        uni.previewImage({
          urls: this.imgList,
          current: item
        });
      },
      delImg(index) {
        uni.showModal({
          title: '删除',
          content: '确定要删除吗？',
          success: res => {
            if (res.confirm) {
              this.imgList.splice(index, 1);
            }
          }
        })
      },
      confirm(e) {
        this.info.image = this.imgList[0]
        utils.validate(this.info, this.rules, (res, errors) => {
          if (res) {
            if (this.type === 'add') {
              this.addCer(this.info)
            } else {
              this.updateCer(this.info)
            }
          }
        })
      },
      getDetail(id) {
        api.get(`/v1/org/certificates/${id}`).then(data => {
          this.info = data
          this.imgList = [data.image]
        }).catch(e => {
          console.log(e)
        })
      },
      addCer(data) {
        api.post('/v1/org/certificates', data).then(data => {
          wx.redirectTo({url: '/pages/course/certification/index'})
        })
      },
      updateCer(data) {
        api.put(`/v1/org/certificates/${this.id}`, data).then(data => {
          wx.redirectTo({url: '/pages/course/certification/index'})
        })
      }
    }
  }
</script>

<style scoped>

</style>