import 'emoji-picker-element'
import { JSX } from 'preact'

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'emoji-picker': JSX.HTMLAttributes<HTMLElement> & { ref?: import('preact').Ref<HTMLElement> }
    }
  }
}
