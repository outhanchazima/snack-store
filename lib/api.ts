// Mock data for development
const mockProducts = [
  {
    id: "1",
    name: "Premium Mixed Nuts",
    description: "A delicious blend of premium nuts",
    price: 19.99,
    images: ["https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800"],
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
    ingredients: [
      "Almonds",
      "Cashews",
      "Walnuts",
      "Pecans",
    ],
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
  // Add more mock products as needed
];

export async function fetchProducts() {
  // In a real app, this would be an API call
  return mockProducts;
}

export async function fetchProductById(id: string) {
  // In a real app, this would be an API call
  return mockProducts.find(product => product.id === id) || null;
}

export async function fetchProductsByCategory(category: string) {
  // In a real app, this would be an API call
  return mockProducts.filter(product => product.category === category);
}