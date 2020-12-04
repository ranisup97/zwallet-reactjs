const TOKEN_KEY = 'jwt'

export const login = (token) => {
    
    localStorage.setItem(TOKEN_KEY, token)

}

export const logout = (history) => {
    localStorage.removeItem(TOKEN_KEY)
    history.push('/auth')
}

export const isLogin =  (admin)=> {

    if (localStorage.getItem(TOKEN_KEY)) {
            return true
    }
    return false
    
    // dataApi(admin)
    // if ( dataApi(admin) === true) {
    //     console.log('mantap')
    //     return true
    // }else{
    //     console.log('sial')
    //     return true
    // }
    // if (token) {
    //     console.log('berhasil: ',emailToken)
    //     return true
    // }
    
    // return false
}


//  const dataApi = async (admin) => {
//     // return true
        
//     const token = localStorage.getItem(TOKEN_KEY)
//     const emailToken = localStorage.getItem('login')
 
//      if(token) {
//          const headers = { headers: {'Authorization': `Bearer ${token}`}}  
//          let data = qs.stringify({token:token});
//         await  axios.post(`${process.env.REACT_APP_API}/profile/token`,data,headers)
//          .then(res =>{
//              console.log('hasil dari ambil',res.data.data[0].email)
//              const role_id = res.data.data[0].role_id;
//              const email = res.data.data[0].email;
//             //  if(admin === 'admin')
//             //  {
//             //      console.log('ini admin')
//             //      if (role_id == 1 ) {
//             //          return true;
//             //      }
//             //  }else{
//             //      console.log('ini bukan admin')
 
//             //          return true;
                 
//             //  }
//             return true
 
//          }).catch(err => {
//              console.error(err)
//          });
//         //  return true
 
//      }
// }