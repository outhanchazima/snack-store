import { AllLocations, DeliveryZone, Location, LocationsByZone } from "./types";

// Mock data for development
const mockProducts = [
  {
    id: "1",
    name: "Premium Mixed Nuts",
    description: "A delicious blend of premium nuts",
    price: 19.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.5,
    category: "nuts",
    stock: 50,
    sizes: [
      { id: "s1", name: "Small", weight: "200g", price: 19.99 },
      { id: "s2", name: "Medium", weight: "500g", price: 39.99 },
      { id: "s3", name: "Large", weight: "1kg", price: 69.99 },
    ],
    healthBenefits: [
      "Rich in protein",
      "High in healthy fats",
      "Good source of fiber",
    ],
    ingredients: ["Almonds", "Cashews", "Walnuts", "Pecans"],
    reviews: [
      {
        id: "r1",
        userName: "John D.",
        rating: 5,
        comment: "Great quality nuts, will buy again!",
        date: "2024-03-15",
      },
    ],
  },
  {
    id: "2",
    name: "Sea Salt Potato Chips",
    description: "Crispy potato chips with a perfect touch of sea salt",
    price: 3.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.3,
    category: "chips",
    stock: 100,
    sizes: [
      { id: "s1", name: "Small", weight: "50g", price: 3.99 },
      { id: "s2", name: "Medium", weight: "100g", price: 6.99 },
      { id: "s3", name: "Large", weight: "200g", price: 11.99 },
    ],
    healthBenefits: ["Gluten-free", "No artificial colors", "No preservatives"],
    ingredients: ["Potatoes", "Vegetable Oil", "Sea Salt"],
    reviews: [
      {
        id: "r1",
        userName: "Sarah M.",
        rating: 4,
        comment: "Perfect crunch and salt level!",
        date: "2024-03-14",
      },
    ],
  },
  {
    id: "3",
    name: "Dark Chocolate Trail Mix",
    description: "Premium trail mix with dark chocolate chunks",
    price: 15.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.7,
    category: "trail_mix",
    stock: 75,
    sizes: [
      { id: "s1", name: "Small", weight: "150g", price: 15.99 },
      { id: "s2", name: "Medium", weight: "300g", price: 29.99 },
      { id: "s3", name: "Large", weight: "600g", price: 54.99 },
    ],
    healthBenefits: ["Antioxidant-rich", "Energy-boosting", "Heart-healthy"],
    ingredients: ["Dark Chocolate", "Raisins", "Almonds", "Cranberries"],
    reviews: [
      {
        id: "r1",
        userName: "Mike R.",
        rating: 5,
        comment: "Perfect balance of sweet and nutty!",
        date: "2024-03-13",
      },
    ],
  },
  {
    id: "4",
    name: "Honey Roasted Peanuts",
    description: "Sweet and salty honey-glazed peanuts",
    price: 8.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.4,
    category: "nuts",
    stock: 120,
    sizes: [
      { id: "s1", name: "Small", weight: "100g", price: 8.99 },
      { id: "s2", name: "Medium", weight: "250g", price: 19.99 },
      { id: "s3", name: "Large", weight: "500g", price: 34.99 },
    ],
    healthBenefits: [
      "Good source of protein",
      "Rich in vitamins",
      "Natural energy boost",
    ],
    ingredients: ["Peanuts", "Honey", "Sugar", "Salt"],
    reviews: [
      {
        id: "r1",
        userName: "Lisa K.",
        rating: 4,
        comment: "Addictively good!",
        date: "2024-03-12",
      },
    ],
  },
  {
    id: "5",
    name: "Organic Dried Mango",
    description: "Sweet and chewy dried mango slices",
    price: 12.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.8,
    category: "dried_fruit",
    stock: 60,
    sizes: [
      { id: "s1", name: "Small", weight: "100g", price: 12.99 },
      { id: "s2", name: "Medium", weight: "250g", price: 28.99 },
      { id: "s3", name: "Large", weight: "500g", price: 49.99 },
    ],
    healthBenefits: [
      "High in vitamin C",
      "Good source of fiber",
      "No added sugar",
    ],
    ingredients: ["Organic Mango"],
    reviews: [
      {
        id: "r1",
        userName: "Tom B.",
        rating: 5,
        comment: "Best dried mango I've ever had!",
        date: "2024-03-11",
      },
    ],
  },
  {
    id: "6",
    name: "Spicy Seaweed Crisps",
    description: "Crispy seaweed sheets with spicy seasoning",
    price: 5.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.2,
    category: "seaweed",
    stock: 90,
    sizes: [
      { id: "s1", name: "Small", weight: "20g", price: 5.99 },
      { id: "s2", name: "Medium", weight: "50g", price: 13.99 },
      { id: "s3", name: "Large", weight: "100g", price: 24.99 },
    ],
    healthBenefits: [
      "Low calorie",
      "Rich in minerals",
      "Good source of iodine",
    ],
    ingredients: ["Seaweed", "Vegetable Oil", "Chili Powder", "Salt"],
    reviews: [
      {
        id: "r1",
        userName: "Amy H.",
        rating: 4,
        comment: "Great low-calorie snack!",
        date: "2024-03-10",
      },
    ],
  },
  {
    id: "7",
    name: "Protein Energy Balls",
    description: "No-bake protein-packed energy balls",
    price: 16.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.6,
    category: "protein_snacks",
    stock: 45,
    sizes: [
      { id: "s1", name: "Small", weight: "150g", price: 16.99 },
      { id: "s2", name: "Medium", weight: "300g", price: 31.99 },
      { id: "s3", name: "Large", weight: "600g", price: 57.99 },
    ],
    healthBenefits: [
      "High protein",
      "Natural ingredients",
      "Perfect pre-workout",
    ],
    ingredients: ["Dates", "Almonds", "Protein Powder", "Cocoa"],
    reviews: [
      {
        id: "r1",
        userName: "Chris P.",
        rating: 5,
        comment: "Great healthy snack option!",
        date: "2024-03-09",
      },
    ],
  },
  {
    id: "8",
    name: "Wasabi Peas",
    description: "Crunchy green peas with spicy wasabi coating",
    price: 7.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.1,
    category: "legumes",
    stock: 85,
    sizes: [
      { id: "s1", name: "Small", weight: "100g", price: 7.99 },
      { id: "s2", name: "Medium", weight: "250g", price: 17.99 },
      { id: "s3", name: "Large", weight: "500g", price: 31.99 },
    ],
    healthBenefits: ["High in protein", "Good source of fiber", "Low fat"],
    ingredients: ["Green Peas", "Wasabi Powder", "Salt", "Vegetable Oil"],
    reviews: [
      {
        id: "r1",
        userName: "David L.",
        rating: 4,
        comment: "Perfect spicy kick!",
        date: "2024-03-08",
      },
    ],
  },
  {
    id: "9",
    name: "Coconut Chips",
    description: "Crispy toasted coconut chips",
    price: 9.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.5,
    category: "chips",
    stock: 70,
    sizes: [
      { id: "s1", name: "Small", weight: "75g", price: 9.99 },
      { id: "s2", name: "Medium", weight: "150g", price: 18.99 },
      { id: "s3", name: "Large", weight: "300g", price: 34.99 },
    ],
    healthBenefits: [
      "Good source of fiber",
      "Rich in healthy fats",
      "No artificial sweeteners",
    ],
    ingredients: ["Coconut", "Sea Salt"],
    reviews: [
      {
        id: "r1",
        userName: "Emma S.",
        rating: 5,
        comment: "So crispy and delicious!",
        date: "2024-03-07",
      },
    ],
  },
  {
    id: "10",
    name: "Quinoa Crackers",
    description: "Gluten-free crackers made with quinoa",
    price: 6.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.3,
    category: "crackers",
    stock: 95,
    sizes: [
      { id: "s1", name: "Small", weight: "100g", price: 6.99 },
      { id: "s2", name: "Medium", weight: "200g", price: 12.99 },
      { id: "s3", name: "Large", weight: "400g", price: 22.99 },
    ],
    healthBenefits: ["Gluten-free", "High in protein", "Rich in minerals"],
    ingredients: ["Quinoa", "Rice Flour", "Sea Salt", "Herbs"],
    reviews: [
      {
        id: "r1",
        userName: "Rachel G.",
        rating: 4,
        comment: "Great gluten-free option!",
        date: "2024-03-06",
      },
    ],
  },
  {
    id: "11",
    name: "Matcha Green Tea Cookies",
    description: "Japanese-style matcha green tea cookies",
    price: 11.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.4,
    category: "cookies",
    stock: 65,
    sizes: [
      { id: "s1", name: "Small", weight: "120g", price: 11.99 },
      { id: "s2", name: "Medium", weight: "240g", price: 21.99 },
      { id: "s3", name: "Large", weight: "480g", price: 39.99 },
    ],
    healthBenefits: [
      "Antioxidant-rich",
      "Natural ingredients",
      "No artificial colors",
    ],
    ingredients: ["Flour", "Matcha Powder", "Sugar", "Butter"],
    reviews: [
      {
        id: "r1",
        userName: "Sophie L.",
        rating: 4,
        comment: "Perfect balance of sweet and tea flavor!",
        date: "2024-03-05",
      },
    ],
  },
  {
    id: "12",
    name: "Roasted Chickpeas",
    description: "Crunchy roasted chickpeas with mediterranean seasoning",
    price: 8.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.2,
    category: "legumes",
    stock: 80,
    sizes: [
      { id: "s1", name: "Small", weight: "100g", price: 8.99 },
      { id: "s2", name: "Medium", weight: "250g", price: 19.99 },
      { id: "s3", name: "Large", weight: "500g", price: 35.99 },
    ],
    healthBenefits: [
      "High in protein",
      "Good source of fiber",
      "Plant-based protein",
    ],
    ingredients: ["Chickpeas", "Olive Oil", "Mediterranean Spices", "Sea Salt"],
    reviews: [
      {
        id: "r1",
        userName: "Mark T.",
        rating: 4,
        comment: "Great healthy alternative to chips!",
        date: "2024-03-04",
      },
    ],
  },
  {
    id: "13",
    name: "Acai Berry Bites",
    description: "Freeze-dried acai berry and dark chocolate bites",
    price: 14.99,
    images: [
      "https://greenspoon.co.ke/wp-content/uploads/2024/11/Chocolate-Bundt-cake.jpg",
    ],
    rating: 4.7,
    category: "superfoods",
    stock: 55,
    sizes: [
      { id: "s1", name: "Small", weight: "100g", price: 14.99 },
      { id: "s2", name: "Medium", weight: "250g", price: 32.99 },
      { id: "s3", name: "Large", weight: "500g", price: 59.99 },
    ],
    healthBenefits: [
      "High in antioxidants",
      "Immune system support",
      "Natural energy boost",
    ],
    ingredients: ["Acai Berry Powder", "Dark Chocolate", "Coconut"],
    reviews: [
      {
        id: "r1",
        userName: "Julia M.",
        rating: 5,
        comment: "Love these healthy treats!",
        date: "2024-03-03",
      },
    ],
  },
];

