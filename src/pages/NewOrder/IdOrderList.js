import Alert from '../../components/Main/Alert';
import PaginationStatus from '../../components/Pagination/PaginationStatus';
import IdOrderItem from "./IdOrderItem";

const IdOrderList = ({cargos, deleteOrderHandler, currentPage, setCargos, setCurrentPage, setLoading, pageCount}) => {
  return (
    cargos.length > 0 ? (
      <>
        {cargos.map((item, index) => (
          <IdOrderItem key={index} item={item} deleteOrderHandler={deleteOrderHandler} />
        ))}
        {pageCount > 1 ? (
          <PaginationStatus status={'1'} cargos={cargos} pageCount={pageCount} setCargos={setCargos}   setCurrentPage={setCurrentPage} currentPage={currentPage} setLoading={setLoading} />
        ): (
          <></>
        )}
      </>
    ) : (
      <Alert/>
    )
  );
};

export default IdOrderList;