import { Outlet } from 'react-router-dom'
import { AppShell, Navbar, Header, Title } from '@mantine/core'
import { MainLinks } from './NavbarItem'
const Layout = () => {
  return (
    <AppShell
      fixed
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} height={500} p="xs">
          <Navbar.Section>
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Title order={2}>Nodeshop</Title>
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[3],
        },
      })}
    >
      {/* Your application here */}
      <Outlet />
    </AppShell>
  )
}

export default Layout
