const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
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
app.get("/api/persons/:id", async (req, res, next) => {
  Person.findById(request.params.id)
    .then((p) => {
      if (p) {
        response.json(p);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (req, res) => {
  console.log("right here");
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

app.delete("/api/persons/:id", async (req, res) => {
  const check = req.params.id;
  const person = await Person.findById(check).lean().exec();
  if (person) {
    await Person.deleteOne(person).then(res.json(person));
  } else {
    res.sendStatus(404);
  }
});

app.get("/info", (req, res) => {
  Person.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      return;
    }
    res.setHeader("Content-Type", "text/hmtl");
    res.write(`Phonebook has info for ${count} people \n`);
    res.end(new Date().toUTCString());
  });
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
