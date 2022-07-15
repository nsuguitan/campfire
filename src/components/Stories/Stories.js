import Avatar from "../Avatar/Avatar";
import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


const Stories = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:5000/users/`);
            console.log(response)
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            setUsers(await response.json());
        }

        getUsers();
        return;
    }, []);

    return (
        <div>
            {users.map((user) => (
                <div className="storiesContainer">
                    <Link to={`/Profile/${user.username}`}>
                        <Avatar
                            borderRadius="50%"
                            height="50px"
                            width="50px"
                            profilepic={user.profilePicURL}
                        />
                    </Link>
                    <p>{user.username}</p>
                </div>
            ))}
        </div>

    );
};

export default Stories

