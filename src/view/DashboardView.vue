<template>
  <!-- Instead of page component as a wrapper (which includes header with slot , main and footer structure) using a heading for saving time. -->
  <h1 class="text-2xl font-bold p-5 bg-blue-900 text-white">Weather Dashboard</h1>
  <div class="container mx-auto p-5">
    <div class="minHeight flex items-center justify-center">
      <div class="p-5 w-full sm:w-4/6 bg-white rounded-lg shadow-md">
        <h2 class="font-semibold mb-2">Enter a city</h2>
        <form @submit.prevent>
          <input
            v-model="searchQuery"
            @input.prevent="searchCitiesHandler"
            placeholder="Enter a city"
            class="w-full p-2 border rounded-lg focus:outline-none shadow-md"
          />
        </form>

        <!-- Search Results -->
        <div v-if="searchResults.length > 0" class="mt-4 border p-4 rounded-lg bg-white">
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

        <div v-if="error" class="mt-4 p-2 bg-red-100 text-red-600 rounded-lg">{{ error }}</div>
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
  const error = ref(null);
const selectedCityName = ref<string | null>(null);
const showSidebar = ref<boolean>(false);
const DEBOUNCE_TIME = 400;
let debounceTimer;


//Search cities
const searchCitiesHandler = (e) => {
  clearSearch();
  clearTimeout(debounceTimer); 
  debounceTimer = setTimeout(() => {
    if (searchQuery.value.trim() !== "") {
      fetchCitiesData(searchQuery.value);
    }
  }, DEBOUNCE_TIME );
};

/** Fetch cities data based on the search query
 * @param query
 *  **/
const fetchCitiesData = async (query: string) => {
  try {
    const data = await searchCities(query);
    searchResults.value = data;
  } catch (err) {
    error.value = err;
  }
};

/** Fetch details of the selected city
 * @param cityName
 *  **/
const selectCityHandler = async (cityName: string) => {
  try {
    const data = await selectCity(cityName);
    selectedCity.value = data;
    selectedCityName.value = cityName;
    showSidebar.value = true;
  } catch (err) {
    error.value = err;
  }
};

//Clear search history in case the value is empty.
function clearSearch() {
  if(searchQuery.value === "") {
    searchResults.value = [];
  }
}

//Close sidebar on click of close button in the weather details component.
function closeSidebarHandler() {
  showSidebar.value = false;
}
</script>

<style lang="scss" scoped>
.minHeight {
  min-height: calc(100vh - 110px);
}
</style>
