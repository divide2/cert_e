<template>
  <view>
    <cu-custom bg-color="bg-blue">
      <block slot="content">我</block>
    </cu-custom>
    <scroll-view scroll-y class="scrollPage">
      <view class="radius shadow-warp bg-white">
        <view class="cu-list menu">

          <view v-if="userInfo" class="cu-item arrow margin-top margin-bottom" @tap="toEditSelf">

            <view class="content flex align-center justify-between">
              <view class="content-left">
                <view>
                  <view class="flex align-center" @tap="toEditSelf">
                    <view class="cu-avatar xl round" :style="'background-image:url('+userInfo.avatar+')'">
                    </view>
                    <view class="base-info margin-left">
                      <view>
                        <text class="text-bold">{{userInfo.name}}</text>
                      </view>
                      <text>{{userInfo.name}}</text>
                    </view>
                  </view>
                  <view class="flex margin-top">
                    <view class="margin-left" @tap.stop="toFans">
                      <text class="margin-sm">粉丝</text>
                      <text>{{userInfo.fans}}</text>
                    </view>
                  </view>
                </view>
              </view>
              <text class="cuIcon-qr_code xl text-grey"></text>
            </view>
          </view>
          <navigator v-else class="cu-item arrow margin-top margin-bottom" url="/pages/login/index">
            <view class="login-wrap flex align-center">
              <view>
                <text class="text-bold text-lg">登录/注册</text>
              </view>
            </view>
          </navigator>
        </view>
      </view>
      <view>
        <view class="cu-list menu margin-top">
          <!-- <view class="cu-item arrow">
            <view class="content">
              <text class="cuIcon-goodsfill text-green"></text>
              <text class="text-grey">帮助和反馈</text>
            </view>
          </view> -->
          <view class="cu-item arrow">
            <view class="content">
              <text class="cuIcon-goodsfill text-green"></text>
              <text class="text-grey">联系客服</text>
            </view>
			<button open-type='contact' session-from='' :plain="true" class="contact-button">联系客服</button>
          </view>
        </view>
        <view class="cu-list menu margin-top" @tap="logout">
          <view class="cu-item arrow">
            <view class="content">
              <text class="cuIcon-exit text-grey"></text>
              <text class="text-grey">退出</text>
            </view>  
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "mine",
    data() {
      return {
        userInfo: uni.getStorageSync('userInfo')
      }
    },
    mounted() {
      api.get('/v1/org').then(data => {
        this.userInfo = data
      })
    },
    methods: {
      logout() {
        uni.removeStorageSync('userInfo')
        uni.removeStorageSync('accessToken')
        uni.redirectTo({
          url: '/pages/login/index'
        })
      },
      toEditSelf() {
        uni.navigateTo({
          url: '/pages/mine/editSelf'
        })
      },
      toFans() {
        uni.navigateTo({url: '/pages/mine/fans'})
      }
    }
  }
</script>

<style scoped>
	.contact-button{
		position: absolute;
		width: 100%;
		opacity: 0;
	}
</style>