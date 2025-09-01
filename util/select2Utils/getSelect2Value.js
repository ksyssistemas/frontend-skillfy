/**
 * Normaliza o valor do Select2.
 * - Se receber um array com itens -> retorna o array de IDs (string).
 * - Se receber array vazio -> retorna "" (para exibir placeholder).
 * - Se receber string "" -> retorna "".
 */
export function getSelect2Value(selected) {
    if (Array.isArray(selected)) {
        return selected.length > 0
            ? selected.map(item => item.id.toString())
            : "";
    }
    return "";
}