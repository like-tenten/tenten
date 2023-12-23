import axios from 'axios';
import { PutColumnRequestType } from '@/lib/types/columns';

/**
 * 컬럼 수정
 * @param columnId 수정하려는 column의 Id
 * @param data 수정하려는 column의 데이터
 */
export const editCard = async (columnId: number, data: PutColumnRequestType) => {
  const response = await axios.put(`/api/columns/${columnId}`, data);
  console.log(response);
  return response.data;
};
