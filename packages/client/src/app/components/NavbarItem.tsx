import { UnstyledButton, Group, ThemeIcon, Text, NavLink } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconCirclePlus, IconMessages, IconMail, IconHome } from '@tabler/icons'
import React from 'react'

interface MainLinkProps {
  icon: React.ReactNode
  color: string
  label: string
  path: string
}

const MainLink = ({ icon, color, label, path }: MainLinkProps) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
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
      <Group>
        <NavLink icon={icon} label={label} component={Link} to={path} />
      </Group>
    </UnstyledButton>
  )
}

const data = [
  {
    icon: <IconHome size={16} />,
    color: 'teal',
    label: 'Home',
    path: '/home',
  },
  {
    icon: <IconCirclePlus size={16} />,
    color: 'teal',
    label: 'Orders',
    path: '/',
  },
  {
    icon: <IconMail size={16} />,
    color: 'blue',
    label: 'Emails',
    path: '/emails',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Discussions',
    path: '/sda',
  },
]

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />)
  return <div>{links}</div>
}
