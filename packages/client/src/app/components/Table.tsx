import { OrderFields } from '@lucianopaci/nodeshop-types'
import { Table } from '@mantine/core'

type Props = {
  elements: OrderFields[]
}
type RowProps = {
  data: OrderFields
  key: number
}
const Headers = () => {
  const headers = ['User Email', 'Item Name', 'Item Price', 'Items Quantity']
  return (
    <thead>
      <tr>
        {headers.map((header: string) => (
          <td>{header}</td>
        ))}
      </tr>
    </thead>
  )
}

const Row = ({ data, key }: RowProps) => {
  return (
    <tr key={key}>
      <td>{data.userEmail}</td>
      <td>{data.itemName}</td>
      <td>{data.itemPrice}</td>
      <td>{data.itemsQuantity}</td>
    </tr>
  )
}

function DataTable({ elements }: Props) {
  const rows = elements.map((element: OrderFields, key: number) => (
    <Row data={element} key={key} />
  ))

  return (
    <Table
      horizontalSpacing="md"
      verticalSpacing="md"
      striped
      highlightOnHover
      fontSize={'md'}
    >
      <Headers />
      <tbody>{rows}</tbody>
    </Table>
  )
}
export default DataTable
