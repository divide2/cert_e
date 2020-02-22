<template>
  <view>
    <cu-custom bg-color="bg-blue">
      <block slot="content">课程</block>
    </cu-custom>
    <view class="cu-list grid col-3 no-border'">
      <view class="cu-item" v-for="(item,index) in iconList" :key="item.name" v-if="index<gridCol*2"
            @tap="toUrl(item.url)">
        <view :class="'cuIcon-'+item.icon +' text-' +item.color">
          <view class="cu-tag badge" v-if="item.badge!==0">
            <block v-if="item.badge!==1">{{item.badge>99?"99+":item.badge}}</block>
          </view>
        </view>
        <text>{{item.name}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "course",
    data() {
      return {
        iconList: [
          {
            icon: 'roundadd',
            color: 'red',
            badge: 0,
            name: '发布',
            url: '/pages/course/create'
          }, {
            icon: 'list',
            color: 'orange',
            badge: 1,
            name: '课程',
            url: '/pages/course/list'
          }, {
            icon: 'location',
            color: 'yellow',
            badge: 0,
            name: '地址',
            url: '/pages/course/address/index?fromPage=course'
          }, {
            icon: 'medal',
            color: 'olive',
            badge: 0,
            name: '证书',
            url: '/pages/course/certification/index?fromPage=course'
          },
         /* {
            icon: 'questionfill',
            color: 'mauve',
            badge: 0,
            name: '帮助'
          }, {
            icon: 'commandfill',
            color: 'purple',
            badge: 0,
            name: '反馈'
          }*/],
        gridCol: 3,


      }
    },
    methods: {
      toUrl(url) {
        uni.navigateTo({url})
      }
    }
  }
</script>

<style scoped>

</style>