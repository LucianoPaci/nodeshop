const createOrder = async (req, res) => {
  const { body } = req

  console.log(JSON.stringify(body))

  res.send('OK')
}

module.exports = {
  createOrder,
}
