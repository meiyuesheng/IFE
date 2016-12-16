
import {createAction} from 'redux-actions';
import * as Types from '../constants/DialogActionType';


export const switchDialog = createAction(Types.SWITCH_DIALOG,id=>id);


