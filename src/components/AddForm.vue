<template>
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent>
        <v-text-field
          v-model="birdId"
          label="ID"
        ></v-text-field>
        <v-select v-model="selectedBreed" clearable label="Breed" :items="breeds" placeholder="Select a breed"></v-select>

        <v-btn block class="mt-2" @click="submit">Submit</v-btn>
      </v-form>
    </v-sheet>
  </template>

<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { setDoc, doc, collection, getFirestore } from 'firebase/firestore'
import db from '../plugins/firebase'
import { ref } from 'vue'

const auth = getAuth()
const birdId = ref('null')
const selectedBreed = ref('null')
const breeds = ref(['Marans', 'Olive Egger', 'Ameraucana', 'Plymouth Rock', 'Wyandotte','Sussex','Brahma', 'Polish', 'Houdan', 'Easter Egger', 'Cream Legbar', 'Barnevelder'])

const submit = async () => {
  console.log('birdId', birdId.value)
    console.log('auth', auth.currentUser?.uid)
    await setDoc(doc(db, 'users', auth.currentUser?.uid, 'birds', birdId.value), {
        id: birdId.value,
        breed: selectedBreed.value
    })
}
</script>