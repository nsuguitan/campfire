const loadMorePosts = async (lastPost, size) => {
  const response = await fetch(
    process.env.REACT_APP_EXPRESS_URL +
      `/posts/paged/?lastPost=${lastPost}&size=${size}`
  );
  if (!response.ok) {
    const message = `An error occured: ${response.error.statusText}`;
    window.alert(message);
    return;
  }
  return await response.json();
};

export { loadMorePosts };
