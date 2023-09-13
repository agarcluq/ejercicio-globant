import { FC, useEffect, useState } from 'react';

import './style.css';

const USERS_URL = 'https://dog.ceo/api/breeds/image/random';

const useRequestManagement = (url) => {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`${url}?page=${page}`)
      .then((response) => response.json())
      .then(() => {
        const data = {
          count: 13,
          results: [
            { id: 1, firstName: 'David', lastName: 'Wallace' },
            { id: 2, firstName: 'Sonia', lastName: 'Ross' },
            { id: 3, firstName: 'Anthony', lastName: 'Thomson' },
          ],
        };
        setTotalPage(Math.ceil(data?.count / 10));
        setResult(data?.results);
        setLoading(false);
        console.log('then', totalPage, page);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }, [page]);

  return { loading, totalPage, result, page, setPage };
};

const TableBody = ({ data }) => {
  return (
    <>
      {data?.length>0 ? data.map((row) => {
        return (
          <tr>
            <td>{row?.id}</td>
            <td>{row?.firstName}</td>
            <td>{row?.lastName}</td>
          </tr>
        );
      }): <tr><td>No hay datos</td></tr>
    }
    </>
  );
};

export default function Table() {
  const { loading, page, totalPage, result, setPage } =
    useRequestManagement(USERS_URL);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <p>cargando...</p> : <TableBody data={result} />}
        </tbody>
      </table>
      <section className="pagination">
        <button disabled={loading || page === 0} 
        className="first-page-btn" onClick={()=>setPage(0)}>first</button>
        <button disabled={loading || page === 0} className="previous-page-btn" onClick={()=>setPage(p=>p-1)}>previous</button>
        <button disabled={loading || page === totalPage} className="next-page-btn" onClick={()=>setPage(p=>p+1)}>next</button>
        <button disabled={loading || page === totalPage}  className="last-page-btn" onClick={()=>setPage(totalPage)}>last</button>
      </section>
    </div>
  );
}

export const App: FC<{ name: string }> = ({ name }) => {

  return (
    <div>
      <Table />
    </div>
  );
};
