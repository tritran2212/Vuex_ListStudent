<template>
  <div class="min-h-screen flex items-start justify-center p-6 bg-slate-900">
    <div class="w-full max-w-3xl">
      <header class="mb-6">
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight select-none">
          <span
            class="inline-block mr-3 -skew-x-6 px-4 py-2 rounded-2xl text-lg font-semibold bg-clip-text text-transparent animate-gradient-gradient">
            ✨
          </span>
          <span
            class="bg-gradient-to-r from-indigo-300 via-pink-300 to-yellow-200 bg-clip-text text-transparent animate-gradient-2">
            Danh Sách Sinh Viên
          </span>
        </h1>
      </header>
      <section class="bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-xl ring-1 ring-slate-700 overflow-hidden">
        <!-- loader -->
        <div v-if="loading" class="p-8 flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500 animate-spin-slow shadow-lg">
          </div>
          <div class="flex-1">
            <div class="h-3 bg-slate-700 rounded-full w-3/4 mb-2 animate-pulse"></div>
            <div class="h-3 bg-slate-700 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
        <ol v-else class="divide-y divide-slate-700">
          <li v-for="stu in studentList" :key="stu.id" @click="select(stu.id)"
            class="group flex items-center gap-4 p-4 sm:p-5 cursor-pointer hover:bg-slate-700/40 transition-colors duration-300">
            <div
              class="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden ring-2 ring-slate-700 group-hover:scale-105 transform transition-all duration-300"
              aria-hidden="true">
              <img :src="stu.image || 'https://i.pravatar.cc/150?u=' + stu.email" alt="avatar"
                class="w-full h-full object-cover" loading="lazy" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-base sm:text-lg font-semibold text-white truncate">
                    {{ stu.firstName }} {{ stu.lastName }}
                  </div>
                  <div class="text-sm text-slate-300 truncate">{{ stu.email }}</div>
                </div>
                <div class="flex items-center gap-3 ml-4">
                  <button @click.stop="deleteStu(stu.id)"
                    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-red-600/95 hover:bg-red-500 active:scale-95 transition transform shadow-sm ring-1 ring-red-900/30"
                    title="Xóa sinh viên">
                    <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Xóa
                  </button>
                  <button @click.stop="select(stu.id)"
                    class="px-3 py-1.5 rounded-full text-sm font-medium bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-700 transition"
                    title="Xem chi tiết">
                    Xem
                  </button>
                </div>
              </div>
              <div class="mt-2 flex items-center gap-3 text-xs text-slate-400">
                <span class="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-slate-700/30">
                  <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12 11c0 1.657-1.567 3-3.5 3S5 12.657 5 11 6.567 8 8.5 8 12 9.343 12 11z"></path>
                  </svg>
                  ID: {{ stu.id }}
                </span>
                <span class="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-slate-700/20">
                  <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3"></path>
                  </svg>
                  Active
                </span>
              </div>
            </div>
          </li>
          <li v-if="!studentList.length" class="p-6 text-center text-slate-400">
            Không có sinh viên nào — thử làm mới dữ liệu.
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "StudentList",
  computed: {
    ...mapGetters({
      studentList:"students",
      loading:"loading"
    })
  },
  created() {
    this.$store.dispatch("fetchStudents");
  },
  methods: {
    select(id) {
      this.$store.dispatch("selectStudent", id);
      this.$router.push(`/student/${id}`);
    },
    deleteStu(id) {
      if (confirm("Bạn có chắc muốn xóa sinh viên này?")) {
        this.$store.dispatch("deleteStudent", id);
      }
    },
  },
};
</script>
<style scoped>
@layer utilities {
  @keyframes gradient-1 {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes gradient-2 {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
  .animate-gradient-gradient {
    background-image: linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradient-1 6s ease infinite;
  }
  .animate-gradient-2 {
    background-image: linear-gradient(90deg, #a78bfa, #f0abfc, #fde68a);
    background-size: 240% 240%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradient-2 8s ease infinite;
  }
  .animate-spin-slow {
    animation: spin 2.5s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
:root {
  --card-shadow: 0 10px 30px rgba(2, 6, 23, 0.6);
}
section {
  box-shadow: var(--card-shadow);
}
</style>
