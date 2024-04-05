export interface Products {
  data: Product[];
  status: string;
}

export interface Product {
  data: {
    _id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    rating: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
  status: String;
}

export interface EditProductData {
  data: {
    _id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
