const APIURL = '/api/todos/';

export async function getTodos(){  
  return fetch(APIURL)  // add a proxy http://locahost:8080 to package.json so here we do not need to input localhost
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >=400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    })
                } else {
                    let err = {errorMessage: 'Please try again'};
                    throw err;
                }
            }
            return resp.json();
        })   
}

export async function createTodo(val){
  return fetch(APIURL,{
    method: 'post',
    headers: new Headers({   // post request need a header to show post data type
        'Content-Type': 'application/json',
    }),
    body: JSON.stringify({name: val})
  })  // add a proxy http://locahost:8080 to package.json so here we do not need to input localhost
  .then(resp => {
    if(!resp.ok) {
        if(resp.status >=400 && resp.status < 500) {
            return resp.json().then(data => {
                let err = {errorMessage: data.message};
                throw err;
            })
        } else {
            let err = {errorMessage: 'Please try again'};
            throw err;
        }
    }
    return resp.json();
  })   
}

export async function removeTodo(id){
  const deleteURL = APIURL + id;

  return fetch(deleteURL,{
      method: 'delete',  // do not need header for a delete request                   
  })  // add a proxy http://locahost:8080 to package.json so here we do not need to input localhost
  .then(resp => {
      if(!resp.ok) {
          if(resp.status >=400 && resp.status < 500) {
              return resp.json().then(data => {
                  let err = {errorMessage: data.message};
                  throw err;
              })
          } else {
              let err = {errorMessage: 'Please try again'};
              throw err;
          }
      }
      return resp.json();
  })     
}

export async function updateTodo(todo){
  const updateURL = APIURL + todo._id;

  return fetch(updateURL,{
            method: 'put',  // 
            headers: new Headers({   // put request need a header to show data type 
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({completed: !todo.completed}) // send the completed status of a todo                   
        })  // add a proxy http://locahost:8080 to package.json so here we do not need to input localhost
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >=400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    })
                } else {
                    let err = {errorMessage: 'Please try again'};
                    throw err;
                }
            }
            return resp.json();
        })    
}