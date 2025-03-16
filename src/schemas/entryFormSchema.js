import dayjs from 'dayjs'
import chickIcon from '@/assets/svgs/chick-hatched-from-egg-svgrepo-com.svg'
import chickenIcon from '@/assets/svgs/chicken-svgrepo-com.svg'
import duckIcon from '@/assets/svgs/duck-svgrepo-com.svg'
import gooseIcon from '@/assets/svgs/goose-svgrepo-com.svg'

export const baseSchema = [
  {
    appendIcon: 'mdi-calendar-today',
    appendInnerAction: 'autoPopulateToToday',
    class: 'v-col-8',
    label: 'DoB',
    model: 'DoB',
    placeholder: dayjs().format('YYYY-MM-DD'),
    type: 'date'
  },
  {
    class: 'v-col-8 mr-2',
    label: 'Name',
    model: 'name',
    type: 'text'
  }
]

export const rawSchemaCharacteristicOptions = [
  '1st to crow',
  '1st to die',
  '1st to hatch',
  '1st to lay',
  'bold',
  'bully',
  'flighty',
  'forager',
  'large',
  'last to hatch',
  'new one',
  'noisy',
  'small',
  'social',
  'weak hatchling'
]

export const schemaChickenBreedOptions = [
  'Ameraucana - Chocolate',
  'Ameraucana - Lavender',
  'Ancona',
  'Ayam Cemani',
  'Bielefelder',
  'Brahma',
  'Buff Orpington',
  'Cochin',
  'Cream Legbar',
  'Delaware',
  'Dominique',
  'Easter Egger',
  'Faverolles',
  'Isa Brown',
  'Marans',
  'Marans - Black Copper',
  'Marans - Black Silver',
  'Marans - Blue Silver',
  'New Hampshire Red',
  'Olive Egger',
  'Plymouth Rock (Barred Rock)',
  'Silkie',
  'Turken',
  'Welsummer'
]

export const schemaPhaseOptions = [
  {
    icon: 'mdi-bird',
    iconSize: '30',
    label: 'adult',
    phase: 'adult'
  },
  {
    component: chickIcon,
    iconSize: '40',
    label: 'chick',
    phase: 'chick'
  },
  {
    icon: 'mdi-egg',
    iconSize: '30',
    label: 'egg',
    phase: 'egg'
  }
]

export const schemaSexOptions = [
  {
    icon: 'mdi-gender-female',
    iconSize: '50',
    label: 'female',
    sex: 'female'
  },
  {
    icon: 'mdi-gender-male',
    iconSize: '50',
    label: 'male',
    sex: 'male'
  },
  {
    icon: 'mdi-help',
    iconSize: '50',
    label: 'unknown',
    sex: 'unknown'
  }
]

export const schemaSpeciesOptions = [
  {
    component: chickenIcon,
    iconSize: '30',
    label: 'chicken',
    species: 'chicken'
  },
  {
    component: duckIcon,
    iconSize: '30',
    label: 'duck',
    species: 'duck'
  },
  {
    component: gooseIcon,
    iconSize: '30',
    label: 'goose',
    species: 'goose'
  }
]
