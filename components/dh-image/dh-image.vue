<template>
	<image :src="imageSrc" lazy-load :mode="mode" @error="error" @load="load"></image>

</template>

<script>
	export default {
		name: 'dhImage',
		props: {
			src: {
				type: String,
				default: ''
			},
			errorSrc: {
				type: String,
				default: '/static/default.png'
			},
			mode: {
				type: String,
				default: 'scaleToFill'
			}
		},
		data() {
			return {
				imageSrc: ''
			};
		},
		methods: {
			error(e) {
				this.imageSrc = this.errorSrc;
				this.$emit("error", e);
			},
			load(e) {
				this.$emit("load", e);
			}
		},
		created() {
			if (!this.src) {
				this.error();
			} else {
				this.imageSrc = this.src;
			}
		},
		watch: {
			src(newVal, oldVal) {
				if (!newVal) {
					this.error();
				} else {
					this.imageSrc = newVal;
				}
			}
		}
	}
</script>

<style>
	image {
		width: 100%;
	}
</style>
