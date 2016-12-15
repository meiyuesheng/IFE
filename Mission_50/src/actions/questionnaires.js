
import { createAction } from 'redux-actions';
import * as Types from '../constants/QuestionnaireActionType';




export const addQuestionnaire = createAction(Types.ADD_QUESTIONNAIRE);

export const sortTable = createAction(Types.SORT_TABLE);

export const changeSelectType = createAction(Types.CHANGE_SELECT_TYPE);

export const addQuestion = createAction(Types.ADD_QUESTION,type=>type);

export const textEdit = createAction(Types.TEXT_EDIT,(content,qindex,oindex,)=>({qindex,oindex,content}));

export const saveEdit = createAction(Types.SAVE_EDIT,(content)=>content);

export const addOption = createAction(Types.ADD_OPTION,index=>index);

export const deleteQuestion = createAction(Types.DELETE_QUESTION,(qi,oi)=>({qi,oi}));


export const copyQuestion = createAction(Types.COPY_QUESTION,index=>index);

export const shiftQuestion = createAction(Types.SHIFT_QUESTION,(index,direction)=>({index,direction}));

export const textRequired = createAction(Types.TEXT_REQUIRED,index=>index);

export const publishQuestionnaire = createAction(Types.PUBLISH_QUESTIONNAIRE);

export const saveQuestionnaire = createAction(Types.SAVE_QUESTIONNAIRE);

export const editQuestionnaire = createAction(Types.EDIT_QUESTIONNAIRE,index=>index);

export const removeQuestionnaire = createAction(Types.REMOVE_QUESTIONNAIRE,index=>index);

export const fillQuestionnaire = createAction(Types.FILL_QUESTIONNAIRE,index=>index);

export const fillRadio = createAction(Types.FILL_RADIO,(questionIndex,optionIndex)=>({questionIndex,optionIndex}));

export const fillCheckbox = createAction(Types.FILL_CHECKBOX,(questionIndex,optionIndex)=>({questionIndex,optionIndex}));

export const submitQuestionnaire = createAction(Types.SUBMIT_QUESTIONNAIRE);

export const checkData = createAction(Types.CHECK_DATA,index=>index);

export const fillText = createAction(Types.FILL_TEXT,(index,value)=>({index,value}));

export const selectTime = createAction(Types.SELECT_TIME,date=>date);