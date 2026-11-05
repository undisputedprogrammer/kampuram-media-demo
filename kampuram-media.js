(() => {
  'use strict';
  const seed = window.KampuramCatalogue;
  const utils = window.KampuramCatalogueUtils;
  const grid = document.querySelector('#listing-grid');
  const results = document.querySelector('#results-count');
  const empty = document.querySelector('#catalogue-empty');
  const more = document.querySelector('#load-more');
  const end = document.querySelector('#catalogue-end');
  const searchInput = document.querySelector('.catalogue-search input[type="search"]');
  const clearSearch = document.querySelector('#clear-search');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const activeAnimations = new Set();
  const section = document.body.dataset.catalogueSection || 'media';
  const supportsVideo = seed?.settings.sections[section]?.allowVideo !== false;
  const listingLabel = section === 'cards' ? 'invitations' : section === 'books' ? 'books' : 'advertisements';
  let filter = supportsVideo ? (utils?.normalizeFilter(new URL(location.href).searchParams.get('filter')) || 'all') : 'all';
  let query = (new URL(location.href).searchParams.get('q') || '').slice(0, 150);
  let searchTimer;
  searchInput.value = query;
  let visible = seed?.settings.listingPageSize || 12;
  let matching = [];

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function icon(id) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `#${id}`);
    svg.append(use);
    return svg;
  }

  function animate(element, frames, options) {
    if (reduced.matches || !element.animate) return null;
    const animation = element.animate(frames, options);
    activeAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => activeAnimations.delete(animation));
    return animation;
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (entry.target.contains(document.activeElement)) return;
      animate(entry.target, [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], {
        duration: 550, delay: Number(entry.target.dataset.delay || 0), easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards'
      });
    });
  }, { threshold: .08 }) : null;

  function assetUrl(path) { return new URL(path, new URL('.', location.href)).href; }

  function playVideo(media, item, poster, trigger, badge) {
    const video = node('video');
    video.controls = true;
    video.playsInline = true;
    video.muted = true;
    video.autoplay = false;
    video.preload = 'metadata';
    video.poster = assetUrl(poster);
    video.setAttribute('aria-label', item.heading);
    // This is the only point at which a video file is attached to the page.
    video.src = assetUrl(item.file.path);
    trigger.remove();
    badge.remove();
    media.append(video);
    video.focus();
    video.addEventListener('play', () => {
      document.querySelectorAll('.listing-media video').forEach(other => { if (other !== video) other.pause(); });
    });
    video.addEventListener('error', () => {
      video.remove();
      const error = node('div', 'video-error');
      error.append(node('p', '', 'This video couldn’t load. Please try again.'));
      const retry = node('button', '', 'Try again');
      retry.type = 'button';
      retry.addEventListener('click', () => { error.remove(); media.append(trigger, badge); trigger.focus(); });
      error.append(retry);
      media.append(error);
    }, { once: true });
    // Playback follows an explicit user click and always starts muted.
    video.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
  }

  // Media shape and video policy come from the current catalogue section.
  function createListing(item, options) {
    const article = node('article', 'listing-card');
    article.dataset.listingId = item.id;
    const media = node('div', 'listing-media');
    media.style.setProperty('--listing-ratio', options.aspectRatio.replace(':', ' / '));
    const isVideo = item.type === 'video' && options.allowVideo;
    const poster = isVideo ? item.thumbnail.path : item.file.path;
    const image = node('img');
    image.src = assetUrl(poster);
    image.alt = item.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 800;
    image.height = 600;
    image.addEventListener('error', () => {
      image.remove();
      const fallback = node('div', 'media-fallback', 'Preview unavailable');
      media.prepend(fallback);
    }, { once: true });
    const badge = node('span', 'listing-type');
    badge.append(node('span', 'type-dot'), document.createTextNode(isVideo ? 'VIDEO' : section === 'cards' ? 'INVITATION' : section === 'books' ? 'BOOK' : 'IMAGE'));
    media.append(image, badge);
    if (isVideo) {
      const trigger = node('button', 'video-trigger');
      trigger.type = 'button';
      trigger.setAttribute('aria-label', `Play ${item.heading}`);
      const disc = node('span', 'play-disc');
      const play = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      play.setAttribute('viewBox', '0 0 24 24');
      play.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M6 3v18l16-9Z');
      play.append(path);
      disc.append(play);
      trigger.append(disc, node('span', 'play-label', 'PLAY FILM'));
      trigger.addEventListener('click', () => playVideo(media, item, poster, trigger, badge));
      media.append(trigger);
    }
    const body = node('div', 'listing-body');
    const heading = node('h3', 'listing-heading', item.heading);
    heading.title = item.heading;
    const description = node('p', 'listing-description', item.description || '');
    const price = node('div', 'listing-price-slot');
    const formattedPrice = utils.formatPrice(item.price);
    if (formattedPrice) price.append(node('p', 'listing-price', formattedPrice + (section === 'cards' ? ' per card' : '')));
    const enquiry = node('a', 'button listing-enquiry', '');
    enquiry.href = utils.whatsappUrl(seed.settings.whatsappNumber, item.heading);
    enquiry.target = '_blank';
    enquiry.rel = 'noopener noreferrer';
    enquiry.setAttribute('aria-label', `Enquire on WhatsApp about ${item.heading}`);
    enquiry.append(icon('whatsapp'), document.createTextNode('WhatsApp enquiry'), icon('arrow'));
    body.append(heading, description, price, enquiry);
    article.append(media, body);
    return article;
  }

  function stopVideos() {
    grid.querySelectorAll('video').forEach(video => { video.pause(); video.removeAttribute('src'); video.load(); });
  }

  function render(append = false) {
    const priorCount = append ? grid.children.length : 0;
    if (!append) {
      stopVideos();
      observer?.disconnect();
      grid.replaceChildren();
    }
    matching = utils.selectListings(seed.listings, section, filter, query);
    const fragment = document.createDocumentFragment();
    matching.slice(priorCount, visible).forEach((item, index) => {
      const card = createListing(item, seed.settings.sections[section]);
      card.dataset.delay = String((index % 4) * 55);
      fragment.append(card);
    });
    grid.append(fragment);
    [...grid.children].slice(priorCount).forEach(card => observer?.observe(card));
    grid.setAttribute('aria-busy', 'false');
    const shown = Math.min(visible, matching.length);
    const pluralKind = filter === 'images' ? 'images' : filter === 'videos' ? 'videos' : listingLabel;
    const kind = matching.length === 1 ? pluralKind.slice(0, -1) : pluralKind;
    results.textContent = `Showing ${shown} of ${matching.length} ${kind}${query.trim() ? ` for “${query.trim()}”` : ''}`;
    empty.hidden = matching.length > 0;
    grid.hidden = matching.length === 0;
    document.querySelector('#empty-title').textContent = query.trim() ? `No matching ${listingLabel}` : filter === 'videos' ? 'No videos yet' : filter === 'images' ? 'No images yet' : `No ${listingLabel} yet`;
    empty.querySelector('p').textContent = query.trim() ? 'Try a different word, or clear your search and explore all our work.' : 'There’s more creativity on the way. Take a look at our other work.';
    document.querySelector('#reset-filter').firstChild.textContent = query.trim() ? 'Clear search & view all ' : section === 'cards' ? 'View all invitations ' : section === 'books' ? 'View all books ' : 'View all work ';
    clearSearch.hidden = !searchInput.value;
    document.querySelectorAll('[data-count]').forEach(element => {
      element.textContent = String(utils.selectListings(seed.listings, section, element.dataset.count, query).length);
    });
    more.hidden = shown >= matching.length;
    end.textContent = matching.length && more.hidden ? 'You’ve seen all our ' + pluralKind + '.' : '';
    document.querySelectorAll('[data-filter]').forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (append) {
      const firstNew = grid.children[priorCount];
      if (firstNew) { firstNew.tabIndex = -1; firstNew.focus({ preventScroll: true }); }
      if (more.hidden) results.textContent += '. All results loaded.';
    }
  }

  function setFilter(next, push = true) {
    clearTimeout(searchTimer);
    query = searchInput.value.slice(0, 150);
    filter = supportsVideo ? utils.normalizeFilter(next) : 'all';
    visible = seed.settings.listingPageSize;
    if (push) {
      const url = new URL(location.href);
      if (supportsVideo) url.searchParams.set('filter', filter);
      else url.searchParams.delete('filter');
      if (query.trim()) url.searchParams.set('q', query.trim());
      else url.searchParams.delete('q');
      if (url.href !== location.href) history.pushState({}, '', url);
    }
    render();
  }

  function loadingCards() {
    for (let index = 0; index < 8; index++) {
      const card = node('div', 'listing-skeleton');
      card.setAttribute('aria-hidden', 'true');
      const copy = node('div', 'skeleton-copy');
      copy.append(node('div', 'skeleton-line'), node('div', 'skeleton-line short'), node('div', 'skeleton-button'));
      card.append(node('div', 'skeleton-media'), copy);
      grid.append(card);
    }
  }
  loadingCards();

  if (!seed || !utils) {
    grid.replaceChildren();
    grid.setAttribute('aria-busy', 'false');
    results.textContent = `The ${listingLabel} couldn’t load. Please refresh the page.`;
    return;
  }
  document.querySelectorAll('[data-count]').forEach(element => {
    element.textContent = String(utils.selectListings(seed.listings, section, element.dataset.count).length);
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  document.querySelector('#reset-filter').addEventListener('click', () => {
    searchInput.value = '';
    setFilter('all');
    (document.querySelector('[data-filter="all"]') || searchInput).focus();
  });
  more.addEventListener('click', () => { visible += seed.settings.listingPageSize; render(true); });
  window.addEventListener('popstate', () => {
    const url = new URL(location.href);
    searchInput.value = (url.searchParams.get('q') || '').slice(0, 150);
    setFilter(url.searchParams.get('filter'), false);
  });
  function search() {
    clearTimeout(searchTimer);
    query = searchInput.value.slice(0, 150);
    visible = seed.settings.listingPageSize;
    const url = new URL(location.href);
    if (query.trim()) url.searchParams.set('q', query.trim());
    else url.searchParams.delete('q');
    // Avoid creating a browser-history entry for every keystroke.
    history.replaceState({}, '', url);
    render();
  }
  searchInput.addEventListener('input', event => {
    clearSearch.hidden = !searchInput.value;
    clearTimeout(searchTimer);
    if (!event.isComposing) searchTimer = setTimeout(search, 180);
  });
  searchInput.addEventListener('compositionend', search);
  searchInput.addEventListener('search', search);
  document.querySelector('.catalogue-search').addEventListener('submit', event => { event.preventDefault(); search(); });
  clearSearch.addEventListener('click', () => { searchInput.value = ''; search(); searchInput.focus(); });

  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('is-open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
  document.querySelectorAll('[data-whatsapp]').forEach(button => button.addEventListener('click', () => {
    const url = `https://wa.me/${seed.settings.whatsappNumber}?text=${encodeURIComponent(button.dataset.whatsapp)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
  reduced.addEventListener('change', event => { if (event.matches) activeAnimations.forEach(animation => animation.cancel()); });
  // Let the first frame show loading placeholders while the static data initializes.
  requestAnimationFrame(() => requestAnimationFrame(() => render()));
})();
