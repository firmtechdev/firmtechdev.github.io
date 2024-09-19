
const db = firebase.firestore();



function fetch_collection(collection) {
  return db.collection(collection).get().then((querySnapshot) => {
    const results = []; 
    querySnapshot.forEach((doc) => {
     	results.push({ id: doc.id, ...doc.data() });  
    });
    return results; 
  });
}
