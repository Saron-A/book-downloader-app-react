import axios from "axios";
import React, { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const genres = [
    "fiction",
    "non-fiction",
    "science",
    "history",
    "fantasy",
    "mystery",
    "biography",
    "romance",
    "classics",
    "self-help",
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const results = await Promise.all(
          genres.map(async (genre) => {
            const [googlebooksresp, openlibres, projectgutres] =
              await Promise.all([
                axios.get(
                  `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=5`
                ),
                axios.get(
                  `https://openlibrary.org/subjects/${genre}.json?limit=5`
                ),
                axios.get(
                  `https://gutendex.com/books/?bookshelves=${encodeURIComponent(
                    genre
                  )}`
                ),
              ]);

            return {
              genre,
              googlebooks: googlebooksresp.data.items || [],
              openlibrary: openlibres.data.works || [],
              projectgut: projectgutres.data.results || [],
            };
          })
        );
        setCategories(results);
        console.log(results); // Array of { genre, googlebooks, openlibrary, projectgut }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="category-container">
      <h2>Categories</h2>
      {categories.map((category) => (
        <div key={category.genre} className="genre-section">
          <h3>{category.genre}</h3>
          <div className="books">
            {/* Google Books */}
            {category.googlebooks.map((book, idx) => (
              <div className="book" key={book.id || idx}>
                <img
                  src={book.volumeInfo?.imageLinks?.smallThumbnail}
                  alt={book.volumeInfo?.title}
                />
                <h4>{book.volumeInfo?.title}</h4>
                <p className="author">
                  {book.volumeInfo?.authors?.[0] || "Unknown Author"}
                </p>
              </div>
            ))}

            {/* Open Library */}
            {category.openlibrary.map((book, idx) => (
              <div className="book" key={book.key || idx}>
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                  />
                ) : (
                  <div className="no-image">No cover</div>
                )}
                <h4>{book.title}</h4>
                <p className="author">
                  {book.authors?.[0]?.name || "Unknown Author"}
                </p>
              </div>
            ))}

            {/* Project Gutenberg */}
            {category.projectgut.map((book, idx) => (
              <div className="book" key={book.id || idx}>
                {book.formats["image/jpeg"] ? (
                  <img src={book.formats["image/jpeg"]} alt={book.title} />
                ) : (
                  <div className="no-image">No cover</div>
                )}
                <h4>{book.title}</h4>
                <p className="author">
                  {book.authors?.[0]?.name || "Unknown Author"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
