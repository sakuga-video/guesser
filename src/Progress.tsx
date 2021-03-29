import { makeStyles, Step, StepConnector, StepIconProps, StepLabel, Stepper, withStyles } from "@material-ui/core";
import clsx from "clsx";
import guess_matches, { Guess } from "./GuessMatcher";


const useProgressStepIconStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: 22,
        alignItems: 'center',
        color: theme.palette.background.default,
    },
    active: {
        color: theme.palette.text.primary,
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        border: "1px solid #aaa",
        backgroundColor: 'currentColor',
    },
    completed: {
        color: theme.palette.secondary.main,
        zIndex: 1,
        fontSize: 18,
        border: "none",
    },
    correct: {
        color: theme.palette.primary.main,
    }
}));

const ProgressStepIcon = (correct: boolean) => {
    const classes = useProgressStepIconStyles();
    return  (props: StepIconProps) => {
        const { active, completed } = props;
    
        let progressClass = classes.circle;
        if (completed) {
            progressClass += " " + classes.completed;
        }
        if (correct) {
            progressClass += " " + classes.correct;
        }
    
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                })}
            >
                <div className={progressClass} />
            </div>
        );
    };
}

const progressStyles = makeStyles({
    root: {
        background: "rgba(2, 2, 2, .5)",
        zIndex: 100000,
        height: 22,
        padding: 8,
        margin: 5,
        borderRadius: "10px",
        position: "fixed",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
    }
})


const ProgressConnector = withStyles({
    root: {
        display: "none",
    }
})(StepConnector);

const Progress = ({ activeStep, steps, guesses }: { activeStep: number, steps: string[], guesses: Guess[] }) => {
    const classes = progressStyles();
    return (
        <Stepper activeStep={activeStep} className={classes.root} connector={<ProgressConnector />}>
            {steps.map((label, index) => {
                const is_correct = guesses[index] && guess_matches(guesses[index]).result === "correct";
                return (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ProgressStepIcon(is_correct)}></StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}

export default Progress;