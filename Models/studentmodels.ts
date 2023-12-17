import mongoose, { Schema, Document } from 'mongoose';

export interface Task {
  _id: mongoose.Types.ObjectId;
  description: string;
  dueTime: Date;
  status: string;
}

export interface Student extends Document {
  name: string;
  email: string;
  department: string;
  password: string;
  tasks: Task[];
}

const TaskSchema: Schema = new Schema({
  _id : {
    type: Schema.Types.ObjectId,
    auto: true,
  }
  ,
  description: {
    type: String,
    required: true,
  },
  dueTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'overdue', 'completed'],
    default: 'pending',
  },
});

const StudentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: [TaskSchema],
    default: [],
  },
});

const StudentModel = mongoose.model<Student>('Student', StudentSchema);

export default StudentModel;