import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Table,Column,SortableTh,Dialog} from '../../components';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import * as questionnairesAction from '../../actions/questionnaires';
import styles from './Home.scss';
import * as dialogsAction from '../../actions/dialogs';
import {FaBeer,FaSquareO} from 'react-icons/lib/fa';


function mapStateToProps(state) {
	console.log('home::');
	console.log(state);
	return{
		qn:state.questionnaires,
		dialog:state.dialog
	};
}
function mapDispatchToProps(dispatch) {
	return{
		actions:Object.assign({},bindActionCreators(questionnairesAction,dispatch),
			bindActionCreators(dialogsAction,dispatch))
			};
}

class Home extends Component{

	 constructor(props) {
        super(props);
        console.log("home:");
        console.log(this.props);
	};

	
sorTable(){
	this.props.actions.sortTable();
};

handleEdit(rowIndex){
	const {editQuestionnaire} = this.props.actions;
	return ()=>editQuestionnaire(rowIndex);
}

handleRemove(rowIndex){
	const {removeQuestionnaire} = this.props.actions;
	return ()=>removeQuestionnaire(rowIndex);

}



handleAddQuestionnaire(){
	const {addQuestionnaire} = this.props.actions;
	return ()=>{addQuestionnaire();
				
	}
}

handleFill(rowIndex){
	const {fillQuestionnaire} = this.props.actions;
	return ()=>fillQuestionnaire(rowIndex);
}

handleCheck(rowIndex){
	const {checkData} = this.props.actions;
	return ()=>checkData(rowIndex);
}

handleDialog(rowIndex){
	const {switchDialog} = this.props.actions;
	const id = `dialog-${rowIndex}`;
	return ()=>switchDialog(id);



}

handleCancel(){
	const {switchDialog} = this.props.actions;
	console.log("调用cancle");
	return ()=>switchDialog('');
}

render(){
		const {qn,dialog}=this.props;
		console.log("dialog");
		console.log(dialog);
		const styless="placeholder";
		return (
				<div>
					<Table data={qn.questionnaires} >
						<Column
						name='标题'
						dataKey='title'
						width="30%"
						align="center"
						/>
						{/* th设定如何添加表头的内容*/}
						{/* td设定如何添加表单元格的内容*/}

						<Column
						name="时间"
						dataKey="time"
						width="20%"
						align="center"
						th={(<SortableTh name="时间" click={this.sorTable.bind(this)}/>)}
						td={({data,row,dataKey,name})=>{
							const time = new Date(row[dataKey]);
                 const [year, month, date] = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
                 			const str = (year === 1970 ? `-` : `${year}-${month}-${date}`);
                         return str;
						}}
						/>
						<Column
						name="状态"
						dataKey="status"
						width="10%"
						align="center"
						td={({data,row,dataKey,name})=>{
						const arr = ['未发布','发布中','已结束'];
						const content = arr[row[dataKey]];
						let style=[{color:'black'},{color:'green'},{color:'red'}];
							return (
								<div style={style[row[dataKey]]}>
								{content}
								</div>
								);
						}}
						/>

						<Column
						name="操作"
						dataKey="status"
						width="40%"
						align="center"
						th={({data,row,dataKey,name})=>{
							return (
								<div >
									<span className={styles['operate']}>{name}</span>
									<Link to='/Edit' className={styless}>
									<button className={styles['button']}
									onClick={this.handleAddQuestionnaire()}
									>
									新建问卷
									</button>
									</Link>
								</div>
								);

						}}
						td={({data,row,dataKey,name,rowIndex})=>{
							let status = row[dataKey];
							if (status===0) {
								return (
									<div>
										<Link to="Edit" className={styless}>
										<button className={styles['button']}
											onClick={this.handleEdit(rowIndex)}
											>
											编辑问卷
											</button>
										</Link>
										<button className={styles['button']}
											onClick={this.handleDialog(rowIndex)}
											>删除问卷
											</button>
											<Dialog 
											title="提示"
											id={`dialog-${rowIndex}`}
											dialog={dialog}
											handleCancel={this.handleCancel()}
											switchDialog = {this.props.actions.switchDialog}
											>
												<div>
													<div className={styles['dialog-content']}>
														<p>确认删除内容？</p>
													</div>
													<div className={styles['dialog-button']}>
														<button onClick={this.handleRemove(rowIndex)}>
														确认
														</button>
														<button onClick={this.handleCancel(rowIndex)}>
														取消
														</button>
													</div>
												</div>
											</Dialog>
									</div>
									);
							}
							else if(status==1){
								return(
									<div>
									<Link to="Fill" className={styless}>
										<button className={styles['button']}
										onClick={this.handleFill(rowIndex)}
										>
										填写问卷
										</button>
									</Link>
									<Link to="Show" className={styless}>
										<button className={styles['button']}
										onClick={this.handleCheck(rowIndex)}
										>
										查看数据
										</button>
									</Link>
									</div>


									);
		
							}
							else if(status==2){
									return (
									<div>
									<Link to="Show" className={styless}>
										<button className={styles['button']}
										onClick={this.handCheck(rowIndex)}
										>
										查看数据
										</button>
									</Link>
									<button className={styles['button']}
										>删除问卷
										</button>
										</div>
									);
							}
						}}
						/>
					</Table>
					
				</div>
			);
	}
	
};


export default connect(mapStateToProps,mapDispatchToProps)(Home);