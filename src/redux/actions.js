import axios from 'axios';

export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool,
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items,
  };
}

export function selectNote(noteData) {
  return {
    type: 'SELECT_NOTE',
    note: noteData,
  };
}

export function newNoteView() {
  return {
    type: 'NEW_NOTE_VIEW',
    note: {},
  };
}

export function itemsFetchData(url, current) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    axios(url)
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }

          dispatch(itemsIsLoading(false));

          return response;
        })
            .then(response => response)
            .then(items => dispatch(itemsFetchDataSuccess(items.data)))
            .then(() => {
              if (current) {
                dispatch(selectNote(current.data ? current.data : current));
              }
            })
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function postNewNote(url, data) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    axios.post(url, data)
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }

          dispatch(itemsIsLoading(false));
          return response;
        })
            .then(response => dispatch(itemsFetchData('http://localhost:3001/notes', response)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function updateNote(url, data) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    axios.put(url, data)
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }

          dispatch(itemsIsLoading(false));
          return response;
        })
            .then(response => dispatch(itemsFetchData('http://localhost:3001/notes', response)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function deleteNote(url) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    axios.delete(url)
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }

          dispatch(itemsIsLoading(false));
          return response;
        })
            .then(() => dispatch(itemsFetchData('http://localhost:3001/notes', {})))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

