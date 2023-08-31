import { Stack, Container } from 'react-bootstrap'
import { Logo } from 'src/assets'

export const Header = () => {
  return (
    <Stack className="bg-white">
      <Container className="py-3">
        <Logo />
      </Container>
    </Stack>
  )
}
