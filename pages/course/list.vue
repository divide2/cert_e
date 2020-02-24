<template>
  <view>
    <cu-custom bg-color="bg-blue" is-back>
      <block slot="content">课程</block>
    </cu-custom>
    <scroll-view scroll-x class="bg-white nav text-center fixed" :style="'top:'+ customBar + 'px'">
      <view :class="'cu-item '+(index===tabCur?'text-blue cur':'')" v-for="(item,index) in statuses" :key="index"
            @tap="tabSelect(item,index)">
        {{item.label}}
      </view>
    </scroll-view>
    <view class="cu-card article" :style="'margin-top: 49px'">
      <view class="cu-item shadow" v-for="item in courses" :key="item.id" @tap="toDetail(item.id)">
        <view class="title">
          <view class="text-cut">{{item.name}}</view>
        </view>
        <view class="content">
          <image :src="item.images[0]" mode="aspectFill"></image>
          <view class="desc">
            <view class="text-content">简介:{{item.description}}</view>
            <view>
              <view class="cu-tag bg-red light sm round">{{item.certificateName}}</view>
              <view class="cu-tag bg-blue light sm round">{{item.certificateLicensor}}</view>
            </view>
          </view>
        </view>
        <view class="padding flex justify-between">
          <view>{{item.startTime}}</view>
          <view class="text-red">￥{{item.price}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "list",
    data() {
      return {
        courses: [],
        last: false,
        customBar: this.CustomBar,
        query: {
          page: 0,
          status: 'PUBLISHED'
        },
        tabCur: 0,
        statuses: [
          {
            label: '已发布',
            value: 'PUBLISHED'
          },
          {
            label: '已完成',
            value: 'FINISHED'
          },
          {
            label: '草稿箱',
            value: 'DRAFT,AUDITING'
          }
        ]
      }
    },
    methods: {
      getCourse() {
        api.get('/v1/org/courses', this.query).then(data => {
          this.courses.push(...data.content);
          this.last = data.last
        })
      },
      toDetail(id) {
        uni.navigateTo({url: '/pages/course/detail?id=' + id})
      },
      tabSelect(item,index) {
        this.tabCur = index
        this.query.status = item.value
        this.courses = []
        this.query.page = 0
        this.getCourse()
      }
    },
    onLoad() {
      this.getCourse()
    },
    onReachBottom() {
      if (!this.last) {
        this.query.page = this.query.page + 1
        this.getCourse();
      }
    },
  }
</script>

<style scoped>

</style>