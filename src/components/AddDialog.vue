<template>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn prepend-icon="mdi-plus" size="small" text="Add" v-bind="activatorProps"></v-btn>
        </template>

        <v-card>
            <v-toolbar>

                <v-toolbar-title>Add</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items>
                    <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-form @submit.prevent>
                <v-text-field v-model="birdId" label="ID"></v-text-field>
                <v-select v-model="selectedBreed" clearable label="Breed" :items="breeds"
                    placeholder="Select a breed"></v-select>

                <v-btn block class="mt-2" @click="submit">Submit</v-btn>
                <v-btn block class="mt-2" @click="deleteAll">Delete All</v-btn>
            </v-form>

        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, } from 'firebase/auth'
import { setDoc, doc, deleteDoc, collection, getDocs } from 'firebase/firestore'
import db from '../plugins/firebase'


const dialog = ref(false)
const auth = getAuth()
const birdId = ref('')
const selectedBreed = ref('')
const breeds = ref(['Marans', 'Olive Egger', 'Ameraucana', 'Plymouth Rock', 'Wyandotte', 'Sussex', 'Brahma', 'Polish', 'Houdan', 'Easter Egger', 'Cream Legbar', 'Barnevelder'])

const submit = async () => {
    console.log('birdId', birdId.value)
    console.log('auth', auth.currentUser?.uid)
    await setDoc(doc(db, 'users', auth.currentUser?.uid, 'birds', birdId.value), {
        id: birdId.value,
        breed: selectedBreed.value
    })
}

const deleteAll = async () => {
    console.log('auth', auth.currentUser?.uid)
    const allBirds = await getDocs(collection(db, 'users', auth.currentUser?.uid, 'birds'))
    console.log('allBirds', allBirds.docs)
    const deletePromises = allBirds.docs.map((document) => deleteDoc(doc(db, 'users', auth.currentUser?.uid, 'birds', document.id)));
    await Promise.all(deletePromises);
}

</script>

<style scoped></style>
