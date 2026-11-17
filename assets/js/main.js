/**
 * UNCLE P MERCHANTS — OFFICIAL SCRIPTS
 * Engineered with 30+ Years of Web Standards & Modern Performance
 * Vanilla JavaScript (Zero bloated frameworks, zero errors)
 * Privacy-First: All financial quotes & negotiations handled privately via WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initWorkshopHours();
  initGalleryFilters();
  initBuildModal();
  initProjectPlanner();
  initFaqAccordion();
  initContactForm();
  initFounderGallery();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle') || document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobileDrawer') || document.querySelector('.nav-links');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking outside or on a link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   3. LIVE WORKSHOP HOURS & STATUS CALCULATOR
   Accurate Lusaka, Zambia Time (CAT / UTC+2)
   Compact straight-line status badge
   -------------------------------------------------------------------------- */
const WORKSHOP_HOURS = {
  1: { day: 'Monday', open: 8, close: 17, openStr: '8:00 AM', closeStr: '5:00 PM' },
  2: { day: 'Tuesday', open: 8, close: 17, openStr: '8:00 AM', closeStr: '5:00 PM' },
  3: { day: 'Wednesday', open: 8, close: 20, openStr: '8:00 AM', closeStr: '8:00 PM' }, // Extended tuning night
  4: { day: 'Thursday', open: 8, close: 17, openStr: '8:00 AM', closeStr: '5:00 PM' },
  5: { day: 'Friday', open: 8, close: 17, openStr: '8:00 AM', closeStr: '5:00 PM' },
  6: { day: 'Saturday', open: 9, close: 13, openStr: '9:00 AM', closeStr: '1:00 PM' },
  0: { day: 'Sunday', open: 9, close: 15, openStr: '9:00 AM', closeStr: '3:00 PM' }
};

function initWorkshopHours() {
  const statusPills = document.querySelectorAll('.live-status-target');
  const tableRows = document.querySelectorAll('.hours-table tbody tr');

  // Calculate current time in Lusaka (UTC+2 CAT)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const lusakaTime = new Date(utc + (3600000 * 2));

  const currentDay = lusakaTime.getDay(); // 0-6
  const currentHour = lusakaTime.getHours() + (lusakaTime.getMinutes() / 60);

  const todayConfig = WORKSHOP_HOURS[currentDay];
  let isOpen = false;
  let statusText = '';
  let compactText = '';
  let statusClass = 'closed';

  if (currentHour >= todayConfig.open && currentHour < todayConfig.close) {
    isOpen = true;
    const hoursRemaining = todayConfig.close - currentHour;
    if (hoursRemaining <= 1) {
      statusText = `Closing Soon • Closes at ${todayConfig.closeStr}`;
      compactText = `Closing Soon (${todayConfig.closeStr})`;
      statusClass = 'open closing-soon';
    } else {
      statusText = `Open Now • Closes at ${todayConfig.closeStr}`;
      compactText = `Open Now • Closes ${todayConfig.closeStr}`;
      statusClass = 'open';
    }
  } else {
    let nextOpenDay = currentDay;
    if (currentHour >= todayConfig.close) {
      nextOpenDay = (currentDay + 1) % 7;
    }
    const nextConfig = WORKSHOP_HOURS[nextOpenDay];
    statusText = `Closed Now • Opens ${nextOpenDay === currentDay ? 'at ' + todayConfig.openStr : (nextOpenDay === (currentDay + 1) % 7 ? 'Tomorrow at ' + nextConfig.openStr : nextConfig.day + ' at ' + nextConfig.openStr)}`;
    compactText = `Closed • Opens ${nextOpenDay === currentDay ? todayConfig.openStr : 'Tomorrow ' + nextConfig.openStr}`;
    statusClass = 'closed';
  }

  statusPills.forEach(pill => {
    pill.className = `live-status-target status-pill ${statusClass}`;
    pill.innerHTML = `<span class="status-dot"></span><span class="status-text">${compactText}</span>`;
  });

  tableRows.forEach(row => {
    const dayIndex = parseInt(row.getAttribute('data-day'), 10);
    if (dayIndex === currentDay) {
      row.classList.add('today');
    } else {
      row.classList.remove('today');
    }
  });
}

