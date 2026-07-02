export function optimizeImageUrl(url, width = undefined) {
  if (!url || !url.includes('/upload/')) return url;
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);
  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}
