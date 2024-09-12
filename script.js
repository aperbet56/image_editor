// Récupération des différents éléments HTML5
const fileInput = document.querySelector(".file__input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter__info .name");
const filterValue = document.querySelector(".filter__info .value");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const previewImg = document.querySelector(".preview__img img");
const resetFilterBtn = document.querySelector(".reset__filter");
const chooseImgBtn = document.querySelector(".choose__img");
const saveImgBtn = document.querySelector(".save__img");

// Création des différentes variables
let brightness = "100";
let saturation = "100";
let inversion = "0";
let grayscale = "0";
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;

// Déclaration de la fonction loadImage qui va permettre de charger l'image souhaitée
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  // Ecoute de l'événement "load"
  previewImg.addEventListener("load", () => {
    resetFilterBtn.click();
    document.querySelector(".container").classList.remove("disable");
  });
};

// Déclaration de la fonction applyFilter qui va permettre d'appliquer des filtres sur l'image
const applyFilter = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

// Pour chaque filtre couleur
filterOptions.forEach((option) => {
  // Ecoute de l'événement "click"
  option.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    filterName.textContent = option.textContent;

    // Condition if else if else
    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.textContent = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.textContent = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.textContent = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.textContent = `${grayscale}%`;
    }
  });
});

// Déclaration de la fonction updateFilter qui va permettre de mettre à jour les valeurs des filtres choisies par l'internaute
const updateFilter = () => {
  filterValue.textContent = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  // Condition if else if else
  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  // Appel de la fonction applyFilter
  applyFilter();
};

// Pour chaque le filtre rotation
rotateOptions.forEach((option) => {
  // Ecoute de l'événement "click"
  option.addEventListener("click", () => {
    // Condition if else if else
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    // Appel de la fonction applyFilter
    applyFilter();
  });
});

// Déclaration de la fonction resetFilter qui va permettre de remettre tous les filtres à zéro
const resetFilter = () => {
  brightness = "100";
  saturation = "100";
  inversion = "0";
  grayscale = "0";
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  // Appel de la fonction applyFilter
  applyFilter();
};

// Déclaration de la fonction saveImage qui va permettre de sauvegarder l'image
const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // Condition if
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  // Création d'un élément HTML5 <a>
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

// Ecoute des événements et appels des fonctions
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
