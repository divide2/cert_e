<template>
  <view>
    <cu-custom is-back>
      <block slot="content">发布课程</block>
    </cu-custom>
    <form ref="form">
      <view class="cu-form-group margin-top">
        <view class="title">课程名字</view>
        <input placeholder="必填" name="name" v-model="course.name"/>
      </view>
      <view class="cu-form-group">
        <view class="title">培训价格</view>
        <input placeholder="必填" name="price" type="number" v-model="course.price"/>
      </view>
      <view class="cu-form-group margin-top" @tap="chooseAddress">
        <view class="title">地址选择</view>
        <input placeholder="请选择地址" v-model="course.addressName"/>
      </view>
      <!--   <view class="cu-form-group">
           <view class="title">課程描述</view>
           <input placeholder="必填" name="description" v-model="course.description" @input="inputCourse"/>
         </view>-->

      <view class="cu-form-group margin-top">
        <view class="title">行业选择</view>
        <picker @change="professionChange" :value="professionPickerIndex" :range="professionPicker" name="profession"
                range-key="name">
          <view class="picker">
            {{course.professionName?course.professionName:'未选择'}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">开始日期</view>
        <picker mode="date" :value="course.startTime" @change="startTimeChange"
                name="startTime">
          <view class="picker">
            {{course.startTime?course.startTime:'未选择'}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">结束日期</view>
        <picker mode="date" :value="course.startTime" @change="endTimeChange"
                name="endTime">
          <view class="picker">
            {{course.endTime?course.endTime:'未选择'}}
          </view>
        </picker>
      </view>

      <view class="cu-list menu margin-top" @tap="toCer">
        <view class="cu-item arrow">
          <view class="content">
            <text class="">证书选择</text>
          </view>
          <view class="action">{{course.certificateName}}</view>
        </view>
      </view>

      <view class="cu-list menu margin-top" @tap="toCourseDetailEditor">
        <view class="cu-item arrow">
          <view class="content">
            <text class="">课程详情</text>
          </view>
          <view class="action">{{course.details?'有':'无'}}</view>
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">
          课程相关图片
        </view>
        <view class="action">
          0/4
        </view>
      </view>

      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in course.images" :key="item" @tap="viewImage(item)">
            <image :src='item' mode='aspectFill'></image>
            <view class="cu-tag bg-red" @tap.stop="delImg(index)">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @tap="chooseImage" v-if="course.images.length<4">
            <text class="cuIcon-cameraadd"></text>
          </view>
        </view>
      </view>
      <view class="cu-bar btn-group margin-top margin-bottom">
        <button class="cu-btn bg-green shadow-blur round lg" @tap="save">保存</button>
      </view>
    </form>
  </view>
</template>

<script>
  import VForm from "../../components/form/VForm";
  import utils from "../../components/form/utils";
  import api from "@/api/api"

  const app = getApp()
  export default {
    name: "courseCreate",
    components: {VForm},
    data() {
      return {
        professionPicker: [],
        professionPickerIndex: '',
        course: {
          name: '', // 名字
          price: '', // 价格
          addressName: '', // 地址名字
          addressId: '', // 地址id
          description: '', // 课程描述
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          certificateId: '', // 证书id
          certificateName: '', // 证书名字
          arrangement: '', //buzhi
          images: [], // 图片
          details: '', // 图文描述
          professionId: '', // 行业id
          professionName: '' // 行业名字
        },
        rules: {
          name: [
            {required: true, message: '课程名字不能为空'},
            {max: 50, message: '课程名字在50字以内'}],
          price: [
            {required: true, message: '价格不能为空'},
            {type: 'number', message: '价格必须是数字'}],
          addressName: [
            {required: true, message: '地址必选'}],
          addressId: [
            {required: true, message: '地址必选'}],
          startTime: [
            {required: true, message: '开课时间必填'}],
          certificateId: [{required: true, message: '证书信息必选'}]
        }
      }
    },
    onLoad() {
      this.getProfession()
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      toCer() {
        uni.navigateTo({
          url: '/pages/course/certification/index',
        })
      },
      toCourseDetailEditor() {
        uni.navigateTo({
          url: '/pages/editor/editor',
        })
      },
      startTimeChange(e) {
        this.course.startTime = e.detail.value
      },
      endTimeChange(e) {
        this.course.endTime = e.detail.value
      },
      getProfession() {
        api.get('/v1/professions').then(data => {
          this.professionPicker = data
        })
      },
      professionChange(e) {
        this.course.professionName = this.professionPicker[e.detail.value].name
        this.course.professionId = this.data.professionPicker[e.detail.value].id
      },
      viewImage(item) {
        uni.previewImage({
          urls: this.course.images,
          current: item
        });
      },
      delImg(index) {
        uni.showModal({
          title: '删除',
          content: '确认删除么？',
          success: res => {
            if (res.confirm) {
              this.course.images.splice(index, 1);
            }
          }
        })
      },
      chooseImage() {
        const that = this
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: `${app.globalData.baseUrl}/v1/upload/image`,
              filePath: res.tempFilePaths[0],
              name: 'file',
              success(res) {
                that.course.images.push(res.data)
              }
            })
          }
        });
      },
      chooseAddress() {
        wx.navigateTo({
          url: '/pages/course/address/index'
        })
      },
      save() {
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
      }
    }
  }
</script>

<style scoped>

</style>