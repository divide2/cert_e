<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">粉丝</block>
    </cu-custom>
    <view class="text-center padding" v-if="fans.length === 0">你还没有粉丝</view>
    <view class="cu-list menu-avatar sm-border">
      <view class="cu-item" v-for="item in fans" :key="item.id">
        <view class="cu-avatar round lg"
              :style="'background-image:url('+item.user.avatar+');'"></view>
        <view class="content">
          <view class="text-grey">{{item.user.nickname}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "courseUsers",
    data() {
      return {
        fans: []
      }
    },
    onLoad(option) {
      api.get('/v1/org/fans').then(data => {
        this.fans = data
      })
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>