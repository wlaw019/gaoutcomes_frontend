import React from 'react';
import Analytics from './Analytics.js'
import Notes from './Notes.js'


class Students extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      minDays: "",
      maxDays: "",
      avgDays: "",
      daysArray: "",
      daysArrayIndex: "",
      interviewsArray: "",
      isShow: "",
      modalName: "",
      modalNotes: ""
    }
  }

// ========================
// getDays function to calculate the summary
// ========================
  isShow = (data) => {

    this.setState({
      isShow: !this.state.isShow,
      modalName: data.name,
      modalNotes: data.notes
    })
    setTimeout(() => console.log(this.state.isShow), 500)
  }


  getDays = () => {
    if (this.props.students.length!== 0) {
      let days = "";
      let daysArray = [];
      let daysArrayIndex = [];
      let interviewsArray = [];

      for (var i = 0; i < this.props.students.length; i++) {

        if (this.props.students[i].dateoffer===null) {
          days = Math.floor((new Date()-new Date(this.props.students[0].dategraduated))/86400000);
        } else {
          days = Math.floor((new Date(this.props.students[i].dateoffer)-new Date(this.props.students[0].dategraduated))/86400000)
        }

        daysArray.push(days);
        daysArrayIndex.push(this.props.students[i].name);
        interviewsArray.push(this.props.students[i].interviews);
      }

      this.setState({
        minDays: Math.min(...daysArray),
        maxDays: Math.max(...daysArray),
        avgDays: Math.round(daysArray.reduce((a, b) => a + b)/daysArray.length),
        daysArray: daysArray,
        daysArrayIndex: daysArrayIndex,
        interviewsArray:interviewsArray
      }, console.log(this.state), setTimeout(() => console.log(this.state), 500))
    }
  }

  componentDidMount(){
    this.getDays();
    setTimeout(() => this.setState({isShow: false}), 500)
  }


  render(){
    return(
      <>
        {this.props.students.length!==0?
          <fieldset>
            <h3>{this.props.students[0].course}: {this.props.students[0].cohort}</h3>
            <h3>Date Graduated: {new Date(this.props.students[0].dategraduated).toLocaleDateString("en-US")}</h3>

            <div className="summary">
              <h4>Min Search Time (Days): {this.state.minDays}</h4>
              <h4>Avg Search Time (Days): {this.state.avgDays}</h4>
              <h4>Max Search Time (Days): {this.state.maxDays}</h4>
            </div>
          </fieldset>
          : null}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date 1st Offer</th>
              <th>Search Time (Days)</th>
              <th>Number of Interviews</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.students.map((student) => (

              <tr onClick={() => {this.isShow(student)}}

               className = {student.dateoffer===null?
                 Math.floor((new Date()-new Date(this.props.students[0].dategraduated))/86400000)===this.state.maxDays? "student-row student-row-highlight": "student-row"


                 :Math.floor((new Date(student.dateoffer)-new Date(this.props.students[0].dategraduated))/86400000)===this.state.maxDays? "student-row student-row-highlight": "student-row"}

               key={student.id}>

                <td>{student.name}</td>

                {student.dateoffer===null? <td>pending</td>
                : <td>{new Date(student.dateoffer).toLocaleDateString("en-US")}</td>}

                {student.dateoffer===null?
                <td>{Math.floor((new Date()-new Date(this.props.students[0].dategraduated))/86400000)}</td>
                : <td>{Math.floor((new Date(student.dateoffer)-new Date(this.props.students[0].dategraduated))/86400000)}</td>}

                <td>{student.interviews}</td>

                <td className="table-button"><button onClick={(event) => {this.props.handleView("editStudent", student); event.stopPropagation();}}>&#9998;</button></td>
                <td className="table-button"><button onClick={(event) => {this.props.handleDelete(student.id, setTimeout(() => this.getDays(), 500)); event.stopPropagation(); this.setState({isShow: ""});
                setTimeout(() => this.setState({isShow: false}), 800)
                }}>&#128465;</button></td>
              </tr>

            ))
        }
          </tbody>
        </table>
        <br/>
        {this.state.isShow? <Notes modalName={this.state.modalName} modalNotes={this.state.modalNotes} />: null}



        {this.props.students.length!==0 && this.state.isShow===false &&
        <Analytics daysArray={this.state.daysArray} daysArrayIndex={this.state.daysArrayIndex} interviewsArray={this.state.interviewsArray}/>}
      </>
    )
  }
}

export default Students;
