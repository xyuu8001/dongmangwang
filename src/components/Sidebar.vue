<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <aside class="sidebar">
    <ul>
      <li v-for="(item, idx) in items" :key="idx">{{ item.title }}</li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  flex: 0 0 300px;
  min-width: 220px;
  box-sizing: border-box;
  border: 1px solid #e9edf8;
  padding: 12px;
  /* use viewport height minus header and top/bottom padding to avoid overflow */
  height: calc(100vh - 180px);
  max-height: calc(100vh - 180px);
  overflow: auto;
  background: linear-gradient(180deg,#ffffff 0%, #fbfcff 100%);
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(15, 30, 80, 0.03);
  /* ensure visible and above other content */
  display: block !important;
  visibility: visible !important;
  position: sticky;
  top: 120px;
  z-index: 6;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  padding: 10px 12px;
  border-bottom: 1px dashed #f1f4fb;
  color: #333;
  transition: background-color 140ms ease, transform 140ms ease;
  border-radius: 4px;
}
.sidebar li:hover {
  background: linear-gradient(90deg, rgba(50,115,255,0.06), rgba(255,255,255,0));
  transform: translateX(4px);
}
.sidebar::-webkit-scrollbar { height: 8px; width: 8px; }
.sidebar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 8px; }
</style>


