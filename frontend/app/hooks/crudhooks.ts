import { gql, useQuery, useMutation } from '@apollo/client'



//  MUTATIONS

const LOGIN = gql`
   mutation login($input:LoginUserInput!){
	 login(loginUserInput:$input){
		status
	 }
   }
`
const useLogin = () => {
   return useMutation(LOGIN, {
      refetchQueries: "active"
   });
}



const AUTHREFRESH = gql`
   mutation regen($input:RefreshInput!){
      regen(refreshInput:$input){
		status
	 }
   }
`
const useRefresh = () => {
   return useMutation(AUTHREFRESH);
}




const LOGOUT = gql`
   mutation logoutmutation{
	 logout{
		status
	 }
   }

`
const useLogout = () => {
   return useMutation(LOGOUT);
}



const CREATE_USER = gql`
   mutation createone($input:CreateUserInput!){
	 createUser(createUserInput:$input){
		personalUsername
	 }
   }

`
const useCreateUser = () => {
   return useMutation(CREATE_USER)
}



const CHANGE_AVATAR = gql`
   mutation updateavt($input:UpdateUserInput!){
	 updateUser(updateUserInput:$input){
		personalUsername
	 }
   }

`
const useChangeAvt = () => {
   return useMutation(CHANGE_AVATAR)
}



const CREATE_GROUP = gql`
   mutation createGroup($input:CreateGroupInput!){
	 createMemberOfGroup(createGroupInput:$input){
		groupID,
      memberName
	 }
   }

`

const useCreategroup = () => {
   return useMutation(CREATE_GROUP, {
      refetchQueries: [
         ALLMYGROUPS,
         'allgroupsofme',
         GROUPTOTALDATA,
         'getgdata'

      ]
   })
}



const LEAVE_GROUP = gql`
   mutation updateGroup($input:UpdateGroupInput!){
   updateGroup(updateGroupInput:$input){
      groupName
	 }
   }

`

const useLeavegroup = () => {
   return useMutation(LEAVE_GROUP, {
      refetchQueries: [
         ALLMYGROUPS,
         'allgroupsofme'
      ],
   })
}



const CREATE_P_TRANSACTION = gql`
mutation createPTrans($input:CreatePersonalTransactionInput!){
   createPTransaction(createPersonalTransactionInput:$input){
   creatorId,
   transactionID
 }
}

`

const useCreatePTransaction = () => {
   return useMutation(CREATE_P_TRANSACTION, {
      refetchQueries: [
         PERSONALCHART,
         "Pdata",
         ALLMYTRANSACTIONS,
         "user",
         FILTERPERSONALTRANSQ,
         "filterPq"
      ]
   })
}




const CREATE_G_TRANSACTION = gql`
mutation creategtrans($input:CreateGroupTransactionInput!){
  createTransaction(createGroupTransactionInput:$input){
    transactionID,
    transaction,
    groupMemberId,
    groupGroupID
  }
}

`

const useCreateGTransaction = () => {
   return useMutation(CREATE_G_TRANSACTION, {
      refetchQueries: [
         GROUPCHART,
         "Gdata",
         ALLGROUPTRANSACTIONS,
         "gTrans",
         FILTERGROUPTRANSQ,
         "filterGq"
      ]
   })
}








const DELETEPERSONALTRANS = gql`
  mutation removetrans($input:String!){
  removePTransaction(id:$input){
    result
  }
}
`



const usePDelete = () => {
   return useMutation(DELETEPERSONALTRANS, {
      refetchQueries:
         [PERSONALCHART,
            "Pdata",
            ALLMYTRANSACTIONS,
            "user",
            FILTERPERSONALTRANSQ,
            "filterPq"
         ]
   });
}





const DELETEGROUPTRANS = gql`
  mutation removegtrans($input:String!){
  removeGTransaction(id:$input){
    result
  }
}
`



const useGDelete = () => {
   return useMutation(DELETEGROUPTRANS, {
      refetchQueries:
         [
            GROUPCHART,
            "Gdata",
            ALLGROUPTRANSACTIONS,
            "gTrans",
            FILTERGROUPTRANSQ,
            "filterGq"
         ]
   });
}









const UPDATEPERSONALTRANS = gql`
  mutation editTrans($input:UpdatePersonalTransactionInput!){
   editPTransaction(updatePersonalTransactionInput:$input){
     transactionID
   }
 }

`



