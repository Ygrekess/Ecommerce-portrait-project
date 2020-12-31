import mongoose from 'mongoose';
 
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const imageModel = mongoose.model("images", imageSchema);
export default imageModel;