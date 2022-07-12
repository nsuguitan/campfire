const date1 = new Date('2022-07-11T14:06:42.466+00:00'); 
const currentDate = new Date();
const differenceInHours = Math.round((currentDate - date1) / 3600000);
const differenceInMinutes = Math.round((currentDate - date1) / 600000);
const differenceInDays = Math.round((currentDate - date1) / 86400000 );

console.log(differenceInMinutes, 'time in minutes');
console.log(differenceInHours, 'time in hours'); 
console.log(differenceInDays, 'time in days')

const displayedTime = () => {
    if (differenceInMinutes === 1){
        return differenceInMinutes + 'minute ago'
    }else if (differenceInMinutes < 60 && differenceInMinutes !== 1){
        return differenceInMinutes + ' mintues ago'
    } else if (differenceInHours === 1  ){
        return differenceInHours + ' hour ago'
    }else if (differenceInHours > 1 && differenceInHours < 24){
        return differenceInHours + ' hours ago'
    } else if (differenceInDays === 1){
        return differenceInDays + ' day ago'
    }else if (differenceInDays > 1){
        return differenceInDays + ' days ago'
    }
}
console.log(displayedTime())

const PostTime = () => {
    return(
        <div className='postTime'>
            <p id="postTime"></p>
        </div>
    );
};

export default PostTime