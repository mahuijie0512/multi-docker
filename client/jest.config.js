module.exports = {
  // 告诉 Jest 如何处理不同的文件类型
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  // 指定哪些文件需要被转换
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // 除了 axios 之外的其他 node_modules 都不转换
  ],
  // 设置测试环境
  testEnvironment: 'jsdom',
  // 设置模块名称映射
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^axios$': 'axios/dist/axios.min.js', // 使用 CommonJS 版本的 axios
  },
  // 收集覆盖率信息
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
  ],
  // 设置测试运行前的准备工作
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
