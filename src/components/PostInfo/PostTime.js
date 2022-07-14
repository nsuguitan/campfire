const PostTime = (props) => {
    const initialTimePosted = new Date(props.postDate);
    const currentDate = new Date();
    const differenceInHours = Math.round((currentDate - initialTimePosted) / 3600000);
    const differenceInMinutes = Math.round((currentDate - initialTimePosted) / 60000);
    const differenceInDays = Math.round((currentDate - initialTimePosted) / 86400000);

    const displayedTime = () => {
        if (differenceInMinutes <= 1) {
            return  '1 minute ago'
        } else if (differenceInMinutes > 1 && differenceInMinutes <= 59) {
            return differenceInMinutes + ' mintues ago'
        } else if (differenceInHours === 1) {
            return differenceInHours + ' hour ago'
        } else if (differenceInHours > 1 && differenceInHours < 24) {
            return differenceInHours + ' hours ago'
        } else if (differenceInDays === 1) {
            return differenceInDays + ' day ago'
        } else if (differenceInDays > 1 && differenceInDays <= 14) {
            return differenceInDays + ' days ago'
        } else if (differenceInDays > 14) {
            return initialTimePosted.toLocaleString().split(',')[0]
        }
    };

    return (
        <div className='postTime'>
            <p id="postTime">{displayedTime()}</p>
        </div>
    );
};

export default PostTime