<script setup>
import { toRefs } from 'vue'
import { computed } from 'vue'
import siteConfig from '../config/siteConfig'

const props = defineProps({
  title: String,
  rating: String,
  unit: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' }
})
const { title, rating, unit, image, description } = toRefs(props)
const unitComputed = computed(() => {
  return unit.value && unit.value.length ? unit.value : siteConfig.unit
})
const emit = defineEmits(['open'])
function handleClick() {
  emit('open', title.value)
}
</script>

<template>
  <div class="anime-card" @click="handleClick" role="button" tabindex="0">
    <div class="thumb">
      <img v-if="image && image.length" :src="image" alt="" />
      <div v-else class="placeholder">图片</div>
    </div>
    <div class="info">
      <div class="title">{{ title }}</div>
      <div class="meta">{{ rating }} {{ unitComputed }}</div>
      <div v-if="description" class="desc">{{ description }}</div>
    </div>
  </div>
</template>

<style scoped>
.anime-card {
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(180deg,#fff 0%,#fbfcff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 220ms cubic-bezier(.22,.9,.29,1), box-shadow 220ms ease;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}
.anime-card .thumb {
  width: 100%;
  max-width: 320px;
  height: 140px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background: #f5f5f5;
}
.anime-card .thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.anime-card .thumb .placeholder {
  color: #999;
}
.anime-card .desc {
  margin-top: 6px;
  font-size: 12px;
  color: #666;
  text-align: center;
}
.anime-card .title {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}
.anime-card .meta {
  font-size: 12px;
  color: #888;
}
.anime-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 30px rgba(30,45,90,0.08);
}
</style>


