import { createStyles, Grid, ScrollArea } from '@mantine/core'
import {
  IconGitPullRequest,
  IconAlertCircle,
  IconMessages,
  IconDatabase,
} from '@tabler/icons'
import { useEffect } from 'react'
import EmailListItem from '../../app/components/EmailListItem'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectEmailsState, fetchEmails } from './emailsSlice'
type Props = {}

const useStyles = createStyles((theme) => ({
  emailList: {
    border: `1px solid black`,
  },
  emailDetails: {
    border: `1px solid red`,
  },
}))

const data = [
  {
    icon: <IconGitPullRequest size={16} />,
    color: 'blue',
    label: 'Email - Order #499102',
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: 'teal',
    label: 'Email - Order #18389',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Email - Order #599912',
  },
  {
    icon: <IconDatabase size={16} />,
    color: 'grape',
    label: 'Email - Order #918491',
  },
  {
    icon: <IconGitPullRequest size={16} />,
    color: 'blue',
    label: 'Email - Order #499102',
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: 'teal',
    label: 'Email - Order #18389',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Email - Order #599912',
  },
  {
    icon: <IconDatabase size={16} />,
    color: 'grape',
    label: 'Email - Order #888372',
  },
  {
    icon: <IconGitPullRequest size={16} />,
    color: 'blue',
    label: 'Email - Order #499102',
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: 'teal',
    label: 'Email - Order #18389',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Email - Order #599912',
  },
  {
    icon: <IconDatabase size={16} />,
    color: 'grape',
    label: 'Email - Order #888372',
  },
  {
    icon: <IconGitPullRequest size={16} />,
    color: 'blue',
    label: 'Email - Order #499102',
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: 'teal',
    label: 'Email - Order #18389',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Email - Order #599912',
  },
  {
    icon: <IconDatabase size={16} />,
    color: 'grape',
    label: 'Email - Order #888372',
  },
  {
    icon: <IconGitPullRequest size={16} />,
    color: 'blue',
    label: 'Email - Order #499102',
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: 'teal',
    label: 'Email - Order #18389',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Email - Order #599912',
  },
  {
    icon: <IconDatabase size={16} />,
    color: 'grape',
    label: 'Email - Order #888372',
  },
  {
    icon: <IconGitPullRequest size={16} />,
    color: 'blue',
    label: 'Email - Order #499102',
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: 'teal',
    label: 'Email - Order #18389',
  },
  {
    icon: <IconMessages size={16} />,
    color: 'violet',
    label: 'Email - Order #599912',
  },
  {
    icon: <IconDatabase size={16} />,
    color: 'grape',
    label: 'Email - Order #888372',
  },
]

const Emails = (props: Props) => {
  const dispatch = useAppDispatch()

  const { emails, status } = useAppSelector(selectEmailsState)
  const { classes } = useStyles()
  const items = data.map((link) => <EmailListItem {...link} key={link.label} />)

  useEffect(() => {
    dispatch(fetchEmails())
  }, [dispatch])
  return (
    <Grid>
      <Grid.Col className={classes.emailList} span={4}>
        <ScrollArea.Autosize maxHeight={850} type={'never'}>
          {items}
        </ScrollArea.Autosize>
      </Grid.Col>
      <Grid.Col className={classes.emailDetails} span={'auto'}>
        <div>Details</div>
        <div>Details</div>
        <div>Details</div>
        <div>Details</div>
        <div>Details</div>
      </Grid.Col>
    </Grid>
  )
}

export default Emails
