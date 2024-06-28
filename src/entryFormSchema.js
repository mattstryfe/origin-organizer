import dayjs from 'dayjs'

export const schemaPhaseOptions = [
  { label: 'egg', type: 'egg', icon: ['mdi-egg'], iconSize: '' },
  { label: 'chick', type: 'chick', icon: ['mdi-bird'], iconSize: 'small' },
  { label: 'adult', type: 'adult', icon: ['mdi-bird'], iconSize: 'xx-large' },
  {
    label: 'hatchlings',
    type: 'hatchlings',
    icon: ['mdi-bird', 'mdi-bird', 'mdi-bird'],
    iconSize: 'x-large'
  },
  {
    label: 'hatch',
    type: 'hatch',
    icon: ['mdi-egg', 'mdi-egg', 'mdi-egg'],
    iconSize: 'x-large'
  }
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
  {
    label: 'Sex',
    type: 'dropdown',
    model: 'sex',
    items: ['male', 'female', 'unknown'],
    chips: true,
    class: 'v-col-5 mr-2'
  },
  {
    label: 'DoB',
    type: 'date',
    model: 'DoB',
    class: 'v-col-5',
    placeholder: dayjs().format('YYYY-MM-DD'),
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
      'weak hatchling'
    ]
  }
]

export const hatchingSchema = [{ label: 'type of hatch' }]
