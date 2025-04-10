import React, { useState, useMemo } from "react";
import galleryData from "./assets/galleryData.json";

const IMAGES_PER_PAGE = 10;

export default function VirtualGallery() {
  //декларирование констат?
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tag1Filter, setTag1Filter] = useState("");
  const [tag2Filter, setTag2Filter] = useState("");
  const [sortByOldDate, setsortByOldDate] = useState(false);

  const allTag1 = [...new Set(galleryData.map((img) => img.tag1))];
  const allTag2 = [...new Set(galleryData.map((img) => img.tag2))]; //подхват фильтров из JSON файла (о да, никакого хардкода)

  const filteredImages = useMemo(() => {
    //алгоритм фильтрации
    let filtered = [...galleryData];  

    if (tag1Filter) {
      filtered = filtered.filter((img) => img.tag1 === tag1Filter);
    }
    if (tag2Filter) {
      filtered = filtered.filter((img) => img.tag2 === tag2Filter);
    }
    if (sortByOldDate) {
      filtered = filtered
        .filter((img) => img.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [tag1Filter, tag2Filter, sortByOldDate]); //вывод из готовых фильтров

  const totalPages = Math.max(
    1,
    Math.ceil(filteredImages.length / IMAGES_PER_PAGE),
  ); //подсчёт на кол. страниц
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE,
  );

  return (
    //lesgo
    <div className="p-4 m-auto">
      <h1 className="text-4xl sm:text-6xl font-bold mb-4">Virtual Gallery</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border rounded px-2 py-1"
          value={tag1Filter}
          onChange={(e) => setTag1Filter(e.target.value)}
        >
          <option value="">Subject</option>
          {allTag1.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1"
          value={tag2Filter}
          onChange={(e) => setTag2Filter(e.target.value)}
        >
          <option value="">Group</option>
          {allTag2.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={sortByOldDate}
            onChange={() => setsortByOldDate((prev) => !prev)}
          />
          <span>Sort by Date</span>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt || `Image ${index}`}
            className="aspect-3/4 lg:aspect-4/3 object-cover cursor-pointer shadow-md hover:shadow-lg transition max-h-64"
            onClick={() => setSelectedImage(img.src)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <button
          className="px-4 py-2 border rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 border rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-h-full max-w-full rounded p-5"
          />
        </div>
      )}
    </div>
  );
}
