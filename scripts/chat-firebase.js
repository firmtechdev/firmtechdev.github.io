
const firebaseConfig = {
    apiKey: "AIzaSyBkaaydRiv1IvychMmJ8KRVkRdIee3Qgbg",
    authDomain: "chat-35a83.firebaseapp.com",
    projectId: "chat-35a83",
    storageBucket: "chat-35a83.appspot.com",
    messagingSenderId: "844400376293",
    appId: "1:844400376293:web:a2372dbdcbf497f7aed70c",
    measurementId: "G-2VMB93QW6Y"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


window.fetch_collection = async function (collection) {
    const querySnapshot = await db.collection(collection).get();
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });
    return results;
}

window.get_last_message = async function (user_id, type) {
    const querySnapshot = await db
        .collection('messages')
        .where(type, '==', user_id)
        .orderBy('timestamp', 'desc')
        .limit(1)
        .get();
    if (querySnapshot.empty) {
        return null;
    }
    else{
        var datadoc = querySnapshot.docs[0];
        return datadoc.data();
    }
}

window.get_others_chatlist = async function (uid, type) {
    const querySnapshot = await db
        .collection('messages')
        .where(type, '==', uid)
        .limit(1)
        .get();
    if (querySnapshot.empty) {
        return null;
    }
    else{
        return querySnapshot.docs[0].data();
    }
}

window.search_users = async (key) => {
    const querySnapshot = await db
        .collection('users')
        .where('username', '>=', key)
        .where('username', '<', key + '\uf8ff')  // This is a common trick for prefix matching
        .get();
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });
    return results;
}

window.fetch_collections_by_filter = async function (collection, key_name, key_val) {
    const querySnapshot = await db
        .collection(collection)
        .where(key_name, '==', key_val)
        .get();
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });
    return results;
}

window.fetch_collections_by_multi_filter = async function (collection, key_name, key_val, key_name2, key_val2) {
    const querySnapshot = await db
        .collection(collection)
        .where(key_name, '==', key_val)
        .where(key_name2, '==', key_val2)
        .get();
    
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
