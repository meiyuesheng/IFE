
import {handleActions} from 'redux-actions';

import * as Types from '../constants/DialogActionType';


const initialState={id:'',status:false};




export default handleActions(
{
	[Types.SWITCH_DIALOG](state,action){
		const status = !state.status;
		const id = action.payload;

		return Object.assign({},{id,status});
}
}
	,initialState);


