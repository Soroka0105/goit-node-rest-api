import mongoose from 'mongoose';
import app from './app.js';



const DB_HOST = "mongodb+srv://Igor:yh2Yhb9hW5rBeabT@cluster0.29xjogo.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.set('strictQuery', true)
mongoose.connect(DB_HOST)
.then(()=> {
    app.listen(3000);
    console.log("Database connection successful")
})
.catch(error => {
    console.log(error.message);
    process.exit(1)
})

