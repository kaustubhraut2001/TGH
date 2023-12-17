import express from 'express';
import adminController from '../controllers/admincontroller';

const router = express.Router();

// Admin login route
router.post('/login', adminController.login);

// Route to add a new student by admin
router.post('/addStudent', adminController.addStudent);


router.post('/assignTask', adminController.assignTask);


export default router;