const usePUpdate = () => {
   return useMutation(UPDATEPERSONALTRANS, {
      refetchQueries:
         [PERSONALCHART,
            "Pdata",
            ALLMYTRANSACTIONS,
            "user",
            FILTERPERSONALTRANSQ,
            "filterPq"
         ]
   });
}



const UPDATEGROUPTRANS = gql`
  mutation editGTrans($input:UpdateGroupTransactionInput!){
   editGTransaction(updateGroupTransactionInput:$input){
     transactionID
   }
 }

`



const useGUpdate = () => {
   return useMutation(UPDATEGROUPTRANS, {
      refetchQueries: [
         GROUPCHART,
         "Gdata",
         ALLGROUPTRANSACTIONS,
         "gTrans",
         FILTERGROUPTRANSQ,
         "filterGq"
      ]
   });
}













const DELETEUSER = gql`
mutation deluser($input:String!){
   deleteUser(id:$input){
     result
   }
   
   }


`


const useRDel = () => {
   return useMutation(DELETEUSER, {
      refetchQueries: [
         ALLUSERS,
         'allusers'
      ]
   });
}



const RENAME_GROUP = gql`
   mutation updateGroup($input:UpdateGroupInput!){
   updateGroup(updateGroupInput:$input){
      groupName
	 }
   }

`

const useRenamegroup = () => {
   return useMutation(RENAME_GROUP)
}








// QUERIES


const USER = gql`
   query me($input:String!){
  user(id:$input){
    avatar,
    personalUsername,
    id
  }
}
`


const ALLUSERS = gql`
   query allusers{
	 users{
		avatar,
      personalUsername,
      id
	 }
   }
`
const useSearch = () => {
   return useQuery(ALLUSERS, {
      fetchPolicy: "network-only"
   });
}




const ALLMYGROUPS = gql`
   query allgroupsofme($input:String!){
  user(id:$input){
    allMyGroups{
      groupName
      alive
      groupID
      members{
        id,
        personalUsername,
        avatar
      }
    }
  }
}

`
const useAllGroups = (userid: string) => {
   return useQuery(ALLMYGROUPS, {
      variables: { "input": userid },
      fetchPolicy: "network-only"
   });
}





const ALLMYTRANSACTIONS = gql`
   query user($input:String!){
  user(id:$input){
   personalUsername
    allMyTransactions{
      transactionID
      transaction,
      date,
      Amount,
      location,
      paymentType,
      category
    }
  }
}

`

const useGetMyTransactions = (userid: string) => {
   return useQuery(ALLMYTRANSACTIONS, {
      variables: { "input": userid }
   })
}



const ALLGROUPTRANSACTIONS = gql`
   query gTrans($input:String!){
   groupTransactions(id:$input){
    transaction,
    transactionID,
    location,
    Amount,
    date,
    category,
    paymentType
    groupMemberId,

  }
}

`

const useGetGroupTransactions = (groupid: string) => {
   return useQuery(ALLGROUPTRANSACTIONS, {
      variables: { "input": groupid }
   })
}







const PERSONALCHART = gql`
  query Pdata($input:String!){
   chartMyTransactions(id:$input){
   Expense,
   Investment,
   Saving
  }
}
`



const usePChart = (userid: string) => {
   return useQuery(PERSONALCHART, {
      variables: { "input": userid },
   });
}



const PERSONALSTATS = gql`
  query getstats($input:String!){
  myStats(id:$input){
    PSaving,
    PExpense,
    PInvestment,
    PSavingPercentage
    GSaving,
    GExpense,
    GInvestment,
    GSavingPercentage,
    ChartSaving,
    ChartExpense,
    ChartInvestment
  }
}
`









const FILTERPERSONALTRANSQ = gql`
  query filterPq($input:FilterPersonalTransactionInput!){
   filterMyTransactions(filterPersonalTransactionInput:$input){
   transactionID,
    transaction,
    date,
    Amount,
    location,
    paymentType,
    category
   }
}
`



const usePFilterq = (id: string, month: string, year: number) => {
   return useQuery(FILTERPERSONALTRANSQ, {
      variables: {
         "input": {
            "creatorID": id,
            "month": month,
            "year": year
         }
      },
      fetchPolicy: "network-only"
   });
}





