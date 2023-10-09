const validateRut = (rut) => {
  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').trim();

  const rutSinDigito = rutLimpio.slice(0, -1);
  const digitoVerificador = rutLimpio.slice(-1).toUpperCase();

  if (!/^\d{1,8}[0-9K]$/.test(rutSinDigito)) {
    return false;
  }

  let suma = 0;
  let multiplicador = 2;
  for (let i = rutSinDigito.length - 1; i >= 0; i -= 1) {
    suma += multiplicador * parseInt(rutSinDigito.charAt(i), 10);
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = suma % 11;
  const digitoVerificadorEsperado = resto === 0 ? '0' : (11 - resto).toString();

  return digitoVerificador === digitoVerificadorEsperado ? true : 'El rut no cumple con el formato';
};

export default validateRut;
