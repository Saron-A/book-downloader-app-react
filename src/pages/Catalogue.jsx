import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";

const Catalogue = () => {
  const [books, setBooks] = useState({
    googlebooks: [],
    openlib: [],
    projectgut: [],
  });

  let genreQuery = "fiction"; // Default genre, can be changed based on user input or selection

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [googleRes, openlibRes, gutendexRes] = await Promise.all([
          axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40`
          ),
          axios.get(`https://openlibrary.org/subjects/fiction.json?limit=50`),
          axios.get(`https://gutendex.com/books/?bookshelves=fiction`), // fixed
        ]);

        setBooks((prevBooks) => ({
          ...prevBooks,
          googlebooks: googleRes.data.items || [],
          openlib: openlibRes.data.works || [],
          projectgut: gutendexRes.data.results || [],
        }));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Catalogue</h1>
    </div>
  );
};

export default Catalogue;
