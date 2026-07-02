import axiosClient from './axiosClient.js';

export async function getStats() {
  const { data } = await axiosClient.get('/admin/stats');
  return data.data;
}
