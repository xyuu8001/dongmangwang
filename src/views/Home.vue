<script setup>
import { reactive } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Banner from '../components/Banner.vue'
import AnimeCard from '../components/AnimeCard.vue'
import { initialCards } from '../data/cards'

// use a reactive copy of initialCards so content can be modified later
const cards = reactive(initialCards.map(c => ({ ...c })))

const sidebarItems = reactive([
  { title: '仙逆 12集/共24集' },
  { title: '仙逆 24集/共48集' },
  { title: '仙逆 12集/共88集' },
  { title: '仙逆 100集/共200集' },
  { title: '仙逆 60集/共80集' },
  { title: '剑来 1集/共88集' },
  { title: '仙逆 10集/共90集' },
  { title: '仙逆 10集/共4集' },
  { title: '仙逆 10集/共80集' },
  { title: '仙逆 30集/共40集' },
  { title: '仙逆 20集/共150集' },
  { title: '仙逆 20集/共150集' },
  { title: '仙逆 20集/共150集' },
  { title: '仙逆 20集/共150集' },
  { title: '仙逆 20集/共150集' },
  
  { title: '仙逆 40集/共70集' }
])

function openCard(title) {
  // placeholder for routing or detail modal
  // for now log and you can replace with router push
  console.log('open card:', title)
}
</script>

<template>
  <div class="canvas">

    <div class="workspace">
      <Sidebar :items="sidebarItems" />

      <div class="main-area">
        <Banner />

        <section class="cards-wrapper">
          <div class="cards-grid">
            <AnimeCard
              v-for="card in cards"
              :key="card.id"
              :title="card.title"
              :rating="card.rating"
              :unit="card.unit"
              :image="card.image"
              :description="card.description"
              @open="openCard"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas {
  width: 1280px;
  height: 900px;
  margin: 20px auto;
  box-sizing: border-box;
  border: 1px solid #ddd;
  background: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.workspace {
  display: flex;
  flex: 1;
  gap: 24px;
  margin-top: 12px;
  align-items: flex-start;
  min-height: 0;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cards-wrapper {
  border: 2px solid #dcdcdc;
  border-radius: 6px;
  padding: 18px;
  background: #fafafa;
  flex: 1;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  align-items: start;
}
</style>

<style scoped>
.canvas { background: linear-gradient(180deg,#f8fbff 0%,#ffffff 100%); }
.cards-wrapper { box-shadow: 0 6px 22px rgba(20,40,90,0.03); }
.cards-grid { padding-top: 6px; }
.cards-grid > * { display: flex; justify-content: center; }
</style>


