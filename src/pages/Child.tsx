/** @format */

import React from 'react'
import { renderRoutes } from 'react-router-config'

interface Props {
  route: { children: [] }
}

export default function Child(props: Props) {
  return (
    <div>
      <div>childComponent</div>
      <>{renderRoutes(props.route.children)}</>
    </div>
  )
}
