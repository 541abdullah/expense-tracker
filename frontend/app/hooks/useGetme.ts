import { gql, useQuery } from '@apollo/client'

const GET_ME = gql`
  query Me{
    me {
     personalUsername,
     id,
     avatar
    }
  }

`

const useGetMe = () => {
  return useQuery(GET_ME);
}



const getMe = {
  useGetMe,
  GET_ME
}

export default getMe