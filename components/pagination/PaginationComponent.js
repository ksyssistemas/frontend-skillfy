// components/pagination/PaginationComponent.js

import React from 'react';
import { CardFooter, Pagination as ReactstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = () => {
    return (
        <CardFooter className="py-4">
            <nav aria-label="...">
                <ReactstrapPagination
                    className="pagination justify-content-center mb-0" // Adicionado a classe justify-content-center
                    listClassName="justify-content-center mb-0"
                >
                    <PaginationItem className="disabled">
                        <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                        >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                        <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                        </PaginationLink>
                    </PaginationItem>
                </ReactstrapPagination>
            </nav>
        </CardFooter>
    );
};

export default PaginationComponent;
