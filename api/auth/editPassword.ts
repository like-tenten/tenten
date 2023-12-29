import axios from 'axios';
import { PutPasswordRequestType } from '@/lib/types/auth';
import instance from '@/lib/axios';

/**
 * 비밀번호 변경
 */
export const editPassword = async (data: PutPasswordRequestType) => {
  try {
    const response = await instance.put('/api/auth/password', data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
