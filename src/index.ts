import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);

// Tạo một object để lưu các module export
const modules: { [key: string]: any } = {};

// Đọc tất cả các file trong thư mục hiện tại
fs.readdirSync(__dirname)
  .filter((file) => {
    // Lọc ra các file không phải là file này (index.ts) và các file không phải là .ts hoặc .js
    return (
      file !== basename &&
      (file.endsWith('.ts') || file.endsWith('.js')) &&
      !file.endsWith('.d.ts') // bỏ qua các file .d.ts
    );
  })
  .forEach((file) => {
    const moduleName = path.basename(file, path.extname(file));
    // Dynamically import và lưu vào object modules
    const modulePath = path.join(__dirname, file);
    modules[moduleName] = require(modulePath).default || require(modulePath);
  });

export default modules;
