import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  stopsCollection: AngularFirestoreCollection;
  routeCollection: AngularFirestoreCollection;
  localData: any = [];
  _storage: Storage | null = null;
  stopID: string;
  redirectStop: string;
  currentUserLocation = [];
  currentBus: string;

  constructor(private afs: AngularFirestore, private storage: Storage) {
    this.initStorage();
    this.stopsCollection = this.afs.collection('Bus-Stops');
    this.routeCollection = this.afs.collection('Bus-Routes');
  }

  // LocalStorage is init here cause it's called in home.page.ts during markers initialisation.
  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  getStops() {
    return this.stopsCollection.valueChanges({ idField: 'id' });
  }

  getRoutes() {
    return this.routeCollection.valueChanges({ idField: 'id' });
  }

  setCurrentBus(data) {
    this.currentBus = data;
  }

  getCurrentBus() {
    return this.currentBus;
  }

  //To set & get stopName of selected stop to fetch data for the drawer

  getStopID() {
    return this.stopID;
  }

  setStopID(data) {
    this.stopID = data;
  }

  //To set & get stopName from search and redirect to maps

  setRedirectStop(data) {
    this.redirectStop = data;
  }

  getRedirectStop() {
    return this.redirectStop;
  }

  //Get current user location from Welcome.ts and save it to currentUserLocation
  pushUserLocation(data) {
    this.currentUserLocation = data;
  }
}