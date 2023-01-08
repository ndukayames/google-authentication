const obj = {
  id: "scsd",
  sd: "asdfvd",
  sds: "dvfvdf",
};

async function getObj(req, res, next) {
  return res.status(200).json(obj);
}

module.exports = { getObj };
