import Header from "../component/table/components/atoms/Header"
import FormComponent from "../component/table/components/form/FormComponent"
import ListComponent from "../component/table/components/table/ListComponent"
import { ObjectListProps } from "./interfaces/Interfaces"



const objectPeopleList : ObjectListProps ={
  title: "People List",
  className: "",
  url: `${import.meta.env.VITE_API_URL}/people`,
  urlSchemaForm: `${import.meta.env.VITE_API_URL}/schemaPeople`
}

const PeopleList = () => {

  const { title, className, url, urlSchemaForm} = objectPeopleList
  
  return (
    <>
      <Header title="People" />
      <div>

      <ListComponent className={className} url={url} title={title}   />
      <FormComponent urlSchemaForm={urlSchemaForm} />
      </div>

    </>
  )
}

export default PeopleList