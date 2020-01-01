import React from 'react';

class Notes extends React.Component {


  render(){
    return(
      <fieldset className="student-notes">
        <legend><h3>Notes: {this.props.modalName}</h3></legend>
        <p>{this.props.modalNotes}</p>
      </fieldset>
    )
  }
}

export default Notes;
