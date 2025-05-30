import axios from "axios";
import React, { useEffect } from "react";

const Categories = () => {
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

        console.log(results); // Array of { genre, googlebooks, openlibrary, projectgut }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchGenres();
  }, []);

  return <div>Categories</div>;
};

export default Categories;
