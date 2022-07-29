import { OrderFields, EmailWithOrder } from '@lucianopaci/nodeshop-types'

export default function emailMapper(data: OrderFields & { orderId: string }) {
  const mapped: EmailWithOrder = {
    from: 'pepetest@gmail.com',
    to: data.userEmail,
    orderId: data.orderId,
    subject: 'Order Received | NodeShop',
    html: `<h3>Hi ${data.userEmail}.</h3> <p>Your order of ${data.itemsQuantity} ${data.itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>`,
  }

  return mapped
}
