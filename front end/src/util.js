// muda a data de aaaa-mm-dd para dd/mm/aaaa
export function formatarData(data) {
  if (!data) return '';
  const partes = data.split('-');
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
