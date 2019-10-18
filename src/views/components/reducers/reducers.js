import { combineReducers } from 'redux'
import { ADD_EMP } from '../actions/actions'

function emp(state, action) {
   switch (action.type) {
      case ADD_EMP:
         return {
            id: action.id,
            empid: action.empid,
			name:action.name,
			email:action.email
         }
      default:
         return state
   }
}
function emps(state = [], action) {
   switch (action.type) {
      case ADD_EMP:
         return [
            ...state,
            emp(undefined, action)
         ]
      default:
         return state
   }
}
const empApp = combineReducers({
   emps
})
export default empApp