// hooks/useUserProfileQuery.js
import { useQuery } from "@tanstack/react-query";

import { get } from "../authHooks";

export const useGetAllUsersDetails = () =>{
  return useQuery({
      queryKey:["users"],
      queryFn: async() =>{
          const response = await get("/api/admin/all-profiles")
          if(response.success){
              return response.users
          }else{
              throw new Error(response.message )
          }
      }
  })
}