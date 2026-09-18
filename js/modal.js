/**
 * CEYLON ESCAPES — Modals & Interactive Viewers
 * Tour details modal, Destination quick-view, Food heritage modal, and Photo Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initModalTriggers();
  initGlobalModalClose();
});

// Comprehensive Tour Packages Data Dictionary
const tourPackagesData = {
  'glimpse-of-sri-lanka': {
    title: 'Glimpse of Sri Lanka',
    duration: '03 Nights / 04 Days',
    route: 'Kandy – Down South',
    style: 'Culture, Scenic & Coastal Relaxation',
    pricingNotice: 'SAMPLE PRICE: From $480 USD per person (Based on double occupancy). ENQUIRE FOR CURRENT RATE.',
    overview: 'An ideal short escape connecting the royal mountain capital of Kandy with the golden beaches and colonial ramparts of Sri Lanka\'s southern coast. Perfect for brief stopovers, regional travellers, and first-time visitors seeking a condensed island experience.',
    highlights: [
      'Scenic climb into the misty Central Highlands',
      'Temple of the Sacred Tooth Relic (Sri Dalada Maligawa) in Kandy',
      'Stroll around historic Kandy Lake and vibrant artisan bazaars',
      'Royal Botanical Gardens at Peradeniya with towering royal palms',
      'Scenic transfer down to the Southern coastline (Bentota / Galle)',
      'Exploration of UNESCO World Heritage Galle Fort ramparts and lighthouse',
      'Golden sunset by the Indian Ocean shoreline'
    ],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Scenic Transfer to Royal Kandy', desc: 'Arrive at Bandaranaike International Airport. Travel through tropical countryside to Kandy. Evening witness of the sacred Thevava ceremony at the Temple of the Tooth.' },
      { day: 'Day 02', title: 'Peradeniya Gardens & Down South Scenic Drive', desc: 'Morning visit to Peradeniya Royal Botanical Gardens. Descend through lush valleys and spice gardens toward the golden Southern coastline. Check into coastal resort.' },
      { day: 'Day 03', title: 'UNESCO Galle Fort & Coastal Leisure', desc: 'Morning guided walk across the Dutch Fort ramparts, colonial churches, and boutique lanes in Galle. Afternoon at leisure on Bentota or Mirissa beach.' },
      { day: 'Day 04', title: 'Colombo Coastal Drive & Departure', desc: 'Scenic highway transfer to Colombo. Brief city orientation driving past Galle Face Green before departure transfer to the airport.' }
    ]
  },
  'classic-sri-lanka': {
    title: 'Classic Sri Lanka',
    duration: '05 Nights / 06 Days',
    route: 'Sigiriya – Kandy – Nuwara Eliya – Bentota',
    style: 'Heritage, Highlands & Golden Coast',
    pricingNotice: 'SAMPLE PRICE: From $790 USD per person. ENQUIRE FOR CURRENT RATE.',
    overview: 'The quintessential Sri Lankan discovery journey spanning ancient UNESCO rock citadels, sacred highland temples, emerald tea estates, and golden tropical beaches.',
    highlights: [
      'Sunrise climb of Sigiriya Rock Fortress with panoramic jungle views',
      'Golden Temple and painted cave sanctuaries of Dambulla',
      'Sacred Tooth Relic Temple and traditional Kandyan dance performance',
      'Emerald tea plantation tour and tea factory tasting in Nuwara Eliya',
      'Cool mountain climate, Lake Gregory, and colonial architecture',
      'Bentota river safari lagoon cruise and coastal water sports',
      'Beachfront relaxation along the tranquil south-west coast'
    ],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Cultural Triangle Gateway', desc: 'Meet on arrival and transfer to Sigiriya / Habarana. Evening leisure overlooking the ancient reservoir.' },
      { day: 'Day 02', title: 'Sigiriya Rock Citadel & Dambulla Caves', desc: 'Ascend the 5th-century royal rock citadel of Sigiriya. In the afternoon, explore the sacred cave temple complex of Dambulla containing over 150 Buddha statues.' },
      { day: 'Day 03', title: 'Spice Sanctuaries & Cultural Kandy', desc: 'Scenic journey to Kandy via Matale spice gardens. Evening visit to the Temple of the Sacred Tooth Relic followed by a cultural performance of traditional Kandyan dance.' },
      { day: 'Day 04', title: 'Misty Mountains & Nuwara Eliya Tea Estates', desc: 'Drive past cascading waterfalls into Nuwara Eliya, the "Little England" of Sri Lanka. Tour a working tea factory, hand-pluck Ceylon tea leaves, and stroll Lake Gregory.' },
      { day: 'Day 05', title: 'Descent to Bentota Beach Haven', desc: 'Descend through scenic mountain gorges to the palm-fringed sands of Bentota. Afternoon relaxation or optional river boat safari amidst mangrove ecosystems.' },
      { day: 'Day 06', title: 'Colombo Coastline & Departure', desc: 'Leisurely breakfast by the ocean. Transfer past Colombo skyline to Bandaranaike International Airport for onward departure.' }
    ]
  },
  'sri-lanka-highlights': {
    title: 'Sri Lanka Highlights',
    duration: '06 Nights / 07 Days',
    route: 'Sigiriya – Kandy – Nuwara Eliya – Ella – Bentota',
    style: 'Comprehensive Heritage, Mountain Rail & Beach',
    pricingNotice: 'SAMPLE PRICE: From $920 USD per person. ENQUIRE FOR CURRENT RATE.',
    overview: 'Our premier island circuit incorporating Sri Lanka\'s iconic mountain railway journey across the Nine Arch Bridge, ancient royal capitals, tea gardens, and coastal sanctuaries.',
    highlights: [
      'UNESCO World Heritage Sigiriya Rock Citadel and water gardens',
      'Dambulla Golden Cave Temple monasteries',
      'Temple of the Sacred Tooth Relic in the hill capital of Kandy',
      'Tea tasting experience at an authentic high-elevation Ceylon estate',
      'World-famous scenic train ride from Nuwara Eliya to Ella',
      'Nine Arch Bridge viewpoint and hike up Little Adam\'s Peak',
      'Ravana Waterfalls and mountain valley vistas',
      'Tropical beach unwinding in Bentota'
    ],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Travel to Cultural Triangle', desc: 'Welcome at Colombo airport. Transfer through scenic villages to your cultural resort in Sigiriya.' },
      { day: 'Day 02', title: 'Sigiriya Citadel & Rural Village Experience', desc: 'Morning climb of Sigiriya Rock Fortress. Afternoon gentle bullock cart and catamaran cruise in a traditional rural village community.' },
      { day: 'Day 03', title: 'Dambulla Rock Temple & Royal Kandy', desc: 'Explore Dambulla cave murals. Continue to Kandy for city tour and evening Tooth Relic Temple ceremony.' },
      { day: 'Day 04', title: 'Highland Tea Trails to Nuwara Eliya', desc: 'Travel through emerald tea valleys and Ramboda Falls. Tour historic tea factory with private cupping session.' },
      { day: 'Day 05', title: 'Scenic Mountain Train to Ella & Nine Arch Bridge', desc: 'Board the iconic blue train through tunnels, eucalyptus forests, and tea terraces to Ella. Sunset at the Nine Arch Bridge.' },
      { day: 'Day 06', title: 'Little Adam\'s Peak & Journey to Bentota Coast', desc: 'Morning walk to Little Adam\'s Peak. Journey south past Ravana Falls to the golden beach resort in Bentota.' },
      { day: 'Day 07', title: 'Coastal Farewell & Airport Transfer', desc: 'Relaxation on Bentota beach followed by comfortable highway transfer to Colombo airport.' }
    ]
  },
  'romantic-sri-lanka': {
    title: 'Romantic Sri Lanka',
    duration: '05 Nights / 06 Days',
    route: 'Sigiriya – Kandy – Nuwara Eliya – Mirissa / Galle',
    style: 'Honeymoon, Private Luxury & Secluded Romance',
    pricingNotice: 'SAMPLE PRICE: From $1,150 USD per person. ENQUIRE FOR CURRENT RATE.',
    overview: 'Exclusively tailored for couples and honeymooners seeking romantic intimacy, secluded boutique bungalows, candlelit oceanfront dining, private tea garden strolls, and breathtaking sunsets.',
    highlights: [
      'Secluded luxury boutique accommodations with private plunge pools',
      'Private sunset climb overlooking Sigiriya from Pidurangala Rock',
      'Candlelit dinner under the stars in a lush spice garden',
      'Couples\' traditional Ayurvedic floral bath and herbal massage treatment',
      'Cozy fireplace evenings in a colonial tea planter\'s heritage bungalow',
      'Sunset champagne toast atop Coconut Tree Hill in Mirissa',
      'Cobblestone evening walk inside the romantic ramparts of Galle Fort'
    ],
    itinerary: [
      { day: 'Day 01', title: 'Romantic Welcome & Cultural Sanctuary', desc: 'VIP airport meet and greeting with fresh orchid garlands. Transfer to private boutique villa in the Cultural Triangle.' },
      { day: 'Day 02', title: 'Private Citadel View & Couples Ayurveda', desc: 'Gentle morning exploration of Sigiriya. Rejuvenating afternoon 90-minute couples Ayurvedic wellness ritual.' },
      { day: 'Day 03', title: 'Hill Country Romance in Nuwara Eliya', desc: 'Private luxury transfer to a boutique colonial bungalow amidst tea fields. High tea on the manicured English lawn.' },
      { day: 'Day 04', title: 'Scenic Rail Transfer & Ella Panoramas', desc: 'Private reserved train carriage observation to Ella. Romantic sunset dinner overlooking Ella Gap.' },
      { day: 'Day 05', title: 'Mirissa Oceanfront & Galle Fort Sunset', desc: 'Private transfer to beachfront sanctuary in Mirissa. Private sunset walk along the historic Galle Fort sea wall.' },
      { day: 'Day 06', title: 'Secluded Beach Morning & Departure', desc: 'Breakfast in bed with ocean views. Private chauffeur transfer to Colombo airport for departure.' }
    ]
  },
  'wild-sri-lanka': {
    title: 'Wild Sri Lanka Safari',
    duration: '06 Nights / 07 Days',
    route: 'Wilpattu – Minneriya – Udawalawe – Yala National Park',
    style: 'Wildlife Safaris, Photography & Nature Conservation',
    pricingNotice: 'SAMPLE PRICE: From $1,050 USD per person. ENQUIRE FOR CURRENT RATE.',
    overview: 'An extraordinary wildlife expedition traversing Sri Lanka\'s premier national parks to observe wild leopards, Asian elephant herds, sloth bears, marine giants, and prolific birdlife.',
    highlights: [
      'Game drives in Wilpattu National Park among pristine sand-rimmed villus',
      'The Great Elephant Gathering spectacle at Minneriya reservoir',
      'Visit to the Udawalawe Elephant Transit Home rehabilitation center',
      'Multiple morning & evening 4x4 safaris in Yala National Park Block 1',
      'Prime opportunities for sighting Sri Lankan leopard and sloth bear',
      'Whale watching excursion off Mirissa coast for majestic Blue Whales',
      'Strict adherence to ethical, non-intrusive wildlife viewing protocols'
    ],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Wilpattu Safari Gateway', desc: 'Arrive in Colombo and transfer north to the wilderness border of Wilpattu National Park.' },
      { day: 'Day 02', title: 'Wilpattu Leopard & Sloth Bear Tracking', desc: 'Full morning 4x4 safari traversing Wilpattu\'s dense dry-zone forest and natural water basins.' },
      { day: 'Day 03', title: 'Minneriya Reservoir Elephant Gathering', desc: 'Transfer to Minneriya. Afternoon game drive witnessing hundreds of wild elephants grazing and bathing.' },
      { day: 'Day 04', title: 'Udawalawe Conservation Safari', desc: 'Travel to Udawalawe. Visit the Elephant Transit Home during milk-feeding time, followed by sunset park safari.' },
      { day: 'Day 05', title: 'Yala National Park Safari Expedition', desc: 'Morning game drive in Yala seeking Sri Lankan leopards, spotted deer, wild boars, and mugger crocodiles.' },
      { day: 'Day 06', title: 'Mirissa Blue Whale Cruise & Coastline', desc: 'Early morning respectful boat excursion into the Indian Ocean to observe migrating Blue Whales and spinner dolphins.' },
      { day: 'Day 07', title: 'Coastal Return to Colombo', desc: 'Scenic drive along the southern expressway back to Colombo for evening departure.' }
    ]
  },
  'ramayana-heritage': {
    title: 'Ramayana Heritage Journey',
    duration: '06 Nights / 07 Days',
    route: 'Chilaw – Kandy – Nuwara Eliya – Ella – Colombo',
    style: 'Sacred Legend, Pilgrimage & Living Heritage',
    pricingNotice: 'SAMPLE PRICE: From $820 USD per person. ENQUIRE FOR CURRENT RATE.',
    overview: 'A profoundly inspiring cultural and spiritual pilgrimage tracing legendary sites associated with the ancient epic Ramayana across Sri Lanka\'s mist-veiled mountains, sacred temples, and royal caves.',
    highlights: [
      'Munneswaram and Manavari Temples in Chilaw',
      'Temple of the Sacred Tooth Relic in Kandy',
      'Seetha Amman Temple and Ashok Vatika in Hakgala / Nuwara Eliya',
      'Divurumpola Temple – the legendary site of Sita Devi\'s Agni Pariksha',
      'Ravana Falls and Ravana Cave near Ella',
      'Gayathri Peedam holy shrine in Nuwara Eliya',
      'Kelaniya Raja Maha Vihara – associated with Vibhishana in Colombo'
    ],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Chilaw Temples to Kandy', desc: 'Visit Munneswaram and Manavari Kovils where Lord Rama worshipped. Journey to the hill capital of Kandy.' },
      { day: 'Day 02', title: 'Kandy Sacred Sites & Highland Journey', desc: 'Morning darshan in Kandy. Scenic ascent to Nuwara Eliya through mist-shrouded tea valleys.' },
      { day: 'Day 03', title: 'Seetha Amman Temple & Ashok Vatika', desc: 'Visit the revered Seetha Amman Kovil where Sita was held captive. Explore Hakgala Gardens, identified as Ashok Vatika.' },
      { day: 'Day 04', title: 'Divurumpola & Ella Legends', desc: 'Visit Divurumpola Temple. Continue to Ella to explore the legendary Ravana Falls and dramatic mountain cliffs.' },
      { day: 'Day 05', title: 'Ravana Cave & Mountain Serenity', desc: 'Explore Ravana Ella cave complex and take in panoramic viewpoints across the Ella Gap.' },
      { day: 'Day 06', title: 'Kelaniya Temple & Colombo Pilgrimage', desc: 'Travel to Colombo. Visit the ancient Kelaniya Raja Maha Vihara linked with King Vibhishana.' },
      { day: 'Day 07', title: 'Panchamuga Anjaneyar Kovil & Departure', desc: 'Visit Sri Anjaneyar Temple in Dehiwala, the first temple in the world with a chariot for Hanuman. Transfer to airport.' }
    ]
  }
};

/**
 * Initialize Tour and Food Modal Triggers
 */
