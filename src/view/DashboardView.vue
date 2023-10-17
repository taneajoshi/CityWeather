<template>
  <!-- Instead of page component as a wrapper (which includes header with slot , main and footer structure) using a heading for saving time. -->
  <h1 class="text-2xl font-bold p-5">Weather Dashboard</h1>
  <div class="container mx-auto">
    <div class="minHeight flex items-center justify-center">
      <div class="p-5 w-full sm:w-2/4 bg-white rounded-lg shadow-md">
        <h2 class="font-semibold mb-2">Enter a city</h2>
        <form>
          <input
            v-model="searchQuery"
            @input.prevent="searchCitiesHandler"
            placeholder="Enter a city"
            class="w-full p-2 border rounded focus:outline-none"
          />
        </form>

        <!-- Search Results -->
        <div v-if="searchResults.length > 0" class="mt-4">
          <SearchResultComponent
            :searchResults="searchResults"
            :selectCityHandler="selectCityHandler"
          />
        </div>
        <!-- Search Results -->

        <!-- Details Sidebar -->
        <CityWeatherDetailComponent
          v-if="selectedCity"
          :city="selectedCityName"
          :temperature="selectedCity.temp_c"
          :condition="selectedCity.condition.text"
          :showSidebar="showSidebar"
          @closeSidebar="closeSidebarHandler"
        />
        <!-- /Details Sidebar -->

        <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CityWeatherDetailComponent from "../components/CityWeatherDetailComponent.vue";
import { searchCities, selectCity } from "../services/weather.service";
import {
  SearchResultInterface,
  CityInterface,
} from "../interface/WeatherInterface";
import SearchResultComponent from "../components/SearchResultComponent.vue";

const searchQuery = ref("");
const searchResults = ref<SearchResultInterface[]>([]);
const selectedCity = ref<CityInterface | null>(null);
const error = ref<string | null>(null);
const selectedCityName = ref<string | null>(null);
const showSidebar = ref<boolean>(false);

const searchCitiesHandler = async () => {
  try {
    const data = await searchCities(searchQuery.value);
    searchResults.value = data;
  } catch (err) {
    error.value = err.message;
  }
};

const selectCityHandler = async (cityName: string) => {
  try {
    const data = await selectCity(cityName);
    selectedCity.value = data;
    selectedCityName.value = cityName;
    showSidebar.value = true;
  } catch (err) {
    error.value = err.message;
  }
};

function closeSidebarHandler() {
  showSidebar.value = false;
}
</script>

<style lang="scss" scoped>
.minHeight {
  min-height: calc(100vh - 4rem);
}
</style>
