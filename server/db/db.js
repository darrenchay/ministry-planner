import mongoose from 'mongoose';

export function connection() {
    const uri = "mongodb+srv://User:FUVhRX0yKFfIKgsi@cluster0.zltub.mongodb.net/users?retryWrites=true&w=majority";
    mongoose.connect(uri, {
                        useNewUrlParser : true,
                        useUnifiedTopology : true,
                        useCreateIndex : true,
                    });
    mongoose.connection.once('open', () => {
        console.log('MongoDB database connection established successfully!');
    });
}
