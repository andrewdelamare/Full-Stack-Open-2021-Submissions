import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'
const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('getting through getAll')
  return request.then(response => response.data)
}
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}
const remove = (obj, clicked) => {
  const request = () => {
    axios.delete(`${baseUrl}/${obj.id}`, { data: { obj }})
    console.log('deleted')
  }
  const message = window.confirm(`Delete ${obj.name}?`)
  if(message && clicked){
    return(
      request(),
      console.log('deleted through conditional statement')
      )
      
    }else{
      return (
        console.log('delete action aborted')
      )
    }
}
const update = function(obj) {
  const request = axios.put(`${baseUrl}/${obj.id}`, obj)
  return(request)
}

export default { getAll, create, remove, update }
