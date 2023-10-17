<template>
  <ul>
    <li
      v-for="result in searchResults"
      :key="result.id"
      @click="selectCityHandler(result.name)"
      class="cursor-pointer text-blue-500 hover:underline"
      data-drawer-target="cta-button-sidebar"
      data-drawer-toggle="cta-button-sidebar"
    >
      {{ result.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { SearchResultInterface } from "../interface/WeatherInterface";

const props = defineProps<{
  searchResults: SearchResultInterface[];
  selectCityHandler: (result: string) => void;
}>();
</script>
