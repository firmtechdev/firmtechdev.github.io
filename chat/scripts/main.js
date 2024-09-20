const db = firebase.firestore();


window.fetch_collection = async function (collection) {
    const querySnapshot = await db.collection(collection).get();
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });
    return results;
}

window.add_collection = async function (collection, data) {
    await db.collection(collection).add(data);
    return true;
}

window.fetch_collection_by_filter = async function (collection, filter) {
    var keys = Object.keys(filter);
    var userDoc;
    if(keys.includes('id')) {
        userDoc = await db.collection(collection).doc(filter.id).get();
        if (!userDoc.exists) {
            return null;
        }
    } else {
        var values = Object.values(filter);
        const querySnapshot = await db
            .collection(collection)
            .where(keys[0], '==', values[0])
            .limit(1)
            .get();
        if (querySnapshot.empty) {
            return null;
        }
        userDoc = querySnapshot.docs[0];
    }
    var response = userDoc.data();
    response.id = userDoc.id
    return response;
}
