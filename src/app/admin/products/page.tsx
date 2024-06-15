import { Button } from "@/components/ui/button";
import { AddProductsDialog } from "./components/AddProductDialog";
import ProductsTable from "./components/ProductsTable";

const ProductsAdminPage = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1>Products admin</h1>
        <AddProductsDialog />
      </div>
      <div className="flex justify-center items-center">
        <ProductsTable />
      </div>
    </>
  );
};
export default ProductsAdminPage;
