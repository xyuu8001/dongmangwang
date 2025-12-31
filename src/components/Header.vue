<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const isMobileMenuOpen = ref(false)
const router = useRouter()

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function onLogin() {
  // navigate to login page
  router.push({ name: 'Login' })
}

function onRegister() {
  // navigate to login page with register mode
  router.push({ name: 'Login', query: { mode: 'register' } })
}
</script>

<template>
  <header class="site-header">
    <div class="left">
      <div class="logo">动漫测试网</div>
      <nav class="nav desktop-only">
        <a class="nav-item">首页</a>
        <a class="nav-item">影视</a>
        <a class="nav-item">动漫</a>
        <a class="nav-item">电视剧</a>
        <a class="nav-item">电影</a>
        <a class="nav-item">最新更新</a>
        <a class="nav-item">排行</a>
      </nav>
    </div>

    <div class="right">
      <div class="auth desktop-only">
        <button class="btn" @click="onLogin">登录与注册</button>
        
      </div>

      <button class="hamburger mobile-only" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen">
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </button>
    </div>

    <div class="mobile-menu" v-show="isMobileMenuOpen">
      <nav class="nav-mobile">
        <a class="nav-item">首页</a>
        <a class="nav-item">影视</a>
        <a class="nav-item">动漫</a>
        <a class="nav-item">电视剧</a>
        <a class="nav-item">电影</a>
        <a class="nav-item">最新更新</a>
        <a class="nav-item">排行</a>
      </nav>
      <div class="auth-mobile">
        <button class="btn" @click="onLogin">登录</button>
        <button class="btn ghost" @click="onRegister">注册</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid #e6e6e6;
  background: linear-gradient(180deg, #ffffff 0%, #fbfbff 100%);
  transition: box-shadow 200ms ease;
  will-change: box-shadow;
}
.site-header .left,
.site-header .right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-weight: 700;
  font-size: 18px;
  margin-right: 12px;
}
.nav {
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.nav-item {
  cursor: pointer;
  color: #333;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 6px;
  transition: background-color 160ms ease, transform 160ms ease, color 160ms ease;
}
.nav-item:hover {
  background: rgba(50, 115, 255, 0.06);
  color: #2e6bf6;
  transform: translateY(-2px);
}
.auth .btn {
  margin-left: 8px;
  padding: 6px 10px;
}
.auth .btn.ghost {
  background: transparent;
  border: 1px solid #ccc;
}
.hamburger {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  border: none;
  background: transparent;
  padding: 6px;
  cursor: pointer;
}
.hamburger .bar {
  display: block;
  width: 20px;
  height: 2px;
  background: #333;
}
.mobile-menu {
  border-top: 1px solid #f0f0f0;
  padding-top: 8px;
}
.nav-mobile {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.auth-mobile {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

/* Desktop layout */
@media (min-width: 900px) {
  .desktop-only { display: block; }
  .mobile-only { display: none; }
  .mobile-menu { display: none !important; }
}

/* Mobile layout defaults */
@media (max-width: 899px) {
  .site-header {
    flex-direction: column;
  }
  .desktop-only { display: none; }
  .mobile-only { display: inline-flex; }
}

/* subtle shadow on hover to lift header */
.site-header:hover {
  box-shadow: 0 6px 24px rgba(25, 35, 50, 0.06);
}
</style>  


