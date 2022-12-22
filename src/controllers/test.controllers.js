const obj = {
  id: "scsd",
  sd: "asdfvd",
  sds: "dvfvdf",
};

async function getObj(req, res, next) {
  console.log("34rdfvd");
  return res.status(200).json(obj);
}

module.exports = { getObj };
