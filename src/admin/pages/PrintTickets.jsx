import React from 'react'
import { flight_assets } from '../../assets/assets'

const PrintTickets = () => {
  return (
    <div>
      <embed src={flight_assets.pdf1} type="application/pdf" width="100%" height="600px" />
    </div>
  )
}

export default PrintTickets