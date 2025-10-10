<template>
  <div class="min-h-screen flex items-start justify-center bg-slate-900 py-10 px-6">
    <div class="w-full max-w-lg">
      <transition name="fade" mode="out-in">
        <div
          v-if="stu"
          key="detail"
          class="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl ring-1 ring-slate-700/70 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-pink-500/10 to-yellow-400/20 opacity-70 animate-gradient-2 pointer-events-none"
          ></div>
          <div class="relative flex flex-col items-center text-center z-10">
            <img
              :src="stu.image || 'https://i.pravatar.cc/150?u=' + stu.email"
              alt="avatar"
              class="w-28 h-28 rounded-full border-4 border-slate-700 shadow-xl mb-4 hover:scale-105 transform transition-all duration-300"
            />
            <h2 class="text-3xl font-bold text-white bg-clip-text text-transparent animate-gradient-text">
              {{ stu.firstName }} {{ stu.lastName }}
            </h2>
            <p class="text-slate-400 mt-1 text-sm">ID: {{ stu.id }}</p>
          </div>
          <div class="mt-6 space-y-3 z-10 relative">
            <p class="text-lg text-slate-200">
              <b class="font-semibold text-pink-300">👤 Họ tên:</b>
              <span class="ml-2">{{ stu.firstName }} {{ stu.lastName }}</span>
            </p>
            <p class="text-lg text-slate-200">
              <b class="font-semibold text-yellow-300">🎂 Tuổi:</b>
              <span class="ml-2">{{ stu.age }}</span>
            </p>
            <p class="text-lg text-slate-200">
              <b class="font-semibold text-indigo-300">📧 Email:</b>
              <span class="ml-2">{{ stu.email }}</span>
            </p>
            <p class="text-lg text-slate-200">
              <b class="font-semibold text-green-300">🏙️ Thành phố:</b>
              <span class="ml-2">{{ stu.address.city }}</span>
            </p>
          </div>
          <div class="mt-8 flex justify-center">
            <button
              @click="$router.push('/')"
              class="px-6 py-2 rounded-full text-base font-semibold text-white bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-indigo-500 hover:to-pink-500 transition-all duration-300 shadow-lg active:scale-95"
            >
              ⬅️ Quay lại danh sách
            </button>
          </div>
        </div>
        <div
          v-else
          key="empty"
          class="text-center p-10 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-slate-700/50"
        >
          <p class="text-slate-300 text-lg">
            Hãy chọn một sinh viên để xem chi tiết nhé. 📘
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "StudentDetail",
  computed: {
    stu() {
      return this.$store.getters.selectedStudent;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
@layer utilities {
  @keyframes gradient-anim {
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
  .animate-gradient-2 {
    background-size: 300% 300%;
    animation: gradient-anim 8s ease infinite;
  }
  .animate-gradient-text {
    background-image: linear-gradient(90deg, #60a5fa, #f472b6, #facc15);
    background-size: 300% 300%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: gradient-anim 6s ease infinite;
  }
}
</style>
