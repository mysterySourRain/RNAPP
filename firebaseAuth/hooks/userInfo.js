import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { doc,collection, getDocs,where, query } from 'firebase/firestore';

export const useFirestoreData = (uid) => {
  const [docData, setDocData] = useState([]);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const q = query(collection(db,"trips"), where("userId", "==",uid));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, "=>",doc.data());
        })
        setDocData(data);
        
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchDoc();
  }, [uid]);

  return docData;
};
