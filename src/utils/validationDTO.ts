async function validationDTO (objeto: Record<string, any>, propriedades: string[]): Promise<boolean> {
  let valida = true
  for await (const propriedade of propriedades) {
    if (objeto[propriedade] === undefined || objeto[propriedade] === null || objeto[propriedade] === '' || objeto[propriedade].length === 0) {
      valida = false
    }
  }
  return valida
}

export { validationDTO }
