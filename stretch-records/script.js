'use strict';

const cardArea = document.querySelector('.cards');
const statusBox = document.querySelector('.status');

const roster = [];

function buildCard(artist) {
  const card = document.createElement('article');

  if (artist.photo) {
    const photo = document.createElement('img');

    photo.src = artist.photo;
    photo.alt = `${artist.name}, artist photo`;

    card.append(photo);
  }

  const title = document.createElement('h3');

  title.textContent = artist.name;

  const line = document.createElement('p');

  line.textContent = `${artist.genre}, ${artist.total} of music`;

  card.append(title, line);

  return card;
}

function renderCards(list) {
  for (const artist of list) {
    roster.push(artist);

    cardArea.append(buildCard(artist));
  }
}

function loadArtistsWithPromises() {
  statusBox.textContent = 'Loading artists...';

  setTimeout(() => {
    fetch('http://localhost:3000/artists')
      .then((response) => {
        console.log('Response:', response);

        // Step 4:
        // fetch() does not reject on 404.
        // We must check response.ok ourselves.

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((artists) => {
        renderCards(artists);
      })
      .catch((error) => {
        console.error(error);

        statusBox.textContent = 'We could not load the artists.';
      })
      .finally(() => {
        if (roster.length > 0) {
          statusBox.textContent = '';
        }
      });
  }, 2000);
}

loadArtistsWithPromises();

async function loadArtistsAsync() {
  try {
    const response = await fetch('http://localhost:3000/artists');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const artists = await response.json();

    cardArea.innerHTML = '';

    roster.length = 0;

    renderCards(artists);
  } catch (error) {
    statusBox.textContent = 'We could not load the artists.';
  } finally {
    if (roster.length > 0) {
      statusBox.textContent = '';
    }
  }
}

class MissingArtistDataError extends Error {
  constructor(field) {
    super(`Required data is missing ${field}`);

    this.name = 'MissingArtistDataError';
  }
}

function checkArtist(artist) {
  if (!artist.name) {
    throw new MissingArtistDataError('name');
  }
}

try {
  checkArtist({
    genre: 'Pop',
  });
} catch (error) {
  console.log('Teammate message:', error.message);
}

function loadArtistWithContext() {
  try {
    checkArtist({});
  } catch (error) {
    throw new Error(
      `Artist page load failed while loading artists. ${error.message}`,
    );
  }
}

try {
  loadArtistWithContext();
} catch (error) {
  console.log(error.message);
}

Promise.all([
  fetch('http://localhost:3000/artists').then((response) => response.json()),

  fetch('http://localhost:3001/label').then((response) => response.json()),
])
  .then(([artists, label]) => {
    console.log('Artists:', artists);

    console.log('Label:', label);

    console.log(`${label.name} (${label.city}) - founded in ${label.founded}`);
  })
  .catch((error) => {
    console.log(error);
  });

const shuffleButton = document.querySelector('.shuffle');

shuffleButton.addEventListener('click', () => {
  if (roster.length === 0) return;

  const pick = roster[Math.floor(Math.random() * roster.length)];

  document.querySelector('.featured').textContent =
    `Featured today: ${pick.name}`;
});

const form = document.querySelector('.signup');

const nameInput = document.querySelector('#artist-name');

const genreInput = document.querySelector('#artist-genre');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (!name) {
    return;
  }

  const newArtist = {
    name: name,
    genre: genreInput.value || 'Unsigned',
    total: '0:00',
  };

  const options = {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(newArtist),
  };

  const response = await fetch('http://localhost:3000/artists', options);

  console.log('POST status:', response.status);

  nameInput.value = '';

  genreInput.value = '';

  location.reload();
});
