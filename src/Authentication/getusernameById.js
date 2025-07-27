import { db } from "./config";
import { where,query,getDocs,collection } from "firebase/firestore";

export const getusernameById=async (id)=>{
    try {
        const ref=collection(db,'users')
        const q=query(ref,where('uid','==',id))
        const querysnapshot=await getDocs(q)
        if (querysnapshot.empty) {
            console.log("no username found");
            
            
            
        }
        const userdata=querysnapshot.docs[0].data()
        console.log(userdata);
        
        return userdata
        
       

        
    } catch (error) {
        console.log("Erro getting username by ID",error);
        
        
    }

}