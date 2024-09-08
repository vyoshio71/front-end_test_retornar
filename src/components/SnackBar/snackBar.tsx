import React from 'react'

import '../../css/components/snackBar.css'

import { ISnackBar } from '../../interfaces/interfaces'

/**
 * SnackBar Component.
 * @param {Boolean} show - Indicates whether the SnackBar is open.
 * @param {String} message - Prop received message to show.
 */

const SnackBar:React.FC<ISnackBar> = ({show, message}) => {
  return (
    <div className={`snackbar ${show ? 'show' : ''}`}>
      {message}
    </div>
  )
}

export default SnackBar