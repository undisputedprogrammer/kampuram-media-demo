(function (root) {
  'use strict';
  const filterNames = ['all', 'images', 'videos'];
  const normalizeFilter = value => filterNames.includes(value) ? value : 'all';
  const searchText = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const selectListings = (items, section, filter, query = '') => items
    .filter(item => item.section === section && item.status === 'published')
    .filter(item => filter === 'all' || item.type === (filter === 'videos' ? 'video' : 'image'))
    .filter(item => searchText(query).trim().split(/\s+/).filter(Boolean).every(term => searchText(`${item.heading} ${item.description || ''}`).includes(term)))
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder || Date.parse(b.dateAdded) - Date.parse(a.dateAdded) || a.id.localeCompare(b.id));
  function whatsappUrl(number, heading) {
    if (!/^[1-9]\d{6,14}$/.test(number)) return null;
    return `https://wa.me/${number}?text=${encodeURIComponent(`Hi, I am interested in: ${heading}`)}`;
  }
  function formatPrice(amount) {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 0) return '';
    const value = amount.toLocaleString('en-IN', {
      useGrouping: false,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2
    });
    return `₹ ${value}/-`;
  }
  const api = { normalizeFilter, selectListings, whatsappUrl, formatPrice };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.KampuramCatalogueUtils = api;
})(typeof window === 'undefined' ? globalThis : window);
