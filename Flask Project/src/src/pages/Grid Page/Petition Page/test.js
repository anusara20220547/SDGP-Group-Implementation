<script>
  // Array to store image details
  var images = [
    {
      src: "Images/h.png",
      title: "Hydrogen",
      description: "Hydrogen is the lightest and most abundant element in the universe..."
    },
    {
      src: "Images/o.png",
      title: "Oxygen",
      description: "Oxygen, an essential element for life, plays a vital role in both biological and industrial processes..."
    },
    // Add more image details as needed
  ];

  // Index to track the current image
  var currentIndex = 0;

  // Function to change the image and its description
  function changeImage(direction) {
    currentIndex += direction;

    // Check if the index is within the bounds of the images array
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    // Update the image and description
    var imageElement = document.querySelector(".image-box img");
    var titleElement = document.querySelector(".description h2");
    var descriptionElement = document.querySelector(".description p");

    imageElement.src = images[currentIndex].src;
    titleElement.textContent = images[currentIndex].title;
    descriptionElement.textContent = images[currentIndex].description;
  }
</script>
