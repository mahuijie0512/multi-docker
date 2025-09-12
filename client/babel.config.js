module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current' 
      },
      modules: 'commonjs' // 确保转换为 CommonJS
    }],
    ['@babel/preset-react', { 
      runtime: 'automatic' 
    }]
  ],
};
