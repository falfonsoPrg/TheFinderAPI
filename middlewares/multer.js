const path = require('path')
const multer = require('multer')
const slugify = require('slugify')

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb)=>
    {
        const urlSafeFilename = slugify(file.originalname.replace(path.extname(file.originalname),""), { remove: /"<>#%\{\}\|\\\^~\[\]`;\?:@=&/g });
        cb(null, urlSafeFilename + path.extname(file.originalname));
    }
});

module.exports.Multer = multer({  storage  })
