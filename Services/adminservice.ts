import AdminModel from '../Models/adminmodel';
import StudentModel, { Student, Task } from '../Models/studentmodels';
import mongoose, { Types } from 'mongoose';

const AdminService = {
  authenticate: async (email: string, password: string): Promise<boolean> => {
    const admin = await AdminModel.findOne({ email, password }).exec();
    return !!admin;
  },

  addStudent: async (name: string, email: string, department: string, password: string): Promise<Student> => {
    const newStudent = await StudentModel.create({ name, email, department, password });
    return newStudent;
  },

  assignTaskToStudent: async (studentId: string, task: string, dueTime: Date): Promise<Task | null> => {
    const student = await StudentModel.findById(studentId).exec();
    if (!student) {
      throw new Error('Student not found');
    }

    const newTask: Task = {
      _id: new mongoose.Types.ObjectId(),
      description: task,
      dueTime,
      status: 'pending',
    };

    student.tasks.push(newTask);
    await student.save();

    return newTask;
  },

};

export default AdminService;