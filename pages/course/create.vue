<template>
  <view>
      <v-form bindsubmit="confirm">
        <view class="cu-form-group margin-top">
          <view class="title">课程名字</view>
          <input placeholder="必填" name="name" v-model="course.name"/>
        </view>
        <view class="cu-form-group">
          <view class="title">培训价格</view>
          <input placeholder="必填" name="price" type="number" v-model="course.price" />
        </view>
        <view class="cu-form-group margin-top" @tap="chooseAddress">
          <view class="title">上课地址</view>
          <input placeholder="必填" v-model="course.addressName"/>
        </view>

        <view class="cu-form-group">
          <view class="title">課程描述</view>
          <input placeholder="必填" name="description" v-model="course.description" @input="inputCourse" />
        </view>

        <view class="cu-form-group margin-top">
          <view class="title">行业选择</view>
          <picker bindchange="professionChange" :value="professionPickerIndex" :range="professionPicker" name="profession" range-key="name">
            <view class="picker">
              {{course.professionName?course.professionName:'未选择'}}
            </view>
          </picker>
        </view>
        <view class="cu-form-group">
          <view class="title">开始日期</view>
          <picker mode="date" v-model="course.startTime"  start="2015-09-01" end="2020-09-01" @change="startTimeChange" name="startTime">
            <view class="picker">
              {{course.startTime?course.startTime:'未选择'}}
            </view>
          </picker>
        </view>
        <view class="cu-form-group">
          <view class="title">结束日期</view>
          <picker mode="date" v-model="course.startTime" start="2015-09-01" end="2020-09-01" @change="endTimeChange" name="endTime">
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
            图片上传
          </view>
          <view class="action">
            0/4
          </view>
        </view>

        <view class="cu-form-group">
          <view class="grid col-4 grid-square flex-sub">
            <view class="bg-img" v-for="item in course.images"  @tap="ViewImage">
              <image :src='item' mode='aspectFill'></image>
              <view class="cu-tag bg-red" @catchtap="DelImg" >
                <text class="cuIcon-close"></text>
              </view>
            </view>
            <view class="solids" @tap="ChooseImage" v-if="course.images.length<4">
              <text class="cuIcon-cameraadd"></text>
            </view>
          </view>
        </view>
        <view class="cu-bar btn-group margin-top margin-bottom">
          <button class="cu-btn bg-green shadow-blur round lg" formType="submit">保存</button>
        </view>
      </v-form>
  </view>
</template>

<script>
  import VForm from "../../components/form/VForm";
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
      }
    },
    methods: {
      inputCourse() {

      },
      toCer() {

      },
      toCourseDetailEditor() {

      },
      ViewImage() {

      },
      DelImg() {

      },
      ChooseImage() {

      },
      chooseAddress() {

      }
    }
  }
</script>

<style scoped>

</style>