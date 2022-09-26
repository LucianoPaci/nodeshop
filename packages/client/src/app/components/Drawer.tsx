import { useState } from 'react'
import { Drawer, Button, Group, Stack, TextInput } from '@mantine/core'
type CustomDrawerProps = {
  form: any
  onHandleSubmit: any
  status: string
}
export default function CustomDrawer({
  form,
  onHandleSubmit,
  status,
}: CustomDrawerProps) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
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
        <Button onClick={() => setOpened(true)}>Create Order</Button>
      </Group>
    </>
  )
}
