import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {

      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

          setDocument(docSnap.data());         

      } catch (error) {
        console.log(error);
        throw new setError(error.message);

      }   
              
      setLoading(false);  
    };

    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};