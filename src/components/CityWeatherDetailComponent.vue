<template>
  <aside
    id="cta-button-sidebar"
    class="fixed top-0 left-0 z-40 w-3/4 h-screen transition-transform sm:translate-x-0 bg-secondary text-white p-5 flex items-center justify-center"
    aria-label="Sidebar"
    v-if="showSidebarLocal"
  >
    <button
      @click="closeSidebar"
      class="absolute top-2 right-4 text-3xl cursor-pointer"
    >
      &times;
    </button>
    <div>
      <h1 class="text-xl mb-4">
        Weather Details for
        <span class="font-bold font-primary">{{ city }}</span>
      </h1>
      <h2 class="flex items-center mb-2">
        Temperature: <span class="text-xl ml-3">{{ temperature }}°C</span>
      </h2>
      <h2>
        Condition: <span class="text-xl ml-3"> {{ condition }}</span>
      </h2>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";

const showSidebarLocal = ref<boolean>(false);

onMounted(() => {
  showSidebarLocal.value = props.showSidebar;
})

const emits = defineEmits(["closeSidebar"]);

const props = defineProps<{
  city: string | null;
  temperature: number;
  condition: string;
  showSidebar: boolean;
}>();

watch(() => props.showSidebar, (newValue) => {
  if(props.showSidebar) {
    showSidebarLocal.value = newValue;
  }
});

const closeSidebar = () => {
  showSidebarLocal.value = false;
  emits("closeSidebar");
};
</script>
