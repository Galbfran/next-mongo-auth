import { Schema , model , models} from "mongoose";

const UserSchema = new Schema({
    email: {
        type:String,
        require: true,
        unique: [true , "Email es Requerido"],
    },
    password:{
        type:String,
        require:[true , "el Password es requerido"],
        select:false
    },
    fullname:{
        type:String,
        require:[true , "El nombre es requerido"],
        minLength:[3 , "tiene que tener como minimo 3 letras"],
        maxLength:[50 , "tiene que tener como maximo 50 letras"]
    }
})

const User = models.User || model("User" , UserSchema)  
export default User
