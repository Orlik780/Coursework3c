import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Пользователь вошел:", user);
      return user;
    } catch (error) {
      console.error("Ошибка входа:", error.message);
      throw error;
    }
  };

  export const registrationUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      console.log("Пользователь зарегистрирован:", user);
      return user;
    } catch (error) {
      console.error("Ошибка регистрации:", error.message);
      throw error;
    }
  };
  
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Письмо для сброса пароля отправлено на:", email);
    } catch (error) {
      console.error("Ошибка отправки письма:", error.message);
      throw error;
    }
  };