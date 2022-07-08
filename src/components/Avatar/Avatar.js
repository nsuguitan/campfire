const Avatar = (props) => {
  return (
    <>
      <img
        src={props.profilepic}
        alt=""
        style={{
          height: props.height,
          width: props.width,
          borderRadius: props.borderRadius,
        }}
      />
    </>
  );
};

export default Avatar;
