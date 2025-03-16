<template>
  <v-sheet class="border rounded">
    <v-stepper alt-labels>
      <v-stepper-header>
        <template
          v-for="(step, ind) in steps"
          :key="step"
        >
          <v-stepper-item class="pa-2">
            <template #title>
              <p class="mt-n3">
                {{ step }}
              </p>
            </template>
          </v-stepper-item>
          <v-divider
            v-if="ind !== 2"
            class="mt-4"
            thickness="6"
          />
        </template>
      </v-stepper-header>
    </v-stepper>
  </v-sheet>
</template>

<script setup>
// TODO switch these icons to match the selections made in the pickers
const steps = ['species', 'sex', 'phase']
</script>

<style scoped></style>
