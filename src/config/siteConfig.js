import { reactive } from 'vue'

// Read default from env (Vite) if provided, otherwise fallback to '仙逆'
const defaultUnit = (import.meta.env && import.meta.env.VITE_UNIT) ? import.meta.env.VITE_UNIT : '仙逆'

export const siteConfig = reactive({
  unit: defaultUnit
})

export function setUnit(newUnit) {
  siteConfig.unit = newUnit
}

export default siteConfig