const FILTERGROUPTRANSQ = gql`
  query filterGq($input:FilterGroupTransactionInput!){
   filterGroupTransactions(filterGroupTransactionInput:$input){
   transactionID,
    transaction,
    date,
    Amount,
    location,
    paymentType,
    category,
    groupMemberId
   }
}
`



const useGFilterq = (gid: string, mid: string, month: string, year: number) => {
   return useQuery(FILTERGROUPTRANSQ, {
      variables: {
         "input": {
            "groupid": gid,
            "memberid": mid,
            "month": month,
            "year": year
         }
      },
      fetchPolicy: "network-only"
   });
}




const FINDONEPTRANS = gql`
  query findPT($input:String!){
   findOne(id:$input){
    transaction,
    date,
    Amount,
    location,
    paymentType,
    category
   }
  }
`


const usePFindOne = (id: string) => {
   return useQuery(FINDONEPTRANS, {
      variables: { "input": id },
      fetchPolicy: "network-only"
   });
}





const FINDONEGTRANS = gql`
  query findGT($input:String!){
   findOneGtrans(id:$input){
    transaction,
    date,
    Amount,
    location,
    paymentType,
    category,
    groupGroupID,
    groupMemberId
   }
  }
`


const useGFindOne = (id: string) => {
   return useQuery(FINDONEGTRANS, {
      variables: { "input": id },
      fetchPolicy: "network-only"
   });
}








const FINDGDATA = gql`
  query findGroupDets($input:String!){
   getGdata(id:$input){
    groupID,
    groupName,
    alive,
    memberName,

   }
  }
`







const GROUPCHART = gql`
  query Gdata($input:String!){
   chartGroupTransactions(id:$input){
   Expense,
   Investment,
   Saving
  }
}
`



const useGChart = (groupid: string) => {
   return useQuery(GROUPCHART, {
      variables: { "input": groupid },
   });
}






const GROUPTOTALDATA = gql`
  query getgdata($input:String!){
  grouptotaldata(id:$input){
    memberName,
    alive,
    memberId,
    member{
      personalUsername,
      avatar
    }
  }
}
`



const useGTotal = (groupid: string) => {
   return useQuery(GROUPTOTALDATA, {
      variables: { "input": groupid },
   });
}




const VISITDATA = gql`
  query getvisitdata($input:String!){
  user(id:$input){
    
   personalUsername,
   avatar
    
  }
}
`



const useFindaUser = (visitid: string) => {
   return useQuery(VISITDATA, {
      variables: { "input": visitid },
   });
}






const VISITCHARTDATA = gql`
  query getvisitchartdata($inputmid:String!,$inputgid:String!){
   chartdatagroupie(gid:$inputgid,mid:$inputmid){
    
   Saving,
   Expense,
   Investment,
   SavingPercentage,
   ChartSaving,
   ChartExpense,
   ChartInvestment,
   TotalInvestment,
   TotalExpense,
   TotalSaving,
    
  }
}
`



const useMembervisitchart = (visitid: string, groupid: string) => {
   return useQuery(VISITCHARTDATA, {
      variables: { "inputmid": visitid, "inputgid": groupid },
   });
}






const crudfunctions = {
   useLogin,
   useRefresh,
   useLogout,
   createUser:useCreateUser,
   changeAvt:useChangeAvt,
   useSearch,
   creategroup:useCreategroup,
   useAllGroups,
   leavegroup:useLeavegroup,
   createPTransaction:useCreatePTransaction,
   USER,
   getMyTransactions:useGetMyTransactions,
   pChart:usePChart,
   pDelete:usePDelete,
   pFilterq:usePFilterq,
   pFindOne:usePFindOne,
   pUpdate:usePUpdate,
   userDel:useRDel,
   PERSONALSTATS,
   createGTransaction:useCreateGTransaction,
   FINDGDATA,
   gChart:useGChart,
   getGroupTransactions:useGetGroupTransactions,
   gFilterq:useGFilterq,
   gTotal:useGTotal,
   gFindOne:useGFindOne,
   gUpdate:useGUpdate,
   gDelete:useGDelete,
   renamegroup:useRenamegroup,
   findaUser:useFindaUser,
   membervisitchart:useMembervisitchart
}

export default crudfunctions;