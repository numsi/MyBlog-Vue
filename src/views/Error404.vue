<template>
    <div class="error-page">
        <div class="txtbox">
            <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

            <p class="paddingbox">请点击以下链接继续浏览网页</p>

            <p>
                》
                <a style="cursor:pointer" onclick="history.back()">返回上一页面</a>
            </p>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Error404'
    }
</script>

<style scoped>
    .error-page {
        background:url("../assets/img/404Backgroud.jpg") no-repeat;
        background-position: center;
        margin: 0;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
</style>
