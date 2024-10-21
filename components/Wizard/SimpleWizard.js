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

function SimpleWizard({ stepsNumber, currentStep, stepTitles }) {

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

    return (
        <div className="pt-4 mb-0">
            <div className="d-flex flex-column align-items-center">
                <nav className="mb-2 w-100">
                    <ol className="d-flex align-items-center justify-content-center list-unstyled">
                        {steps.map((step, index) => {
                            const title = stepTitles[index];
                            return (
                                <React.Fragment key={index}>
                                    <li className={`d-flex align-items-center justify-content-center ${step.status === 'isCurrent' ? 'font-weight-bold' : ''}`}  style={{zIndex: "10",}}>
                                        <a
                                            href="#"
                                            className="d-flex flex-column align-items-center justify-content-center p-1 text-decoration-none"
                                            style={{
                                                color: step.status === 'isDone' ? '#BBDB35' : '#ffff'
                                            }}
                                        >
                                            {step.status === 'isDone' ? (
                                                <span
                                                    className="d-inline-flex align-items-center justify-content-center rounded-circle text-md"
                                                    style={{
                                                        width: '4rem',
                                                        height: '4rem',
                                                        fontSize: '2rem',
                                                        color: step.status === 'isDone' ? '#ffeeef' : '#57249F',
                                                        backgroundColor: step.status === 'isDone' ? '#BBDB35' : '#e9ecef',
                                                    }}>
                                                    <i className="ni ni-check-bold"></i>
                                                </span>
                                            ) : (
                                                <span
                                                    className="d-inline-flex align-items-center justify-content-center rounded-circle text-md"
                                                    style={{
                                                        width: '4rem',
                                                        height: '4rem',
                                                        fontSize: '2rem',
                                                        color: step.status === 'isDone' ? '#ffeeef' : '#57249F',
                                                        backgroundColor: step.status === 'isDone' ? '#BBDB35' : '#e9ecef',
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
                                                width: '28rem',
                                                zIndex: "10",
                                            }}
                                        >
                                            <Progress
                                                color={`${step.status === 'isDone' ? 'green-sk' : 'light'}`}
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
        </div>
    );
}

SimpleWizard.propTypes = {
    stepsNumber: PropTypes.number,
    currentStep: PropTypes.number,
    stepTitles: PropTypes.array,
};

export default SimpleWizard;