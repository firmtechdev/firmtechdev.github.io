console.log("here");
const db = firebase.firestore();
console.log(db);


async function fetch_collection(collection) {
    const querySnapshot = await db.collection(collection).get();
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    })
    return results;
}

async function add_collection(collection, data) {
    await addDoc(collection(db, collection), data);
    return true;
}

var data = await fetch_collection("messages");
console.log(JSON.stringify(data));
// add_collection("messages", {""})

console.log("done");

