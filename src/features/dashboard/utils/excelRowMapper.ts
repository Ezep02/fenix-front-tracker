import { Journey } from "@/types/journey";

export function RowMapper(rawData: any[]): Journey[] {
  const mappedData: Journey[] = rawData.map((row: any) => {
    // Separar nombre y apellido
    const fullName = row["Nombre y Apellido"] || "";
    const [name = "", ...surnameParts] = fullName.split(" ");
    const surname = surnameParts.join(" ");

    // Función auxiliar para normalizar arrays de strings
    const parseArray = (value: any) =>
      value
        ? value
            .toString()
            .split(",")
            .map((s: string) => s.trim())
        : [];

    // Función auxiliar para parsear número seguro
    const parseNumber = (value: any) => {
      const n = Number(value);
      return isNaN(n) ? undefined : n;
    };

    return {
      id: parseNumber(row["id"]) ?? 0,
      client_number: parseNumber(row["N° Cliente"]) ?? 0,
      name,
      surname: surname || undefined,
      phone: row["Teléfono"] || undefined,
      trade_name: row["Nombre Fantasía"] || undefined,
      address: row["Dirección"] || undefined,
      city: row["Ciudad"] || undefined,

      // Campos de dirección segmentada (intentar extraer si vienen en rawData)
      street_name: row["Calle"] || undefined,
      street_number: parseNumber(row["Número Calle"]),
      house_number: row["Número Puerta"] || undefined,
      between_streets: row["Entre Calles"] || undefined,
      extra_info: row["Info Extra"] || undefined,

      fire_extinguisher_numbers: parseArray(row["N° Matafuegos"]),
      manufacture_years: parseArray(row["Año Fab"]),
      types: parseArray(row["Tipo"]),

      journey_status: (row["journey_status"] as Journey["journey_status"]) ?? "pending",
      quantity: parseNumber(row["Cantidad"]),
    };
  });

  return mappedData;
}
