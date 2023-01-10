import { useEffect } from "react"
import { CustomLogger } from "../component/axios/helpers/CustomLogger"
import Header from "../component/table/components/atoms/Header"
import Spiner from "../component/table/components/atoms/spiner/Spiner"
import FormComponent from "../component/table/components/form/FormComponent"
import ListComponent from "../component/table/components/table/ListComponent"
import useClub from "./hooks/useClub"
import { ObjectListProps } from "./interfaces/Interfaces"


const objectClubList : ObjectListProps = {
  title: "Club List",
  className: "col-span-2",
  url: `${import.meta.env.VITE_API_URL}/clubs`,
  urlSchemaForm: `${import.meta.env.VITE_API_URL}/schemaClub`
}

const customLogger = new CustomLogger(); 

const ClubsList = () => {

  const { getAll, clubs, cargando, club } = useClub()

  
  useEffect(() => {
    getAll()
    
    customLogger.logDebug("ClubList Clubs=", clubs)
  }, [])

  
  const { title, className, url, urlSchemaForm} = club
  
  return (
      <>
          <>
          <Header title="Club" />
            
          {cargando ? <p> <Spiner /> </p>
            : 
            clubs?.length? <p> Los clubes son : {JSON.stringify(clubs)}  </p>: "No hay clubes aun"
          }
          
          <div className="md:grid md:grid-cols-3 ">
            <ListComponent className={className}  url={url} title={title}   />
            <FormComponent urlSchemaForm={urlSchemaForm} />
          </div>
          </>
      </>
  )
}

export default ClubsList