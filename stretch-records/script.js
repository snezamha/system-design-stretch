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
    fetch('artists.json')
      .then((response) => response.json())
      .then((artists) => {
        renderCards(artists);
      })
      .catch(() => {
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
    const response = await fetch('artists.json');

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

const task1 = new Promise((resolve) =>
  setTimeout(() => resolve('Artist 1'), 1000),
);

const task2 = new Promise((resolve) =>
  setTimeout(() => resolve('Artist 2'), 1500),
);

const task3 = new Promise((resolve) =>
  setTimeout(() => resolve('Artist 3'), 2000),
);

Promise.all([task1, task2, task3]).then((result) => {
  console.log('Promise.all:', result);
});

const failedTask = new Promise((resolve, reject) =>
  setTimeout(() => reject('Failed'), 1000),
);

Promise.all([task1, failedTask, task3]).catch((error) => {
  console.log('Promise.all failed:', error);
});

Promise.allSettled([task1, failedTask, task3]).then((result) => {
  console.log('Promise.allSettled:', result);
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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value;

  if (name) {
    const genre = genreInput.value || 'Unsigned';

    renderCards([
      {
        name: name,
        genre: genre,
        total: '0:00',
      },
    ]);

    nameInput.value = '';

    genreInput.value = '';
  }
});
