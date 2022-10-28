// AXIOS GLOBALS
//it will make a globally available data such that it will be there for every task done, on everypage authorization tokens should be there
//for eg. it helps facebook to know that its you only whp is accesing your profile hence others cant see that home page only you can see
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST it will get the data from the backend
function getTodos() {
    //this is the one way of doing
    //axios()  , then give an object inside the brackets() using { }, then write method just like you add items in an object,
    //write name of the method 'get' ,then give url, params will be added to url. here limit 5 is limiting the
    //no. of objects data on the screen
    //axios() will return a promise.
    
    // axios({
    //     method:'get',
    //     url:'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit:5
    //     }
    // })
    // .then(res=>showOutput(res))
    // .catch(err =>console.log(err));

    //this is another way of doing
    //you can directly say axios.get('url',{params:_limit:5})
    //you can also give this params directly to url as shown below example                            
    axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout:5000})//yeh timeout se etne time se pehle hojana chaiye execute vrna error ajayga
    .then(res=>showOutput(res))
    .catch(err =>console.log(err));
}
  // POST REQUEST it will post data in the backend
  // you can directly add or update data without writing '{data:}' , see example of update todo and add todo and compare them
  function addTodo() {
     axios
      .post('https://jsonplaceholder.typicode.com/todos',
      {data:{
        title:'hello',
        completed:false
    }})
      .then(res=>showOutput(res))
      .catch(err =>console.log(err));
  }
  
  // PUT(it will put a new data in place of old data) hence no ID/PATCH REQUEST (it will just update that data) yes it has ID of old version
  //diffrence you can see in ID given in data
  //you need to pass the '/ID' in the url
  function updateTodo() {
    axios
    .patch('https://jsonplaceholder.typicode.com/todos/1',{
        title:'update todo',
        completed:true
    })
    .then(res=>showOutput(res))
    .catch(err =>console.log(err));
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res=>showOutput(res))
    .catch(err =>console.log(err));
  }
  
  // SIMULTANEOUS DATA
  //when you want to do more than one action together..use axios.all()
  //it will take an array(similer to promise.all)
  function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos'),
        axios.get('https://jsonplaceholder.typicode.com/posts')
    ])
    // .then(res=>{
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]);      you can call like this or below is the another method
    // })
    .then(axios.spread((todos,posts)=> showOutput(posts) ))// you can use axios.spread() which takes function as parameter
    .catch(err =>console.log(err));
  }
  
  // CUSTOM HEADERS
  //you are passing header in config , you are making a new post and passing confug as paramter with it
  function customHeaders() {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'sometoken'
        }
      };
    
      axios
        .post(
          'https://jsonplaceholder.typicode.com/todos',
          {
            title: 'New Todo',
            completed: false
          },
          config
        )
        .then(res => showOutput(res))
        .catch(err => console.error(err));
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  // when ypu want to transform somthing, not much used, just learn the way 
  function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
          title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
          data.title = data.title.toUpperCase();
          return data;
        })
      };
    
      axios(options).then(res => showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
      // validateStatus: function(status) {
      //   return status < 500; // Reject only if status is greater or equal to 500, so now .catch will not run and the page will work for 404 error
      // }                                                otherwise the .catch will run but now .then will work
    })
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
//main yhi tk hai smjhne ke liye ki agger error response aye to yeh sab consolelog krdo
        if (err.response.status === 404) {
          alert('Error: Page Not Found');
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
  }
  
  // CANCEL TOKEN
  //zada ache se smj nhi a rha just move on
  function cancelToken() {
    const source = axios.CancelToken.source();//yeh koi file hoti hogi axios m

    axios
      .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token // yeh hmnme us file ko todos ke ander yeh object bna dia
      })
      .then(res => showOutput(res))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });
  
    if (true) {
      source.cancel('Request canceled!');
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  //whenever we dp any rerquest we can intercept things
  //just learn the way 
  axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`)
 return config 
 },error =>{
    return Promise.reject(err);
 });
  // AXIOS INSTANCES
  //url m comments naam ka add hojayga
  const axiosInstance = axios.create({
    // Other custom settings
    baseURL: 'https://jsonplaceholder.typicode.com'
  });
  axiosInstance.get('/comments').then(res => showOutput(res));//you can make more instances


  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);
