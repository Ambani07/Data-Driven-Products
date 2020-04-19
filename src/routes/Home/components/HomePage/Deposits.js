import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
})

export default function Deposits() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Recent Interactions</Title>
      <Typography component="p" variant="h4">
        201 561
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View more
        </Link>
      </div>
    </React.Fragment>
  )
}
