import { Request, Response } from 'express';
import StudentService from '../Services/studentservice';

import StudentModel from '../Models/studentmodels';

const studentController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      // Validate student credentials
      const isStudentAuthenticated = await StudentService.authenticate(email, password);

      if (isStudentAuthenticated) {
        return res.status(200).json({ message: 'Student login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  viewTasks: async (req: Request, res: Response) => {
    const { studentId } = req.params;
    try {
      // Logic to retrieve tasks assigned to a student
      const tasks = await StudentService.getTasksForStudent(studentId);

      return res.status(200).json({ tasks });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch tasks' });
    }
  },




  changeTaskStatus: async (req: Request, res: Response) => {
    const { studentId,taskId } = req.params;
    try {
      // Logic to change task status to completed
      const updatedTask = await StudentService.completeTask(studentId, taskId);

      return res.status(200).json({ message: 'Task status updated successfully', task: updatedTask });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update task status' });
    }
  },

};

export default studentController;