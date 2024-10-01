import dayjs from 'dayjs'
import chickenIcon from '@/assets/svgs/chicken-svgrepo-com.svg'
import gooseIcon from '@/assets/svgs/goose-svgrepo-com.svg'
import duckIcon from '@/assets/svgs/duck-svgrepo-com.svg'

export const schemaSexOptions = [
  { label: 'male', sex: 'male', icon: 'mdi-gender-male', iconSize: '50'},
  { label: 'female', sex: 'female', icon: 'mdi-gender-female', iconSize: '50'},
  { label: 'unknown', sex: 'unknown', icon: 'mdi-help', iconSize: '50'},
]
export const schemaSpeciesOptions = [
  { label: 'chicken', species: 'chicken', component: chickenIcon, iconSize: '50'},
  { label: 'goose', species: 'goose', component: gooseIcon, iconSize: '50'},
  { label: 'duck', species: 'duck', component: duckIcon, iconSize: '50'},
]

export const schemaPhaseOptions = [
  { label: 'egg', phase: 'egg', icon: ['mdi-egg'], iconSize: '' },
  { label: 'chick', phase: 'chick', icon: ['mdi-bird'], iconSize: 'small' },
  { label: 'adult', phase: 'adult', icon: ['mdi-bird'], iconSize: 'xx-large' },
  // {
  //   label: 'hatchlings',
  //   phase: 'hatchlings',
  //   icon: ['mdi-bird', 'mdi-bird', 'mdi-bird'],
  //   iconSize: 'x-large'
  // },
  // {
  //   label: 'hatch',
  //   phase: 'hatch',
  //   icon: ['mdi-egg', 'mdi-egg', 'mdi-egg'],
  //   iconSize: 'x-large'
  // }
]

export const baseSchema = [
  {
    label: 'Name',
    type: 'text',
    model: 'name',
    class: 'v-col-5 mr-2'
  },
  {
    label: 'Breed(s)',
    type: 'dropdown',
    model: 'breed',
    items: ['breed1', 'breed2', 'breed3', 'breed4'],
    multiple: true,
    chips: true,
    class: 'v-col-6'
  },
  // {
  //   label: 'Sex',
  //   type: 'dropdown',
  //   model: 'sex',
  //   items: ['male', 'female', 'unknown'],
  //   chips: true,
  //   class: 'v-col-5 mr-2'
  // },
  {
    label: 'DoB',
    type: 'date',
    model: 'DoB',
    class: 'v-col-5',
    placeholder: dayjs().format('YYYY-MM-DD'),
    appendIcon: 'mdi-calendar-today',
    appendInnerAction: 'autoPopulateToToday'
  },
  {
    label: 'Notes',
    type: 'text-area',
    model: 'notes'
  },

]

export const eggSchema = []

export const chickSchema = [
  {
    label: 'characteristics',
    type: 'chip',
    model: 'characteristics',
    variant: 'outlined',
    items: [
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
  }
]

export const hatchingSchema = [{ label: 'type of hatch' }]
