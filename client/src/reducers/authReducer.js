import isEmpty from '../validation/is-empty'
import {SET_CURRENT_USER} from '../actions/types'
 const initiaState ={
  isAuthenticated:false,
  user:{}
}
export default function(state=initiaState,action){
    switch(action.type){
       case SET_CURRENT_USER:
       return {
         ...state,
         isAuthenticated:!isEmpty(action.payload),
         user:action.payload
       }

      default:
      return state
    }
}