import fs from 'fs-extra';
import path from 'path';

const folders = [
  'api/middleware',
  'api/routes',
  'api/controllers',
  'api/models',
  'api/migrations',
  'api/config',
  'api/views',
  'scripts',
  'tests',
  'logs'
];

const files = {
  '.env': '',
  '.gitignore': 'node_modules\n.env\nlogs\n',
  'README.md': '# Project\n\nDescription of your project.',
  'server.js': `
import express from 'express';
import path from 'path';
import fs from 'fs-extra';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./api/routes'));

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`,
  'api/routes/index.js': `
import express from 'express';
const router = express.Router();

// Define routes here

export default router;
`,
  'api/models/sampleModel.js': `
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class SampleModel extends Model {}

SampleModel.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'SampleModel'
});

export default SampleModel;
`,
  'tests/sample.test.js': `
import request from 'supertest';
import app from '../server.js';

describe('GET /', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
`,
  'scripts/seed.js': `
import sequelize from '../api/config/database.js';
import SampleModel from '../api/models/sampleModel.js';

(async () => {
  await sequelize.sync({ force: true });
  await SampleModel.create({ name: 'Sample Data' });
  console.log('Database seeded');
  process.exit();
})();
`,
  'api/config/database.js': `
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

export default sequelize;
`
};

export function createProjectStructure(projectName) {
  const projectPath = path.join(process.cwd(), projectName);

  fs.ensureDirSync(projectPath);

  folders.forEach(folder => {
    fs.ensureDirSync(path.join(projectPath, folder));
  });

  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(projectPath, filePath);
    fs.ensureDirSync(path.dirname(fullPath)); // Ensure the parent directory exists
    fs.writeFileSync(fullPath, content);
  }
}