/* --------------------------------------------------------------------------
   4. SIGNATURE BUILDS GALLERY & FILTERING
   -------------------------------------------------------------------------- */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn, .filter-tab-btn');
  const cards = document.querySelectorAll('.build-card, .product-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. BUILD MODAL / LIGHTBOX
   (Private Quote Consultation — Zero Fake Prices)
   -------------------------------------------------------------------------- */
const BUILD_DATABASE = {
  'mark-x-flagship': {
    title: 'Toyota Mark X "Merchant Mwine"',
    plate: 'MERCHANT ZM',
    category: 'Flagship Show Build',
    image: 'assets/images/hero-mark-x-flagship.jpg',
    description: 'The personal flagship of Inspector Point Mbewe. Features a custom Lexus F-Sport spindle bumper conversion, vented hood with glass viewing window, staggered deep-dish rims, and white twin-stripe sport bucket interior.',
    specs: {
      'Vehicle Chassis': 'Toyota Mark X (GRX120/130 Series)',
      'Exterior Finish': 'Mint Pearl Metallic with Obsidian Contrast',
      'Aero Modifications': 'Custom Lexus Spindle Bumper & Vented Hood',
      'Wheel Stance': 'Staggered Deep Dish with Quick Latches',
      'Interior Craft': 'Custom Twin-Stripe Sport Bucket Seats',
      'Significance': 'Official Show Car & Personal Flagship of Point Mbewe'
    }
  },
  'golf-r-demon': {
    title: 'VW Golf 7R "Midnight Demon" (ZCP Autofest 2026)',
    plate: 'MERCHANT ZM',
    category: 'Air Suspension & Bagged Stance',
    image: 'assets/images/build-golf-r-demon.jpg',
    description: 'Built specifically for the Zed Car Project (ZCP) Autofest 2026. Transformed a stock white Golf 7R using color-shifting chameleon paint, custom digital air suspension for a slammed stanced fitment, aftermarket wheels, quad tuned exhaust, and upgraded interior electronics. Featured in the official ZCP Autofest YouTube Walkthrough.',
    specs: {
      'Vehicle Chassis': 'Volkswagen Golf 7R Performance',
      'Exterior Finish': 'Chameleon Multi-Tone Olive-to-Bronze Shift',
      'Suspension': 'Custom Digital Air Suspension (Air-Out Slam)',
      'Aero & Styling': 'Gloss Black Diffuser, Rear Roof Wing, Front Splitter',
      'Exhaust': 'Quad Aggressive Tuned Performance Tips',
      'Event Debut': 'Official Flagship at Zed Car Project Autofest 2026'
    }
  },
  'yellow-urus': {
    title: 'Lamborghini Urus "Lusaka Executive Aero"',
    plate: 'MERCHANT ZM',
    category: 'Exotic Custom & Digital Interior',
    image: 'assets/images/gallery-extra-5.jpg',
    description: 'Unveiled on social media in October 2026. This luxury SUV build features custom exterior aerodynamic detailing paired with a refreshed high-tech digital cabin and gloss carbon accents.',
    specs: {
      'Vehicle Chassis': 'Lamborghini Urus Super SUV',
      'Exterior Finish': 'Giallo Auge Yellow with Gloss Black Aero Contrast',
      'Aero Package': 'Custom Front Splitter, Carbon Rear Spoiler & Diffuser',
      'Interior Craft': 'Bespoke Diamond Stitched Leather & Digital Cabin',
      'Debut Date': 'October 2026 Social Media Showcase'
    }
  },
  'pink-lambo': {
    title: 'Lamborghini Project "Purple & Pink Chameleon"',
    plate: 'UPM 9 ZM',
    category: 'Chameleon Wraps & Air Suspension',
    image: 'assets/images/build-altezza-lambo.jpg',
    description: 'Updated in early 2026. Sports a vibrant purple-and-pink iridescent chameleon finish, custom air suspension slammed to the asphalt, aftermarket rims, and bespoke interior cockpit styling.',
    specs: {
      'Vehicle Platform': 'Exotic Scissor Door Supercar Project',
      'Exterior Finish': 'Vibrant Purple & Pink Spectrum Chameleon Flip',
      'Suspension': 'Custom Adjustable Air Ride Stance',
      'Doors': 'Vertical Scissor Hinge System',
      'Wheels': 'Custom Staggered Deep Lip Monoblock Alloys'
    }
  },
  'altezza-turbo': {
    title: 'Toyota Altezza "Next Level" Scissor Turbo',
    plate: 'AIC 6615 ZM',
    category: 'Turbo Performance & Custom Doors',
    image: 'assets/images/build-altezza-turbo.jpg',
    description: 'An aggressive tribute to pure JDM tuning. Boasts vertical scissor (Lambo) doors, polished turbo piping with upgraded intercooler, purple chrome finish, custom red strut brace, and dual halo projector lighting.',
    specs: {
      'Vehicle Chassis': 'Toyota Altezza (SXE10)',
      'Exterior Finish': 'Purple Chrome Deep Gloss Wrap',
      'Door Engineering': 'Vertical Scissor (Lambo) Door Hinge Conversion',
      'Engine Bay': 'Polished Aluminum Turbo Piping, Custom Strut Bar',
      'Lighting': 'Bespoke Dual Angel-Eye Projector Headlight Assembly'
    }
  },
  'altezza-lambo': {
    title: 'Toyota Altezza VVIP Scissor Doors',
    plate: 'ATC 6615 ZM',
    category: 'Turbo Performance & Custom Doors',
    image: 'assets/images/build-altezza-lambo.jpg',
    description: 'The complete exterior stance of the purple Altezza with scissor Lambo doors extended skyward, deep dish chrome lips, bonnet aero vents, and VVIP styling.',
    specs: {
      'Vehicle Chassis': 'Toyota Altezza SXE10',
      'Exterior Finish': 'Metallic Royal Violet',
      'Doors': 'Vertical Lambo Hinges',
      'Wheels': 'Staggered Deep-Dish Black Face with Polished Lip',
      'Aero': 'VVIP Front Bumper, Side Skirts, Rear Window Louvers'
    }
  },
  'gt86-white': {
    title: 'Toyota GT86 "Merchant White Lightning"',
    plate: 'CAM 9 ZM',
    category: 'Widebody & Precision Aero',
    image: 'assets/images/build-gt86-white.jpg',
    description: 'Turn heads anywhere in Lusaka. Built with sculpted multi-tier front canards, electric blue LED dynamic lights, TRD windshield styling, wide rear arches, and race-spec stance.',
    specs: {
      'Vehicle Chassis': 'Toyota GT86 / Scion FR-S',
      'Exterior Finish': 'Pure Glacier White with Black Racing Accents',
      'Aero Kit': 'Multi-Tier Flow Canards, Lower Splitter, Wide Arches',
      'Lighting': 'Electric Blue Swept LED Daytime Running Lights',
      'Windshield Tag': 'Official TRD Racing Development Visor'
    }
  },
  'gt86-orange': {
    title: 'Toyota 86 "Sunset Stance" with Heart LEDs',
    plate: 'CAG 9 ZM',
    category: 'Widebody & Custom Lighting',
    image: 'assets/images/build-gt86-orange-rear.jpg',
    description: 'Equipped with heart-shaped custom rear LED lighting, massive carbon-style GT wing, dual exhaust diffuser, and underglow show lighting.',
    specs: {
      'Vehicle Chassis': 'Toyota 86 Coupe',
      'Exterior Finish': 'Sunset Rose Gold / Burnt Orange Wrap',
      'Aero Kit': 'Competition GT Rear Wing, Wide Body Flares',
      'Lighting': 'Custom Heart-Shaped LED Taillights + Neon Underglow',
      'Rear Styling': 'F1 Style Third Brake Diffuser Light'
    }
  },
  'chaser-chameleon': {
    title: 'Toyota Chaser ACK 2674 Chameleon Widebody',
    plate: 'ACK 2674 ZM',
    category: 'Widebody & Aero Stance',
    image: 'assets/images/build-chaser-chameleon.jpg',
    description: 'Iconic Zambian show car with full purple-cyan chameleon wrap, molded vented hood scoop, angel eye quad projector rings, front splitter with tie-rods, and miniature scale twin.',
    specs: {
      'Vehicle Chassis': 'Toyota Chaser (JZX100)',
      'Exterior Finish': 'Purple-to-Cyan Chameleon Flip Vinyl',
      'Aero Kit': 'Vented Bonnet Scoop, Extended Front Bumper, Wide Arches',
      'Headlamps': 'Quad Angel Eye Halo Projectors',
      'Stance': 'Lowered Coilovers with Deep Dish Work Style Wheels'
    }
  },
  '350z-gold': {
    title: 'Nissan 350Z "Uncle P Motorsports" Widebody',
    plate: 'UPM 9 ZM',
    category: 'Widebody & Custom Wheels',
    image: 'assets/images/build-350z-gold-rear.jpg',
    description: 'Pure Japanese muscle modified for Lusaka car culture. Features dramatic rear fender flares, molded ducktail rear spoiler, titanium-burnt dual exhaust tips, and custom UPM motorsport livery.',
    specs: {
      'Vehicle Chassis': 'Nissan Fairlady Z / 350Z',
      'Exterior Finish': 'Liquid Gold / Iridescent Chroma Wrap',
      'Aero Package': 'Molded Ducktail Trunk Wing, Overfenders',
      'Exhaust': 'Dual Tuned Titanium-Burnt Tips',
      'Wheels': 'Ultra Deep Dish Staggered Bronze Monoblock'
    }
  },
  '350z-rainbow': {
    title: 'Nissan 350Z Rainbow Chameleon Edition',
    plate: 'UPM 9 ZM',
    category: 'Custom Wraps & Shows',
    image: 'assets/images/build-350z-rainbow.jpg',
    description: 'Multi-hue spectrum shift wrap transitioning through magenta, blue, green, and gold, equipped with wide fender flares, ducktail spoiler, and Speedhunters branding.',
    specs: {
      'Vehicle Chassis': 'Nissan 350Z Z33',
      'Exterior Finish': 'Full Iridescent Rainbow Chameleon Vinyl',
      'Aero Kit': 'Vented Front Fenders, Ducktail Wing',
      'Wheels': 'Bronze 5-Spoke Deep Dish with Stretched Tires'
    }
  },
  'mark-x-carbon': {
    title: 'Toyota Mark X "Money Stops The Nonsense"',
    plate: 'CAC 9514 ZM',
    category: 'Widebody & Aero Stance',
    image: 'assets/images/build-mark-x-carbon.jpg',
    description: 'Mint pearl finish contrasted with a carbon-fiber hood featuring a central glass engine window, crimson demon-eye headlights, and an aggressive Lexus F-Sport front conversion.',
    specs: {
      'Vehicle Chassis': 'Toyota Mark X',
      'Exterior Finish': 'Mint Pearl Metallic with Carbon Fiber Hood',
      'Bonnet Feature': 'Transparent Engine Bay Display Window',
      'Lighting': 'Crimson Demon-Eye LED Projectors'
    }
  },
  'mercedes-mint': {
    title: 'Mercedes-Benz "Mint Carbon" Stance',
    plate: 'MERCHANT ZM',
    category: 'Custom Paint & Carbon Styling',
    image: 'assets/images/build-mark-x-carbon.jpg',
    description: 'Showcased in mid-2026. This executive sedan pairs a unique custom mint green paint job with a lightweight carbon fiber vented hood and contrasting gold XXR deep dish wheels.',
    specs: {
      'Vehicle Chassis': 'Mercedes-Benz Executive Sedan Platform',
      'Exterior Finish': 'Custom Pastel Mint Green High-Gloss Respray',
      'Hood Feature': 'Vented Carbon Fiber Hood with Clear Accents',
      'Wheel Setup': 'Gold XXR Multi-Spoke Deep Dish Alloys'
    }
  },
  'lexus-marble': {
    title: 'Lexus IS "Split Marble Gold" Edition',
    plate: 'ZED CAR ZM',
    category: 'Custom Wraps & Shows',
    image: 'assets/images/build-lexus-marble.jpg',
    description: 'Collaboration between Uncle P Merchants and Zed Car Projects. Half gloss black with gold marble veining, half pearl white, equipped with crimson demon-eye LED headlights.',
    specs: {
      'Vehicle Chassis': 'Lexus IS Series',
      'Exterior Finish': 'Split Artisan Gold-Veined Marble & White Vinyl',
      'Headlamps': 'Crimson Demon-Eye LED Projectors',
      'Front Bumper': 'Lexus F-Sport Mesh with Gloss Black Surround'
    }
  },
  'wheel-atomic': {
    title: 'Atomic Sport R Burnt Titanium Wheels',
    plate: 'JDM IMPORT',
    category: 'Wheels & Performance Hardware',
    image: 'assets/images/wheel-atomic-titanium.jpg',
    description: 'Ultra-lightweight Japanese spec staggered wheels with flame-treated burnt titanium anodized step lips and satin black multi-spoke center face.',
    specs: {
      'Wheel Brand': 'Atomic Sport R Japanese Racing',
      'Finish': 'Polished Burnt Titanium Blue/Purple Lip',
      'Construction': 'High-Strength Monoblock Lightweight Alloy',
      'Fitment': 'Staggered Offsets for JDM Sedans & Sports Coupes'
    }
  },
  'wheel-nismo': {
    title: 'Nismo Bronze Monoblock Deep Dish Rims',
    plate: 'JDM IMPORT',
    category: 'Wheels & Performance Hardware',
    image: 'assets/images/wheel-nismo-bronze.jpg',
    description: 'Iconic deep bronze satin finish with authentic Nismo wheel stamps, concave spoke profiles, and aggressive low-offset stance.',
    specs: {
      'Wheel Model': 'Nismo LM-GT Concept Spec',
      'Finish': 'Satin Anodized Bronze Face & Barrel',
      'Fitment': '5x114.3 Bolt Pattern (Toyota, Nissan, Lexus, Honda)'
    }
  },
  'wheel-alpina': {
    title: 'Alpina Multi-Spoke Executive Wheels',
    plate: 'EURO SPEC',
    category: 'Wheels & Performance Hardware',
    image: 'assets/images/wheel-alpina-classic.jpg',
    description: 'Classic European motorsport multispoke design. High-luster silver finish with signature hidden valve stem technology.',
    specs: {
      'Style': 'Alpina Classic Multi-Spoke',
      'Finish': 'Hyper Silver Metallic Gloss',
      'Vehicle Applications': 'BMW, Mercedes-Benz, Audi, VW'
    }
  },
  'wheel-xxr': {
    title: 'XXR Concave Black Machined Alloys',
    plate: 'DEEP DISH',
    category: 'Wheels & Performance Hardware',
    image: 'assets/images/wheel-xxr-black.jpg',
    description: 'Gloss black face with machined diamond-cut outer lip. Maximum concave profile engineered for widebody fitment.',
    specs: {
      'Model': 'XXR Concave Series',
      'Finish': 'Gloss Black with Diamond Cut Machined Lip',
      'Lip Depth': '3.5-inch Deep Step Lip'
    }
  },
  'interior-custom': {
    title: 'Twin-Stripe Diamond Sport Interior',
    plate: 'CUSTOM CRAFT',
    category: 'Interior & Upholstery',
    image: 'assets/images/build-mark-x-sunset.jpg',
    description: 'Complete cabin transformation featuring premium marine-grade leather, white racing contrast stripes, personalized headrest embroidery, and matching door cards.',
    specs: {
      'Upholstery Material': 'Full Grain Automotive Leather',
      'Stitching Pattern': 'Double-Needle Diamond Quilted Accent',
      'Cabin Scope': 'Front Buckets, Rear Bench, Center Console, Door Panels'
    }
  },
  'convoy-action': {
    title: 'Lusaka Highway Convoy Stance Lineup',
    plate: 'UPM CONVOY',
    category: 'Convoys & Car Meets',
    image: 'assets/images/convoy-highway-gt86.jpg',
    description: 'Uncle P Merchants flagship builds cruising in formation on the Great East Road highway en route to national car festivals.',
    specs: {
      'Convoy Lead': 'Toyota GT86 White Lightning & Mark X Flagship',
      'Event Route': 'Lusaka Great East Road to Motorsport Expo',
      'Format': 'Stanced Show Run'
    }
  },
  'expo-lineup': {
    title: 'Lusaka Auto Show Masterpiece Display',
    plate: 'MOTORSPORT',
    category: 'Convoys & Car Meets',
    image: 'assets/images/convoy-lusaka-lineup.jpg',
    description: 'Our full fleet on display at the Lusaka Motorsport Festival, showcasing widebody conversions, chameleon finishes, and slammed air suspension.',
    specs: {
      'Location': 'Lusaka International Exhibition Center',
      'Show Fleet': 'Mark X, Golf 7R, Altezza Turbo, GT86, Nissan 350Z',
      'Award Status': 'Featured Exhibitor & Crowd Favorite'
    }
  },
  'blade-red': {
    title: 'Toyota Blade Candy Red Sport',
    plate: 'LUSAKA SPORT',
    category: 'Hatch Stance',
    image: 'assets/images/build-toyota-blade-red.jpg',
    description: 'Candy crimson paint, Atomic titanium burnt lip deep dish wheels, roof spoiler, and lowered street stance.',
    specs: {}
  },
  'convoy-city': {
    title: 'Lusaka Street Cruising Lineup',
    plate: 'STREET MEETS',
    category: 'City Rollout',
    image: 'assets/images/convoy-lusaka-lineup.jpg',
    description: 'An imposing convoy of Uncle P customized sports cars, slammed sedans, and custom vans turning heads through Lusaka.',
    specs: {}
  },
  'jdm-hardware': {
    title: 'JDM Billet Hardware & Accessories',
    plate: 'ACCESSORIES',
    category: 'Billet Hardware',
    image: 'assets/images/part-jdm-fender-washers.jpg',
    description: 'Anodized aluminum fender washers, neochrome titanium shift knobs, spiked lug nuts, and foldable tow hooks.',
    specs: {}
  }
};

function initBuildModal() {
  const modal = document.getElementById('buildModal');
  const cards = document.querySelectorAll('.build-card, .product-card');
  if (!modal) return;

  const modalImg = modal.querySelector('#modalImage');
  const modalTitle = modal.querySelector('#modalTitle');
  const modalCategory = modal.querySelector('#modalCategory');
  const modalPlate = modal.querySelector('#modalPlate');
  const modalDesc = modal.querySelector('#modalDescription');
  const modalSpecsList = modal.querySelector('#modalSpecs');
  const modalWaBtn = modal.querySelector('#modalInquireBtn');
  const closeBtn = modal.querySelector('.modal-close-btn');

  const openModal = (buildKey) => {
    const data = BUILD_DATABASE[buildKey];
    if (!data) return;

    if (modalImg) modalImg.src = data.image;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalPlate) modalPlate.textContent = data.plate;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalSpecsList) {
      modalSpecsList.innerHTML = '';
      for (const [label, val] of Object.entries(data.specs)) {
        const row = document.createElement('div');
        row.className = 'modal-spec-row';
        row.innerHTML = `<span class="modal-spec-key">${label}:</span> <span class="modal-spec-val">${val}</span>`;
        modalSpecsList.appendChild(row);
      }
    }

    if (modalWaBtn) {
      const waMsg = `Mwapoleni Uncle P Merchants! I saw the *${data.title}* (${data.plate}) on your website. I want to inquire about custom specifications and private quote for my car.`;
      modalWaBtn.href = `https://wa.me/260979002683?text=${encodeURIComponent(waMsg)}`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking direct external link
      if (e.target.closest('a')) return;
      const key = card.getAttribute('data-build-key');
      if (key && BUILD_DATABASE[key]) {
        openModal(key);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. BESPOKE PROJECT PLANNER
   Strict Privacy: Zero fake prices!
   Calculates chosen packages & estimated workshop timeline.
   Prepares pre-filled WhatsApp spec sheet for private negotiation with Uncle P.
   -------------------------------------------------------------------------- */
function initProjectPlanner() {
  const planner = document.getElementById('planner') || document.getElementById('estimator');
  if (!planner) return;

  const vehicleRadios = planner.querySelectorAll('input[name="vehicle_type"]');
  const modCheckboxes = planner.querySelectorAll('.mod-checkbox input[type="checkbox"]');
  const selectedCountDisplay = document.getElementById('selectedModsCount');
  const estimateTimeDisplay = document.getElementById('estimateTimeDisplay');
  const whatsappBtn = document.getElementById('estimateWhatsAppBtn');
  const platformNameDisplay = document.getElementById('selectedPlatformDisplay');

  const updatePlan = () => {
    let selectedPlatform = 'Sedan / Saloon';
    const checkedRadio = planner.querySelector('input[name="vehicle_type"]:checked');
    if (checkedRadio) {
      const parentLabel = checkedRadio.closest('.vehicle-option')?.querySelector('label');
      if (parentLabel) {
        selectedPlatform = parentLabel.textContent.trim();
      }
    }

    let totalDays = 2; // base inspection & prep days
    const chosenMods = [];

    modCheckboxes.forEach(cb => {
      if (cb.checked) {
        const days = parseInt(cb.getAttribute('data-days') || '2', 10);
        const title = cb.getAttribute('data-title') || cb.closest('label')?.querySelector('.mod-title')?.textContent.trim() || 'Custom Upgrade';
        totalDays += days;
        chosenMods.push(title);
      }
    });

    // Cap timeline realistically
    const displayDays = Math.min(totalDays, 14);

    if (platformNameDisplay) {
      platformNameDisplay.textContent = selectedPlatform;
    }
    if (selectedCountDisplay) {
      selectedCountDisplay.textContent = `${chosenMods.length} Custom Package${chosenMods.length === 1 ? '' : 's'} Selected`;
    }
    if (estimateTimeDisplay) {
      estimateTimeDisplay.textContent = `Est. Workshop Turnaround: ~${displayDays} Business Days`;
    }

    if (whatsappBtn) {
      const modListText = chosenMods.length > 0 ? chosenMods.map(m => `• ${m}`).join('\n') : '• General Bespoke Consultation';
      const text = `Mwapoleni Point Mbewe & Uncle P Merchants!\n\nI used your website Project Planner to configure a bespoke build:\n\nPlatform: ${selectedPlatform}\nSelected Styling Packages:\n${modListText}\nEst. Timeline: ~${displayDays} Business Days\n\nPlease let me know your availability for a private consultation and quotation at your Ring Road, Kamwala South workshop.`;
      whatsappBtn.href = `https://wa.me/260979002683?text=${encodeURIComponent(text)}`;
    }
  };

  vehicleRadios.forEach(radio => radio.addEventListener('change', updatePlan));
  modCheckboxes.forEach(cb => cb.addEventListener('change', updatePlan));

  updatePlan();
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. FAST BOOKING QUOTE FORM (WHATSAPP DISPATCH)
   Zero fake amounts, clean placeholders (No "e.g.")
   Strictly private price negotiation with Point Mbewe
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('whatsappForm') || document.getElementById('workshopBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('#clientName')?.value || '').trim();
    const car = ((form.querySelector('#carModel') || form.querySelector('#clientCar'))?.value || '').trim();
    const service = (form.querySelector('#serviceType') || form.querySelector('#clientService'))?.value || '';
    const timeline = (form.querySelector('#clientTimeline')?.value || 'Flexible / Next Available').trim();
    const notes = ((form.querySelector('#buildNotes') || form.querySelector('#clientNotes'))?.value || '').trim();

    const message = `Mwapoleni Uncle P Merchants! I'd like to request a bespoke build consultation:%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Vehicle:* ${encodeURIComponent(car)}%0A` +
      `*Service Desired:* ${encodeURIComponent(service)}%0A` +
      `*Preferred Timeline:* ${encodeURIComponent(timeline)}%0A` +
      `*Vision & Notes:* ${encodeURIComponent(notes || 'Ready for workshop inspection')}%0A%0A` +
      `Looking forward to discussing project details and private quote directly.`;

    window.open(`https://wa.me/260979002683?text=${message}`, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   9. FOUNDER THUMBNAIL INTERACTIVE SWITCHER
   -------------------------------------------------------------------------- */
function initFounderGallery() {
  const mainImg = document.getElementById('founderMainImg');
  const thumbs = document.querySelectorAll('.founder-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const targetSrc = thumb.getAttribute('data-src');
      if (targetSrc) {
        mainImg.style.transition = 'opacity 0.2s ease';
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
        }, 180);
      }
    });
  });
}