function initModalTriggers() {
  // Tour Details Trigger
  document.querySelectorAll('.view-tour-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tourKey = btn.getAttribute('data-tour');
      openTourModal(tourKey);
    });
  });

  // Food Item Modal Trigger
  document.querySelectorAll('.food-card').forEach(card => {
    card.addEventListener('click', () => {
      const foodName = card.querySelector('h4')?.textContent || '';
      const foodDesc = card.querySelector('p')?.textContent || '';
      const foodImg = card.querySelector('img')?.getAttribute('src') || '';
      const foodDetail = card.getAttribute('data-detail') || foodDesc;

      openGenericModal({
        title: foodName,
        tag: 'Authentic Sri Lankan Culinary Heritage',
        image: foodImg,
        content: `
          <p class="lead">${foodDesc}</p>
          <div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--color-sand); border-left: 3px solid var(--color-accent); border-radius: 4px;">
            <h5 style="margin-bottom: 0.5rem; font-family: var(--font-sans); text-transform: uppercase; font-size: 0.85rem; color: var(--color-primary);">Cultural Heritage & Serving Tradition:</h5>
            <p style="margin-bottom: 0; font-size: 0.92rem;">${foodDetail}</p>
          </div>
          <p style="font-size: 0.9rem; color: var(--color-gray-dark);">Sri Lankan cuisine reflects thousands of years of island spices, Ayurvedic culinary philosophy, fresh coconut milk infusions, and coastal marine abundance. Every region offers distinct variations steeped in generational family recipes.</p>
        `
      });
    });
  });
}

