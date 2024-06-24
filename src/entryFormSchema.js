export const schemaOptions = [
  { label: 'egg', type: 'egg', icon: ['mdi-egg'], iconSize: '' },
  { label: 'chick', type: 'chick', icon: ['mdi-bird'], iconSize: 'small' },
  { label: 'adult', type: 'adult', icon: ['mdi-bird'], iconSize: 'xx-large' },
  { label: 'hatchlings', type: 'hatchlings', icon: ['mdi-bird', 'mdi-bird', 'mdi-bird'], iconSize: 'x-large' },
  { label: 'hatch', type: 'hatch', icon: ['mdi-egg', 'mdi-egg', 'mdi-egg'], iconSize: 'x-large' },
]

export const baseSchema = [
  {
    label: 'name',
    type: 'text',
    model: 'firstName'
  },
  {
    label: 'breed',
    type: 'dropdown',
    model: 'breed',
    items: ['breed1', 'breed2', 'breed3', 'breed4'],
    multiple: true,
    chips: true
  },
  {
    label: 'sex',
    type: 'dropdown',
    model: 'sex',
    items: ['male', 'female'],
    chips: true
  },
  {
    label: 'notes',
    type: 'text-area',
    model: 'notes'
  }
]

export const eggSchema = []

export const chickSchema = []

export const hatchingSchema = [{ label: 'type of hatch' }]
