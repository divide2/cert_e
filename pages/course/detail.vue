<template>
	<view>
		<cu-custom bg-color="bg-blue" is-back>
			<block slot="content">课程</block>
		</cu-custom>
		<scroll-view scroll-y class="scrollPage">
			<swiper class="screen-swiper round-dot}}" indicator-dots="true" circular="true" autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="item in course.images" :key="item">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="padding-sm bg-white">
				<view class="padding-xs text-black text-bold text-xl">
					<text>{{course.name}}</text>
				</view>
				<view class="padding-xs">
					简介:{{course.description}}
				</view>

				<view class="flex justify-between padding">
					<view class="text-bold text-red">￥{{course.price}}</view>
					<view class="text-bold">{{course.certificateId?course.certificateName: '无证书'}}</view>
					<view class="text-bold">{{course.orgName}}</view>
				</view>
				<view>
					<view class="flex align-center padding">
						<text class="cuIcon-timefill text-orange margin-right-sm"></text>
						<text class="">{{course.startTime + '~' + course.endTime}}</text>
					</view>
					<view class="flex align-center padding">
						<text class="cuIcon-locationfill text-orange margin-right-sm "></text>
						<text>{{course.address + ' ' + course.addressDetail}}</text>
					</view>
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="padding-sm margin-top-sm bg-white">
				<!--        <template is="wxParse" data="{{wxParseData:article.nodes}}"></template>-->
				{{course.details}}
			</view>
		</scroll-view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" open-type="share" v-if="course.status!=='DRAFT'">
				<view class="cuIcon-share text-green"></view>
				分享
			</button>
			<view class="action text-blue" @tap="toCourseUser" v-if="course.status!=='DRAFT'">
				<view class="cuIcon-peoplelist"></view>
				报名{{course.enrolment}}人
			</view>
			
			<view class="bg-orange submit" :class="course.status==='PUBLISHED' ? 'published-edit-button' : ''" v-if="course.status==='DRAFT'||course.status==='PUBLISHED'"
			 @tap="edit">编辑</view>
			<view class="bg-orange submit" v-if="course.status==='PUBLISHED'" @tap="finish">结束报名</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/api'

	export default {
		name: "courseDetail",
		data() {
			return {
				course: {
					images: [],
					name: '',
					description: '',
					price: '',
					certificateId: '',
					certificateName: '',
					orgName: '',
					orgId: '',
					startTime: '',
					endTime: '',
					address: '',
					addressDetail: '',
					details: '',
					enrolment: 0
				}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getCourse()
		},

		methods: {
			getCourse() {
				api.get(`/v1/org/courses/${this.id}`).then(data => {
					this.course = data
				})
			},
			edit() {
				uni.navigateTo({
					url: '/pages/course/create?type=update&id=' + this.id
				})
			},
			finish() {
				uni.showModal({
					title: '结束报名',
					content: '确认要结束么？',
					success: res => {
						if (res.confirm) {
							api.put(`/v1/org/courses/${this.id}/finish`).then(data => {
								uni.navigateBack({
									delta: 1
								})
							})
						}
					}
				})
			},
			toCourseUser() {
				uni.navigateTo({
					url: '/pages/course/users?id=' + this.id
				})
			}
		}
	}
</script>

<style scoped>
	.published-edit-button {
		border-right: 1px solid white;
	}
</style>
