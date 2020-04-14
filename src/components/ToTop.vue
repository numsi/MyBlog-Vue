<template>
    <div class="toTop">
    <!--回到顶部-->
    <img v-if="btnFlag" class="imgSize" src="../assets/img/toTop.jpg" @click="backTop">
    </div>
</template>

<script>
    export default {
        name: "ToTop",
        data(){
            return{
                btnFlag:false
            }
        },
        methods:{
            // 点击图片回到顶部方法，加计时器是为了过渡顺滑
            backTop () {
                const that = this
                let timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5)
                    document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                    if (that.scrollTop === 0) {
                        clearInterval(timer)
                    }
                }, 16)
            },
            // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
            scrollToTop () {
                const that = this
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                that.scrollTop = scrollTop
                if (that.scrollTop > 60) {
                    that.btnFlag = true
                } else {
                    that.btnFlag = false
                }
            }

        },

        mounted () {
            window.addEventListener('scroll', this.scrollToTop)
        },
        destroyed () {
            window.removeEventListener('scroll', this.scrollToTop)
        },
    }
</script>

<style scoped>
    .toTop{
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 50px;
        height: 50px;
    }
    .imgSize{
        right: 10px;
        width: 50px;
    }

</style>