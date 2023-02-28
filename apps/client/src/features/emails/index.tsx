import { IEmail } from '@lucianopaci/nodeshop-types'
import { createStyles, Grid, ScrollArea } from '@mantine/core'
import { Letter } from 'react-letter'

import { useEffect, useState } from 'react'
import EmailListItem from '../../app/components/EmailListItem'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectEmailsState, fetchEmails } from './emailsSlice'
import EmailDetails from '../../app/components/EmailDetails'
type Props = {}

const useStyles = createStyles((theme) => ({
  emailList: {
    border: `1px solid black`,
    margin: `0 16px`,
  },
  emailDetails: {
    border: `1px solid red`,
    backgroundColor: '#fff',
    margin: `0 16px`,
  },
}))

const Emails = (props: Props) => {
  const dispatch = useAppDispatch()
  const [selectedEmail, setSelectedEmail] = useState<IEmail | null>(null)

  const handleSelectEmail = (id) => {
    console.log('clicked' + id)
    const found = emails.find((e: IEmail) => e._id.toString() === id)
    if (found) {
      setSelectedEmail(found)
    }
  }

  const { emails, status } = useAppSelector(selectEmailsState)
  const { classes } = useStyles()

  const items = emails.map((email: IEmail) => (
    <EmailListItem
      email={email}
      onHandleSelectEmail={handleSelectEmail}
      key={email._id.toString()}
    />
  ))

  useEffect(() => {
    dispatch(fetchEmails())
  }, [dispatch])
  return (
    <Grid gutter={'xl'}>
      <Grid.Col className={classes.emailList} span={4}>
        <ScrollArea.Autosize maxHeight={850} type={'never'}>
          {status === 'loading' ? <p>Loading</p> : items}
        </ScrollArea.Autosize>
      </Grid.Col>
      <Grid.Col className={classes.emailDetails} span={'auto'}>
        {selectedEmail && <EmailDetails email={selectedEmail} />}
      </Grid.Col>
    </Grid>
  )
}

export default Emails
