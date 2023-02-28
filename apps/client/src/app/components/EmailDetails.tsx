import React, { useState } from 'react'
import { IEmail } from '@lucianopaci/nodeshop-types'
import { Letter } from 'react-letter'
import { createStyles, Box, Tabs, Stack } from '@mantine/core'

type EmailDetailsProps = {
  email: IEmail
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: 16,
  },
  emailViewer: {
    border: `1px solid #eee`,
    borderRadius: `8px`,
    marginTop: 16,
  },
  tabs: {
    margin: 8,
  },
  header: {
    margin: `16px 0px`,
  },
  headerEmailAddress: {
    color: 'grey',
  },
}))

const EmailDetails = ({ email }: EmailDetailsProps) => {
  const [activeTab, setActiveTab] = useState<string | null>('html')
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <h2>{email.subject}</h2>
        <Stack spacing={'xs'}>
          <Box>
            <span>
              <b>From:</b>
            </span>
            <span
              className={classes.headerEmailAddress}
            >{` <${email.from}>`}</span>
          </Box>
          <Box>
            <span>
              <b>To:</b>
            </span>
            <span
              className={classes.headerEmailAddress}
            >{` <${email.to}>`}</span>
          </Box>
        </Stack>
      </Box>
      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        className={classes.tabs}
      >
        <Tabs.List>
          <Tabs.Tab value="html">HTML</Tabs.Tab>
          <Tabs.Tab value="plain" disabled>
            Plain
          </Tabs.Tab>
        </Tabs.List>
        <Box className={classes.emailViewer}>
          <Tabs.Panel value="html">
            <Letter html={email.html} text={'None'} />
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Box>
  )
}

export default EmailDetails
