"use client";

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, IconButton, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

// Placeholder functions for API calls
const fetchTasks = async () => {
  // Replace with actual API call
  return [
    { id: 1, name: 'Grocery Shopping', dueDate: '2024-09-10' },
    { id: 2, name: 'Doctor Appointment', dueDate: '2024-09-12' },
    { id: 3, name: 'Laundry', dueDate: '2024-09-15' },
  ];
};

const addTask = async (task) => {
  // Replace with actual API call
  console.log('Adding task:', task);
};

const updateTask = async (id, updatedTask) => {
  // Replace with actual API call
  console.log('Updating task:', id, updatedTask);
};

const deleteTask = async (id) => {
  // Replace with actual API call
  console.log('Deleting task:', id);
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', dueDate: '' });
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadData();
  }, []);

  const handleAdd = async () => {
    await addTask(newTask);
    setNewTask({ name: '', dueDate: '' });
    setOpen(false);
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleUpdate = async () => {
    await updateTask(currentTask.id, currentTask);
    setCurrentTask(null);
    setOpen(false);
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleOpen = (task = null) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Task List</Typography>
            <Box>
              <IconButton color="primary" onClick={() => handleOpen()}>
                <AddIcon />
              </IconButton>
              <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/dashboard')}>Dashboard</Button>
              <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/')}>Homepage</Button>
            </Box>
          </Box>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleOpen(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText
                  primary={task.name}
                  secondary={`Due Date: ${task.dueDate}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            variant="outlined"
            value={currentTask ? currentTask.name : newTask.name}
            onChange={(e) => (currentTask ? setCurrentTask({ ...currentTask, name: e.target.value }) : setNewTask({ ...newTask, name: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Due Date"
            fullWidth
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentTask ? currentTask.dueDate : newTask.dueDate}
            onChange={(e) => (currentTask ? setCurrentTask({ ...currentTask, dueDate: e.target.value }) : setNewTask({ ...newTask, dueDate: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={currentTask ? handleUpdate : handleAdd}>
            {currentTask ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
