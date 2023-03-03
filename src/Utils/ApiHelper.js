
// const API_URL = "https://private-465f39-sinnvestment.apiary-mock.com";
// const API_URL = "http://localhost/FundarNation";
const API_URL = "http://34.245.107.156";

export const getHeader = async (contentType = 'application/json') => {
  let headers = new Headers();
  let token = (await localStorage.getItem('token')) ?? '';
  headers.set('Content-Type', contentType);
 
 
  if (token) {
    headers.set('Authorization', 'Bearer ' + token);
  }
   console.log(headers.get('Authorization'))
  return headers;
}

// export const login = async ({ data }) => {
//   try {
//     let url = `${API_URL}/login`;

//     const responses = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: await getHeader(),
//     });

//     let res = await responses.json();
//     if (res?.status === 200) {
//       localStorage.setItem('token', res?.data?.token);
//       return res;
//     } else {
//       throw res;
//     }
//   } catch (error) {
//     throw error;
//   }
// }


export const getData = async ({ api = '' }) => {
  try {
    let url = `${API_URL}/${api}`;

    const responses = await fetch(url, {
      method: 'GET',
       // mode: 'no-cors',     
      headers: await getHeader(),

    });

    let res = await responses.json();
    if (res?.status === 200 && res.data) {
      return res?.data;
    } else {
      throw res;
    }
  } catch (error) {
    throw error;
  }
}

export const postData = async ({ data, api = '' }) => {
  try {
    let url = `${API_URL}/${api}`;
    console.log('postdata', data);
    const responses = await fetch(url, {
      method: 'POST',
      headers: await getHeader(),
      body: JSON.stringify(data),
    });

    let res = await responses.json();
    if (res?.status === 200) {
      return res;
    } else {
      throw res;
    }
  } catch (error) {
    throw error;
  }
}

export   const goToProjectUrl = function go(URL){
       
        window.open(API_URL+'/investments/'+URL, '_blank');
       };
       export   const goToProfile = function go(){
       
        window.location.href=API_URL+'/profil/persoenliche-daten';
       };
