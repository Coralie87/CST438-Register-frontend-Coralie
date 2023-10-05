import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }

  const  addAssignment = (assignment_id) => {
    setMessage('');
    console.log("start addAssignment"); 
    fetch(`${SERVER_URL}/assignment/course/${assignment_id}`,
    { 
        method: 'POST', 
    })
    .then(res => {
        if (res.ok) {
        console.log("addAssignment ok");
        setMessage("Assignment added.");
        fetchAssignments();
        } else {
        console.log('error addAssignment ' + res.status);
        setMessage("Error. "+res.status);
        }})
    .catch(err => {
        console.error("exception addAssignment "+ err);
        setMessage("Exception. "+err);
    })
}
  

  const dropAssignment = (event) => {
    setMessage('');
    const row_id = event.target.parentNode.parentNode.rowIndex - 1;
    console.log("drop assignment "+row_id);
    const assignment_id = assignments[row_id].id;
    
    if (window.confirm('Are you sure you want to drop the course?')) {
        fetch(`${SERVER_URL}/assignment/${assignment_id}`,
        {
            method: 'DELETE',
        }
        )
    .then(res => {
        if (res.ok) {
            console.log("drop ok");
            setMessage("Course dropped.");
            fetchAssignments();
        } else {
            console.log("drop error");
            setMessage("Error dropCourse. "+res.status);
        }
        })
    .catch( (err) => {
        console.log("exception dropAssignment "+err);
        setMessage("Exception. "+err);
     } );
    }
} 
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td>Edit</td>
                      <td><button type="button" margin="auto" onClick={dropAssignment}>Drop</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
      </div>
    )
}  

export default ListAssignment;