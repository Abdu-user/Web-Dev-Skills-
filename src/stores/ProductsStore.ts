import { defineStore } from "pinia";
import axios from "axios";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
type ProductsState = {
  products: Array<Product>;
  loading: boolean;
  error: string | null;
  didFetchOnce: boolean;
};
const testProduct = {
  id: 2422,
  title: "test",
  price: 0,
  description: "test",
  category: "test",
  image: "test",
  rating: { rate: 0, count: 0 },
};
export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    loading: false,
    error: null,
    didFetchOnce: false,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = [...this.products, ...response.data] as Product[];
      } catch (error) {
        this.error = "Failed to fetch products";
      } finally {
        this.loading = false;
      }
    },
    setDidFetchOnce(value: boolean) {
      this.didFetchOnce = value;
    },
  },
});
