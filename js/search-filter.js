/**
 * CEYLON ESCAPES — Search & Filtering Module
 * Real interactive filtering for Destinations, Tours, Stays, and Travel Search
 */

document.addEventListener('DOMContentLoaded', () => {
  initDestinationFilters();
  initTourFilters();
  initStaysFilters();
  initHomeSearchBar();
});

/**
 * Filter Destinations by Category
 */
function initDestinationFilters() {
  const filterBtns = document.querySelectorAll('.dest-filter-btn');
  const destCards = document.querySelectorAll('.dest-card');

  if (!filterBtns.length || !destCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter').toLowerCase();

      destCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Check URL query parameters for pre-selected filter (e.g. ?category=beach)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const targetBtn = Array.from(filterBtns).find(
      btn => btn.getAttribute('data-filter').toLowerCase() === categoryParam.toLowerCase()
    );
    if (targetBtn) targetBtn.click();
  }
}

/**
 * Filter Tours by Duration, Style, and Destination
 */
function initTourFilters() {
  const styleSelect = document.getElementById('tour-filter-style');
  const durationSelect = document.getElementById('tour-filter-duration');
  const tourCards = document.querySelectorAll('.tour-card');

  if (!tourCards.length) return;

  const applyTourFilter = () => {
    const selectedStyle = (styleSelect ? styleSelect.value : 'all').toLowerCase();
    const selectedDuration = (durationSelect ? durationSelect.value : 'all').toLowerCase();

    let matchCount = 0;

    tourCards.forEach(card => {
      const cardStyle = (card.getAttribute('data-style') || '').toLowerCase();
      const cardDuration = (card.getAttribute('data-duration') || '').toLowerCase();

      const styleMatch = selectedStyle === 'all' || cardStyle.includes(selectedStyle);
      const durationMatch = selectedDuration === 'all' || cardDuration === selectedDuration;

      if (styleMatch && durationMatch) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('tours-no-results');
    if (noResults) {
      noResults.style.display = matchCount === 0 ? 'block' : 'none';
    }
  };

  if (styleSelect) styleSelect.addEventListener('change', applyTourFilter);
  if (durationSelect) durationSelect.addEventListener('change', applyTourFilter);

  // Quick filter buttons if present
  const quickFilterBtns = document.querySelectorAll('.tour-quick-btn');
  quickFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quickFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const style = btn.getAttribute('data-style');
      if (styleSelect) {
        styleSelect.value = style;
        applyTourFilter();
      }
    });
  });
}

/**
 * Filter Accommodation / Stays Directory
 */
function initStaysFilters() {
  const staysFilterBtns = document.querySelectorAll('.stay-filter-btn');
  const stayCards = document.querySelectorAll('.stay-card');

  if (!staysFilterBtns.length || !stayCards.length) return;

  staysFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      staysFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter').toLowerCase();

      stayCards.forEach(card => {
        const type = (card.getAttribute('data-type') || '').toLowerCase();
        if (filterVal === 'all' || type.includes(filterVal)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Interactive Travel Search Bar on Homepage
 */
function initHomeSearchBar() {
  const searchForm = document.getElementById('home-travel-search');
  if (!searchForm) return;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const dest = document.getElementById('search-destination')?.value || '';
    const style = document.getElementById('search-style')?.value || '';
    const duration = document.getElementById('search-duration')?.value || '';

    // If destination is chosen, jump to destinations page or tours
    if (dest && dest !== 'all') {
      window.location.href = `destinations.html?dest=${encodeURIComponent(dest)}`;
    } else if (style && style !== 'all') {
      window.location.href = `tours.html?style=${encodeURIComponent(style)}`;
    } else {
      window.location.href = `destinations.html`;
    }
  });
}
