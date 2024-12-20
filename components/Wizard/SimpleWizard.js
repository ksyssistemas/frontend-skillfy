import React, { useState } from 'react';
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Badge,
    ListGroup,
    ListGroupItem,
    Progress
} from "reactstrap";

function SimpleWizard({ stepsNumber, currentStep, stepTitles, hasWizartStyleOfReviewCreation }) {
    const progressBarNumber = stepsNumber - 1;

    const steps = Array.from({ length: stepsNumber }).map((_, index) => {
        if (index < currentStep - 1) {
            return { id: index.toString(), status: "isDone" };
        } else if (index === currentStep - 1) {
            return { id: index.toString(), status: "isCurrent" };
        } else if (index === stepsNumber - 1 && currentStep === stepsNumber) {
            return { id: index.toString(), status: "isLast" };
        } else {
            return { id: index.toString(), status: "isStep" };
        }
    });

    const wizardContent = () => {
        return (
            <div className="d-flex flex-column align-items-center">
                <nav className="mb-2 w-100">
                    <ol className="d-flex align-items-center justify-content-center list-unstyled">
                        {steps.map((step, index) => {
                            const title = stepTitles[index];
                            return (
                                <React.Fragment key={index}>
                                    <li className={`d-flex align-items-center justify-content-center ${step.status === 'isCurrent' ? 'font-weight-bold' : ''}`} style={{ zIndex: hasWizartStyleOfReviewCreation ? undefined : 10 }}>
                                        <a
                                            href="#"
                                            className="d-flex flex-column align-items-center justify-content-center p-1 text-decoration-none"
                                            style={{
                                                color: hasWizartStyleOfReviewCreation
                                                    ? (step.status === 'isDone' ? '#ff623f' : '#6c757d')
                                                    : (step.status === 'isDone' ? '#BBDB35' : '#6c757d')
                                            }}
                                        >
                                            {step.status === 'isDone' ? (
                                                <span
                                                    className="d-inline-flex align-items-center justify-content-center rounded-circle text-md"
                                                    style={{
                                                        width: hasWizartStyleOfReviewCreation ? '2rem' : '4rem',
                                                        height: hasWizartStyleOfReviewCreation ? '2rem' : '4rem',
                                                        fontSize: hasWizartStyleOfReviewCreation ? undefined : '2rem',
                                                        color: hasWizartStyleOfReviewCreation
                                                            ? (step.status === 'isDone' ? '#ffeeef' : '#6c757d')
                                                            : (step.status === 'isDone' ? '#ffeeef' : '#57249F'),
                                                        backgroundColor: hasWizartStyleOfReviewCreation
                                                            ? (step.status === 'isDone' ? '#ff623f' : '#e9ecef')
                                                            : (step.status === 'isDone' ? '#BBDB35' : '#e9ecef'),
                                                    }}
                                                >
                                                    <i className="ni ni-check-bold"></i>
                                                </span>
                                            ) : (
                                                <span
                                                    className="d-inline-flex align-items-center justify-content-center rounded-circle text-md"
                                                    style={{
                                                        width: hasWizartStyleOfReviewCreation ? '2rem' : '4rem',
                                                        height: hasWizartStyleOfReviewCreation ? '2rem' : '4rem',
                                                        fontSize: hasWizartStyleOfReviewCreation ? undefined : '2rem',
                                                        color: hasWizartStyleOfReviewCreation
                                                            ? (step.status === 'isDone' ? '#ffeeef' : '#6c757d')
                                                            : (step.status === 'isDone' ? '#ffeeef' : '#57249F'),
                                                        backgroundColor: hasWizartStyleOfReviewCreation
                                                            ? (step.status === 'isDone' ? '#ff623f' : '#e9ecef')
                                                            : (step.status === 'isDone' ? '#BBDB35' : '#e9ecef'),
                                                    }}
                                                >
                                                    {index + 1}
                                                </span>
                                            )
                                            }
                                            <span className="text-sm mt-1" >
                                                {title}
                                            </span>
                                        </a>
                                    </li>
                                    {index < progressBarNumber && (
                                        <div
                                            className="mb-4"
                                            style={{
                                                width: hasWizartStyleOfReviewCreation ? '6rem' : '28rem',
                                                zIndex: hasWizartStyleOfReviewCreation ? undefined : 10
                                            }}
                                        >
                                            <Progress
                                                color={
                                                    hasWizartStyleOfReviewCreation
                                                        ? (step.status === 'isDone' ? 'warning' : 'light')
                                                        : (step.status === 'isDone' ? 'green-sk' : 'light')
                                                }
                                                className={`progress-xs mb-3 mb-md-0`}
                                                max="100"
                                                value="100"
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </ol>
                </nav>
            </div>
        );
    };

    return (
        <>
            {
                hasWizartStyleOfReviewCreation ? (
                    <Card className="pt-4 mb-0">
                        {wizardContent()}
                    </Card>
                ) : (
                    <div className="pt-4 mb-0">
                        {wizardContent()}
                    </div>
                )
            }
        </>
    );
}

SimpleWizard.propTypes = {
    stepsNumber: PropTypes.number,
    currentStep: PropTypes.number,
    stepTitles: PropTypes.array,
    hasWizartStyleOfReviewCreation: PropTypes.bool,
};

export default SimpleWizard;