import { Error as iError } from './iError';

export interface Error {
  error: string[] | string;
  status: number;
}

export const isAnIError = (obj: any): obj is iError => {
  return 'error' in obj && 'status' in obj;
};
