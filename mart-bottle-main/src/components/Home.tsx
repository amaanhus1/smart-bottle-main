import { IonButton, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonImg, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import './Home.css';
import { OpenSourceTableDemo } from './OpenSourceTableDemo';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser } from '../firebase/firebaseService';
import { useHistory } from 'react-router';
import BottleData from './BottleData';

const Home = () => {
	const history = useHistory();
	
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("uid", uid)
			  localStorage.setItem('user' , JSON.stringify(user));
            } else {
			  signOutUser()
              localStorage.removeItem('user');
			  history.push('/login')
              console.log("user is logged out")
            }
          });
         
    }, [])

	return (
		<IonPage className='homePage'>
			<BottleData/>
			<IonContent fullscreen>
				<div className='getStarted' >
					<IonGrid>
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

			<IonFooter>
				
			</IonFooter>
		</IonPage>
	);
};

export default Home;