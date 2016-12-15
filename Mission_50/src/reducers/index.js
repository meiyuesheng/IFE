
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import questionnaires from './questionnaires';
import dialog from './dialog';
import calendar from './calendar';
const rootReducer = combineReducers({
  routing,
  questionnaires,
  dialog,
  calendar
});

export default rootReducer;