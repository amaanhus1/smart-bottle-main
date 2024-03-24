import { IonInput, IonLabel } from "@ionic/react";
import "./CustomField.css";

const CustomField = ({field, errors} : any) => {

    const error = errors && errors.filter((e :any) => e.id === field.id)[0];
    const errorMessage = error && errors.filter((e :any)=> e.id === field.id)[0].message;

    return (
        
        <div className='field'>
            <IonLabel className='fieldLabel'>
                { field.label }
                { error && <p className="animate__animated animate__bounceIn">{ errorMessage }</p> }
            </IonLabel>
            <IonInput className='customInput' { ...field.input.props } { ...field.input.state } />
        </div>
    );
};

export default CustomField;