import React, { Component, PropTypes } from "react";
import styles from "./SortableTh.scss";

class SortableTh extends Component {
   
    render() {
        const { name } = this.props;
        return (
            <div onClick={this.props.click}
            >
              {name} 
            </div>
        );
    }
}

export default SortableTh;