const useCPF = () => {

    function validateCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais, o que torna o CPF inválido
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digit1 = 11 - (sum % 11);
        if (digit1 > 9) {
            digit1 = 0;
        }

        // Verifica o primeiro dígito verificador
        if (parseInt(cpf.charAt(9)) !== digit1) {
            return false;
        }

        // Calcula o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let digit2 = 11 - (sum % 11);
        if (digit2 > 9) {
            digit2 = 0;
        }

        // Verifica o segundo dígito verificador
        if (parseInt(cpf.charAt(10)) !== digit2) {
            return false;
        }

        return true;
    };

    return {
        validateCPF
    };
};

export default useCPF;
