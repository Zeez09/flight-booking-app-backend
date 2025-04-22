import e from "express"
import sendEmail from "../util/sendEmail.js";
import flight from "../model/flight.js"
export const bookFlight = async (req, res) => {
    try {
        const {
            flyingFrom,
            flyingTo,
            classes, 
            returnDate,
            date,
            // id,
            tripType,
            email,
            adultCount,
            childCount,
            infantCount,
            } = req.body

            const newflight = new flight ({
                flyingFrom: flyingFrom,
                flyingTo:   flyingTo,
                classes:  classes,
                returnDate: returnDate,
                date:  date,
                // id:  id,
                tripType: tripType,
                email: email,
                adultCount: adultCount,
                childCount: childCount,
                infantCount: infantCount,

            })
        
await newflight.save()
const message = `<table>
    <tbody>
    <tr>
    <td style="padding:20px 30px 40px 30px;">
    <table width="100%" cellspacing="0" cellpadding="0"
    border="0">
    <tbody>
    <tr>
    <td style="padding:5px 0 20px 10px; fontsize: 18px; line-height: 24px;">
    <strong>
    <p style="font-size: 20px; lineheight: 28px;">Hello ${req.body.firstname},</p>
    </strong>
    <p style="font-size: 16px; lineheight: 24px;">
    Congratulations on sucessfully booking your flight, Find below the details of your flight.
    </p>
    <ul style="font-size: 16px; lineheight: 24px;">
    <li>
    your reference number ${req.body.id}
    </li>
    <li> departing from ${req.body.flyingFrom} destination ${req.body.flyingTo}
</li>
    <li>
    Your date of departure
    </li>
    <li>
    your destination
    </li>
    <li>
        Do ensure you are already at the airport an hour before the flight departs 
    </li>
    </ul>
    <strong style="font-size: 18px; lineheight: 28px;">We wish you save travels</strong>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>`;


    await sendEmail (req.body.email, "booking confimation", message)



return res.status(201).json ({message: "booking saved succesfully"});
} catch(error) {
console.log(error);

}

}

export const fetchCert = async (req, res) => {
try {
let users = await flight.find().select(
"flyingFrom flyingTo classes returnDate date id tripType"
);
// Sending the fetched users as a response
return res.status(200).json({ users });
} catch {
return res.status(403).json({ msg: "Error in Fetching Users" });
}
};

