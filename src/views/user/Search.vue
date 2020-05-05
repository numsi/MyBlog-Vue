<template>
    <div style="text-align: left;width: 990px;margin: 35px auto 0 auto">
        <span>
            <strong>{{keyword}}的搜索结果内容如下：</strong>
        </span>
        <search-result ></search-result>
    </div>
</template>

<script>
    import SearchResult from '../../components/SearchResult' //引入显示所有博文
    export default {
        name: "Serach",
        components:{
            SearchResult
        },
        data(){
            return{
                keyword:'',
            }
        },
        created(){
            this.keyword=this.$route.query.keyword;
        }
    }
</script>

<style scoped>

</style>