export async function fetchProducts() {
  // In a real app, this would be an API call
  return mockProducts;
}

export async function fetchProductById(id: string) {
  // In a real app, this would be an API call
  return mockProducts.find((product) => product.id === id) || null;
}

export async function fetchProductsByCategory(category: string) {
  // In a real app, this would be an API call
  return mockProducts.filter((product) => product.category === category);
}

// Example type guard to ensure a location belongs to a zone
function isLocationInZone(location: Location, zoneId: string): boolean {
  return location.zoneId === zoneId;
}

// Updated data structure with proper typing
export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "1", name: "Zone A - CBD", fee: 200 },
  { id: "2", name: "Zone B - Westlands", fee: 250 },
  { id: "3", name: "Zone C - Kileleshwa", fee: 300 },
];

export const LOCATIONS: LocationsByZone = {
  "1": [
    { id: "1a", name: "City Hall", zoneId: "1" },
    { id: "1b", name: "Archives", zoneId: "1" },
    { id: "1c", name: "Moi Avenue", zoneId: "1" },
  ],
  "2": [
    { id: "2a", name: "The Mall", zoneId: "2" },
    { id: "2b", name: "Sarit Centre", zoneId: "2" },
    { id: "2c", name: "The Oval", zoneId: "2" },
  ],
  "3": [
    { id: "3a", name: "Valley Arcade", zoneId: "3" },
    { id: "3b", name: "Ringroad Mall", zoneId: "3" },
    { id: "3c", name: "ArtCaffe", zoneId: "3" },
  ],
};

// Helper function to get all locations as a flat array
export function getAllLocations(): AllLocations {
  return Object.values(LOCATIONS).flat();
}

export async function getAllZones(): Promise<DeliveryZone[]> {
  return DELIVERY_ZONES;
}

export async function getLocationsByZone(zoneId: string): Promise<Location[]> {
  return LOCATIONS[zoneId] || [];
}

export async function getZoneByLocation(
  locationId: string
): Promise<DeliveryZone | undefined> {
  const location = getAllLocations().find((loc) => loc.id === locationId);
  if (!location) return undefined;

  return DELIVERY_ZONES.find((zone) => zone.id === location.zoneId);
}
