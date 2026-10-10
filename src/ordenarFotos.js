export const ordenarFotos = (fotos, navegacao) => {
  const comparadores = {
    'mais-vistas': (a, b) => b.visualizacoes - a.visualizacoes,
    'mais-curtidas': (a, b) => b.curtidas - a.curtidas,
    novas: (a, b) => Date.parse(b.dataPublicacao) - Date.parse(a.dataPublicacao)
  }
  const comparar = comparadores[navegacao]
  return comparar ? [...fotos].sort(comparar) : fotos
}
