import React from 'react'
import DeliveryPolicy from '../../components/delivery-policy/DeliveryPolicy'
import Breadcrumb from '../../shared/breadcrumb/Breadcrumb'

function DeliveryPolicyPage() {
  return (
    <div>
      <Breadcrumb title="Delivery Policy" />
      <DeliveryPolicy />
    </div>
  )
}

export default DeliveryPolicyPage