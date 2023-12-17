import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './Routes/adminRoutes';
import studentRoutes from './Routes/studentroutes';
import config from './config';

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;