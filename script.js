document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.container img');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  let selectedImages = [];
  let duplicateImageIndex = -1;

  // Function to randomize the images on each reload
  function randomizeImages() {
    const randomIndex = Math.floor(Math.random() * 5); // Random index for duplicate image
    duplicateImageIndex = randomIndex; // Set the duplicate image index
    const duplicateImage = images[randomIndex];

    // Shuffle the images
    const allImages = Array.from(images);
    allImages.push(duplicateImage); // Add the duplicate image
    allImages.sort(() => Math.random() - 0.5); // Shuffle

    allImages.forEach((img, index) => {
      const originalClass = `img${index + 1}`;
      img.className = originalClass; // Reset class
      img.src = `image${Math.floor(Math.random() * 5) + 1}.jpg`; // Set random image
    });

    // Set the duplicate image
    images[duplicateImageIndex].src = duplicateImage.src;
  }

  // Event listener for image clicks
  images.forEach((image, index) => {
    image.addEventListener('click', function() {
      if (selectedImages.length < 2 && !selectedImages.includes(image)) {
        image.classList.add('selected');
        selectedImages.push(image);

        // Reset button visibility
        resetButton.style.display = 'block';

        // If two images have been selected, show the verify button
        if (selectedImages.length === 2) {
          verifyButton.style.display = 'block';
        }
      }
    });
  });

  // Reset button click event
  resetButton.addEventListener('click', function() {
    selectedImages.forEach(img => img.classList.remove('selected', 'selected2'));
    selectedImages = [];
    para.innerHTML = '';
    verifyButton.style.display = 'none';
    resetButton.style.display = 'none';
    randomizeImages(); // Re-randomize images
  });

  // Verify button click event
  verifyButton.addEventListener('click', function() {
    if (selectedImages[0].src === selectedImages[1].src) {
      para.innerHTML = 'You are a human. Congratulations!';
      selectedImages.forEach(img => img.classList.add('selected2'));
    } else {
      para.innerHTML = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    verifyButton.style.display = 'none';
  });

  // Initialize the page with images randomized
  randomizeImages();
});
