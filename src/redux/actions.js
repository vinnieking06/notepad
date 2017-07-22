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

export function init(url, token) {
  return (dispatch) => {
    axios(url, { headers: { Authorization: token } })
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }

          dispatch(itemsIsLoading(false));

          return response;
        })
            .then(items => dispatch(itemsFetchDataSuccess(items.data)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function itemsFetchData(url, current, token) {
  return (dispatch) => {
    axios(url, { headers: { Authorization: token } })
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }

          dispatch(itemsIsLoading(false));

          return response;
        })
            .then(items => dispatch(itemsFetchDataSuccess(items.data)))
            .then(() => {
              if (current) {
                dispatch(selectNote(current.data ? current.data : current));
              }
            })
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function postNewNote(url, data, token) {
  return (dispatch) => {
    axios.post(url, data, { headers: { Authorization: token } })
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }
          return response;
        })
            .then(response => dispatch(itemsFetchData(url, response, token)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function updateNote(url, data, token, id) {
  return (dispatch) => {
    axios.put(url, data, { headers: { Authorization: token } })
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }
          return response;
        })
            .then(response => dispatch(itemsFetchData(`/${id}/notes`, response, token)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function deleteNote(url, token, id) {
  return (dispatch) => {
    axios.delete(url, { headers: { Authorization: token } })
        .then((response) => {
          if (!response.status === 200) {
            throw Error(response.statusText);
          }
          return response;
        })
            .then(response => dispatch(itemsFetchData(`/${id}/notes`, response, token)))
            .catch(() => dispatch(itemsHasErrored(true)));
  };
}

