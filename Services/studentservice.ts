import StudentModel, { Task } from '../Models/studentmodels';
import {Types} from "mongoose";

const StudentService = {
  authenticate: async (email: string, password: string): Promise<boolean> => {
    const student = await StudentModel.findOne({ email, password }).exec();
    return !!student;
  },

  getTasksForStudent: async (studentId: string): Promise<Task[]> => {
    const student = await StudentModel.findById(studentId).exec();
    if (!student) {
      throw new Error('Student not found');
    }

    return student.tasks;
  },

  completeTask: async (studentId: string, taskId: string): Promise<Task | null> => {
    try {
      const student = await StudentModel.findById(studentId).exec();
      if (!student) {
        throw new Error('Student not found');
      }

      const taskToUpdate = student.tasks.find(task => task._id.toString() === taskId);
      if (!taskToUpdate) {
        throw new Error('Task not found');
      }

      taskToUpdate.status = 'completed';
      await student.save();

      return taskToUpdate;
    } catch (error) {
      throw new Error('Failed to complete task');
    }
  },

};

export default StudentService;