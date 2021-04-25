const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name specified!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const strawberry = new Fruit({
  name: "strawberry",
  rating: 5,
  review: "Pretty solid as a fruit.",
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "John",
//   age: 70,
//   favoriteFruit: strawberry
// });

// person.save();

// Person delete
// Person.deleteMany({ age: { $gte: 20 } }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted");
//   }
// });

// Person update
Person.updateOne(
  { name: "Max" },
  { favoriteFruit: strawberry },
  (err, person) => {
    if (err) {
      console.log(err);
    } else {
      console.log(person);
    }
  }
);

// Person find
Person.find({}, (err, person) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();

    person.forEach(({ name }) => console.log(name));
  }
});

// Fruits find
// Fruit.find((err, fruits) => {
//   if (err) {
//     log.error(err);
//   } else {
//     mongoose.connection.close();

//     fruits.forEach(({ name }) => {
//       console.log(name);
//     });
//   }
// });
