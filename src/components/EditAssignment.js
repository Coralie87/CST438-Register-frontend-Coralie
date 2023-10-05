import React, { useState } from 'react';

function EditAssignment(props) {
  const [editedData, setEditedData] = useState({}); // State for edited assignment data

  const handleEditDataChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = () => {
    
    const apiUrl = ` http://localhost:3000`; 

   
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData), 
    })
      .then((response) => {
        if (response.ok) {
          
          console.log('Assignment updated successfully');
        } else {
          
          console.error('Failed to update assignment');
        }
      })
      .catch((error) => {
        console.error('Error updating assignment:', error);
      })
      .finally(() => {
       
        props.onClose();
      });
      const handleEditAssignment = (assignmentId) => {
       
        const assignmentToEdit = assignments.find((assignment) => assignment.id === assignmentId);
      
       
        setEditedAssignment(assignmentToEdit); 
        setShowEditModal(true); 
      
      const handleEditSubmit = (editedData) => {
       
        const updatedAssignments = assignments.map((assignment) => {
          if (assignment.id === editedAssignment.id) {
            
            return { ...assignment, ...editedData };
          }
          return assignment;
        });
      
     
        setShowEditModal(false); // Hide the edit modal
      
       
        setAssignments(updatedAssignments);
      };
      
  };

  return (
    <div>
      <h3>Edit Assignment</h3>
      <form>
        <div>
          <label>Assignment Name:</label>
          <input
            type="text"
            name="assignmentName"
            value={editedData.assignmentName || ''}
            onChange={handleEditDataChange}
          />
        </div>
        <div>
          <label>Course Title:</label>
          <input
            type="text"
            name="courseTitle"
            value={editedData.courseTitle || ''}
            onChange={handleEditDataChange}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={editedData.dueDate || ''}
            onChange={handleEditDataChange}
          />
        </div>
        <button type="button" onClick={handleSubmit}>Save</button>
        <button type="button" onClick={props.onClose}>Cancel</button>
      </form>
    </div>
  );
}
}