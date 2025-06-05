import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Catalogue = () => {
  const [books, setBooks] = useState({
    openlib: [],
    projectgut: [],
  });

  let genre = "fiction"; // Default genre, can be changed based on user input or selection

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [openlibRes, gutendexRes] = await Promise.all([
          axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=50`),
          axios.get(`https://gutendex.com/books/?topic=${genre}`), // fixed
        ]);

        setBooks((prevBooks) => ({
          ...prevBooks,
          openlib: openlibRes.data.works || [],
          projectgut: gutendexRes.data.results || [],
        }));

        console.log({ books });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    console.log("Fetched books:", books);
  }, [books]);

  return (
    <div>
      <h1>Catalogue</h1>
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <h2>{book}</h2>
        </div>
      ))}
      <Link className="links" to="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default Catalogue;
