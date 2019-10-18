export const ADD_EMP = 'ADD_EMP'
let nextEmpId = 0;

export function addEmployee(empid,name,email) {
   return {
      type: ADD_EMP,
      id: nextEmpId++,
      empid,name,email
   };
}
