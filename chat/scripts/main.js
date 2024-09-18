const db = firebase.firestore();
console.log(db);


function fetch_collection(collection) {
    db.collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            return "hai";
        });
    });
    return "hello";
}


console.log(fetch_collection("messages"));
