// // const { format, isValid } = require('date-fns');
// import format from 'date-fns/format';

// export const handleSelectDateFormat = (value, setSelectDate, setSelectDateState) => {
//     if (value && value._d) {
//         //Formata a data para o formato YYYY-MM-DD
//         const formattedDate = format(new Date(date._d), 'dd:MM:yyyy');

//         //Define a data formatada no estado
//         setSelectDate(formattedDate);

//         //Define o estado de validação
//         setSelectDateState('valid');

//     } else if (value === '') {
//         //Quando o valor está vazio, define o estado como "inválido"
//         setSelectDateState('invalid');

//     } else {
//         //Se a data não for válida
//         setSelectDateState('invalid');
//     }
// };
