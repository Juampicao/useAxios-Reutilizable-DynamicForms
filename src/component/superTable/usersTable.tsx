import { useEffect, useState } from "react";
import { CustomLogger } from "../axios/helpers/CustomLogger";
import "./usersTable.css";

const customLogger = new CustomLogger();

interface HeaderCellProps{
   [x:string] : any
}

interface HeaderProps{
   [x:string] : any
}

interface ContentProps{
   [x:string] : any
}
const HeaderCell = ({ column, sorting, sortTable } : HeaderCellProps) => {
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAscSorting = sorting.column === column && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";
  return (
    <th
      key={column}
      className="users-table-cell"
      onClick={() => sortTable({ column, order: futureSortingOrder })}
    >
      {column}
      {isDescSorting && <span>▼</span>}
      {isAscSorting && <span>▲</span>}
    </th>
  );
};

const Header = ({ columns, sorting, sortTable } : HeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column : any) => (
          <HeaderCell
            column={column}
            sorting={sorting}
            key={column}
            sortTable={sortTable}
          />
        ))}
      </tr>
    </thead>
  );
};

const Content = ({ entries, columns }: ContentProps) => {
  useEffect(() => {
    customLogger.logDebug("ContentTableComponent", `entries:${JSON.stringify(entries)}, columns${columns}`)
  }, [])
  return (
    <tbody>
      {entries.map((entry : any) => (
        <tr key={entry.id}>
     
          {columns.map((column : any) => (
            <td key={column} className="users-table-cell">
              {entry[column]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const SearchBar = ({ searchTable } : any) => {
  const [searchValue, setSearchValue] = useState("");
  const submitForm = (e : any) => {
    e.preventDefault();
    searchTable(searchValue);
  };
  return (
    <div className="search-bar">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  );
};

const UsersTable = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any>([]);
  const [sorting, setSorting] = useState({ column: "nombre", order: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const [columns, setColumns] = useState<any[]>(["nombre", "edad", "id"]);

  
  const sortTable = (newSorting : any) => {
    setSorting(newSorting);
  };
  const searchTable = (newSearchValue : any) => {
    setSearchValue(newSearchValue);
  };
  // const url = `http://localhost:3004/users?_sort=${sorting.column}&_order=${sorting.order}&name_like=${searchValue}`;
  
    const url = `http://localhost:4000/people`;
   
  
  const fetchAction = () => {
     
    fetch(url)
    .then((res) => res.json())
    .then((users) => {
      setUsers(users)
    })
    .then(() => setLoading(false))
    
  }

  useEffect(() => {
      fetchAction()
  }, [sorting, searchValue]);

  return (
    <div>
      {loading ? <p> ...cargando ....</p>
        : 
        <>
          {JSON.stringify(users)}
      <SearchBar searchTable={searchTable} />
      <table className="users-table">
        <Header columns={columns} sorting={sorting} sortTable={sortTable} />
        <Content entries={users} columns={columns} />
      </table>
        </> 
      }
    </div>
  );
};

export default UsersTable;



  // const url = `http://localhost:3004/users?_sort=${sorting.column}&_order=${sorting.order}&name_like=${searchValue}`;
    // const url = `http://localhost:4000/people`;
   
    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((users) => {
    //         setUsers(users)
    //   });

    //   axios.get(url)
    // // .then((res) => console.log(`DESDE USERS TABLE ${JSON.stringify(res.data)}`))
    // .then((res) => setUsers(res.data))
    // .then(() => setColumns(Object.keys(users[0])))


      // const url = `http://localhost:4000/people`;
  
  // const { state, handleSubmit } = useAxios()
  // const fetchAxiosObject = new ObjectFetchAxios(url, IMethods.GET, "", "getUsersTable")
  // let data: any; 
  // useEffect(() => {
  //   handleSubmit(fetchAxiosObject)
  //   .then(() => data = `${JSON.stringify(state.respuestaAPI.data)}`)
  //   .then(() => setUsers(data))
  //   .then(() => customLogger.logDebug("A", `${JSON.stringify(state.respuestaAPI.data)}`))
  // }, [sorting, searchValue]);