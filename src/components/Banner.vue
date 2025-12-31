<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const slides = ref(['轮播图 1', '轮播图 2', '轮播图 3'])
const current = ref(0)
let timer = null

function next() {
  current.value = (current.value + 1) % slides.value.length
}

function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
}

function goTo(idx) {
  current.value = idx
}

onMounted(() => {
  timer = setInterval(next, 3000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="banner">
    <div class="carousel">
      <button class="arrow left" @click="prev">&lt;</button>

      <div class="slides">
        <div
          v-for="(s, idx) in slides"
          :key="idx"
          class="slide"
          :class="{ active: idx === current }"
        >
          {{ s }}
        </div>
      </div>

      <button class="arrow right" @click="next">&gt;</button>
      <div class="dots">
        <button
          v-for="(s, idx) in slides"
          :key="idx"
          :class="{ dot: true, active: idx === current }"
          @click="goTo(idx)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner .carousel {
  height: 260px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fff;
}
.banner .arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
  cursor: pointer;
}
.banner .arrow.left { left: 12px; }
.banner .arrow.right { right: 12px; }
.banner .slides {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.banner .slide {
  display: none;
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 24px 0;
}
.banner .slide.active {
  display: block;
}
.banner .dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.banner .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  padding: 0;
}
.banner .dot.active { background: #333; }
</style>

<style scoped>
.banner .slide {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 360ms cubic-bezier(.22,.9,.29,1), transform 360ms cubic-bezier(.22,.9,.29,1);
  position: absolute;
  left: 0;
  top: 0;
}
.banner .slide.active {
  opacity: 1;
  transform: translateY(0);
  position: relative;
}
.banner .slides { position: relative; min-height: 180px; }
.banner .arrow { background: rgba(20,20,30,0.05); border: none; padding: 8px 10px; border-radius: 6px; }
.banner .arrow:hover { background: rgba(20,20,30,0.1); transform: translateY(-2px); }
.banner .dot { width: 10px; height: 10px; border-radius: 999px; transition: transform 160ms ease, background 160ms ease; }
.banner .dot:hover { transform: scale(1.2); background: #666; }
</style>
