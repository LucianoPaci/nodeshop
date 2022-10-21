import { Drawer, Button, Group, Stack, TextInput } from '@mantine/core'
type CustomDrawerProps = {
  form: any
  onHandleSubmit: any
  status: string
  onHandleOpen: any
  open: boolean
}
export default function CustomDrawer({
  form,
  onHandleSubmit,
  status,
  onHandleOpen,
  open,
}: CustomDrawerProps) {
  return (
    <>
      <Drawer
        opened={open}
        onClose={() => onHandleOpen(false)}
        title="Create Order"
        padding="xl"
        size="xl"
        position="right"
      >
        <form onSubmit={form.onSubmit((values) => onHandleSubmit(values))}>
          <Stack spacing={'md'}>
            <TextInput
              label="User Email"
              {...form.getInputProps('userEmail')}
            />
            <TextInput label="Item Name" {...form.getInputProps('itemName')} />
            <TextInput
              label="Item Price"
              {...form.getInputProps('itemPrice')}
            />
            <TextInput
              label="Items Quantity"
              {...form.getInputProps('itemsQuantity')}
            />
            <Button type="submit" loading={status === 'loading'}>
              Submit
            </Button>
          </Stack>
        </form>
      </Drawer>

      <Group position="center">
        <Button onClick={() => onHandleOpen(true)}>Create Order</Button>
      </Group>
    </>
  )
}
