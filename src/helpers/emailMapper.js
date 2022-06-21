module.exports = function emailMapper(data) {
  const mapped = {}
  mapped.from = data.from || 'pepetest@gmail.com'
  mapped.to = data.to || data.userEmail
  mapped.orderId = data.orderId || null
  mapped.subject = 'Order Received | NodeShop'
  mapped.html =
    data.html ||
    `<h3>Hi ${data.userEmail}.</h3> <p>Your order of ${data.itemsQuantity} ${data.itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>`

  return mapped
}
