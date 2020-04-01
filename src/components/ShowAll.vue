<template>

    <div class="brotherOne">
        <h5>我是接收方组件，下面是接收到的信息</h5>
        <h5>{{name}}</h5>
        <h5>blog_kind:{{blog_kind}}</h5>
        <h5>blog_tag:{{blog_tag}}</h5>
        <h5>user_name:{{user_name}}</h5>
    </div>

</template>

<script>
    export default {
        name: "ShowAll",
        props:{
            user_name:''
        },
        data() {
            return {
                name: "1111",
                blog_kind:'',
                blog_tag:'',

            }
        },
        mounted() {
            let self = this;
            this.bus.$on("blog_kind", function(item) { self.blog_kind = item; })
            this.bus.$on("blog_tag", function(item) { self.blog_tag = item; })
            this.bus.$on("user_name", function(item) { self.user_name = item; })
        },
        created(){
            this.name="222"
        }

    }
</script>

<style scoped>

</style>