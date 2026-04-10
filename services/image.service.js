import sharp from "sharp";

export  const resizeImage= async(buffer)=>{
            return await sharp(buffer).resize(100,100,{
            fit:sharp.fit.inside,
            withoutEnlargement:true
         }).toBuffer();
  } 