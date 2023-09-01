import { Container, Stack } from 'react-bootstrap'
import { Breadcrumbs, Header } from './components'
import { ProductsList } from './features'

import './styles/App.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const breadcrumbItems = [
    { id: '1', name: 'მთავარი', href: '#' },
    { id: '2', name: 'ძიება', href: '#' },
    { id: '3', name: 'იყიდება', active: true },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Container>
        <Stack>
          <Breadcrumbs items={breadcrumbItems} />
          <ProductsList />
        </Stack>
      </Container>
    </QueryClientProvider>
  )
}

export default App
