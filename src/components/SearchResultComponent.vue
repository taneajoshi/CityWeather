<template>
  <h2 class="text-md font-medium">Select any city to view weather details.</h2>
  <ul class="mt-4">
    <li
      v-for="result in searchResults"
      :key="result.id"
      @click="selectCityHandler(result.name)"
      class="cursor-pointer text-blue-500 hover:underline p-2 transition duration-300 ease-in-out transform hover:bg-blue-100 hover:text-blue-700"
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
