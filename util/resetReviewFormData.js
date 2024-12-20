// type ResetFormDataProps = {
//     index: number
//     key: string
//     resetFormData: string 
//     clearStepIndex: () => void
//     dispatch: React.ActionDispatch<React.AnyActionArg>
// }

export const resetFormAndLocalStorage = (
   shouldClear,
   index,
   clearStepIndex,
   key,
   resetFormData,
   handleClearStepIndex,
   dispatch
) => {
   if (shouldClear && clearStepIndex === index) {
      // Executa o reset no Reducer
      dispatch({ type: resetFormData });

      // Remove o item do localStorage associado à chave
      localStorage.removeItem(key);

      // Reseta o índice de etapa
      handleClearStepIndex(); // Chama a função passada como referência
   }
};
