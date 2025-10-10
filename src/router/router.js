
import Vue from "vue";
import VueRouter from "vue-router";
import StudentList from "@/components/StudentList.vue";
 import StudentDetail from "@/components/StudentDetail.vue";

Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',

    routes:[
        {
            path:"/",
            name:"StudentList",
            component:StudentList
        },
        {
            path:"/student/:id",
            name:"StudentDetail",
            component:StudentDetail,
             props: true,
        }
        
    ]
})