import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
      firebaseDb: db,
      firebaseStorage: storage,
    },
  }
})
