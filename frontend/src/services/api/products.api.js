import axiosClient from './axiosClient.js';

export async function getProducts(params) {
  const { data } = await axiosClient.get('/products', { params });
  return data.data;
}

export async function getProductBySlug(slug) {
  const { data } = await axiosClient.get(`/products/${slug}`);
  return data.data;
}

export async function getRelatedProducts(id) {
  const { data } = await axiosClient.get(`/products/${id}/related`);
  return data.data;
}

export async function createProduct(payload) {
  const { data } = await axiosClient.post('/admin/products', payload);
  return data.data;
}

export async function updateProduct(id, payload) {
  const { data } = await axiosClient.put(`/admin/products/${id}`, payload);
  return data.data;
}

export async function deleteProduct(id) {
  await axiosClient.delete(`/admin/products/${id}`);
}

export async function duplicateProduct(id) {
  const { data } = await axiosClient.post(`/admin/products/${id}/duplicate`);
  return data.data;
}

export async function bulkDeleteProducts(ids) {
  const { data } = await axiosClient.post('/admin/products/bulk-delete', {
    ids,
  });
  return data.data;
}
