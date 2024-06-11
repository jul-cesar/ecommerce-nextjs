import prisma from "@/db/db";
import CardAdmin from "./components/CardAdmin";
import { formatCurrency, formatNumber } from "@/lib/formatters";

const getSalesData = async () => {
  const data = await prisma.order.aggregate({
    _sum: { pricedPaidInCops: true },
    _count: true,
  });
  return {
    amount: data._sum.pricedPaidInCops || 0,
    numberOfSales: data._count,
  };
};

const getUserData = async () => {
  const [userCount, ordersData] = await Promise.all([
    await prisma.user.count(),
    await prisma.order.aggregate({
      _sum: { pricedPaidInCops: true },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : ordersData._sum.pricedPaidInCops || 0 / userCount,
  };
};

const getProductsData = async () => {
  const [activeProducts, inactiveProducts] = await Promise.all([
    prisma.product.count({ where: { isAvailableToBuy: true } }),
    prisma.product.count({ where: { isAvailableToBuy: false } }),
  ]);
  return {
    activeProducts,
    inactiveProducts,
  };
};



const page = async () => {
  const data = await getSalesData();
  const customerData = await getUserData();
  const productsData = await getProductsData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardAdmin
        title="Sales"
        content={formatCurrency(Number(data.amount))}
        description={`${formatNumber(data.numberOfSales)} Orders`}
      />
      <CardAdmin
        title="Customers"
        description={`${formatCurrency(
          Number(customerData.averageValuePerUser)
        )} Average value`}
        content={`${formatNumber(customerData.userCount)} Customers`}
      />

      <CardAdmin
        title="Active products"
        description={`${formatNumber(productsData.inactiveProducts)} inactives`}
        content={formatNumber(productsData.activeProducts)}
      />
    </div>
  );
};

export default page;
