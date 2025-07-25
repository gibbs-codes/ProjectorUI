import { useEffect, useState } from 'react';

const styles = ['Cubism', 'Expressionism', 'Surrealism', 'Abstract', 'Minimalism', 'Constructivism', 'Symbolism', 'Abstract', 'Suprematism', 'Bauhaus'];

function RandomLandscapePainting() {
  const [painting, setPainting] = useState(null);

  useEffect(() => {
    async function fetchPainting() {
      const style = styles[Math.floor(Math.random() * styles.length)];
      const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=landscape&q=${style}%20painting&fields=id,title,image_id,thumbnail,dimensions&limit=100`);
      const data = await res.json();
      const portraits = data.data.filter(art => {
        const width = art.thumbnail?.width;
        const height = art.thumbnail?.height;
        return width && height && height < width;
      });
      const random = portraits[Math.floor(Math.random() * portraits.length)];
      if (random) {
        setPainting({
          title: random.title,
          imageUrl: `https://www.artic.edu/iiif/2/${random.image_id}/full/843,/0/default.jpg`
        });
      }
    }

    fetchPainting(); // <- fetch once immediately

    const interval = setInterval(() => {
      fetchPainting();
    }, 300000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (!painting) return <div>Loading...</div>;

  return (
    <div className='canvasRight'>
      <img src={painting.imageUrl} alt={painting.title}  style={{ maxWidth: '140%', maxHeight: '140%', minWidth: '100%', minHeight: '100%', objectFit: 'cover', filter: 'brightness(45%)' }}/>
    </div>
  );
}

export default RandomLandscapePainting;
