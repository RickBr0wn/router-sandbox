import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  doCreateUserWithEmailAndPassword = async (email, password) => {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({ displayName: password }) // TODO: change this :D
  }

  doSignInWithEmailAndPassword = async (email, password) =>
    await this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  // doGetDatabaseData = async () => {
  //   const data = await this.db.doc(`react-hooks-firebase/test`).get()
  //   return data.get('data')
  // }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return null
    // return this.db
    //   .doc(`react-hooks-firebase/${this.auth.currentUser.uid}`)
    //   .set({
    //     quote
    //   })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  // async getCurrentUserQuote() {
  //   if (this.auth.currentUser) {
  //     const quote = await this.db
  //       .doc(`react-hooks-firebase/${this.auth.currentUser.uid}`)
  //       .get()
  //     return quote.get('quote')
  //   }
  //   return console.log('Not logged in.')
  // }

  // getCurrentUserQuote = async () => {
  //   return null
  // }

  getAllDocuments = async () => {
    let arr = []
    if (this.auth.currentUser) {
      const documentRef = this.db.collection('react-hooks-firebase')
      await documentRef
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.')
            return
          }
          snapshot.forEach((doc, index) => {
            arr.push(doc.data())
          })
          return arr
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    }
    return arr
  }

  getSingleDocument = async documentID => {
    if (this.auth.currentUser) {
      const documentRef = this.db
        .collection('react-hooks-firebase')
        .doc(documentID)
      documentRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such documentID!')
          } else {
            console.log('Document data:', doc.data())
          }
        })
        .catch(err => {
          console.log('Error getting document', err)
        })
    }
    return null
  }
}

export default Firebase
