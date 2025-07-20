import { useEffect, useState } from 'react';

const styles = ['Cubism', 'Expressionism', 'Surrealism', 'Abstract', 'Minimalism', 'Constructivism', 'Symbolism', 'Suprematism', 'Bauhaus'];

function Art(props) {
    const [painting, setPainting] = useState(null);
    const vert = props.vert ? true : false;

    useEffect(() => {
        async function fetchPainting() {
            const style = props.style ? props.style : styles[Math.floor(Math.random() * styles.length)];
            
            // Increase limit to get more variety and reduce repetition
            const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${style}%20painting&fields=id,title,image_id,thumbnail,dimensions&limit=500`);
            const data = await res.json();
            
            const filteredPaintings = data.data.filter(art => {
                const width = art.thumbnail?.width;
                const height = art.thumbnail?.height;
                
                // Fixed logic: for vertical display, we want height > width (portrait)
                // for horizontal display, we want width > height (landscape)
                if (vert) {
                    return width && height && height > width; // Portrait orientation
                } else {
                    return width && height && width > height; // Landscape orientation
                }
            });

            if (filteredPaintings.length > 0) {
                const random = filteredPaintings[Math.floor(Math.random() * filteredPaintings.length)];
                setPainting({
                    title: random.title,
                    imageUrl: `https://www.artic.edu/iiif/2/${random.image_id}/full/843,/0/default.jpg`
                });
            } else {
                // Fallback: if no filtered results, just pick any painting
                console.log('No paintings found matching orientation, using any available');
                if (data.data.length > 0) {
                    const random = data.data[Math.floor(Math.random() * data.data.length)];
                    setPainting({
                        title: random.title,
                        imageUrl: `https://www.artic.edu/iiif/2/${random.image_id}/full/843,/0/default.jpg`
                    });
                }
            }
        }

        fetchPainting(); // Initial fetch

        // Change interval to 6 minutes (360000ms) to reduce frequency and show more variety
        const interval = setInterval(() => {
            fetchPainting();
        }, 360000);

        return () => clearInterval(interval);
    }, [vert, props.style]); // Added props.style as dependency

    if (!painting) return <div>Loading...</div>;

    return (
        <div className={vert ? 'canvasCenter' : 'canvasRight'}>
            <img 
                src={painting.imageUrl} 
                alt={painting.title}  
                style={{ 
                    maxWidth: '140%', 
                    maxHeight: '140%', 
                    minWidth: '100%', 
                    minHeight: '100%', 
                    objectFit: 'cover', 
                    filter: 'brightness(45%)' 
                }}
            />
        </div>
    );
}

export default Art;