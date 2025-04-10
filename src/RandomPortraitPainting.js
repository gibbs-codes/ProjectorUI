import { useEffect, useState } from 'react';

function RandomPortraitPainting() {
  const [painting, setPainting] = useState(null);

  useEffect(() => {
    async function fetchPainting() {
      const res = await fetch('https://api.artic.edu/api/v1/artworks/search?q=modernism%20painting&fields=id,title,image_id,thumbnail,dimensions&limit=100');
      const data = await res.json();
      const portraits = data.data.filter(art => {
        const width = art.thumbnail?.width;
        const height = art.thumbnail?.height;
        return width && height && height > width;
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
    }, 60000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (!painting) return <div>Loading...</div>;

  return (
    <div style={{
      width: '371px',
      height: '560px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img src={painting.imageUrl} alt={painting.title}  style={{ maxWidth: '110%', maxHeight: '110%', objectFit: 'cover' }}/>
    </div>
  );
}

export default RandomPortraitPainting;
