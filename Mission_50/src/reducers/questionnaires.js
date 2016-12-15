
import { handleActions } from 'redux-actions';
import * as Types from '../constants/QuestionnaireActionType';
import {RADIO,CHECKBOX,TEXT} from '../constants/QuestionType';
const date1 = new Date(2012,1);
const date2 = new Date(2013,1);

const isInstanceOf = type => element => Object.prototype.toString.call(element) === `[object ${type}]`;

export const isArray = isInstanceOf("Array");
export const isDate = isInstanceOf("Date");
export const isFunction = isInstanceOf("Function");

export const isInteger = num => typeof num === "number" && parseInt(num, 10) === num;

export const cloneObject = (src) => {
    let tar = new src.constructor();
    for (let key of Object.keys(src)) {

        switch (typeof src[key]) {
            case "number":
            case "string":
            case "boolean": tar[key] = src[key]; break;
            case "object": {
                switch (true) {
                    case isArray(key): tar[key] = [...src[key]]; break;
                    case isDate(key): tar[key] = new Date(src[key].valueOf()); break;
                    default: tar[key] = cloneObject(src[key]);
                }
                break;
            }
        }
    }
    return tar;
};

export const mapChildrenToArray = (children) => {
    const array = [];
    Children.forEach(children, child => array.push(child));
    return array;
};

export const mapHsvToRgb = (h, s, v) => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const [p, q, t] = [v * (1 - s), v * (1 - f * s), v * (1 - (1 - f) * s)];
    let [r, g, b] = [0, 0, 0];
    switch (i) {
        case 0: [r, g, b] = [v, t, p]; break;
        case 1: [r, g, b] = [q, v, p]; break;
        case 2: [r, g, b] = [p, v, t]; break;
        case 3: [r, g, b] = [p, q, v]; break;
        case 4: [r, g, b] = [t, p, v]; break;
        case 5: [r, g, b] = [v, p, q]; break;
    }
    [r, g, b] = [r, g, b].map(e => Math.floor(e * 256));
    return `rgb(${r}, ${g}, ${b})`;
};


 const list=[
          //每一份问卷的结构
          {
          title:'这里是标题',
          time:date1,
          //未发布/已发布/已结束 用 0、1、2来表示。
          status:0,
          //一个用来记录问卷填写的数组，每一份问卷占一项。[0],[1],[3]
          data:[],
          //用一个数组来保存 每一份问卷的问题。
          question:[
                //每一个问题抽象为一个对象。
                //type:radio/mutiple/text
                {type:RADIO,
                title:'这是问题的题目',
                //input(分为radio,checkbox,textarea)
                //如果是radio和chenbox answer就为数组[{id:1,}]
                answer:[],
                }
              ]
          },
          {
          title:'这里是标题',
          time:date2,
          //未发布/已发布/已结束
          status:1,
          data:[[2],[3]],
          //用一个数组来保存 每一份问卷的问题。
          question:[
                //每一个问题抽象为一个对象。
                //type:radio/mutiple/text
                {type:RADIO,
                title:'这是问题的题目',
                //input(分为radio,checkbox,textarea)
                //如果是radio和chenbox answer就为数组[{id:1,}]
                answer:['选项1','选项二','选项三','选项四']
                }
              ]
          }
        ];


const initEdit = {
    type:false,
  
    index:-1,
    title:'这里是标题',
    question:[{title:'单选题',type:RADIO,answer:['选项1','选项二','选项三','选项四']},
              {title:'多选题',type:CHECKBOX,answer:['选项1','选项二','选项三','选项四']},
              {title:'文本题',type:TEXT,required:false,content:''}],
    data:[],
    time:0,
    qindex:-1,
    oindex:-1,
    editing:{typing:false,content:''}
}  ;  



//定义一个state用来实验

const initialState = {
  questionnaires:list,
  edit:cloneObject(initEdit),
  sort:false
      };

    const lists = initialState.questionnaires;
    const edits= {edit:{...cloneObject(initEdit),index:lists.length}};
    const newstates = Object.assign({},initialState,edits);
    console.log("newstate:");
    console.log(newstates);

console.log(initialState);

// handleAction的作用：把reducer和 Action的类型绑定起来。action的类型 直接等于 对于的reducer的名称

