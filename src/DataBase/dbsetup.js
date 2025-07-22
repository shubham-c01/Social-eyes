import {db} from '../Authentication/config'
import { doc, setDoc } from 'firebase/firestore';

export const createUserProfile=async(user , username)=>{
    try {
   const reference= doc(db,'users',user.uid)

    await setDoc(reference,{
        uid:user.uid,
        username:username,
        phonenumber:user.phonenumber,
        createdAt:new Date()




    })
    console.log("Profile Created Successfully")

        
    } catch (error) {
        alert("Error creating Profile",error.message)
        
    }
}