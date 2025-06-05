import axios from "axios";
import React, { useState, useEffect } from "react";
import "../index.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const genres = [
    "fiction",
    "fantasy",
    "mystery",
    "romance",
    "classics",
    "biography",
    "history",
    "science",
    "self_help",
    "horror",
    "children",
    "poetry",
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const results = await Promise.all(
          genres.map(async (genre) => {
            const [openlibRes, projectgutRes] = await Promise.all([
              axios.get(
                `https://openlibrary.org/subjects/${genre}.json?limit=10`
              ),
              axios.get(`https://gutendex.com/books/?bookshelves=${genre}`),
            ]);

            const openlibrary = (openlibRes.data.works || [])
              .filter(
                (book) => book.title && book.authors?.length && book.cover_id
              )
              .slice(0, 3) // first 3 Open Library books
              .map((book) => ({
                source: "Open Library",
                id: book.key,
                title: book.title,
                author: book.authors[0].name,
                image: `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
              }));

            const projectgut = (projectgutRes.data.results || [])
              .filter(
                (book) =>
                  book.title &&
                  book.authors?.length &&
                  book.formats["image/jpeg"]
              )
              .slice(0, 2) // first 2 Gutenberg books
              .map((book) => ({
                source: "Project Gutenberg",
                id: book.id,
                title: book.title,
                author: book.authors[0].name,
                image: book.formats["image/jpeg"],
              }));

            return {
              genre,
              books: [...openlibrary, ...projectgut],
            };
          })
        );

        setCategories(results);
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
          <h3>{category.genre.replace(/_/g, " ")}</h3>
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
