<script setup>
import { ref } from 'vue'

const id = ref('')


</script>
<template>
    <v-form>
        <v-text-field
        v-model="id"
        label="id"
        required></v-text-field>
        <v-select
label="Breed"
    :items="['Black Copper Marans', 'Black Silver Marans', 'Olive Egger', 'Cream Crested Legbar', 'Bielefelder', 'Double Silver Laced Barnevelder', 'Silver Laced Wayndotte', 'Ayam Cemani', 'Blue Laced Gold Wayndotte']">
</v-select>
    </v-form>
</template>