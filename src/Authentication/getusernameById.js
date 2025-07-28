import { db } from "./config";
import { where,query,getDocs,collection, doc } from "firebase/firestore";

export const getusernameById=async (id)=>{
    try {
        const ref=collection(db,'users')
        const q=query(ref,where('uid','==',id))
        const querysnapshot=await getDocs(q)
       
        const users=[]
        querysnapshot.forEach((doc)=>{
            users.push({id:doc.id,...doc.data()})
        })
        return users.length > 0 ? users[0] : null;

        
       

        
    } catch (error) {
        console.log("Erro getting username by ID",error);
        return null
        
        
    }

}