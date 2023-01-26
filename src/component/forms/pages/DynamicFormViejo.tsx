import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CustomLogger } from '../../axios/helpers/CustomLogger';
import useAxios from '../../axios/hooks/useAxios';
import { IMethods, ObjectFetchAxios } from '../../axios/interfaces/interfaces';
import ContenedorFormularios from '../../table/components/atoms/ContenedorFormulario';
import { ErrorMessage } from '../../table/components/atoms/ErrorMessage';
import Spiner from '../../table/components/atoms/spiner/Spiner';
import Title from '../../table/components/atoms/Title';
import { MySelect, MyTextInput } from '../components';
import { CustomSchemaProps, DynamicFormProps } from '../interfaces/interfaces';

// Css
import "../styles/styles.css";

const customLogger = new CustomLogger();

export const DynamicForm = ({ customShema, className }: DynamicFormProps) => {

    const { handleSubmit, state } = useAxios()
    
    const [error, setError] = useState(false); 
    const [formDataValidator, setFormDataValidator] = useState<any[]>([])

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {}

// InputFormValidator
for (const input of formDataValidator) {

    initialValues[input.name] = input.value;

    if (!input.validations) continue;

    let schema = Yup.string()

    for (const rule of input.validations) {
        if (rule.type === 'required') {
            schema = schema.required('Este campo es requerido');
        }

        if (rule.type === 'minLength') {
            schema = schema.min((rule as any).value || 2, `Mínimo de ${(rule as any).value || 2} caracteres`);
        }

        if (rule.type === 'email') {
            schema = schema.email(`Revise el formato del email`);
        }

        // ... otras reglas
    }

    requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });


const handleClick = () => {
    const formMapeado = formDataValidator.map((e) => e.validations)
    
     
    setError(true)
    setTimeout(() => {
        setError(false)
    }, 3000);
}
    
    
useEffect(() => {
    customLogger.logDebug("DynamicForm => CustomShema", customShema)
    setFormDataValidator(customShema)        
}, [customShema])

    return (
        <ContenedorFormularios className={className}>

            <div className='mx-auto'>
                <Title title={"Dynamic Forms"} />
                {error && <ErrorMessage message='Completa todos los campos' /> } 

                {
                    formDataValidator.length < 0 ?
                    <Spiner />
                    :   
                    <Formik
                        initialValues={ initialValues }
                        validationSchema={ validationSchema }
                        onSubmit={ (values, {resetForm}) => {
                            console.log(values)
                            const fetchObject = new ObjectFetchAxios("http://localhost:4000/clubs", IMethods.POST, values, "POSTDynamicForm")

                            handleSubmit(fetchObject)
                                .then(() => resetForm())
                        }}
                        
                    >
                        { (formik) => (
                                <Form noValidate className='form_container' >
                                        
                                { formDataValidator.map( ({ type, name, placeholder, label, options } : CustomSchemaProps) => {

                                    if ( type === 'input' || type === 'password' || type === 'email' ) {
                                        return (
                                                <div>
                                                    <MyTextInput 
                                                        key={ name }
                                                        type={(type as any)}
                                                        name={ name } 
                                                        label={ label } 
                                                        placeholder={ placeholder } />
                                                </div>
                                                )
                                    } else if ( type === 'select' ) {
                                        return (
                                            
                                            <div>
                                                    <MySelect 
                                                        key={ name }
                                                        label={ label }
                                                        name={name}
                                                        className="selectstyles"
                                                    >
                                                        <option value="">Select an option</option>
                                                        {
                                                            options?.map( ({ id, label } : any) => (
                                                                <option key={ id } value={ id }>{ label }</option>
                                                            ))
                                                        }
                                                    </MySelect>
                                            </div>
                                        )
                                    }

                                    
                                    throw new Error(`El type: ${ type }, no es soportado`);
                                })}
                                    

                        
                                 <button type='submit' onClick={handleClick}> Enviar </button>
                            </Form>
                        )}
                    </Formik>
                
                }

            </div>
        </ContenedorFormularios>
            
    )
}

{/* <div className='grid items-center'>                                  
                    <BotonSubmit value={"Enviar"} type="submit"  />
</div> */}
// Todo Activar onSubmit los errores. No se manda al back pero no muestra la validacion.
