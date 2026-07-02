import axiosClient from './axiosClient.js';

export async function getCategories() {
  const { data } = await axiosClient.get('/categories');
  return data.data;
}

export async function getCategoryBySlug(slug) {
  const { data } = await axiosClient.get(`/categories/${slug}`);
  return data.data;
}

export async function createCategory(payload) {
  const { data } = await axiosClient.post('/admin/categories', payload);
  return data.data;
}

export async function updateCategory(id, payload) {
  const { data } = await axiosClient.put(`/admin/categories/${id}`, payload);
  return data.data;
}

export async function deleteCategory(id) {
  await axiosClient.delete(`/admin/categories/${id}`);
}
