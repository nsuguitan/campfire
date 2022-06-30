import profilePicture from '../../assets/profilePic.jpg';

const Avatar = (props) =>{
    return (
        <>
            <img src={profilePicture} alt='' style={{height:props.height, width:props.width, borderRadius:props.borderRadius}}/>
        </>
    );
};

export default Avatar