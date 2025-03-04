import dayjs from 'dayjs'
import chickenIcon from '@/assets/svgs/chicken-svgrepo-com.svg'
import gooseIcon from '@/assets/svgs/goose-svgrepo-com.svg'
import duckIcon from '@/assets/svgs/duck-svgrepo-com.svg'
import chickIcon from '@/assets/svgs/chick-hatched-from-egg-svgrepo-com.svg'

export const schemaSexOptions = [
  { label: 'male', sex: 'male', icon: 'mdi-gender-male', iconSize: '50' },
  { label: 'female', sex: 'female', icon: 'mdi-gender-female', iconSize: '50' },
  { label: 'unknown', sex: 'unknown', icon: 'mdi-help', iconSize: '50' }
]
export const schemaSpeciesOptions = [
  {
    label: 'chicken',
    species: 'chicken',
    component: chickenIcon,
    iconSize: '30'
  },
  { label: 'goose', species: 'goose', component: gooseIcon, iconSize: '30' },
  { label: 'duck', species: 'duck', component: duckIcon, iconSize: '30' }
]

export const schemaPhaseOptions = [
  { label: 'egg', phase: 'egg', icon: 'mdi-egg', iconSize: '30' },
  { label: 'chick', phase: 'chick', component: chickIcon, iconSize: '40' },
  { label: 'adult', phase: 'adult', icon: 'mdi-bird', iconSize: '30' }
]

export const baseSchema = [
  {
    label: 'DoB',
    type: 'date',
    model: 'DoB',
    class: 'v-col-8',
    placeholder: dayjs().format('YYYY-MM-DD'),
    appendIcon: 'mdi-calendar-today',
    appendInnerAction: 'autoPopulateToToday'
  },
  {
    label: 'Name',
    type: 'text',
    model: 'name',
    class: 'v-col-8 mr-2'
  },
  {
    label: 'Notes',
    type: 'text-area',
    model: 'notes'
  }
]
export const schemaChickenBreedOptions = [
  'Marans - Black Copper',
  'Marans - Black Silver',
  'Marans - Blue Silver',
  'Olive Egger',
  'Cream Legbar',
  'Bielefelder',
  'Plymouth Rock (Barred Rock)',
  'Ameraucana - Lavender',
  'Turken',
  'Ayam Cemani',
  'Ameraucana - Chocolate',
  'Easter Egger',
  'Silkie',
  'Cochin',
  'Brahma',
  'New Hampshire Red',
  'Buff Orpington',
  'Isa Brown',
  'Marans',
  'Ancona',
  'Delaware',
  'Faverolles',
  'Welsummer',
  'Dominique'
]
export const rawSchemaCharacteristicOptions = [
  'flighty',
  'bold',
  'small',
  'large',
  '1st to crow',
  '1st to lay',
  '1st to die',
  'social',
  'forager',
  'noisy',
  'bully',
  'last to hatch',
  '1st to hatch',
  'weak hatchling',
  'new one'
]
