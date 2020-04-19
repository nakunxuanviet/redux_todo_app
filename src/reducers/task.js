import * as types from "./../constants/ActionTypes";
import * as uuid from "uuid";

var dataLocalStorage = JSON.parse(localStorage.getItem("tasks"));
var initialState = dataLocalStorage ? dataLocalStorage : [];

var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

var myReducer = (state = initialState, action) => {
  var id = '';
  var index = -1;
  switch (action.type) {
    case types.LIST_ALL:
      return state;

    case types.ADD_TASK:
      var newTask = {
        id: uuid.v4(),
        name: action.task.name,
        status: action.task.status,
      };
      state.push(newTask);

      // action.task.id = uuid.v4();
      // state.push(action.task);
      // console.log("state", state);

      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];

    case types.UPDATE_STATUS:
      id = action.id;
      index = findIndex(state, id);
      state[index] = { ...state[index], status: !state[index].status };
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];

    case types.DELETE_TASK:
      id = action.id;
      index = findIndex(state, id);
      state.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];

    default:
      return state;
  }
};

export default myReducer;
