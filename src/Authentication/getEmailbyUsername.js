import { query,collection,where,getDocs } from "firebase/firestore";
import { db } from "./config";

export const getemailbyusername=async (username)=>{
    try {
        const userRef=collection(db,"users")
        const q=query(userRef,where('username', '==',username))
        const quersnapshot=await getDocs(q)
        
        if (quersnapshot.empty) {
            console.log("username not found!!");
            
            
        }
        const userdata=quersnapshot.docs[0].data()
       // console.log(userdata);
        return userdata
        
        


        
    } catch (error) {
        console.log("Error getting username",error);
        
        
    }

}