import React from 'react';

class Notes extends React.Component {


  render(){
    return(
      <textarea readOnly value={this.props.student.notes}
    )
  }
}

export default Notes;
