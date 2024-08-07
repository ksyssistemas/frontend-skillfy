import { useContext } from 'react';
import { CustomerContext } from '../../../contexts/RecordsContext/CustomerContext';
import useCreateClientCompany from './useCreateClientCompany';

const useUpdateClientCompany = () => {

  const { handleUpdatedCustomerRecordStatusChange } = useContext(CustomerContext);

  const { resetCreateCustomerAddress } = useCreateClientCompany();

  // const validateAddDepartmentForm = () => {
  //   if (departmentName === "") {
  //     setDepartmentNameState("invalid");
  //   } else {
  //     setDepartmentNameState("valid");
  //   }
  //   if (departmentDescription === "") {
  //     if (departmentDescription.length < 10) {
  //       setEmployeeRoleDescriptionState("invalid");
  //     } else {
  //       setEmployeeRoleDescriptionState("valid");
  //     }
  //   }
  // }

  async function handleValidateUpdateClientCompanyForm(
    handleOpenCustomerModal,
    customerIdToUpdate,
    individualEmployerIdNumber,
    companyName,
    registrationName,
    companyTypes,
    customerBusinessPhoneNumber,
    customerPhoneNumber,
    companyEmailAddress,
    customerBusinessSector,
    customerWebSite,
    customerStatus,
    formattedAccessionDate,
    idHeadOfficeBranch,
    customerZipCode,
    federatedUnit,
    companyCity,
    companyAddress,
    companyAddressNumber,
    companyAddressComplement,
    companyDistrict,
    companyCountry,
    handleCustomerIdToUpdate,
    handleCustomerIdStatusCleanupToUpdate
  ) {
    //validateAddDepartmentForm();
    // if (cycleTitleState === "valid" &&
    //   cyclePeriodState === "valid" &&
    //   startDateState === "valid" &&
    //   finishDateState === "valid" &&
    //   cycleObjectiveState === "valid" &&
    //   cycleManagerState === "valid"
    // ) {
    //   handleSubmit(cycleTitle, cyclePeriod, formattedStartDate, formattedFinishDate, cycleObjective);
    // } else {
    //   return null;
    // }
    await handleSubmitCompany(customerIdToUpdate, individualEmployerIdNumber, companyName, registrationName, companyTypes, customerBusinessPhoneNumber, customerPhoneNumber, companyEmailAddress, customerBusinessSector, customerWebSite, customerStatus, formattedAccessionDate);
    await handleSubmitCompanyAddress(customerIdToUpdate, idHeadOfficeBranch, customerZipCode, federatedUnit, companyCity, companyAddress, companyAddressNumber, companyAddressComplement, companyDistrict, companyCountry);
    goBackToCustomerUserList(handleOpenCustomerModal, handleCustomerIdToUpdate, handleCustomerIdStatusCleanupToUpdate);
  }

  function goBackToCustomerUserList(handleOpenCustomerModal, handleCustomerIdToUpdate, handleCustomerIdStatusCleanupToUpdate) {
    handleOpenCustomerModal();
    handleCustomerIdStatusCleanupToUpdate();
    resetCreateCustomerAddress();
    handleUpdatedCustomerRecordStatusChange();
  }

  const handleSubmitCompany = async (customerIdToUpdate, individualEmployerIdNumber, companyName, registrationName, companyTypes, customerBusinessPhoneNumber, customerPhoneNumber, companyEmailAddress, customerBusinessSector, customerWebSite, customerStatus) => {
    if (individualEmployerIdNumber && individualEmployerIdNumber !== ""
      || companyName && companyName !== ""
      || registrationName && registrationName !== ""
      || companyTypes && companyTypes !== ""
      || customerBusinessPhoneNumber && customerBusinessPhoneNumber !== ""
      || customerPhoneNumber && customerPhoneNumber !== ""
      || companyEmailAddress && companyEmailAddress !== ""
      || customerBusinessSector && customerBusinessSector !== ""
      || customerWebSite && customerWebSite !== ""
      || customerIdToUpdate && customerIdToUpdate !== ""
    ) {
      try {
        const payload = {
          companyName: companyName,
          brandName: registrationName,
          identificationNumber: individualEmployerIdNumber,
          phoneNumber: customerBusinessPhoneNumber,
          phone: customerPhoneNumber,
          email: companyEmailAddress,
          type: companyTypes,
          sector: customerBusinessSector,
          webSite: customerWebSite,
          status: customerStatus
        };
        console.log(`${process.env.NEXT_PUBLIC_CUSTOMER}/${customerIdToUpdate}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMER}/${customerIdToUpdate}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log('Data sent successfully!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  const handleSubmitCompanyAddress = async (customerIdToUpdate, idHeadOfficeBranch, customerZipCode, federatedUnit, companyCity, companyAddress, companyAddressNumber, companyAddressComplement, companyDistrict, companyCountry) => {
    if (idHeadOfficeBranch && idHeadOfficeBranch !== ""
      || customerZipCode && customerZipCode !== ""
      || federatedUnit && federatedUnit !== ""
      || companyCity && companyCity !== ""
      || companyAddress && companyAddress !== ""
      || companyAddressNumber && companyAddressNumber !== ""
      || companyDistrict && companyDistrict !== ""
      || companyCountry && companyCountry !== ""
      || customerIdToUpdate && customerIdToUpdate !== ""
    ) {
      try {
        const payload = {
          country: companyCountry,
          state: federatedUnit,
          city: companyCity,
          address: companyAddress,
          neighborhood: companyDistrict,
          zipCode: customerZipCode,
          addressNumber: companyAddressNumber,
          isBranche: idHeadOfficeBranch === "Matriz" ? false : true,
          complement: companyAddressComplement,
          // customerId: customerIdToUpdate
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMER}-address/${customerIdToUpdate}/address`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log('Data sent successfully!');
        } else {
          console.error('Error in response:', response.status);
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    }
  };

  return {
    handleValidateUpdateClientCompanyForm,
  };
};

export default useUpdateClientCompany;
