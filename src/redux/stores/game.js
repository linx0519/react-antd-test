import { createStore } from "redux";
import Reducer from "../reducers/game";

const store = createStore(Reducer);

export default store;
