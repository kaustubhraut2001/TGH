import express from 'express';
import studentController from '../controllers/studentcontrollers';

const router = express.Router();

// Student login route
router.post('/login', studentController.login);

// Route to view tasks assigned to a student
router.get('/:studentId/tasks', studentController.viewTasks);

// Route to change task status to completed
router.put('/tasks/:taskId', studentController.changeTaskStatus);


export default router;