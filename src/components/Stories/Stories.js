import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Avatar from "../Avatar/Avatar";
// import { Carousel } from '@trendyol-js/react-carousel';

const Stories = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:5000/users/`);
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
        <div className="storiesContainer">
            {/* <Carousel show={3.5} slide={3} swiping={true}> */}
            {users.map((user) => (
                <div key={user._id} className="story">
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
            {/* </Carousel> */}
        </div> 
    );
};

export default Stories

