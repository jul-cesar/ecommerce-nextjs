export interface Product {
  id: string;
  name: string;
  priceInCop: number;
  filePath: string;
  imagePath: string;
  description: string;
  isAvailableToBuy: boolean;
  createdAt: Date;
  updatedAt: Date;
}
