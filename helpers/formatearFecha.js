export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
  
    const fechaFormateada = fechaNueva.toLocaleDateString('es-ES', opciones);
  
    const partes = fechaFormateada.split(' de ');
    const dia = partes[0];
    const mes = partes[1];
    const anio = partes[2];
  
    return `${dia} ${mes} ${anio}`;
  }
  