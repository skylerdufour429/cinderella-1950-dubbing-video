const movieList = document.getElementById('movie-list');

async function loadMovies() {
  try {
    const response = await fetch('movies.json');
    if (!response.ok) {
      throw new Error(`Failed to load movie data: ${response.status}`);
    }

    const movies = await response.json();
    renderMovies(movies);
  } catch (error) {
    movieList.innerHTML = `
      <article class="movie-card">
        <h2>Movie data could not be loaded.</h2>
        <p>${error.message}</p>
      </article>
    `;
  }
}

function renderMovies(movies) {
  movieList.innerHTML = movies
    .map(
      (movie) => `
        <article class="movie-card">
          <div class="movie-header">
            <div>
              <p class="eyebrow">${movie.collectionType}</p>
              <h2 class="movie-title">${movie.title}</h2>
            </div>
            <div class="movie-year">${movie.year}</div>
          </div>

          <div class="movie-meta">
            <div class="meta-item">
              <span class="meta-label">Studio</span>
              <span class="meta-value">${movie.studio}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Category</span>
              <span class="meta-value">${movie.category}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Languages</span>
              <span class="meta-value">${movie.languages.length}</span>
            </div>
          </div>

          <div class="language-section">
            <h2>Available Languages</h2>
            <ul class="language-list">
              ${movie.languages
                .map(
                  (language) => `
                    <li>${language}</li>
                  `
                )
                .join('')}
            </ul>
          </div>
        </article>
      `
    )
    .join('');
}

loadMovies();
