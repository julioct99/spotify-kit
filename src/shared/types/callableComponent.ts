import React from 'react'

export type CallableComponent =
  | string
  | React.FunctionComponent<any>
  | (new (props: any) => React.Component)
