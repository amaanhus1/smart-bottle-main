import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import './ExploreContainer.css';
import { useEffect, useState } from 'react';
import { useHistory, useParams  } from 'react-router';
import { useLoginFields } from '../data/fields';
import { validateForm } from '../data/utils';
import CustomField from './CustomField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signIn } from '../firebase/firebaseService';
import { arrowBack, shapesOutline } from 'ionicons/icons';
import { useSnackbar } from 'notistack';



const ExploreContainer: React.FC = () => {

    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const params = useParams();

    const fields = useLoginFields();
    const [ errors, setErrors ] = useState(false);

    const login = () => {
        const errors = validateForm(fields);
        setErrors(errors);
        if (!errors.length) {
            signIn( fields[0].input.state.value, fields[1].input.state.value)
            .then((userCredential) => {
                history.push("/home")
                enqueueSnackbar('Login Successfully', { variant: 'success' });
            })
            .catch((error) => {
                // fields.forEach((field : any) => field.input.state. = );
                const errorCode = error.code;
                const errorMessage = error.message;
                // setErrors(true);
                enqueueSnackbar(error.message, { variant: 'error' });
                console.log(errorCode, errorMessage)
            });
        }
    }

    useEffect(() => {

        return () => {

            fields.forEach((field : any) => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);
  return (
    <IonPage className='loginPage'>
			<IonHeader>
				<IonToolbar>
					
                    <IonButtons slot="start">
                        <IonBackButton 
                        icon={ arrowBack }
                         text="Back" className="custom-back" />
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
                            <IonCardTitle>Log in</IonCardTitle>
                            <h5>Welcome back, hope you're doing well</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ login }>Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>

			<IonFooter>

                <div className='getStarted' >
					<IonGrid className="ion-no-margin ion-no-padding">
						<IonRow className={ `ion-text-center ion-justify-content-center heading` }>
							<IonCol size="11" className='headingText'>
								<IonCardTitle>Join millions of other people discovering their creative side</IonCardTitle>
							</IonCol>
						</IonRow>

						<IonRow className={ `ion-text-center ion-justify-content-center` }>
							<IonRouterLink routerLink="/signup" className="custom-link">
								<IonCol size="11">
									<IonButton className={`getStartedButton custom-button` }>Get started &rarr;</IonButton>
								</IonCol>
							</IonRouterLink>
						</IonRow>
					</IonGrid>
				</div>
			</IonFooter>
		</IonPage>
  );
};

export default ExploreContainer;
