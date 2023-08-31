import { Container, Stack } from 'react-bootstrap'
import { Breadcrumbs, Header } from './components'
import { ProductsList } from './features'

import './styles/App.scss'

function App() {
  const breadcrumbItems = [
    { id: '1', name: 'მთავარი', href: '#' },
    { id: '2', name: 'ძიება', href: '#' },
    { id: '3', name: 'იყიდება', active: true },
  ]
  return (
    <div>
      <Header />
      <Container>
        <Stack className="mt-3">
          <Breadcrumbs items={breadcrumbItems} />
          <ProductsList />
        </Stack>
      </Container>
    </div>
  )
}

export default App
