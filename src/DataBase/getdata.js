import { getDocs ,collection,where, query} from "firebase/firestore";
import { db } from "../conf";

export const isUsernameTaken=async (username)=>{
    try {
        const ref=collection(db,'users')
        const q=query(ref, where('username' ,'==',username))
        const querysnapshot=await getDocs(q)
        
        return !querysnapshot.empty
        
    } catch (error) {
        alert("Error",error)
        console.log("Error=",error);
        
        
    }
    
}