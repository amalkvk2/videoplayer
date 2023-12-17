import { BASE_URL } from "./BaseUrl";
import { commonReqest } from "./Commenrequiest";
// add video
 export const addVideo= async(body)=>{
   return await commonReqest("POST",`${BASE_URL}video`,body)
}


// get video

  export const getVideo= async ()=>{

    return await commonReqest("GET",`${BASE_URL}/video`,"")
 }


//  delete video

 export const deleteVideo= async(id)=>{

   return await commonReqest('DELETE',`${BASE_URL}video/${id}`,{}
    )
}


// add categorie

export const addCategory= async (body)=>{


    return await commonReqest('POST',`${BASE_URL}categories`,body)

}
// to get category

export const getAllCategory= async ()=>{

  return await commonReqest("GET",`${BASE_URL}/categories`,"")

}

// to delete

export const deleteCategory= async(id)=>{

  return await commonReqest('DELETE',`${BASE_URL}Categories/${id}`,{}
   )
}

// get history
