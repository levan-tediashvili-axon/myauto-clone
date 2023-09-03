import { Stack, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Logo } from 'src/assets'

export const Header = () => {
  return (
    <Stack className="bg-white">
      <Container className="py-3">
        <Link to="/">
          <Logo />
        </Link>
      </Container>
    </Stack>
  )
}
