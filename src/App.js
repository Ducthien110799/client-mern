import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {

  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [listOfFriends, setListOfFriends] = useState([])

  const server = 'https://thienkendu.herokuapp.com'

  const addFriend = () => {
    Axios.post(server + '/add', { name: name, age: age }).then((res) => {
      setListOfFriends([...listOfFriends, { _id: res.data._id, name: name, age: age }])
    })
  }

  const updateFriend = (id) => {
    const newAge = prompt("Enter new Age: ")
    Axios.put(server + "/update", { age: newAge, id: id }).then(
      () => {
        setListOfFriends(listOfFriends.map((val) => {
          return val._id === id ? { _id: id, name: val.name, age: newAge } : val
        }))
      }
    )
  }

  const deleteFriend = (id) => {
    Axios.delete(server + `/delete/${id}`).then(
      () => {
        setListOfFriends(listOfFriends.filter((val) => {
          return val._id !== id;
        }))
      }
    )
  }


  useEffect(() => {
    Axios.get(server + '/read')
      .then((res) => {
        setListOfFriends(res.data)
      })
      .catch(() => {
        console.log('Error !')
      })
  }, [])


  return (
    <div className="App">
      <div className="inputs">
        <input type="text"
          placeholder="Name friend ..."
          onChange={(event) => {
            setName(event.target.value)
          }}>

        </input>

        <input type="number" placeholder="Age friend ..."
          onChange={(event) => {
            setAge(event.target.value)
          }}>

        </input>

        <button onClick={addFriend}>
          Add Friend
        </button>
      </div>
      <div className='listOfFriends'>
        {listOfFriends.map((val) => {
          return <div className='friend_container'>
            <div className='friend'>
              <h3>Name: {val.name} </h3>
              <h3>Age: {val.age} </h3>
            </div>
            <button onClick={() => {
              updateFriend(val._id)
            }}>Update</button>
            <button id='delete'
              onClick={() => {
                deleteFriend(val._id)
              }}>X</button>
          </div>
        })}
      </div>

    </div>
  );
}

export default App;
