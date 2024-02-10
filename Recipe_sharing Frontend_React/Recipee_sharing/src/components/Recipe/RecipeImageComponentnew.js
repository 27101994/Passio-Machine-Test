import React from 'react';

const RecipeImageComponent = ({ images, imageSize }) => {
  const defaultSize = '150px'; // Default size if imageSize is not provided

  return (
    <div>
      {Array.isArray(images) && images.length === 0 ? (
        <p>No images for this recipe.</p>
      ) : (
        <div>
          {images &&
            images.map((image) => (
              <div key={image.id}>
                <img
                  src={`http://localhost:8000${image.image_path}`}
                  alt={`Recipe Image ${image.id}`}
                  style={{ width: imageSize || defaultSize, height: 'auto' }}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RecipeImageComponent;
