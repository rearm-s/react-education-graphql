import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import './App.css';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

const App = () => {

    const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
    const { data: oneUser, loading: loadingUser } = useQuery(GET_ONE_USER, {
        variables: {
            id: 1
        }
    });
    const [newUser] = useMutation(CREATE_USER);

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);

    console.log(oneUser);

    useEffect(() => {
        if(!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    const handleAddUser = (event) => {
        event.preventDefault();
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data);
            setUsername('');
            setAge(0);
        })
    };

    const getAll = (event) => {
        event.preventDefault();
        refetch();
    };

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form>
                <input value={username} onChange={event => setUsername(event.target.value)} type="text" />
                <input value={age} onChange={event => setAge(Number(event.target.value))} type="number" />
                <div>
                    <button onClick={(event) => handleAddUser(event)}>Создать</button>
                    <button onClick={event => getAll(event)}>Получить</button>
                </div>
            </form>
            <div>
                {users.map(user =>
                    <div className="user" key={user.id}>{user.id}. {user.username} {user.age}</div>
                )}
            </div>
        </div>
    );
}

export default App;
