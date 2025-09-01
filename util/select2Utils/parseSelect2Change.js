/**
 * Normaliza o valor do Select2 para enviar ao reducer.
 * Retorna sempre um objeto no formato { id, text }.
 *
 * @param {object} e - Evento do Select2
 * @param {array} dataList - Lista de opções (para pegar o texto)
 */
export function parseSelect2Change(e, dataList = []) {
    const id = e.params?.data?.id?.toString() ?? "";
    if (!id) return null;

    // tenta achar o item na lista original
    const item = dataList.find(opt => opt.id.toString() === id);

    return item
        ? { id: item.id.toString(), text: item.text }
        : { id, text: e.params?.data?.text ?? "" };
}