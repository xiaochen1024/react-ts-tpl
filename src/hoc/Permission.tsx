/** @format */

import React from 'react'

interface IProps {
  hasPermission: false
  children: React.ReactElement
}

const Permission = (props: IProps) => {
  props.hasPermission ? props.children : null
}

export default Permission
