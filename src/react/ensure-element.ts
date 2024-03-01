import { createElement, type ElementType, type ReactNode } from 'react'
import { isValidElementType } from 'react-is'

/**
 * Always returns React node.
 *
 * Creates element if it's React component,
 * returns value as is otherwise.
 *
 * @example
 * {ensureElement(Icon)}
 * {ensureElement(<Icon />)}
 */

export default function ensureElement(component: ElementType<{}> | ReactNode): ReactNode {
  if (isValidElementType(component)) {
    return createElement(component)
  } else {
    return component as Exclude<typeof component, ElementType>
  }
}
