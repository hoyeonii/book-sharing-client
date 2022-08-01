import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
const initialState = [];
function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      let exists = state.find((el) => el.id === action.payload.id);
      if (!exists) {
        return [...state, action.payload];
      } else {
        return state;
      }
    case "DELETE_ITEM":
      return state.filter((el) => el !== action.payload);
    case "DELETE_ALL":
      return initialState;
    default:
      return state;
  }
}
let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default reducer;
