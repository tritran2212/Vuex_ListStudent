import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    students: [],
    selectedStudent: null,
    loading: false,
  },
  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    SET_SELECTED_STUDENT(state, student) {
      state.selectedStudent = student;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
  },
  actions: {
    async fetchStudents({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await axios.get("https://dummyjson.com/users");
        commit("SET_STUDENTS", res.data.users);
      } catch (error) {
        console.log("lỗi api ", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    selectStudent({ commit, state }, id) {
      const st = state.students.find((s) => s.id === id);
      commit("SET_SELECTED_STUDENT", st);
    },
    deleteStudent({commit , state},id){
        const updateStudent = state.students.filter(s=>s.id !==id) 
        commit("SET_STUDENTS",updateStudent);
        if(state.selectedStudent && state.selectedStudent.id ===id){
            commit("SET_SELECTED_STUDENT",null)
        }
    }
    
  },
  getters: {
    students: (state) => state.students,
    selectedStudent: (state) => state.selectedStudent,
    loading: (state) => state.loading,
  },
});
