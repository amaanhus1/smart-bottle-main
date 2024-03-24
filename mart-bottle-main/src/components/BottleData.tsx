import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonRow, IonCol, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonLoading } from '@ionic/react';
import { getDocs, collection } from 'firebase/firestore';
import { database, signOutUser } from '../firebase/firebaseService';
 // Import your Firestore instance

 import './BottleData.css'
import { arrowBack, shapesOutline } from 'ionicons/icons';
import { signOut } from 'firebase/auth';


 
const BottleData: React.FC = () => {
  const [bottleData, setBottleData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(database, 'bottle_data'));
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBottleData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, []);

  return (
    <IonPage>
        <IonHeader>
				<IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton 
                        icon={ arrowBack }
                         text="Back" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton onClick={()=>{
                            signOutUser()
                        }} className="custom-button">
                            Logout
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
      <IonContent>
      <div className="overflow-x-auto mx-auto mt-14 mb-24 max-w-[800px] rounded-2xl shadow-2xl">
      <IonLoading
        isOpen={bottleData.length == 0}
        message={'Please wait...'}
      />
      <>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0">
            <thead className="bg-blue-200">
              <tr>
                  {bottleData.length > 0 &&
                  Object.keys(bottleData[0]).map(key => (
                      <th key={key} >{key}</th>
                  ))}
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              {bottleData.map((data: any, rowIndex: number) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even' : 'odd'}>
                  {Object.values(data).map((value: any, colIndex: number) => (
                  <td key={colIndex} >{value}</td>
                  ))}
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>                    
      </>
      </div>
      
      </IonContent>
    </IonPage>
  );
};

export default BottleData;
