import axios, { AxiosResponse } from "axios";
import twilio from "twilio";
type UserType = {
  name: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
};

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
const TWILIO_ACCOUNT_SID =
  process.env.SID || "ACb0eb39b23df7248276c3e19bf2e7cb52";
const TWILIO_AUTH_TOKEN =
  process.env.TWILIO_AUTH_TOKEN || "f406b561cc0a5be54b50a2156c52e43c";
const TWILIO_PHONE_NUMBER = process.env.TWILIO_NUM || "+14155238886";
const sendWhatsAppMessage = async (to: string, body: string) => {
  console.log("kwj");
  console.log(
    "lol",
    TWILIO_PHONE_NUMBER,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
  );
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+13142549877",
      to: "+91" + to,
    })
    .then((message) => console.log(message.sid));
  return;
};

export const weatherListener = async (user: any) => {
  try {
    const {
      name,
      phone,
      location: { city },
    } = user;
    console.log("babita");

    // Use the weather API to get weather information
    const weatherResponse = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=XQNHMT3YCZWYTGPVDRKBRVXYG&contentType=json`
    );
    console.log("akjb");
    const currentConditions = weatherResponse.data.currentConditions;
    const forecast = weatherResponse.data.days;

    // Extract relevant information from the current conditions
    const currentTemperature = currentConditions.temp;
    const currentConditionsDescription = currentConditions.conditions;
    console.log("sabita");

    // Check if the current conditions indicate rain
    if (currentConditionsDescription.toLowerCase().includes("rain")) {
      // Send WhatsApp message
      const messageBody = `${name}, it's currently raining in ${city}. ${currentConditionsDescription}`;
      await sendWhatsAppMessage(phone, messageBody);
      console.log(
        `WhatsApp message sent to ${name} (${phone}): ${messageBody}`
      );
    } else {
      console.log(`${name}, no rain in ${city} right now.`);
    }
  } catch (error: any) {
    console.error("Error in weatherListener:", error.message);
  }
};
