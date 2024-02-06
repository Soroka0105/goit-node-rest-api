import {Schema, model} from "mongoose"
import handleMongooseError from "../helpers/handleMongooseError.js"



const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        required: [true, 'Set email for contact'],
      },
      phone: {
        type: String,
        required: true,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      }
    
}, {versionKey:false, timestamps:true})

contactSchema.post("save", handleMongooseError)

const contact = model("contact", contactSchema)

export default contact