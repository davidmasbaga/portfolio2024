export function kelvinToCelsius(kelvin: number): string {
  const celsius = kelvin - 273.15;
  return celsius.toFixed(1);
}

export function getHour(): string {
  let now = new Date();
  let hora = now.getHours();
  let minutos = now.getMinutes();
  let horaStr = hora < 10 ? "0" + hora.toString() : hora.toString();
  let minutosStr = minutos < 10 ? "0" + minutos.toString() : minutos.toString();

  return horaStr + ":" + minutosStr;
}

export function formatTime(time: string): string {
    const parts = time.split(':'); // Splits the string by ':'
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`; // Returns only hours and minutes
    }
    return time; // In case of an unexpected format, returns the original time
  }


export async function httpGetAsync(apiKey: string, ipAddress: string): Promise<any> {
    const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ipAddress}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Datos recibidos:", {city:data.city, long: data.longitude, lat: data.latitude, time:formatTime(data.timezone.current_time) }); // Imprime para verificar
        return {
            city:data.city,
            long:data.longitude,
            lat:data.latitude,
            time:formatTime(data.timezone.current_time)
        };
         // Retorna los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición HTTP:', error);
        throw error; // Propaga el error para manejarlo en el llamador
    }
}



const ipAddress = '79.153.196.14';  // Reemplaza con la dirección IP que deseas consultar





// httpGetAsync(url)
//     .then(data => console.log(data))
//     .catch(error => console.error('Error al obtener datos de IP:', error));