/**
 * Open Tour Modal with Rich Details
 */
function openTourModal(tourKey) {
  const data = tourPackagesData[tourKey];
  if (!data) return;

  const highlightsHtml = data.highlights.map(h => `<li style="margin-bottom: 0.4rem; padding-left: 1.2rem; position: relative;"><span style="position: absolute; left: 0; color: var(--color-accent); font-weight: bold;">✓</span>${h}</li>`).join('');

  const itineraryHtml = data.itinerary.map(item => `
    <div style="margin-bottom: 1.2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-sand-border);">
      <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-dark); background: rgba(200, 150, 62, 0.15); padding: 2px 8px; border-radius: 4px;">${item.day}</span>
      <h5 style="margin: 0.4rem 0 0.2rem 0; font-size: 1.05rem; color: var(--color-primary-dark); font-family: var(--font-serif);">${item.title}</h5>
      <p style="margin-bottom: 0; font-size: 0.88rem; color: var(--color-gray-dark);">${item.desc}</p>
    </div>
  `).join('');

  openGenericModal({
    title: data.title,
    tag: `${data.duration} | ${data.route}`,
    content: `
      <div class="tour-price-box" style="margin-bottom: 1.5rem;">
        <span class="tour-price-label">Transparent Academic Pricing Notice</span>
        <div class="tour-price-val" style="font-size: 0.98rem; color: var(--color-primary);">${data.pricingNotice}</div>
      </div>
      <p class="lead">${data.overview}</p>
      
      <h4 style="margin: 1.5rem 0 0.8rem 0; font-size: 1.15rem; color: var(--color-primary);">Journey Highlights</h4>
      <ul style="list-style: none; margin-bottom: 2rem;">
        ${highlightsHtml}
      </ul>

      <h4 style="margin: 1.5rem 0 0.8rem 0; font-size: 1.15rem; color: var(--color-primary);">Sample Itinerary</h4>
      <div style="margin-bottom: 2rem;">
        ${itineraryHtml}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem;">
        <a href="contact.html?tour=${encodeURIComponent(data.title)}" class="btn btn-primary" style="flex-grow: 1;">Enquire For Current Rate</a>
        <button class="btn btn-outline close-modal-trigger">Close Window</button>
      </div>
    `
  });
}

/**
 * Generic Modal Engine
 */
function openGenericModal({ title, tag, image, content }) {
  let modalOverlay = document.getElementById('global-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'global-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-content" role="dialog" aria-modal="true">
        <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        <div class="modal-body-container"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    modalOverlay.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  const bodyContainer = modalOverlay.querySelector('.modal-body-container');
  bodyContainer.innerHTML = `
    ${tag ? `<div class="section-tag" style="margin-bottom: 0.5rem;">${tag}</div>` : ''}
    <h2 style="font-size: 1.85rem; margin-bottom: 1.2rem; color: var(--color-primary-dark);">${title}</h2>
    ${image ? `<div style="border-radius: 8px; overflow: hidden; margin-bottom: 1.5rem; max-height: 340px;"><img src="${image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;"></div>` : ''}
    <div class="modal-html-content">${content}</div>
  `;

  // Attach dynamic close button listeners
  bodyContainer.querySelectorAll('.close-modal-trigger').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('global-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initGlobalModalClose() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.openTourModal = openTourModal;
window.openGenericModal = openGenericModal;
window.closeModal = closeModal;
