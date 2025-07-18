const cars = [
  {
    name: "Dodge Challenger SRT Demon 170",
    image: "./images/2023_dodge_challenger-srt-demon-170_img_1107-48505.jpeg",
    audio: "audio/demon_170.mp3",
    description: "The ultimate street-legal dragster with 1025 horsepower and insane acceleration.",
    specs: [
      "Engine: 6.2L Supercharged HEMI V8",
      "Fuel: E85 / Petrol",
      "Gear: 8-speed automatic",
      "0-60 mph: 1.66s",
      "Top Speed: 215 mph",
      "Horsepower: 1025 hp",
      "Torque: 945 lb-ft"
    ]
  },
  {
    name: "Dodge Challenger SRT Hellcat",
    image: "./images/porshe 911.jpeg",
    audio: "audio/hellcat.mp3",
    description: "A beastly muscle car known for its loud roar and tire-shredding power.",
    specs: [
      "Engine: 6.2L Supercharged V8",
      "Fuel: Petrol",
      "Gear: 8-speed automatic",
      "0-60 mph: 3.6s",
      "Top Speed: 203 mph",
      "Horsepower: 717 hp",
      "Torque: 656 lb-ft"
    ]
  },
  {
    name: "Bugatti Aventado",
    image: "./images/bugati aventado.jpeg",
    audio: "audio/bugatti_aventado.mp3",
    description: "A fictional fusion of Bugatti design and Aventador spirit – pure fantasy.",
    specs: [
      "Engine: Quad Turbo W16",
      "Fuel: Petrol",
      "Gear: 7-speed dual clutch",
      "0-60 mph: 2.4s",
      "Top Speed: 261 mph",
      "Horsepower: 1500 hp",
      "Torque: 1180 lb-ft"
    ]
  },
  {
    name: "Lamborghini Urus",
    image: "./images/#LamborginiUrus #Lamborginiwallpaper.jpeg",
    audio: "audio/urus.mp3",
    description: "A luxury performance SUV that combines speed, space, and style.",
    specs: [
      "Engine: 4.0L Twin-Turbo V8",
      "Fuel: Petrol",
      "Gear: 8-speed automatic",
      "0-60 mph: 3.6s",
      "Top Speed: 190 mph",
      "Horsepower: 657 hp",
      "Torque: 627 lb-ft"
    ]
  },
  {
    name: "Lamborghini Huracán",
    image: "./images/#lamborghini #huracan #sexycars #coolcars #luxury….jpeg",
    audio: "audio/huracan.mp3",
    description: "A sharp, agile supercar built for excitement and track-ready thrills.",
    specs: [
      "Engine: 5.2L V10",
      "Fuel: Petrol",
      "Gear: 7-speed dual clutch",
      "0-60 mph: 2.9s",
      "Top Speed: 202 mph",
      "Horsepower: 631 hp",
      "Torque: 443 lb-ft"
    ]
  },
  {
    name: "Nissan GT-R GT3",
    image: "./images/Nissan_GT-R-R35.jpg",
    audio: "audio/gtr_gt3.mp3",
    description: "Track-focused GT-R built to dominate circuits with precision and raw power.",
    specs: [
      "Engine: 3.8L Twin-Turbo V6",
      "Fuel: Petrol",
      "Gear: 6-speed sequential",
      "0-60 mph: 2.7s",
      "Top Speed: 186 mph",
      "Horsepower: 600+ hp",
      "Torque: 650+ lb-ft"
    ]
  },
  {
    name: "Jaguar F-Type R",
    image: "./images/#jag #jaguar #British #greatbritain #unitedkingdom….jpeg",
    audio: "audio/ftype_r.mp3",
    description: "A British sports car with elegance, agility, and a roaring V8 heart.",
    specs: [
      "Engine: 5.0L Supercharged V8",
      "Fuel: Petrol",
      "Gear: 8-speed automatic",
      "0-60 mph: 3.5s",
      "Top Speed: 186 mph",
      "Horsepower: 575 hp",
      "Torque: 516 lb-ft"
    ]
  },
  {
    name: "Ferrari 812 GTS",
    image: "./images/Ferrari 812 GTS.jpeg",
    audio: "audio/812_gts.mp3",
    description: "A front-engine Ferrari with convertible thrills and a thunderous V12.",
    specs: [
      "Engine: 6.5L V12",
      "Fuel: Petrol",
      "Gear: 7-speed dual clutch",
      "0-60 mph: 2.8s",
      "Top Speed: 211 mph",
      "Horsepower: 789 hp",
      "Torque: 530 lb-ft"
    ]
  },
  {
    name: "BMW M2",
    image: "./images/BMW M2.jpeg",
    audio: "audio/m2.mp3",
    description: "Compact and aggressive, the M2 delivers precision and everyday fun.",
    specs: [
      "Engine: 3.0L Twin-Turbo Inline-6",
      "Fuel: Petrol",
      "Gear: 6-speed manual / 8-speed auto",
      "0-60 mph: 3.9s",
      "Top Speed: 155 mph (limited)",
      "Horsepower: 453 hp",
      "Torque: 406 lb-ft"
    ]
  },
  {
    name: "BMW M3",
    image: "./images/bmw m3.jpeg",
    audio: "audio/m3.mp3",
    description: "A legend of the sport sedan world — fast, balanced, and iconic.",
    specs: [
      "Engine: 3.0L Twin-Turbo Inline-6",
      "Fuel: Petrol",
      "Gear: 6-speed manual / 8-speed auto",
      "0-60 mph: 3.8s",
      "Top Speed: 180+ mph",
      "Horsepower: 503 hp",
      "Torque: 479 lb-ft"
    ]
  },
  {
    name: "BMW M4",
    image: "./images/bmw_m4.jpg",
    audio: "audio/m4.mp3",
    description: "Coupe styling meets M performance — thrilling, fast, and sharp.",
    specs: [
      "Engine: 3.0L Twin-Turbo Inline-6",
      "Fuel: Petrol",
      "Gear: 6-speed manual / 8-speed auto",
      "0-60 mph: 3.8s",
      "Top Speed: 180+ mph",
      "Horsepower: 503 hp",
      "Torque: 479 lb-ft"
    ]
  },
  {
    name: "BMW M5",
    image: "./images/bmw m5.jpeg",
    audio: "audio/m5.mp3",
    description: "Executive luxury meets track-ready performance — brutal and refined.",
    specs: [
      "Engine: 4.4L Twin-Turbo V8",
      "Fuel: Petrol",
      "Gear: 8-speed automatic",
      "0-60 mph: 3.2s",
      "Top Speed: 190 mph",
      "Horsepower: 617 hp",
      "Torque: 553 lb-ft"
    ]
  },
 {
  name: "Porsche 911",
  image: "./images/porsche_911.jpg",
  audio: "audio/porsche_911.mp3",
  description: "Iconic rear‑engine sports car, exhilarating flat‑six roar.",
  specs: [
    "Engine: 3.0L Turbo Flat‑6",
    "Model: 911 Carrera",
    "Brand: Porsche",
    "Fuel: Petrol",
    "Gear: 7‑speed PDK",
    "0‑60 mph: ~3.5s",
    "Top Speed: ~182 mph"
  ]
},
  {
    name: "BMW M8 Competition",
    image: "./images/bmw_m8.jpg",
    audio: "audio/m8.mp3",
    description: "The most powerful M car ever — coupe luxury meets high performance.",
    specs: [
      "Engine: 4.4L Twin-Turbo V8",
      "Fuel: Petrol",
      "Gear: 8-speed automatic",
      "0-60 mph: 3.0s",
      "Top Speed: 189 mph",
      "Horsepower: 617 hp",
      "Torque: 553 lb-ft"
    ]
  },
  {
  name: "Nissan GT‑R R35",
  image: "./images/nissan_gtr_r35.jpg",
  audio: "audio/nissan_gtr_r35.mp3",
  description: "The legendary R35 GT‑R, powered by its 3.8L twin‑turbo V6 (VR38DETT), known for brutal acceleration and precision.",
  specs: [
    "Engine: 3.8L Twin‑Turbo V6 (VR38DETT)",
    "Brand: Nissan",
    "Model: GT‑R (R35)",
    "Fuel: Petrol",
    "Gear: 6‑speed dual‑clutch",
    "0‑60 mph: ~2.7s",
    "Top Speed: ~196 mph",
    "Horsepower: ~565‑600 hp"
  ]
},
{
  name: "Toyota Supra (A90/A91 or MK4)",
  image: "./images/toyota_supra.jpg",
  audio: "audio/supra_turbo.mp3",
  description: "Iconic Toyota Supra with its legendary turbocharged flat‑6 roar.",
  specs: [
    "Engine: 3.0L Turbo I6 (B58)",
    "Brand: Toyota",
    "Model: GR Supra",
    "Fuel: Petrol",
    "Gear: 8‑speed automatic",
    "0‑60 mph: ~3.9 s",
    "Top Speed: ~155 mph (electronically limited)",
    "Horsepower: ~382 hp"
  ]
}

];


let currentIndex = 0;

function updateCar() {
  const car = cars[currentIndex];
  document.getElementById("carImage").src = car.image;
  document.getElementById("carName").textContent = car.name;
  document.getElementById("carDescription").querySelector("p").textContent = car.description;

  const specsContainer = document.getElementById("carSpecs");
  specsContainer.innerHTML = car.specs.map(spec => `<p><strong>${spec.split(":")[0]}:</strong> ${spec.split(":")[1]}</p>`).join("");
  
  document.getElementById("engineAudio").src = car.audio;
}

function playSound() {
  document.getElementById("engineAudio").play();
}

function nextCar() {
  currentIndex = (currentIndex + 1) % cars.length;
  updateCar();
}

function prevCar() {
  currentIndex = (currentIndex - 1 + cars.length) % cars.length;
  updateCar();
}

// Initial load
window.onload = updateCar;
