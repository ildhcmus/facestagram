function user(state = {}, action) {
  switch(action.type) {
    case 'SET_USER' :
      console.log("SET_USER");
      const user = action.user;
      return user;
    case 'UNSET_USER': 
      console.log('UNSET_USER');
      return {
        id: null,
        email: null,
        picture: null,
        accessToken: null,
      };
    default:
      return state;
  }
}
export default user;
