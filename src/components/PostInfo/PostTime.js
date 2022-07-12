const date1 = new Date('2021-05-12T00:00:00.000Z'); // ISO 8601 string
const date2 = new Date('12 May 2021 01:00:00 UTC+3');
const diffInMilliseconds = date2 - date1;
const diffInHours = diffInMilliseconds / 1000 / 60 / 60;
console.log(diffInHours); 

const PostTime = () => {
    return(
        <div className='postTime'>
            <p id="postTime">9 hours ago</p>
        </div>
    );
};

export default PostTime