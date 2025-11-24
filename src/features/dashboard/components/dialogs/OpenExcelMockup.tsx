import { useState, DragEvent } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaFileExcel } from "react-icons/fa6";
import { Journey } from "@/types/journey";
import { UploadExcel } from "../../services/journey_service";
import { RowMapper } from "../../utils/excelRowMapper";
import { Plus } from "lucide-react";

const OpenExcelMockup = () => {
  const [file, setFile] = useState<File | null>(null);
  const [clientes, setClientes] = useState<Journey[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      //  Mapeamos las filas
      const mappedData = RowMapper(rawData);
      //  Quitamos duplicados por clientNumber (puedes cambiar la key)
      const uniqueData = mappedData.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.client_number === item.client_number)
      );

      setClientes(uniqueData);
    };
    reader.readAsBinaryString(file);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Por favor selecciona un archivo Excel primero.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      let res = await UploadExcel(formData);

      if (!res) {
        throw new Error("Error al subir el archivo Excel");
      }

      alert("Archivo Excel enviado correctamente ✅");
    } catch (error) {
      alert("Hubo un problema al enviar el archivo.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} className="cursor-pointer active:scale-95 rounded-full hover:text-zinc-600">
          <Plus size={24}/> 
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-3xl p-8 bg-white rounded-2xl shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-zinc-800">
            Importar datos
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Sube tu archivo Excel para visualizar y guardar los registros.
          </DialogDescription>
        </DialogHeader>

        {clientes.length === 0 ? (
          <div
            className={`w-full h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <FaFileExcel className="text-5xl text-green-600 mb-4" />
            <p className="text-lg font-medium text-gray-700">
              Arrastra tu archivo Excel aquí
            </p>
            <p className="text-sm text-gray-500">
              o haz clic para seleccionarlo
            </p>

            <input
              type="file"
              accept=".xlsx, .xls"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {clientes.length} registros cargados
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setClientes([]);
                  setFile(null);
                }}
              >
                Quitar archivo
              </Button>
            </div>

            <div className="overflow-x-auto max-h-72 border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-medium">
                      N° Cliente
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700 font-medium">
                      Nombre y Apellido
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700 font-medium">
                      N° Matafuegos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientes.map((c, idx) => (
                    <tr key={c.id || idx} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {c.client_number}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {c.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {c.fire_extinguisher_numbers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <DialogTrigger asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogTrigger>
          <Button
            disabled={clientes.length === 0}
            className="rounded-full cursor-pointer active:scale-95"
            onClick={handleUpload}
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenExcelMockup;
