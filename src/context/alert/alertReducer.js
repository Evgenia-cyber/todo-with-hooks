export const SHOW_ALERT = 'alertReducer/SHOW_ALERT';
export const HIDE_ALERT = 'alertReducer/HIDE_ALERT';

export const alertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return ({...state,...action.payload,visible:true});
      case HIDE_ALERT:
      return ({...state,visible:false});
    default:
      return state;
  }
};
