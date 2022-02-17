import React, {useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import newOrderApi from '../../api/newOrderApi';

const PaginationStatus = ({ setCargos, pageCount, setCurrentPage ,currentPage, setLoading, status }) => {
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  };

  useEffect(() => {
    const getData = async (currentPage) => {
      try {
        const res = await newOrderApi.getPageStatusOrder(status, currentPage);
        setCargos(res.data.results.reverse());
        setLoading(true)
      } catch (err) {
        console.log(err)
      }
    }
    getData(currentPage)
  }, [currentPage, setCargos, setLoading, status]);
  return (
    <nav>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        disabledClassName="disabled"
        breakClassName="page-item"
        breakLinkClassName="page-link"
      />
    </nav>
  )
}

export default PaginationStatus