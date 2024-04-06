export const useMask = () => {
  const maskCpfCnpj = (value: string | undefined) => {
    if (!value) return ''

    if (value?.length <= 11) {
      // CPF
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    } else {
      // CNPJ
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }
  }

  const maskPhone = (value: string | undefined) => {
    if (!value) return ''

    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)/, '$1')
  }

  const maskZipCode = (value: string | undefined) => {
    if (!value) return ''
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
      .replace(/(-\d{3})(\d+?)/, '$1')
  }

  return {
    maskPhone,
    maskCpfCnpj,
    maskZipCode,
  }
}
