const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const Person = require("./models");
const cors = require("cors");
app.use(express.static("build"));

app.use(cors());
app.use(express.json());

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

const peopleDoesntContainName = async (name) => {
  const person = await Person.findOne({ name: name });

  if (person) return false;
  else return true;
};
const peopleDoesntContainNumber = async (number) => {
  const person = await Person.findOne({ number: number });
  if (person) return false;
  else return true;
};

const generateId = () => {
  const max = Math.max(...persons.map((p) => p.id));
  return max;
};

app.get("/api/persons", (req, res) => {
  Person.find({}).then((p) => {
    res.json(p);
  });
});
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    res.status(400).json({ error: "content missing" }).end();
  } else {
    if (
      peopleDoesntContainName(body.name) &&
      peopleDoesntContainNumber(body.number)
    ) {
      const newPerson = new Person({
        name: body.name,
        number: body.number,
      });
      newPerson.save();
      res.status(200).json(newPerson.toJSON()).end();
    } else {
      if (!peopleDoesntContainName(body.name)) {
        res.json({ error: "names must be unique" });
      } else {
        res.json({ error: "numbers must be unique" });
      }
      res.status(400).end();
    }
  }
});
app.get("/api/persons/:id", (req, res) => {
  const check = Number(req.params.id);
  const person = persons.find((p) => p.id === check);
  if (person) {
    res.json(person);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const check = Number(req.params.id);
  const person = persons.find((p) => p.id === check);
  if (person) {
    persons = persons.filter((p) => p.id !== check);
    res.json(person);
  } else {
    res.sendStatus(404);
  }
});

app.get("/info", (req, res) => {
  res.setHeader("Content-Type", "text/hmtl");
  res.write(`Phonebook has info for ${persons.length} people \n`);
  res.end(new Date().toUTCString());
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
