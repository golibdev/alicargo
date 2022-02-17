import PaginationStatus from "../Pagination/PaginationStatus";
import Alert from "./Alert";
import OrderItem from "./OrderItem";

const OrderList = ({cargos, deleteOrderHandler, currentPage, setCargos, setCurrentPage, setLoading, pageCount, role }) => {
  return (
    cargos.length > 0 ? (
      <>
        {cargos.map((item, index) => (
          <OrderItem key={index} item={item} role={role} deleteOrderHandler={deleteOrderHandler} />
        ))}
        {pageCount > 1 ? (
          <PaginationStatus cargos={cargos} pageCount={pageCount} setCargos={setCargos}   setCurrentPage={setCurrentPage} status={'1'} currentPage={currentPage} setLoading={setLoading} />
        ): (
          <></>
        )}
      </>
    ) : (
      <Alert/>
    )
  );
};

export default OrderList;