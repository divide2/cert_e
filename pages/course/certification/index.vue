<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">证书</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="cu-list menu">
        <view class="cu-item" style="padding: 30rpx;" v-for="item in list" :key="item.id" @tap="chooseCer(item)">
          <view class="cu-avatar radius lg" :style="'background-image:url('+item.image+');'"></view>
          <view class="content margin-left-xs">
            <view class="text-pink">
              <text>{{item.name}}</text>
            </view>
            <view class="text-gray text-sm flex">
              <text class="text-cut">发证机构：{{item.licensor}}</text>
            </view>
          </view>
          <view class="action">
            <button class="cu-btn icon" @tap="toUpdateCer(item.id)">
              <text class="cuIcon-write"></text>
            </button>
            <button class="cu-btn icon margin-left-xs" @tap="deleteCer(item.id)">
              <text class="cuIcon-delete"></text>
            </button>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="bg-white shadow foot fixed" style="bottom:0;">
      <view class="padding flex flex-direction" @tap="toAddCer">
        <button class="cu-btn bg-green lg">增加证书</button>
      </view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  const app = getApp()

  export default {
    name: "certification",
    data() {
      return {
        fromPage: 'courseCreate',
        list: []
      }
    },
    onLoad(option) {
      this.getCertificates()
      if (option.fromPage === 'course') {
        this.fromPage = option.fromPage
      }
    },
    methods: {
      toAddCer() {
        uni.redirectTo({
          url: '/pages/course/certification/create?type=add',
        })
      },
      getCertificates() {
        api.get('/v1/org/certificates').then(data => {
          this.list = data
        })
      },
      toUpdateCer(id) {
        uni.redirectTo({
          url: `/pages/course/certification/create?type=update&id=${id}`
        })
      },
      deleteCer(id) {
        uni.showModal({
          title: '删除',
          content: '确认删除么？',
          success: res => {
            if (res.confirm) {
              api.remove(`/v1/org/certificates/${id}`).then(data => {
                this.getCertificates()
              })
            }
          }
        })
      },
      chooseCer(item) {
        if (this.fromPage === 'courseCreate'){
          let pages = getCurrentPages()
          debugger
          let prevPage = pages[pages.length - 2]
          console.log(prevPage)
          prevPage.$vm.course.certificateName = item.name
          prevPage.$vm.course.certificateId =  item.id
          uni.navigateBack({
            delta: 1
          })
        }

        /*prevPage.setData({
          ['course.certificateName']: item.name,
          ['course.certificateId']: item.id
        }, function () {
          uni.navigateBack({
            delta: 1
          })
        })*/
      }
    }
  }
</script>

<style scoped>

</style>