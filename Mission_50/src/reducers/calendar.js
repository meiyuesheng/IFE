import {handleActions} from 'redux-actions';

import * as Types from '../constants/CalendarActionType';

const initialState = {current:new Date,show:false,selected:null};


export default handleActions({
	[Types.SWITCH_CALENDAR](state,action){
		const show = !state.show;
		return Object.assign({},state,{show});
	},
	[Types.SELECT_DATE](state,action){
		const selected = action.payload;
		var  current = new Date(state.current);
		if (selected instanceof Date) {
			current = new Date(selected);
		}

		return Object.assign({},state,{selected,current});
	},
	[Types.CHANGE_CURRENT](state,action){
		const current = new Date(state.current);
		const direction = action.payload;
		switch(direction){
			case 1: current.setMonth(current.getMonth()-1);break;
			case 2: current.setMonth(current.getMonth()+1);break;
			case 3: current.setFullYear(current.getFullYear()-1);break;
			case 4: current.setFullYear(current.getFullYear()+1);break;
		}

		return Object.assign({},state,{current});
	}

}
	,initialState);