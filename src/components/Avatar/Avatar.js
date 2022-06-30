import profilePicture from '../../assets/profilePic.jpg';

const Avatar = () =>{
    return (
        <div className='avatar'>
            <img src={profilePicture} alt='' className='profilePic' />
        </div>
    );
};

export default Avatar