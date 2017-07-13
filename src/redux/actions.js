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

export function itemsFetchData(url, current, initial) {
  return (dispatch) => {
    if (initial === true) {
      dispatch(itemsIsLoading(true));
    }
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
    axios.post(url, data)
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }
          return response;
        })
            .then(response => dispatch(itemsFetchData('/notes', response)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function updateNote(url, data) {
  return (dispatch) => {
    axios.put(url, data)
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }
          return response;
        })
            .then(response => dispatch(itemsFetchData('/notes', response)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function deleteNote(url) {
  return (dispatch) => {
    axios.delete(url)
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }
          return response;
        })
            .then(() => dispatch(itemsFetchData('/notes', {})))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

