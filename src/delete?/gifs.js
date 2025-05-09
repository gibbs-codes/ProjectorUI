import React, { useState, useEffect } from 'react';
import { fetchGifs } from './fetchGifs'; // adjust path if needed

const curatedCategories = [
  'minimalist',
  'abstract',
  'ambient',
  'surreal',
  'ethereal',
  'particles',
  'slow motion',
  'mountains',
  'forest',
  'black and white',
  'monochrome',
  'gradient',
];

const GifAutoProjector = () => {
  const [currentGif, setCurrentGif] = useState(null);

  const loadRandomGif = async () => {
    const randomCategory = curatedCategories[Math.floor(Math.random() * curatedCategories.length)];
    const gifs = await fetchGifs(randomCategory);

    if (gifs.length > 0) {
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
      setCurrentGif(randomGif.images.original.url);
    }
  };

  useEffect(() => {
    // Initial load
    loadRandomGif();

    // Set up interval
    const interval = setInterval(() => {
      loadRandomGif();
    }, 60000); // 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      {currentGif && (
        <img
          src={currentGif}
          alt="Projected GIF"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
    </div>
  );
};

export default GifAutoProjector;
