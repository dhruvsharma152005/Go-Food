const mongoose = require('mongoose');


const mongoURI = process.env.VITE_URI;

const mongoDB = async () => {
    try 
    {
        await mongoose.connect(mongoURI);
        console.log("Connected Successfully");
        //for connecting to database(collection) and print it in it
        //Fetch all documents from food_items using .find({}).toArray(...).
        //const fetched_data=await mongoose.connection.db.collection("food_items");
        //const data1=await fetched_data.find({}).toArray(async function(err,data)
       //{
        //const foodCategory=await mongoose.connection.db.collection("foodCategory");
       // const data2=await foodCategory.find({}).toArray(function(err,catData)
      //  {
       // if(err) console.log(err);
      //  else{
       //     global.food_items=data;//holds food items data
       //     global.foodCategory=catData;
      //  }
   // })
   // });

    //simpler code for above part
    
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    //by declaring a global variable now,we can use/update it anywhere in our application
    global.food_items = fetched_data;
    global.foodCategory = foodCategory;
    console.log("Data fetched and set globally");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = mongoDB;
