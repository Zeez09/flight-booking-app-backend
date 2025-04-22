import mongoose, { Schema } from "mongoose";


const flightSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    flyingFrom: {
        type: String,
        required: true,
    },
    flyingTo: {
        type: String,
        required: true,
    },
    classes: {
        type: String,
        required: true,
    },
    tripType: {
        type: String,
        required: true,
    },
    returnDate: {
        type: Date,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    // id: {
    //     type: String,
    //     required: true,
    // },
    adultCount: {
        type: Number,
        required: false
    },
    childCount: {
        type: Number,
        required: false
    },
    infantCount: {
        type: Number,
        required: false
    },
    selectedCurrency: {
        type: String,
        required: true,
    }


})

const flight = mongoose.model("flight", flightSchema);
export default flight;