export default handleActions({
[Types.ADD_QUESTIONNAIRE](state,action){
    const {questionnaires} = state;
    const newstate = Object.assign({},state,{edit:{...cloneObject(initEdit),index:questionnaires.length}});
  
    return newstate;
},
[Types.SORT_TABLE](state,action){
  const lsit = state.questionnaires;
  const sorted = state.sort;
  list.sort((a,b)=>{
    if (sorted) {
      return a.time-b.time;
    }
    else{
      return b.time-a.time;
    }
  });
  return Object.assign({},state,{questionnaires:list},{sort:!sorted});
},
[Types.CHANGE_SELECT_TYPE](state,action){
  const edit = cloneObject(state.edit);
      edit.type = !edit.type;
  return Object.assign({},state,{edit:edit});
},
[Types.ADD_QUESTION](state,action){
    const type = action.payload;
    var question = state.edit.question;
    switch(type){
      case RADIO:question.push({title:'单选题',type:RADIO,answer:['选项1','选项二','选项三','选项四']});break;
      case CHECKBOX:question.push({title:'多选题',type:CHECKBOX,answer:['选项1','选项二','选项三','选项四']});break;
      case TEXT:question.push({title:'文本题',type:TEXT,required:false,content:''});break;

    }
    state.edit.question=question;
    return Object.assign({},state);
},
[Types.TEXT_EDIT](state,action){
    const {qindex,oindex,content} = action.payload;
    if(qindex!==-1&&oindex&&state.edit.question[qindex]==='TEXT'){
  return Object.assign({},state,{edit:{...cloneObject(state.edit),qindex,editing:{typing:true,content} }});
    }else{
        
        return Object.assign({},state,
          {edit:{...cloneObject(state.edit),qindex:qindex,oindex:oindex,editing:{typing:true,content}}});
      }

},
[Types.SAVE_EDIT](state,action){
  const content = action.payload;
  const {qindex,oindex} = state.edit;
  switch(true){
    case qindex === -1:state.edit.title = content;break;
    case oindex === -1:state.edit.question[qindex].title = content;break;
    default:state.edit.question[qindex].answer[oindex] = content;
  }

  return Object.assign({},state,{edit:
    {...cloneObject(state.edit),qindex:-1,oindex:-1,editing:{typing:false,content:''}}});

},
[Types.ADD_OPTION](state,action){
  const index = action.payload;
  const answer = state.edit.question[index].answer;
  answer.push(`选项${answer.length+1}`);
  state.edit.question[index].answer = answer;
    
  return Object.assign({},state);
},
[Types.DELETE_QUESTION](state,action){
  const {qi,oi} = action.payload;
  const {edit} =state;
  if(oi===-1){
      edit.question.splice(qi,1);
      return Object.assign({},state,edit);
  }
  else{
    edit.question[qi].answer.splice(oi,1);
    return Object.assign({},state,edit);
  }
},

[Types.COPY_QUESTION](state,action){
  const index = action.payload;
  const {edit} = state;
  const q = edit.question[index];
  edit.question.splice(index+1,0,q);
  return Object.assign({},state,{edit});
},
[Types.SHIFT_QUESTION](state,action){
  const {index,direction} = action.payload;
  const {edit} = state;
  const q = edit.question.splice(index,1);
  edit.question.splice(index+direction,0,q[0]);
  return Object.assign({},state,{edit});
},
[Types.TEXT_REQUIRED](state,action){
  const index = action.payload;
  const {edit} = state;
  edit.question[index].required = !edit.question[index].required;
  return Object.assign({},state,{edit});

},
[Types.SAVE_QUESTIONNAIRE](state,action){
  const {questionnaires,edit} = state;
  const {title,time,question,index} = edit;
  const list = questionnaires;
  
   list[index] ={title,time,question,status:0,data:[]};
  return Object.assign({},state,{questionnaires:list});
},
[Types.PUBLISH_QUESTIONNAIRE](state,action){
   const {questionnaires,edit} = state;
   questionnaires[edit.index].status = 1;
    return Object.assign({},state,{questionnaires},{edit});

},
[Types.EDIT_QUESTIONNAIRE](state,action){
  const {questionnaires} = state ;
  const index = action.payload;
    const {title,question,time} = state.questionnaires[index];
  
  return Object.assign({},state,{edit:{...cloneObject(initEdit),title,time,question,index}});

},
[Types.REMOVE_QUESTIONNAIRE](state,action){
  const {questionnaires} = state;
  const index = action.payload;
  const list = questionnaires;
  list.splice(index,1);

  return Object.assign({},state,{questionnaires:list});
},
[Types.FILL_QUESTIONNAIRE](state,action){
  const {questionnaires} = state;
  const index = action.payload;
  const data = [];
  const {title,question,status,time} = questionnaires[index];
  question.forEach((item,index)=>{
    switch(item.type){
      case RADIO:data.push(-1);break;
      case CHECKBOX:data.push([]);break;
      case TEXT : data.push('');break;

    }

  });

  return Object.assign({},state,{edit:{...cloneObject(initEdit),title,question,status,time,data,index}});
},
[Types.FILL_RADIO](state,action){
  const {edit} = state;
  const {questionIndex,optionIndex} = action.payload;
  edit.data[questionIndex]=optionIndex;
  return Object.assign({},state,{edit});
},
[Types.FILL_CHECKBOX](state,action){
  const {edit} = state;
  const {questionIndex,optionIndex} = action.payload;
  const index = edit.data[questionIndex].indexOf(optionIndex);
  index===-1?edit.data[questionIndex].push(optionIndex):edit.data[questionIndex].splice(index,1);
  
  return Object.assign({},state,{edit});

},
[Types.FILL_TEXT](state,action){
    const {edit} =state;
    const {index,value} = action.payload;
    edit.data[index]=value;
    return Object.assign({},state,{edit});
},
[Types.SUBMIT_QUESTIONNAIRE](state,action){
  const {edit,questionnaires} = state;
    questionnaires[edit.index].data.push(edit.data);

    return Object.assign({},state,{questionnaires});

},
[Types.CHECK_DATA](state,action){
    const {edit,questionnaires} = state;
    const index = action.payload;
    const {title,data,question} = questionnaires[index]; 
    return Object.assign({},state,{edit:{...cloneObject(initEdit),title,data,question}});

},
[Types.SELECT_TIME](state,action){
  const {edit} = state;
   edit.time = action.payload;

  return Object.assign({},state,{edit});
}


}, initialState);

