
import { getFirestore, addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot, Firestore, DocumentData, CollectionReference } from "firebase/firestore";

export interface ITodo {
    id?: string,
    task: string
}

const TODO_COLLECTION_NAME = 'todos'

export default class TodoService {
    private _store: Firestore;
    private _todoCollection: CollectionReference<DocumentData>;

    constructor() {
        this._store = getFirestore();
        this._todoCollection = collection(this._store, TODO_COLLECTION_NAME);
    }

    async add(data: ITodo) {
        return addDoc(this._todoCollection, data);
    }

    async update(data: ITodo) {
        const docRef = doc(this._todoCollection, data.id!);
        await setDoc(docRef, { task: data.task }, { merge: true })
    }

    async remove(data: ITodo) {
        const docRef = doc(this._todoCollection, data.id!);
        return deleteDoc(docRef);
    }

    async getAll(): Promise<Array<ITodo>> {
        return new Promise(async (resolve, reject) => {
            const data = await query(this._todoCollection);
            let result: Array<ITodo> = []
            onSnapshot(data, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    result.push({
                        id: doc.id,
                        task: doc.data().task
                    })
                });
                resolve(result);
            });
        });
    }
}