import React from 'react'
import { Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { IManufacturer } from 'src/api'
import { IProduct } from 'src/api/products/products.codecs'
import { EngineIcon, GearboxIcon, OdometerIcon, SteeringIcon } from 'src/assets'
import { CustomsBadge } from 'src/components'
import { getFuelType } from 'src/utils/get-fuel-type'
import { getLocation } from 'src/utils/get-location'
type Props = {
  product: IProduct
  manufacturer?: IManufacturer
}
export const ProductsListItem = ({ product, manufacturer }: Props) => {
  const cardTitle = `${manufacturer?.man_name || ''} ${product.car_model}`
  return (
    <Card className="bg-white w-100 p-3">
      <Stack direction="horizontal" gap={3}>
        <div
          style={{
            width: '182px',
            height: '144px',
            overflow: 'hidden',
            objectFit: 'cover',
            objectPosition: '0% 50%',
            borderRadius: '6px',
          }}
        >
          <img
            src={`https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_1.jpg?v=${product.photo_ver}`}
            alt="Car"
            width="100%"
          />
        </div>
        <Stack>
          <Stack direction="horizontal" className="justify-content-between">
            <Stack gap={2} direction="horizontal">
              {product.for_rent && <p className="m-0">ქირავდება</p>}
              <p className="text-black-800 fw-500 m-0">{cardTitle}</p>
              <p className="m-0">{`${product.prod_year} წ`}</p>
            </Stack>
            <Stack gap={3} direction="horizontal">
              <CustomsBadge customsPassed={product.customs_passed} />
              <p className="m-0 font-size-12 text-secondary">
                {getLocation(product.location_id)}
              </p>
            </Stack>
          </Stack>
          <Stack direction="horizontal">
            <Container className="mw-400">
              <Row className="mb-3">
                <Col>
                  <Stack
                    direction="horizontal"
                    className="align-items-center gap-12px"
                  >
                    <EngineIcon />
                    <p className="m-0 font-size-12 text-black">{`${(
                      product.engine_volume / 1000
                    ).toFixed(1)} ${getFuelType(product.fuel_type_id)}`}</p>
                  </Stack>
                </Col>
                <Col>
                  <Stack
                    direction="horizontal"
                    className="align-items-center gap-12px"
                  >
                    <OdometerIcon />
                    <p className="m-0 font-size-12 text-black">
                      {product.car_run_km} კმ
                    </p>
                  </Stack>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Stack
                    direction="horizontal"
                    className="align-items-center gap-12px"
                  >
                    <GearboxIcon />
                    <p className="m-0 font-size-12 text-black">ავტომატიკა</p>
                  </Stack>
                </Col>
                <Col>
                  <Stack
                    direction="horizontal"
                    className="align-items-center gap-12px"
                  >
                    <SteeringIcon />
                    <p className="m-0 font-size-12 text-black">
                      {product.right_wheel ? 'მარჯვენა' : 'მარცხენა'}
                    </p>
                  </Stack>
                </Col>
              </Row>
            </Container>
            <Stack>
              <p>{product.price_usd}</p>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}
