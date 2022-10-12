
const checkForPk = async (pk, model) => {
  const row = await model.findByPk(pk);
  if (row === null) {
    throw new Error("Entry does not exist!")
  }
}

const checkUnique = async (val, col, model) => {
  let results;
  if (col === "username"){
    results = await model.findAll({
      where: {
        username: val
      }
    });
    console.log(results);
  } else {
    throw new Error ("This method only handles username checking, please expand it to check other columns if needed.")
  }

  if (results.length > 1) {
    throw new Error("Not unique!")
  } else if (results === null) {
    throw new Error("Entry does not exist!")
  }
}

const checkNonexistence = async (val, col, model) => {
  let results;
  if (col === "username"){
    results = await model.findAll({
      where: {
        username: val
      }
    });
  } else {
    throw new Error ("This method only handles username checking, please expand it to check other columns if needed.")
  }
  console.log(results)
  if (results.length > 0) {
    throw new Error("An entry with this value already exists!")
  }
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.message === "Entry does not exist!"){
    res.status(400).send(error.message);
  } else {
    res.status(400).send(error.message);
  }
  next(error);
}

module.exports = {
  checkForPk,
  checkUnique,
  checkNonexistence,
  errorHandler
};