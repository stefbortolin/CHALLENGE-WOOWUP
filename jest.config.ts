module.exports = {
  preset: 'ts-jest', // Asegúrate de tener instalado ts-jest
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'], // Incluye 'js' además de 'ts'
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Usa ts-jest para transformar archivos TypeScript
  },
}