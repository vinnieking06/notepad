import { combineReducers } from 'redux';

export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items;

    default:
      return state;
  }
}

export function token(state = '', action) {
  switch (action.type) {
    case 'ADD_TOKEN':
      return action.token;

    default:
      return state;
  }
}

export function id(state = '', action) {
  switch (action.type) {
    case 'ADD_ID':
      return action.id;

    default:
      return state;
  }
}

export function selectNote(state = {}, action) {
  switch (action.type) {
    case 'SELECT_NOTE':
      return action.note;
    case 'NEW_NOTE_VIEW':
      return action.note;
    default:
      return state;
  }
}
export default combineReducers({
  items,
  id,
  token,
  itemsHasErrored,
  itemsIsLoading,
  selectNote,
});
