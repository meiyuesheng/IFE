import {createAction} from 'redux-actions';
import * as Types from '../constants/CalendarActionType';


export const switchCalendar = createAction(Types.SWITCH_CALENDAR);

export const selectDate = createAction(Types.SELECT_DATE,date=>date);

export const changeCurrent = createAction(Types.CHANGE_CURRENT,direction=>direction);