import React from 'react'
import theme from './ProjectDetails.styles'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import ProjectAnswers from '../ProjectAnswers'
const styles = theme

const useStyles = makeStyles(styles)

function ProjectDetails({ project }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <h3>Project Details</h3>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={`Name`} secondary={project.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Question`} secondary={project.question} />
          </ListItem>
        </List>
        <ExpansionPanel className={classes.possibleAnswers}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <div className={classes.column}>
              <Typography className={classes.heading}>
                Project Answers
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            {project.answers.map(answer => (
              <Chip label={answer.text} onDelete={() => {}} />
            ))}
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <ProjectAnswers />
          </ExpansionPanelActions>
        </ExpansionPanel>
      </Grid>
    </div>
  )
}

export default ProjectDetails
