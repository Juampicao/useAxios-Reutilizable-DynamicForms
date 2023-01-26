import "./App.css";
import formJson from "./component/forms/data/custom-form.json";
import { DynamicForm } from "./component/forms/pages";
import PeopleList from "./pages/PeopleList";
const App = () => {
  return (
    <>
      <div className="bg-slate-200 p-10 min-h-full">
        <h1>Prueba de Componente Reutilziable de Axios</h1>
        <h3> Typescript - React - Use Axios - Axios Reducer</h3>
        <h4> Custom Logger - Custom Error</h4> 
        <a href="https://github.com/Juampicao/CursoReactPro_Typescript/tree/use-axios" target="_blank" > Codigo Github: </a>
      

        {/* <AxiosVisualComponent1 />
        <AxiosVisualComponent2 /> */}
        {/* <ShoppingPage/> */}
        {/* <ListPage/> */}
        {/* /* <ClubsList /> */}


        {/* // Anda recargando */}
        {/* <ClubProvider>
          <ClubsList />
        </ClubProvider> */}

        
        <h1> Prueba Dynamic Form json </h1> 
        <PeopleList />
        <DynamicForm customShema={formJson}  /> 
        {/* <UsersTable /> 
        {/* <TailwindTable/> */}
        </div>
    </>
  )
}

export default App