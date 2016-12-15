import React,{Component} from 'react';
import * as questionnaireActions from '../../actions/questionnaires';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import InputText from '../../components/Input/InputText';
import styles from './Edit.scss';
import {RADIO,CHECKBOX,TEXT} from '../../constants/QuestionType';
import {Link} from 'react-router';
import * as dialogsAction from '../../actions/dialogs';
import {Dialog,Calendar} from '../../components';
import {FaBeer,FaSquareO,FaCircleO,FaPlus,FaTrash,FaTimes} from 'react-icons/lib/fa';



import * as calendarAction from '../../actions/calendar';

class Edit extends Component {
	
	constructor(props){
		super(props);
	}

	renderType(){
		const {type} =this.props.state.edit;
		if(type){

			return (
				<div className={styles['add-question-type']}
				onClick={this.handleAddQuestion.bind(this)}
				>
					<button ref={RADIO} className={styles['button']}>单选</button>
					<button ref={CHECKBOX} className={styles['button']}>多选</button>
					<button ref={TEXT} className={styles['button']}>文本</button>
					
				</div>
				);
		}

	}

	componentDidMount(){
		const {selectDate} = this.props.actions;
		const {time} =this.props.state.edit;
	
		selectDate(time);
	};

	handleAddOption(index){
		const {addOption} = this.props.actions;
		return ()=>addOption(index);
	}
	
	handleCopyQuestion(index){
		const {copyQuestion}= this.props.actions;
		return ()=>copyQuestion(index);
	}

	handleShiftQuestion(index,direction){
		const {shiftQuestion} = this.props.actions;
		return ()=>shiftQuestion(index,direction);
	}
	
	renderQuestionOperate(index){
		const {question} =this.props.state.edit;
		return (
		<div className={styles['question-operate']}>
			 <span onClick={this.handleCopyQuestion(index)}>复用</span>
			 <span onClick={this.handleDelete(index,-1)}><FaTrash/></span>
			 {(index!==0)? <span onClick={this.handleShiftQuestion(index,-1)}>上移</span>:''}
				{(index+1)!==question.length?<span onClick={this.handleShiftQuestion(index,1)}>下移</span>:''}
				</div>
		);
	}

	handleTextRequired(index){
		const {textRequired} = this.props.actions;
		return ()=>textRequired(index);		
	}
	renderQuestion(){
		const {question,qindex,oindex,editing} = this.props.state.edit;
		console.log("edit:");
		console.log(this.props.state.edit);
		
		if (question.length===0) {return};

		var arr=question.map((current,index)=>{
				
					if (qindex===index&&oindex===-1&&current.type!==TEXT) {
						return (
							<div key={index} className={styles['question']}>
								<span>{`Q${index+1}`}</span>
								<InputText
								value={editing.content}
								className={styles['question-title']}
								onEdit={this.handleTextEdit(index,-1)}
								onSaveEdit={this.handleSaveEdit(index,-1)}
								/>
								{this.renderOption(index)}
								<div className={styles['add-option']}
								onClick={this.handleAddOption(index)}
								>
									<span className={styles['add-option-btn']}><FaPlus/></span>	
								</div>
								{this.renderQuestionOperate(index)}
							</div>
							);

					}else if(current.type===TEXT){
						return (
								<div key={index} className={styles['question']}>
									<span>{`Q${index+1}`}</span>
									<div
									className={styles['question-title']}
									>
									{current.title}
									</div>
								{this.renderOption(index)}
								<div><input id="text-checkbox"onChange={this.handleTextRequired(index)} type='checkbox'/><label htmlFor="text-checkbox">此题是否必填</label></div>
								{this.renderQuestionOperate(index)}
								</div>
							);
					}
					else{
						const content = question[index].title;
						return (
							<div key={index} className={styles['question']}>
								<span>{`Q${index+1}`}</span>
								<div 
								className={styles['question-title']}
								onClick={this.handleTextEdit(index,-1,content)}
								>
								{content}
								</div>
							{this.renderOption(index)}
							<div className={styles['add-option']}
							onClick={this.handleAddOption(index)}
							>
							<span className={styles['add-option-btn']}><FaPlus/>	</span>	
							</div>
								{this.renderQuestionOperate(index)}
							</div>
							);
					}


		});
		return arr;
		
	}
	
	handleDelete(qi,oi){
		const {deleteQuestion} = this.props.actions;
		return ()=>deleteQuestion(qi,oi);

	}
	renderOption(index){
		const {question,qindex,oindex,editing} = this.props.state.edit;

		if (question[index].type===TEXT) {
			return (
				<div className={styles['question-option']}>
				<textarea
				type="textarea"
				/>
				</div>
				);

		};

		return question[index].answer.map((item,i)=>{
			if (index===qindex&&i===oindex&&editing.typing===true) {
				return (
					<div key={`${index}-${i}`} className={styles['question-option']}>
						<span className={(question[index].type===RADIO)?
							styles['radio-icon']:styles['checkbox-icon']}>
							{(question[index].type===RADIO)?
							<FaCircleO/>:<FaSquareO/>}
							</span>
						<InputText 
						className={styles['question-option-input']}
						value={editing.content}
						onEdit={this.handleTextEdit(index,i)}
						onSaveEdit={this.handleSaveEdit(index,i)}
						/>
						<span className={styles['delete-option']}onClick={this.handleDelete(index,i)}><FaTrash/></span>
					</div>
					);
			}
			else{
				return (
					<div key={`${index}-${i}`} className={styles['question-option']}>
						<span className={(question[index].type===RADIO)?
							styles['radio-icon']:styles['checkbox-icon']}>
							{(question[index].type===RADIO)?
							<FaCircleO/>:<FaSquareO/>}
							</span>
						<div
						className={styles['question-option-text']}
						onClick={this.handleTextEdit(index,i,item)}
						>
						{item}
						</div>
						<span className={styles['delete-option']} onClick={this.handleDelete(index,i)}><FaTrash/></span>

					</div>
					);
			}
		});


		
	}
	handleAddQuestion(event){
		const {changeSelectType,addQuestion} = this.props.actions;
		changeSelectType();
		
		[RADIO,TEXT,CHECKBOX].forEach(current=>event.target===this.refs[current]&&addQuestion(current));

	};

