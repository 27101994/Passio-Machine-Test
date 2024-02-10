import React from 'react';

const RecipeImageComponent = ({ images }) => {
  return (
    <div>
      {Array.isArray(images) && images.length === 0 ? (
        <p>No images for this recipe.</p>
      ) : (
        <div>
          {images &&
            images.map((image) => (
              <div key={image.id}>
                <img src={image.image_path} alt={`Recipe Image ${image.id}`} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RecipeImageComponent;
