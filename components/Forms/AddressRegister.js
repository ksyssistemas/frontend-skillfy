{/* <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeZipCode"
                                >
                                    CEP
                                </label>
                                <InputMask
                                    placeholder="99999-999"
                                    mask="99999-999"
                                    maskChar=" "
                                    value={employeeZipCode}
                                    onChange={(e) => handleSaveCEP(e.target.value)}
                                >
                                    {(inputProps) => <Input {...inputProps} id="validationEmployeeZipCode" type="text" valid={employeeZipCodeState === "valid"} invalid={employeeZipCodeState === "invalid"} />}
                                </InputMask>
                                {
                                    loadingCEPValidation ? <div style={{ display: 'none', width: '100%', marginTop: '0.25rem', fontSize: '80%', color: '#5e72e4' }}>Validando CEP...</div> : (
                                        errorCEPValidation !== null ? <div className="invalid-feedback">Ocorreu um erro ao validar o CEP.</div> : (
                                            brasilAPICEPData ? <div className="valid-feedback">CEP válido!</div> : <div className="invalid-feedback">CEP inválido!</div>
                                        )
                                    )
                                }
                            </Col>
                            <Col className="mb-3" md="8">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyAddress"
                                >
                                    Endereço
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeCompanyAddress"
                                    placeholder=""
                                    value={employeeAddress}
                                    type="text"
                                    valid={employeeAddressState === "valid"}
                                    invalid={employeeAddressState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeAddress(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeAddressState("invalid");
                                        } else {
                                            setEmployeeAddressState("valid");
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                            </Col>
                        </div>
                        <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyAddressNumber"
                                >
                                    Número
                                </label>
                                <Input
                                    defaultValue="0000"
                                    id="validationEmployeeCompanyAddressNumber"
                                    placeholder="0000"
                                    value={employeeAddressNumber}
                                    type="text"
                                    valid={employeeAddressNumberState === "valid"}
                                    invalid={employeeAddressNumberState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeAddressNumber(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeAddressNumberState("invalid");
                                        } else {
                                            setEmployeeAddressNumberState("valid");
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                            </Col>
                            <Col className="mb-3" md="8">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyAddressComplement"
                                >
                                    Complemento (opcional)
                                </label>
                                <Input
                                    id="validationEmployeeCompanyAddressComplement"
                                    placeholder=""
                                    value={employeeAddressComplement}
                                    type="text"
                                    onChange={(e) => {
                                        setEmployeeAddressComplement(e.target.value);
                                    }}
                                />
                            </Col>
                        </div>
                        <div className="form-row">
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyDistrict"
                                >
                                    Bairro
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeCompanyDistrict"
                                    placeholder=""
                                    value={employeeNeighborhood}
                                    type="text"
                                    valid={employeeNeighborhoodState === "valid"}
                                    invalid={employeeNeighborhoodState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeNeighborhood(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeNeighborhoodState("invalid");
                                        } else {
                                            setEmployeeNeighborhoodState("valid");
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                            </Col>
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeCompanyCity"
                                >
                                    Cidade
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeCompanyCity"
                                    placeholder=""
                                    value={employeeCity}
                                    type="text"
                                    valid={employeeCityState === "valid"}
                                    invalid={employeeCityState === "invalid"}
                                    onChange={(e) => {
                                        setEmployeeCity(e.target.value);
                                        if (e.target.value === "") {
                                            setEmployeeCityState("invalid");
                                        } else {
                                            setEmployeeCityState("valid");
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    É necessário preencher este campo.
                                </div>
                            </Col>
                            <Col className="mb-3" md="4">
                                <label
                                    className="form-control-label"
                                    htmlFor="validationEmployeeFederatedUnit"
                                >
                                    Estado
                                </label>
                                <Input
                                    defaultValue=""
                                    id="validationEmployeeFederatedUnit"
                                    placeholder=""
                                    value={federatedUnit}
                                    type="text"
                                    valid={federatedUnitState === "valid"}
                                    invalid={federatedUnitState === "invalid"}
                                    onChange={(e) => {
                                        setFederatedUnit(e.target.value);
                                        if (e.target.value === "") {
                                            setFederatedUnitState("invalid");
                                        } else {
                                            setFederatedUnitState("valid");
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    É necessário selecionar uma opção.
                                </div>
                            </Col>
                        </div>
                        <hr /> */}