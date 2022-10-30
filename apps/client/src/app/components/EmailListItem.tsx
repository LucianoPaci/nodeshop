import {
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
  Box,
  Stack,
} from '@mantine/core'

import { IEmail } from '@lucianopaci/nodeshop-types'

interface EmailItemProps {
  email: IEmail
  onHandleSelectEmail: (id: any) => void
}

const EmailItem = ({ email, onHandleSelectEmail }: EmailItemProps) => {
  return (
    <Box
      onClick={() => onHandleSelectEmail(email._id.toString())}
      sx={(theme) => ({
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* <Group> */}
      <Stack align="flex-start" justify="flex-start">
        <Text size="sm">{email.subject}</Text>
        <Group position="apart" sx={{ width: '100%' }}>
          <Box>{`to: ${email.to}`}</Box>
          {email?.createdAt && (
            <Box>{new Date(email.createdAt).toLocaleDateString('es-AR')}</Box>
          )}
        </Group>
      </Stack>
      {/* </Group> */}
    </Box>
  )
}

export default EmailItem
