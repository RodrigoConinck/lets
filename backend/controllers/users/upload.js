const usuario = require('../../models/usuario')
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

module.exports = async (req) => {
    const { path } = req.file;
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET 
      });

      const imageFile = `${path}`;

      cloudinary.uploader.upload(imageFile, async (error, result) => {
        if (error) {
          console.error('Erro ao fazer upload da imagem:', error);
        } else {
          await usuario.update({foto_perfil: result.secure_url}, {
            where: {
                id: req.infUser.id
            }
          })
        }
      });


}