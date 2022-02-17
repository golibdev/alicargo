import Alert from '../../components/Main/Alert';
import PaginationStatus from '../../components/Pagination/PaginationStatus';
import ReceiveItem from "./ReceiveItem";

const ReceiveList = ({cargos, deleteOrderHandler, currentPage, setCargos, setCurrentPage, setLoading, pageCount}) => {
  return (
    cargos.length > 0 ? (
      <>
        {cargos.map((item, index)=> (
          <ReceiveItem key={index} item={item} deleteOrderHandler={deleteOrderHandler} />
        ))}
        {pageCount > 1 ? (
          <PaginationStatus status={'3'} cargos={cargos} pageCount={pageCount} setCargos={setCargos}   setCurrentPage={setCurrentPage} currentPage={currentPage} setLoading={setLoading} />
        ): (
          <></>
        )}
      </>
    ) : (
      <Alert/>
    )
  );
};

export default ReceiveList;