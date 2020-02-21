<template>
  <view>
    <cu-custom is-back>
      <block slot="content">地址选择</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="cu-list menu">
        <view class="cu-item" style="padding: 30rpx;" v-for="item in list" :key="item.id" @tap="chooseAddress(item)">
          <view class="content margin-left-xs">
            <view class="text-pink">
              <text>{{item.address}}{{item.detail}}</text>
            </view>
          </view>
          <view class="action">
            <button class="cu-btn icon" @tap.stop="toUpdateAddress(item.id)">
              <text class="cuIcon-write"></text>
            </button>
            <button class="cu-btn icon margin-left-xs" @tap.stop="deleteAddress(item.id)">
              <text class="cuIcon-delete"></text>
            </button>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="bg-white shadow foot fixed" style="bottom:0;">
      <view class="padding flex flex-direction" @tap.stop="toAddAddress">
        <button class="cu-btn bg-green lg">增加地址</button>
      </view>
    </view>

  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "address",
    data() {
      return {
        list: []
      }
    },
    onLoad() {
      this.getData()
    },
    methods: {
      toAddAddress() {
        uni.navigateTo({
          url: '/pages/course/address/create?type=add',
        })
      },
      getData() {
        api.get('/v1/org/addresses').then(data => {
          this.list = data
        })
      },
      toUpdateAddress(id) {
        uni.navigateTo({
          url: `/pages/course/address/create?type=update&id=${id}`,
        })
      },
      deleteAddress(id) {
        uni.showModal({
          title: '删除',
          content: '确认删除么？',
          success: res => {
            if (res.confirm) {
              api.remove(`/v1/address/${id}`).then(() => {
                this.getData()
              })
            }
          }
        })

      },
      chooseAddress(item) {
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2]
        prevPage.$vm.course.address = item.address
        prevPage.$vm.course.addressId = item.id
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style scoped>

</style>