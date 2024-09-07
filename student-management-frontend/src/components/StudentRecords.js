import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import axios from 'axios';

const StudentRecords = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', registration_no: '', contact: '' });
  const [editMode, setEditMode] = useState(false); // Track if we're editing a student
  const [studentToEdit, setStudentToEdit] = useState(null); // Track which student is being edited

  useEffect(() => {
    axios.get('http://localhost:8000/api/students', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setStudents(response.data))
    .catch(err => console.error(err));
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/students', newStudent, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStudents([...students, response.data]);
      setNewStudent({ name: '', registration_no: '', contact: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditStudent = (student) => {
    setNewStudent({ name: student.name, registration_no: student.registration_no, contact: student.contact });
    setEditMode(true);
    setStudentToEdit(student.id); // Store the id of the student to be edited
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/students/${studentToEdit}`, newStudent, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedStudents = students.map(student =>
        student.id === studentToEdit ? response.data : student
      );
      setStudents(updatedStudents);
      setNewStudent({ name: '', registration_no: '', contact: '' });
      setEditMode(false);
      setStudentToEdit(null); // Reset the edit state
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setNewStudent({ name: '', registration_no: '', contact: '' });
    setEditMode(false);
    setStudentToEdit(null);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/students/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStudents(students.filter(student => student.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>Student Records</Typography>
      
      {/* Student Form */}
      <Box sx={{ mt: 4, p: 2, boxShadow: 2 }}>
        <Typography variant="h6">{editMode ? 'Update Student' : 'Register New Student'}</Typography>
        <TextField 
          label="Name" 
          value={newStudent.name} 
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} 
          fullWidth margin="normal" 
        />
        <TextField 
          label="Registration Number" 
          value={newStudent.registration_no} 
          onChange={(e) => setNewStudent({ ...newStudent, registration_no: e.target.value })} 
          fullWidth margin="normal" 
        />
        <TextField 
          label="Contact" 
          value={newStudent.contact} 
          onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })} 
          fullWidth margin="normal" 
        />
        {editMode ? (
          <>
            <Button variant="contained" color="primary" fullWidth onClick={handleUpdateStudent} sx={{ mb: 1 }}>
              Update Student
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleCancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" fullWidth onClick={handleAddStudent}>
            Add Student
          </Button>
        )}
      </Box>

      {/* Student List */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.registration_no}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditStudent(student)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteStudent(student.id)} sx={{ ml: 1 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentRecords;
