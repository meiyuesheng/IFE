import React,{Component} from 'react';
import {Head,Main} from '../';
import '../../styles/normalize.css';
import styles from './App.scss';




class App extends Component {
  

  render(){
    console.log("这里输出");
  console.log(this.props.children);
    return (
        <div className={styles['app']} >
           <Head/>
            <Main>
               {this.props.children}
              
            </Main>
        </div>
    );
  }
}
export default App;