import axios from "axios";
import React, { useState, useEffect } from "react";
import "../index.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const genres = [
    "fiction",
    "non-fiction",
    "fantasy",
    "mystery",
    "romance",
    "classics",
    "biography",
    "history",
    "science",
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

            const googlebooks = (googlebooksresp.data.items || []).map(
              (book) => ({
                source: "Google Books",
                id: book.id,
                title: book.volumeInfo?.title,
                author: book.volumeInfo?.authors?.[0] || "Unknown Author",
                image: book.volumeInfo?.imageLinks?.smallThumbnail || null,
              })
            );

            const openlibrary = (openlibres.data.works || []).map((book) => ({
              source: "Open Library",
              id: book.key,
              title: book.title,
              author: book.authors?.[0]?.name || "Unknown Author",
              image: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null,
            }));

            const projectgut = (projectgutres.data.results || []).map(
              (book) => ({
                source: "Project Gutenberg",
                id: book.id,
                title: book.title,
                author: book.authors?.[0]?.name || "Unknown Author",
                image: book.formats["image/jpeg"] || null,
              })
            );

            const combinedBooks = [
              ...googlebooks,
              ...openlibrary,
              ...projectgut,
            ]
              .filter((book) => book.title && book.author && book.image)
              .slice(0, 5); // Take only first 5 books total

            return {
              genre,
              books: combinedBooks,
            };
          })
        );

        setCategories(results);
        console.log(results);
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
          <h3>{category.genre.toUpperCase()}</h3>
          <div className="books">
            {category.books.map((book) => (
              <div className="book" key={book.id}>
                {book.image ? (
                  <img src={book.image} alt={book.title} />
                ) : (
                  <div className="no-image">No cover</div>
                )}
                <h4>{book.title}</h4>
                <p className="author">{book.author}</p>
                <p className="source">{book.source}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
