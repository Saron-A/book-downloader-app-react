import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Catalogue = () => {
  const [books, setBooks] = useState({
    openlib: [],
    projectgut: [],
  });

  const [genre, setGenre] = useState("fiction");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [openlibRes, gutendexRes] = await Promise.all([
          axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=50`),
          axios.get(`https://gutendex.com/books/?topic=${genre}`),
        ]);

        const openLibFiltered = (openlibRes.data.works || []).filter(
          (book) => book.availability?.is_readable && book.availability?.formats
        );

        const gutendexFiltered = (gutendexRes.data.results || []).filter(
          (book) =>
            book.formats["application/epub+zip"] ||
            book.formats["application/pdf"]
        );

        setBooks({
          openlib: openLibFiltered,
          projectgut: gutendexFiltered,
        });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [genre]);

  const handleClick = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div className="catalogue-container">
      <h1>Downloadable Books</h1>
      <label htmlFor="genre-select">Genre</label>
      <select name="" id="genre-select" value={genre} onChange={handleClick}>
        <option value="fiction">fiction</option>
        <option value="non-fiction">Non-fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="mystery">Mystery</option>
        <option value="romance">Romance</option>
        <option value="classics">Classics</option>
        <option value="biography">Biography</option>
        <option value="history">History</option>
        <option value="science">Science</option>
        <option value="self-help">Self-help</option>
      </select>
      <div className="book-shelf">
        {books.projectgut.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>By: {book.authors?.map((a) => a.name).join(", ")}</p>
            {book.formats["application/epub+zip"] && (
              <a
                href={book.formats["application/epub+zip"]}
                target="_blank"
                rel="noreferrer"
              >
                Download EPUB
              </a>
            )}
            {book.formats["application/pdf"] && (
              <a
                href={book.formats["application/pdf"]}
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            )}
          </div>
        ))}

        {books.openlib.map((book) => (
          <div key={book.key} className="book-item">
            <h3>{book.title}</h3>
            <p>By: {book.authors?.map((a) => a.name).join(", ")}</p>
            {book.availability?.formats?.pdf && (
              <a
                href={book.availability.formats.pdf}
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            )}
            {book.availability?.formats?.epub && (
              <a
                href={book.availability.formats.epub}
                target="_blank"
                rel="noreferrer"
              >
                Download EPUB
              </a>
            )}
          </div>
        ))}
      </div>

      <Link className="links" to="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default Catalogue;
