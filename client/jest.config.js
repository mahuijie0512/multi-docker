module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testEnvironment: "jsdom"
};
