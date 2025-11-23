import express from 'express';
import dataRouter from './routes/user.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 3000;
const app = express();

// Needed to resolve file paths in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load OpenAPI YAML
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

app.use(express.json());

// Your user API
app.use('/user', dataRouter);

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Optional: serve raw file
app.get('/openapi.yaml', (req, res) => {
    res.sendFile(path.join(__dirname, 'openapi.yaml'));
});

app.listen(port, () => {
    console.log('Listening on port 3000');
    console.log('Swagger docs available at http://localhost:3000/docs');
});

export default app;
