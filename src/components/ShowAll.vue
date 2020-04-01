<template>

    <div class="brotherOne">
        <h5>我是接收方组件，下面是接收到的信息</h5>
        <span>{{name}}</span>
    </div>

</template>

<script>
    export default {
        name: "ShowAll",
        data() { return { name: "我缺爱啊" } },
        mounted() { let self = this; this.bus.$on("blog_kind", function(item) { self.name = item; }) }

    }
</script>

<style scoped>

</style>