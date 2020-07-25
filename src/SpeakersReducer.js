function speakersReducer(state, action){
  function updatefavourite(favouriteValue) {
    return state.map((item, index) => {
      if (item.id === action.sessionId) {
        item.favourite = favouriteValue;
        return item;
      }
      return item;
    });
  }
  switch (action.type) {
  case "setSpeakerList": {
    return action.data;
  }
  case "favourite": {
    return updatefavourite(true);
  }
  case "unfavourite": {
    return updatefavourite(false);
  }
  default:
    return state;
  }
}

export default speakersReducer;