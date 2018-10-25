export const user = (state = {}, {type, ...action}) => {
  switch (type) {
    case 'SET_USER':
      return {...action}
    default:
      return state
  }
}
