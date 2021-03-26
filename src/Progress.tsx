import { createStyles, makeStyles, Step, StepConnector, StepContent, StepIconProps, StepLabel, Stepper, Theme, Typography, withStyles } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";

const Progress = ({ activeStep, steps }: { activeStep: number, steps: string[] }) => {
    return (
        <Stepper activeStep={activeStep} orientation="vertical" className="progress">
            {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

export default Progress;