import { Request, Response } from 'express';
import AdminService from '../Services/adminservice';

const adminController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {

      const isAdminAuthenticated = await AdminService.authenticate(email, password);

      if (isAdminAuthenticated) {
        return res.status(200).json({ message: 'Admin login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  addStudent: async (req: Request, res: Response) => {
    const { name, email, department, password } = req.body;
    try {
      // Logic to add a new student by admin
      const newStudent = await AdminService.addStudent(name, email, department, password);

      return res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add student' });
    }
  },

  assignTask: async (req: Request, res: Response) => {
    const { studentId, task, dueTime } = req.body;
    try {
      // Logic to assign tasks to students
      const assignedTask = await AdminService.assignTaskToStudent(studentId, task, dueTime);

      return res.status(200).json({ message: 'Task assigned successfully', task: assignedTask });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to assign task' });
    }
  },

};

export default adminController;