/* eslint-disable */
export const infoLog = (...messages: string[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...messages);
  }
};

export const errorLog = (...errors: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...errors);
  }
};

export default { infoLog, errorLog };
