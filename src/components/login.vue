<template>
  <div class="login-container">
    <div class="login-card">
      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="mode = 'login'">登录</button>
        <button :class="{ active: mode === 'register' }" @click="mode = 'register'">注册</button>
      </div>

      <h1 class="title">动漫世界</h1>
      <p class="sub-title" v-if="mode === 'login'">欢迎回来</p>
      <p class="sub-title" v-else>创建一个新账号</p>

      <div v-if="mode === 'login'">
        <div class="form-item">
          <input v-model="loginForm.username" type="text" placeholder="用户名 / 邮箱" />
        </div>

        <div class="form-item">
          <input v-model="loginForm.password" type="password" placeholder="密码" />
        </div>

        <div class="options">
          <label>
            <input type="checkbox" v-model="loginForm.remember" />
            记住我
          </label>
          <a href="#" @click.prevent="onForgot">忘记密码？</a>
        </div>

        <button class="login-btn" :disabled="loading" @click="handleLogin">
          {{ loading ? '登录中...' : '登 录' }}
        </button>
      </div>

      <div v-else>
        <div class="form-item">
          <input v-model="regForm.username" type="text" placeholder="用户名" />
        </div>
        <div class="form-item">
          <input v-model="regForm.email" type="email" placeholder="邮箱" />
        </div>
        <div class="form-item">
          <input v-model="regForm.password" type="password" placeholder="密码 (最少6位)" />
        </div>
        <div class="form-item">
          <select v-model="regForm.gender">
            <option value="">选择性别（可选）</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
        </div>

        <button class="login-btn" :disabled="loading" @click="handleRegister">
          {{ loading ? '提交中...' : '注 册' }}
        </button>
      </div>

      <div class="footer">
        <span v-if="mode === 'login'">没有账号？</span>
        <span v-else>已有账号？</span>
        <a href="#" @click.prevent="toggleMode">{{ mode === 'login' ? '立即注册' : '去登录' }}</a>
      </div>

      <p class="message" v-if="message">{{ message }}</p>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const mode = ref('login') // 'login' | 'register'
const loading = ref(false)
const message = ref('')
const error = ref('')

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const regForm = reactive({
  username: '',
  email: '',
  password: '',
  gender: ''
})

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  message.value = ''
  error.value = ''
}

function onForgot() {
  alert('请联系管理员重置密码（示例）')
}

const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (route.query && route.query.mode === 'register') {
    mode.value = 'register'
  }
})

async function handleLogin() {
  error.value = ''
  message.value = ''
  if (!loginForm.username || !loginForm.password) {
    error.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginForm.username, password: loginForm.password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || '登录失败')
    message.value = '登录成功'
    console.log('login success:', data)
    // 保存 token（如果后端返回）
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    // 跳转到首页
    if (router && typeof router.push === 'function') {
      router.push({ name: 'Home' })
    } else {
      window.location.href = '/'
    }
  } catch (err) {
    error.value = err.message || '登录出错'
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  error.value = ''
  message.value = ''
  if (!regForm.username || !regForm.email || !regForm.password) {
    error.value = '请完整填写注册信息'
    return
  }
  if (regForm.password.length < 6) {
    error.value = '密码至少6位'
    return
  }

  loading.value = true
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regForm)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || '注册失败')
    message.value = '注册成功，请登录'
    mode.value = 'login'
    // optionally prefill username/email
    loginForm.username = regForm.username
  } catch (err) {
    error.value = err.message || '注册出错'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: url('/bg-anime.jpg') center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.login-card {
  width: 360px;
  padding: 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  box-shadow: 0 12px 36px rgba(8, 12, 30, 0.08);
  position: relative;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.tabs button {
  flex: 1;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: background 160ms ease, transform 160ms ease;
}
.tabs button.active {
  background: linear-gradient(90deg,#fef2f8,#fff);
  border-color: #ffd7ea;
  transform: translateY(-2px);
}

.title {
  text-align: center;
  font-size: 22px;
  margin: 6px 0 4px;
}
.sub-title {
  text-align: center;
  color: #666;
  margin-bottom: 12px;
}

.form-item input,
.form-item select {
  width: 100%;
  height: 44px;
  margin-bottom: 12px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #e6e6f2;
  outline: none;
  font-size: 14px;
  background: #fff;
}
.form-item input:focus,
.form-item select:focus {
  border-color: #caa0e8;
  box-shadow: 0 6px 18px rgba(138, 43, 226, 0.06);
}

.options {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #666;
  margin-bottom: 14px;
}

.login-btn {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #ff6fae, #ff9f7f);
}
.login-btn[disabled] { opacity: 0.7; cursor: default; }

.footer {
  text-align: center;
  margin-top: 14px;
  font-size: 13px;
}
.footer a { color: #ff6fae; text-decoration: none; margin-left: 6px; }

.message { color: #2b8a3e; margin-top: 10px; font-size: 13px; text-align: center; }
.error { color: #d23f45; margin-top: 10px; font-size: 13px; text-align: center; }
</style>
  