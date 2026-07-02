import axiosClient from './axiosClient.js';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await axiosClient.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function deleteImage(publicId) {
  await axiosClient.post('/admin/upload/delete', { publicId });
}
