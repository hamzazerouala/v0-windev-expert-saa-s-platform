import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth, RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth"

const hasFirebaseConfig = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  )
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

let app: FirebaseApp | null = null
let auth: Auth | null = null

export function initializeFirebase(): Auth | null {
  if (typeof window !== "undefined" && hasFirebaseConfig()) {
    try {
      if (auth) {
        console.log("[v0] Firebase already initialized")
        return auth
      }

      if (!getApps().length) {
        console.log("[v0] Initializing Firebase app...")
        app = initializeApp(firebaseConfig)
      } else {
        console.log("[v0] Using existing Firebase app")
        app = getApps()[0]
      }
      auth = getAuth(app)
      console.log("[v0] Firebase Auth initialized successfully")
      return auth
    } catch (error) {
      console.error("[v0] Firebase initialization error:", error)
      return null
    }
  }
  console.log("[v0] Firebase config not available or not in browser")
  return null
}

export async function sendSMSVerification(
  phoneNumber: string,
  recaptchaContainerId: string,
): Promise<ConfirmationResult> {
  console.log("[v0] sendSMSVerification called with phone:", phoneNumber)

  if (!hasFirebaseConfig()) {
    throw new Error("Firebase n'est pas configuré. Veuillez ajouter les clés Firebase dans les paramètres.")
  }

  if (!auth) {
    console.log("[v0] Auth not initialized, initializing now...")
    const initializedAuth = initializeFirebase()
    if (!initializedAuth) {
      throw new Error("Impossible d'initialiser Firebase. Vérifiez la configuration.")
    }
    auth = initializedAuth
  }

  if (!auth) {
    throw new Error("L'authentification Firebase n'est pas disponible")
  }

  if (typeof window !== "undefined") {
    const container = document.getElementById(recaptchaContainerId)
    if (!container) {
      throw new Error(`Le conteneur reCAPTCHA avec l'ID "${recaptchaContainerId}" n'existe pas dans le DOM`)
    }
    console.log("[v0] reCAPTCHA container found")
  }

  try {
    console.log("[v0] Creating RecaptchaVerifier...")
    const recaptchaVerifier = new RecaptchaVerifier(
      recaptchaContainerId,
      {
        size: "invisible",
        callback: () => {
          console.log("[v0] reCAPTCHA solved")
        },
        "expired-callback": () => {
          console.log("[v0] reCAPTCHA expired")
        },
      },
      auth,
    )

    console.log("[v0] Sending SMS to:", phoneNumber)
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    console.log("[v0] SMS sent successfully")
    return confirmationResult
  } catch (error: any) {
    console.error("[v0] Error in sendSMSVerification:", error)
    throw new Error(error.message || "Erreur lors de l'envoi du SMS")
  }
}

export async function verifySMSCode(confirmationResult: ConfirmationResult, code: string): Promise<boolean> {
  try {
    await confirmationResult.confirm(code)
    return true
  } catch (error) {
    console.error("Error verifying SMS code:", error)
    return false
  }
}

export function isFirebaseConfigured(): boolean {
  return hasFirebaseConfig()
}

export { auth }
