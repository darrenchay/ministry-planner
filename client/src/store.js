import { combineReducers } from 'redux';
import adminReducer from './components/state/reducers/adminReducer'

import {createStore} from 'redux';

const allReducers = combineReducers({
    isAdmin: adminReducer
});

let store = createStore(
        allReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;