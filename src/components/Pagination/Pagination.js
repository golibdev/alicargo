import React, {useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import newOrderApi from '../../api/newOrderApi';

const Pagination = ({ setCargos, pageCount, setCurrentPage ,currentPage, setLoading }) => {
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  };

  useEffect(() => {
    const getData = async (currentPage) => {
      try {
        const res = await newOrderApi.getPageOrder(currentPage);
        setCargos(res.data.results.reverse());
        setLoading(true)
      } catch (err) {
        console.log(err)
      }
    }
    getData(currentPage)
  }, [currentPage, setCargos, setLoading]);
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

export default Pagination