import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const REGION = "us-east-1";
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_ACCESS_SECRET,
  },
});

const deleteComments = async (postId) => {
  const response = await fetch(
    process.env.REACT_APP_EXPRESS_URL + `/comments/delete/post/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

const deletePost = async (postId) => {
  const response = await fetch(
    process.env.REACT_APP_EXPRESS_URL + `/posts/delete/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};

const deleteImage = async (filename) => {
  const bucketParams = {
    Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
    Key: filename,
  };
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
export { deleteComments, deletePost, deleteImage };
