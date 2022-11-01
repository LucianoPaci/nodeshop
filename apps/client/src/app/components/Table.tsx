import { OrderFields } from '@lucianopaci/nodeshop-types'
import { createStyles, Table } from '@mantine/core'

type Props = {
  elements: OrderFields[]
}
type RowProps = {
  data: OrderFields
  key: number
}
const useStyles = createStyles((theme) => ({
  cell: {
    padding: 8,
  },
}))
const Headers = () => {
  const { classes } = useStyles()
  const headers = [
    'User Email',
    'Item Name',
    'Item Price',
    'Items Quantity',
    'Status',
  ]
  return (
    <thead>
      <tr>
        {headers.map((header: string, index: number) => (
          <td className={classes.cell} key={`${header}-${index}`}>
            {header}
          </td>
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
      <td>{data.status}</td>
    </tr>
  )
}

function DataTable({ elements }: Props) {
  const rows = elements.map((element: OrderFields, key: number) => (
    <Row data={element} key={key} />
  ))

  return (
    <Table
      horizontalSpacing="xs"
      verticalSpacing="xs"
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
