import { Button } from "@/components/ui/button"
import { AddProductsDialog } from "./components/AddProductDialog"

const ProductsAdminPage= () => {
  return (
    <>
    <div className="flex items-center justify-between gap-4">
        <h1>Products admin</h1>
        <AddProductsDialog/>
    </div>
    </>
  )
}
export default ProductsAdminPage