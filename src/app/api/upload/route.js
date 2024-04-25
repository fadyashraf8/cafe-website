import uniqid from 'uniqid';
import { v2 as cloudinary } from 'cloudinary';
import os from 'os'; 
import { writeFile, unlink } from 'fs/promises'; // Import the writeFile and unlink functions

cloudinary.config({ 
  cloud_name: process.env.MY_CLOUD_NAME, 
  api_key: process.env.MY_CLOUD_KEY, 
  api_secret:process.env.MY_CLOUD_SECRETKEY,
  secure: true 
});



export async function POST(req) {
    const data = await req.formData();
    if (data.get('file')) {
      const file = data.get('file');
      const ext = file.name.split('.').slice(-1)[0];
      const newFileName = uniqid() + '.' + ext;
  
      const chunks = [];
      for await (const chunk of file.stream()) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
  
      try {
        const tempDir = os.tmpdir();
        const filePath = `${tempDir}/${newFileName}`;
        await writeFile(filePath, buffer);
  
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          folder: 'ordering-photos',
          resource_type: 'auto' 
        });
  
        const link = uploadResult.secure_url;
  
        // Delete the temporary file
        await unlink(filePath); // Use the unlink function to delete the file
  
        return Response.json(link);
      } catch (error) {
        console.error(error);
        return Response.json({ error: 'Upload failed' }, { status: 500 });
      }
    }
    return Response.json(true);
  }
  
