document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.container div'); // Select the image containers
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  let selectedImages = [];
  let duplicateImageIndex = -1;

  // Function to randomize the images on each reload
  function randomizeImages() {
    const randomIndex = Math.floor(Math.random() * 5+1); // Random index for duplicate image
    duplicateImageIndex = randomIndex; // Set the duplicate image index
    const duplicateImage = images[randomIndex];

    // Shuffle the images array
    const allImages = Array.from(images);
    allImages.push(duplicateImage); // Add the duplicate image
    allImages.sort(() => Math.random() - 0.5); // Shuffle array

    // Assign classes to images
    allImages.forEach((img, index) => {
      img.className = `img${index + 1}`; // Assign img1, img2, img3, etc.
    });
  }

  // Event listener for image clicks
  images.forEach((image) => {
    image.addEventListener('click', function() {
      if (selectedImages.length < 2 && !selectedImages.includes(image)) {
        image.classList.add('selected');
        selectedImages.push(image);

        // Show reset button
        resetButton.style.display = 'block';

        // Show verify button when two images are selected
        if (selectedImages.length === 2) {
          verifyButton.style.display = 'block';
        }
      }
    });
  });

  // Reset button functionality
  resetButton.addEventListener('click', function() {
    selectedImages.forEach(img => img.classList.remove('selected', 'selected2'));
    selectedImages = [];
    para.innerHTML = ''; // Clear the message
    verifyButton.style.display = 'none'; // Hide verify button
    resetButton.style.display = 'none'; // Hide reset button
    randomizeImages(); // Randomize the images again
  });

  // Verify button functionality
  verifyButton.addEventListener('click', function() {
    if (selectedImages[0].className === selectedImages[1].className) {
      para.innerHTML = 'You are a human. Congratulations!';
      selectedImages.forEach(img => img.classList.add('selected2')); // Mark images as selected
    } else {
      para.innerHTML = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    verifyButton.style.display = 'none'; // Hide verify button after checking
  });

  // Initialize the images
  randomizeImages();
});
