/**
 * 分页组件的混合
 * */

export default {
    data() {
        return {
            pageOption: {
                page: 1, // 当前页码
                total: 0, // 总的记录数
                page_size: 20 // 单页记录数
            }
        }
    },
    methods: {
        /**
         * 当表格分页改变时候，重置当前页数
         * @param val 当前第几页
         * */
        handleCurrentChange(val) {
            this.pageOption.page = val;
            this.initList();
        }
    }
}
