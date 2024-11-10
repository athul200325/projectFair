import commonAPI from "./commonAPI";
import SERVER_URL from "./serverUrl";



export const registerAPI=async (reqBody)=>{
        return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

export const loginAPI=async (reqBody)=>{
        return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

export const addProjectAPI=async (reqBody,reqHeader)=>{
        return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

export const getHomeprojectAPI=async ()=>{
        return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

export const allProjectAPI=async (searchKey,reqHeader)=>{
        return await commonAPI("GET",`${SERVER_URL}/all-project?search=${searchKey}`,{},reqHeader)
}

export const userProjectAPI=async (reqHeader)=>{
        return await commonAPI("GET",`${SERVER_URL}/user-project`,{},reqHeader)
}

export const updateProjectAPI=async (id,reqBody,reqHeader)=>{
        return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

export const userProjectRemoveAPI=async (id,reqHeader)=>{
        return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

export const updateUserAPI=async (reqBody,reqHeader)=>{
        return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}