	handleSelectType(){
		const {changeSelectType} = this.props.actions;
		changeSelectType();
	}
	handleTextEdit(qindex,oindex,content){
		const { textEdit} = this.props.actions;
		return (event)=>{
			console.log("oindex");
			console.log(qindex);
			console.log(oindex);

			return textEdit(content||event.target.value,qindex,oindex);
		}
	}

	handleSaveEdit(){
		const {saveEdit} =this.props.actions;
		return (event)=>saveEdit(event.target.value);
	}

	handleSaveQuestionnaire(){
		const {saveQuestionnaire,switchDialog} = this.props.actions;
		const id="save";

		return ()=>{saveQuestionnaire();
					switchDialog(id);
			};

	}
	

	handlePublishQuestionnaire(){
		const {publishQuestionnaire,saveQuestionnaire,switchDialog} = this.props.actions;
		switchDialog('');
		saveQuestionnaire();
		publishQuestionnaire();
	}
	
	renderTitle(){
		const {qindex,oindex,editing,title} = this.props.state.edit;
		if(qindex===-1&&oindex===-1&&editing.typing===true){
			const content = editing.content;
				return (
					<InputText 
					 value={content}
					 className={styles['input-title']}
					onEdit={this.handleTextEdit(-1,-1)}
					onSaveEdit={this.handleSaveEdit()}
					/>

					)

		}
		else{
			const {title} = this.props.state.edit;
			return (

				<h1 ref='title' className={styles['input-title']}
				onClick={this.handleTextEdit(-1,-1,title)}
				>
				{title}
				</h1>
				);
		}
	}

	handleCancel(){
	const {switchDialog} = this.props.actions;
	console.log("调用cancle");
	return ()=>switchDialog('');
}
	handlePublishDialog(){
		const {switchDialog} = this.props.actions;

		return ()=>switchDialog('publish');
				
		
	}
	render(){
		const {edit} = this.props.state;
		const {dialog,calendar} = this.props;
		const time = edit.time;
		return (
			<div>
					<div className={styles['title']}>
					 {this.renderTitle()}
					 </div>
					<hr/>
				
					<div>
						{this.renderQuestion()}
					</div>
	

					<div className={styles['add-question']}>
					
						<span>
						{this.renderType()}
						</span>

						<span 
						className={styles['add-question-btn']}
						onClick={this.handleSelectType.bind(this)}
						>
						添加问题
						</span>
					</div>


					<hr/>
					
					<label>问卷截止日期</label>
					<Calendar
					calendar={calendar}
					actions={this.props.actions}
					/>
					<input type='button' value="保存问卷" className={styles['button']} 
					onClick={this.handleSaveQuestionnaire()}
					/>
					
					
						<input className={styles['button']} 
						value="发布问卷"
						type="button"
						onClick={this.handlePublishDialog()}
						/>

					<Dialog 
						title="提示"
						id='save'
						dialog={dialog}
						handleCancel={this.handleCancel()}
						switchDialog = {this.props.actions.switchDialog}
						>
							<div>
							<div className={styles['dialog-content']}>
								<p>问卷已经保存</p>
							</div>
							<div className={styles['dialog-footer']}>
								<button onClick={this.handleCancel()}>
								确认
									</button>
									
								</div>
							</div>
						</Dialog>


					{!(edit.time instanceof Date)?(
						<Dialog 
						title="提示"
						id={'publish'}
						dialog={dialog}
						handleCancel={this.handleCancel()}
						switchDialog = {this.props.actions.switchDialog}
						>
							<div>
							<div className={styles['dialog-content']}>
								<p>请设置问卷截止日期</p>
							</div>
							<div className={styles['dialog-footer']}>
								<button onClick={this.handleCancel()}>
								确定
									</button>
									
								</div>
							</div>
						</Dialog>
						):(
						<Dialog 
						title="提示"
						id='publish'
						dialog={dialog}
						handleCancel={this.handleCancel()}
						switchDialog = {this.props.actions.switchDialog}
						>
							<div>
							<div className={styles['dialog-content']}>
								<p>是否发布问卷</p>
								<p>{`本问卷截止日期为
							${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`}</p>
							</div>
							<div className={styles['dialog-footer']}>
								<Link to='/'>
									<button onClick={this.handlePublishQuestionnaire.bind(this)}>
									确定
									</button>
								</Link>
								<button onClick={this.handleCancel()}>
								取消
									</button>
								</div>
							</div>
						</Dialog>
						)
					}
			</div>
			);
		}
}



function mapStateToProps(state) {
	console.log("map-state:");
	console.log(state);
	return{
		state:state.questionnaires,
		dialog:state.dialog,
		calendar:state.calendar
	};
}
function mapDispatchToProps(dispatch){
	return{
		actions:Object.assign({},
			bindActionCreators(questionnaireActions,dispatch),
			bindActionCreators(dialogsAction,dispatch),
			bindActionCreators(calendarAction,dispatch))
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Edit);


