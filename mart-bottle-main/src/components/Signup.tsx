import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import './Signup.css';

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useSignupFields } from '../data/fields';
// import { Wave } from '../components/Wave';
import { useEffect, useState } from 'react';
import { validateForm } from '../data/utils';
import { useHistory, useParams } from 'react-router';
import { signUp } from '../firebase/firebaseService';
import { useSnackbar } from 'notistack';

const Signup = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const params = useParams();
    const fields = useSignupFields();
    const [ errors, setErrors ] = useState(false);

    const createAccount = () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {
            signUp(fields[1].input.state.value, fields[2].input.state.value)
            .then((userCredential) => {
                history.push("/home")
                enqueueSnackbar('Register Successfully', { variant: 'success' });
           
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                enqueueSnackbar(error.message, { variant: 'error' });
            });
        }
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);
	
	return (
		<IonPage className='signupPage'>
			<IonHeader>
				<IonToolbar>
					
                    <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={ shapesOutline } />
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className='headingText'>
                            <IonCardTitle>Sign up</IonCardTitle>
                            <h5>Lets get to know each other</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ createAccount }>Create account</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow className="ion-text-center ion-justify-content-center">
                        <IonCol size="12">
                        <p>
                        Already got an account?
                        <IonRouterLink className="custom-link" routerLink='/login'> Login &rarr;</IonRouterLink>
                        </p>
                    </IonCol>
                    </IonRow>
				</IonGrid>
			</IonContent>

			{/* <IonFooter>
                
				<IonGrid className="ion-no-margin ion-no-padding">

                    <Wave />
				</IonGrid>
			</IonFooter> */}
		</IonPage>
	);
};

export default Signup;