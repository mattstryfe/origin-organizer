export function notesValidator(notes) {
  if (typeof notes === 'object') {
    return notes
  } else {
    return {
      active: '',
      archived: []
    }
  }
}
