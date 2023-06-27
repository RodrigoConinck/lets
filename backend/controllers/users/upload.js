const usuario = require('../../models/usuario')
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

module.exports = async (req, res) => {
    const { originalname, mimetype, filename, path } = req.file;
    // console.log(req.file)
    let extension = req.file.mimetype
    extension = extension.substring(6)
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
          console.log('Imagem hospedada com sucesso!');
          console.log('Link da imagem:', result.secure_url);
          await usuario.update({foto_perfil: result.secure_url}, {
            where: {
                id: req.infUser.id
            }
          })
        }
      });


}