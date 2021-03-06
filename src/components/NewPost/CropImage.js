import { createElement } from "react";

export const createImage = (url) =>
  //an HTML Image Element needs to be constructed as an image source for canvas
  new Promise((resolve, reject) => {
    let image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getCroppedImage = async (imageSrc, cropPixels) => {
  const myImage = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d"); // the thing that the drawing will actually be rendered on

  canvas.width = 600;
  canvas.height = 600;
  //https://www.w3schools.com/tags/canvas_drawimage.asp
  ctx.drawImage(
    myImage,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  return new Promise((res) => {
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
    canvas.toBlob((file) => {
      res(URL.createObjectURL(file));
    }, "image/png");
  });
};
