const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const personSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, unqiue: true, minlength: 8 },
});
const Person = mongoose.model("Person", personSchema);
Person.plugin(uniqueValidator);
if (process.argv.length < 3) {
  console.log("no password");
  process.exit(1);
}
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://jim:${password}@cluster0-4pzo8.mongodb.net/test?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((r) => console.log("connected"))
  .catch((err) => console.log("error", err));
if (process.argv.length < 4) {
  console.log("Phonebook");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
    process.exit(1);
  });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((r) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
