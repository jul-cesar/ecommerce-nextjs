import ProductsTable from "./_components/ProductsTable";
import { DialogProductForm } from "./_components/DialogProductForm";

const ProductsAdminPage = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1>Products admin</h1>
        <DialogProductForm />
      </div>
      <div className="flex justify-center items-center">
        <ProductsTable />
      </div>
    </>
  );
};
export default ProductsAdminPage;
