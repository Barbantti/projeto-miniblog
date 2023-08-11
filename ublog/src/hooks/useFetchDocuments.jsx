import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Deal with memory leak
  // It does not need a function like on useInsertDocument, because not have dispatch, only useState
  const [cancelled, setCancelled] = useState(false);

  // Mapping the hook with useEffect and async function
  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      // Loading data
      setLoading(true);

      // Informing dataBase (db) and collection to function
      const collectionRef = await collection(db, docCollection)

      // Handling erros with  try catch
      try {

        // Creating complex query
        let q;

        // Search

        // Dashboard

        if (search) {
          q = await query(collectionRef,
            where("tags", "array-contains", search), orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(collectionRef,
            where("uid", "==", uid), orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"))
        }

        // Mapping data. Whenever it has changed the data it will bring it changed with the new data.
        await onSnapshot(q, (querySnapshot) => {

          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};