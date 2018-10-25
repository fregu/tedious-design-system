export const hello = ({ dispatch, getState }) => next => action => {
  next(action)
  if (action.type === 'HELLO') {
    dispatch({type: 'HELLO_TO_YOU'})
  }
}
