import { Container } from '@mantine/core'

type Props = {
  data: any
}

const Card = (props: Props) => {
  return (
    <Container sx={{ border: `2px solid black` }}>
      <p>{props.data}</p>
    </Container>
  )
}

export default Card
