import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import {
  createInventory,
  getInventoryById,
  getInventoryDetails,
  updateInventory,
} from './controllers';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP' });
});

// routes
app.get('/inventories/:id/details', getInventoryDetails);
app.get('/inventories/:id', getInventoryById);
app.put('/inventories/:id', updateInventory);
app.post('/inventories', createInventory);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 4002;
const serviceName = process.env.SERVICE_NAME || 'inventory';

app.listen(port, () => {
  console.log(
    `${serviceName} service is listening at http://localhost:${port}`
  );
});
