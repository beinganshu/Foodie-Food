const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Foodie:subham*2004@cluster0.hu6gthn.mongodb.net/Foodie?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");
    try {
      const fetched_data = await mongoose.connection.db
        .collection("fooditems")
        .find({})
        .toArray();
      try {
        const foodCat = await mongoose.connection.db
          .collection("food")
          .find({})
          .toArray();
        global.food_items = fetched_data;
        global.foodCategory=foodCat;
        // console.log(global.food_items);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
